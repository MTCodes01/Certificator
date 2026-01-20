// Certificate Generator Plugin - Main Code
// This file runs in Figma's sandbox environment

// Create a console logger that mimics the browser console
const console = {
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
  url?: string;
  error?: string;
}

// Configuration for frame layout
const FRAMES_PER_COLUMN = 5;
const FRAME_SPACING = 50;

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
  const startX = templateFrame.x + frameWidth + FRAME_SPACING;
  const startY = templateFrame.y;
  
  const generatedFrames: FrameNode[] = [];
  
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    
    // Calculate position (column layout going down, then right)
    const column = Math.floor(i / FRAMES_PER_COLUMN);
    const rowIndex = i % FRAMES_PER_COLUMN;
    const x = startX + column * (frameWidth + FRAME_SPACING);
    const y = startY + rowIndex * (frameHeight + FRAME_SPACING);
    
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

// Fetch Google Sheets data (plugin code has network access)
async function fetchSheetData(url: string): Promise<SheetRow[]> {
  try {
    // Extract sheet ID
    const patterns = [
      /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/,
      /\/spreadsheets\/d\/e\/([a-zA-Z0-9-_]+)/,
      /key=([a-zA-Z0-9-_]+)/
    ];

    let sheetId = null;
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        sheetId = match[1];
        break;
      }
    }

    if (!sheetId) {
      throw new Error('Invalid Google Sheets URL');
    }

    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
    
    // Try direct access first (works for public sheets)
    const urlsToTry = [
      csvUrl, // Direct Google Sheets export
      `https://thingproxy.freeboard.io/fetch/${csvUrl}`,
      `https://api.allorigins.win/raw?url=${encodeURIComponent(csvUrl)}`,
      `https://corsproxy.io/?${encodeURIComponent(csvUrl)}`
    ];

    let lastError: Error | null = null;

    for (const proxyUrl of urlsToTry) {
      try {
        // We use a simplified console here since we don't have the full environment
        figma.ui.postMessage({ type: 'log', message: `Trying to fetch: ${proxyUrl.substring(0, 30)}...` });
        
        const response = await fetch(proxyUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const csv = await response.text();
        
        // Validate CSV
        if (!csv || csv.length < 10 || csv.includes('<!DOCTYPE') || csv.includes('<html')) {
          throw new Error('Invalid CSV response');
        }

        figma.ui.postMessage({ type: 'log', message: 'Success!' });
        // Parse CSV
        return parseCsv(csv);
      } catch (error) {
        lastError = error as Error;
        continue;
      }
    }

    throw new Error(`Failed to fetch sheet. Ensure it's publicly shared. Last error: ${lastError?.message || 'Unknown'}`);
  } catch (error) {
    throw error;
  }
}

// Parse CSV to array of objects
function parseCsv(csv: string): SheetRow[] {
  // Fix the split logic to handle various newline formats
  const lines = csv.trim().split(/\r\n|\r|\n/);
  
  if (lines.length < 2) {
    throw new Error('Sheet must have headers and at least one data row');
  }

  // Parse header row
  const headers = parseCSVLine(lines[0]).map(h => h.trim().toLowerCase());
  
  // Parse data rows
  const data: SheetRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    // Skip empty lines
    if (values.length === 1 && values[0] === '') continue;
    
    const row: SheetRow = {};
    headers.forEach((header, index) => {
      row[header] = values[index] ? values[index].trim() : '';
    });
    data.push(row);
  }

  return data;
}

// Parse a single CSV line (handles quoted values)
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current);
  return result;
}

// Handle messages from UI
figma.ui.onmessage = async (msg: PluginMessage) => {
  if (msg.type === 'fetch-sheet') {
    try {
      const data = await fetchSheetData(msg.url!);
      figma.ui.postMessage({ type: 'sheet-data', data });
    } catch (error) {
      figma.ui.postMessage({ 
        type: 'error', 
        error: error instanceof Error ? error.message : 'Failed to fetch sheet data' 
      });
    }
  }
  
  if (msg.type === 'generate') {
    if (!msg.data || msg.data.length === 0) {
      figma.ui.postMessage({ type: 'error', error: 'No data received from Google Sheet' });
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
