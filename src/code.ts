/// <reference types="@figma/plugin-typings" />

// Certificate Generator Plugin - Main Code
// This file runs in Figma's sandbox environment

// Create a logger that sends messages to the UI
const logger = {
  log: (...args: any[]) => figma.ui.postMessage({ type: 'log', message: args }),
  warn: (...args: any[]) => figma.ui.postMessage({ type: 'log', message: ['WARN:', ...args] }),
  error: (...args: any[]) => figma.ui.postMessage({ type: 'log', message: ['ERROR:', ...args] })
};

interface SheetRow {
  [key: string]: string;
}

interface PluginMessage {
  type: string;
  data?: SheetRow[];
  error?: string;
}

// Show the plugin UI
figma.showUI(__html__, { 
  width: 360, 
  height: 480,
  themeColors: true
});

// Track the selected template frame
let templateFrame: FrameNode | null = null;

// Find all text nodes with placeholders in a frame
function findPlaceholders(node: SceneNode): string[] {
  const placeholders: Set<string> = new Set();
  
  function traverse(n: SceneNode) {
    if (n.type === 'TEXT') {
      const textNode = n as TextNode;
      const matches = textNode.characters.match(/#[a-zA-Z_][a-zA-Z0-9_]*/g);
      if (matches) {
        matches.forEach(match => placeholders.add(match.substring(1).toLowerCase()));
      }
    }
    if ('children' in n) {
      (n as ChildrenMixin).children.forEach(child => traverse(child));
    }
  }
  
  traverse(node);
  return Array.from(placeholders);
}

// Find placeholders in frame name
function findNamePlaceholders(name: string): string[] {
  const matches = name.match(/#[a-zA-Z_][a-zA-Z0-9_]*/g);
  if (matches) {
    return matches.map(m => m.substring(1).toLowerCase());
  }
  return [];
}

// Replace placeholders in text nodes
async function replaceTextPlaceholders(node: SceneNode, row: SheetRow): Promise<void> {
  if (node.type === 'TEXT') {
    const textNode = node as TextNode;
    let newText = textNode.characters;
    
    // Load fonts before modifying text
    await Promise.all(
      textNode.getRangeAllFontNames(0, textNode.characters.length)
        .map(font => figma.loadFontAsync(font))
    );
    
    // Replace all placeholders
    for (const [key, value] of Object.entries(row)) {
      const regex = new RegExp(`#${key}`, 'gi');
      newText = newText.replace(regex, value);
    }
    
    textNode.characters = newText;
  }
  
  if ('children' in node) {
    for (const child of (node as ChildrenMixin).children) {
      await replaceTextPlaceholders(child, row);
    }
  }
}

// Replace placeholders in frame name
function replaceNamePlaceholders(name: string, row: SheetRow): string {
  let newName = name;
  for (const [key, value] of Object.entries(row)) {
    const regex = new RegExp(`#${key}`, 'gi');
    newName = newName.replace(regex, value);
  }
  return newName;
}

// Generate certificates from template and data
async function generateCertificates(data: SheetRow[]): Promise<void> {
  if (!templateFrame) {
    figma.ui.postMessage({ type: 'error', error: 'No template frame selected' });
    return;
  }
  
  const frameWidth = templateFrame.width;
  const frameHeight = templateFrame.height;
  
  // Calculate optimal layout based on number of certificates
  const totalCerts = data.length;
  const maxPerColumn = Math.min(20, totalCerts); // Max 30 per column
  const numColumns = Math.ceil(totalCerts / maxPerColumn);
  
  // Spacing configuration - simple fixed pixel gaps
  const HORIZONTAL_GAP_PERCENT = 0.5;  // 50% of frame width for horizontal spacing
  const VERTICAL_GAP_PERCENT = 0.25;      // Fixed pixel gap between certificates vertically
  
  const horizontalSpacing = frameWidth * HORIZONTAL_GAP_PERCENT;
  const verticalSpacing = frameHeight * VERTICAL_GAP_PERCENT;
  
  const startX = templateFrame.x + frameWidth + horizontalSpacing;
  const startY = templateFrame.y;
  
  const generatedFrames: FrameNode[] = [];
  
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    
    // Calculate position (column layout going down, then right)
    const column = Math.floor(i / maxPerColumn);
    const rowIndex = i % maxPerColumn;
    const x = startX + column * (frameWidth + horizontalSpacing);
    const y = startY + rowIndex * (frameHeight - verticalSpacing);
    
    // Clone the template frame
    const clone = templateFrame.clone();
    clone.x = x;
    clone.y = y;
    
    // Replace frame name placeholders
    clone.name = replaceNamePlaceholders(templateFrame.name, row);
    
    // Replace text placeholders
    await replaceTextPlaceholders(clone, row);
    
    generatedFrames.push(clone);
    
    // Send progress update
    figma.ui.postMessage({ 
      type: 'progress', 
      current: i + 1, 
      total: data.length 
    });
  }
  
  // Select all generated frames
  figma.currentPage.selection = generatedFrames;
  
  // Zoom to fit the generated frames
  figma.viewport.scrollAndZoomIntoView(generatedFrames);
  
  figma.ui.postMessage({ 
    type: 'complete', 
    count: generatedFrames.length 
  });
}

// Handle selection changes
function handleSelectionChange(): void {
  const selection = figma.currentPage.selection;
  
  if (selection.length === 1 && selection[0].type === 'FRAME') {
    templateFrame = selection[0] as FrameNode;
    const placeholders = findPlaceholders(templateFrame);
    const namePlaceholders = findNamePlaceholders(templateFrame.name);
    
    // Combine and deduplicate
    const allPlaceholders = [...new Set([...placeholders, ...namePlaceholders])];
    
    figma.ui.postMessage({
      type: 'template-selected',
      name: templateFrame.name,
      placeholders: allPlaceholders
    });
  } else {
    templateFrame = null;
    figma.ui.postMessage({
      type: 'no-template'
    });
  }
}

// Listen for selection changes
figma.on('selectionchange', handleSelectionChange);

// Initial selection check
handleSelectionChange();

// Handle messages from UI
figma.ui.onmessage = async (msg: PluginMessage) => {
  if (msg.type === 'generate') {
    if (!msg.data || msg.data.length === 0) {
      figma.ui.postMessage({ type: 'error', error: 'No data received' });
      return;
    }
    
    try {
      await generateCertificates(msg.data);
    } catch (error) {
      figma.ui.postMessage({ 
        type: 'error', 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      });
    }
  }
  
  if (msg.type === 'cancel') {
    figma.closePlugin();
  }
};
