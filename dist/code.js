"use strict";(()=>{var M=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var m=(e,t,a)=>new Promise((n,o)=>{var r=c=>{try{l(a.next(c))}catch(g){o(g)}},s=c=>{try{l(a.throw(c))}catch(g){o(g)}},l=c=>c.done?n(c.value):Promise.resolve(c.value).then(r,s);l((a=a.apply(e,t)).next())});var A=M(y=>{var d=5,h=50;figma.showUI(`<!DOCTYPE html>\r
<html lang="en">\r
\r
<head>\r
  <meta charset="UTF-8">\r
  <meta name="viewport" content="width=device-width, initial-scale=1.0">\r
  <title>Certificator</title>\r
  <style>\r
    :root {\r
      --bg-primary: #1e1e1e;\r
      --bg-secondary: #2d2d2d;\r
      --bg-tertiary: #3d3d3d;\r
      --text-primary: #ffffff;\r
      --text-secondary: #a0a0a0;\r
      --accent: #7c5cff;\r
      --accent-hover: #9177ff;\r
      --success: #4caf50;\r
      --error: #f44336;\r
      --border: #404040;\r
    }\r
\r
    * {\r
      margin: 0;\r
      padding: 0;\r
      box-sizing: border-box;\r
    }\r
\r
    body {\r
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\r
      background: var(--bg-primary);\r
      color: var(--text-primary);\r
      padding: 16px;\r
      font-size: 13px;\r
      line-height: 1.5;\r
    }\r
\r
    .header {\r
      display: flex;\r
      align-items: center;\r
      gap: 10px;\r
      margin-bottom: 20px;\r
      padding-bottom: 16px;\r
      border-bottom: 1px solid var(--border);\r
    }\r
\r
    .logo {\r
      width: 32px;\r
      height: 32px;\r
      background: linear-gradient(135deg, var(--accent), #ff6b9d);\r
      border-radius: 8px;\r
      display: flex;\r
      align-items: center;\r
      justify-content: center;\r
      font-size: 18px;\r
    }\r
\r
    .header h1 {\r
      font-size: 18px;\r
      font-weight: 600;\r
    }\r
\r
    .section {\r
      margin-bottom: 20px;\r
    }\r
\r
    .section-title {\r
      font-size: 11px;\r
      font-weight: 600;\r
      text-transform: uppercase;\r
      letter-spacing: 0.5px;\r
      color: var(--text-secondary);\r
      margin-bottom: 8px;\r
    }\r
\r
    .template-card {\r
      background: var(--bg-secondary);\r
      border-radius: 8px;\r
      padding: 14px;\r
      border: 1px solid var(--border);\r
    }\r
\r
    .template-card.empty {\r
      text-align: center;\r
      padding: 24px 14px;\r
      color: var(--text-secondary);\r
    }\r
\r
    .template-card .icon {\r
      font-size: 24px;\r
      margin-bottom: 8px;\r
    }\r
\r
    .template-name {\r
      font-weight: 500;\r
      margin-bottom: 8px;\r
      word-break: break-word;\r
    }\r
\r
    .placeholders {\r
      display: flex;\r
      flex-wrap: wrap;\r
      gap: 6px;\r
    }\r
\r
    .placeholder-tag {\r
      background: var(--bg-tertiary);\r
      color: var(--accent);\r
      padding: 4px 8px;\r
      border-radius: 4px;\r
      font-family: 'Monaco', 'Consolas', monospace;\r
      font-size: 11px;\r
    }\r
\r
\r
\r
    .input-group {\r
      margin-bottom: 12px;\r
    }\r
\r
    .input-group label {\r
      display: block;\r
      margin-bottom: 6px;\r
      font-weight: 500;\r
    }\r
\r
    .input-group input[type="url"] {\r
      width: 100%;\r
      padding: 10px 12px;\r
      background: var(--bg-secondary);\r
      border: 1px solid var(--border);\r
      border-radius: 6px;\r
      color: var(--text-primary);\r
      font-size: 13px;\r
      transition: border-color 0.2s, box-shadow 0.2s;\r
    }\r
\r
    .input-group input:focus {\r
      outline: none;\r
      border-color: var(--accent);\r
      box-shadow: 0 0 0 3px rgba(124, 92, 255, 0.2);\r
    }\r
\r
    .input-group input::placeholder {\r
      color: var(--text-secondary);\r
    }\r
\r
    .file-input-wrapper {\r
      position: relative;\r
      width: 100%;\r
    }\r
\r
    .file-input-wrapper input[type="file"] {\r
      position: absolute;\r
      opacity: 0;\r
      width: 100%;\r
      height: 100%;\r
      cursor: pointer;\r
    }\r
\r
    .file-input-label {\r
      display: flex;\r
      align-items: center;\r
      justify-content: center;\r
      gap: 8px;\r
      width: 100%;\r
      padding: 32px 12px;\r
      background: var(--bg-secondary);\r
      border: 2px dashed var(--border);\r
      border-radius: 8px;\r
      color: var(--text-secondary);\r
      cursor: pointer;\r
      transition: all 0.2s;\r
      text-align: center;\r
    }\r
\r
    .file-input-label:hover {\r
      border-color: var(--accent);\r
      color: var(--text-primary);\r
    }\r
\r
    .file-input-label.has-file {\r
      border-style: solid;\r
      border-color: var(--accent);\r
      background: var(--bg-tertiary);\r
      color: var(--text-primary);\r
    }\r
\r
    .hint {\r
      font-size: 11px;\r
      color: var(--text-secondary);\r
      margin-top: 6px;\r
    }\r
\r
    .btn {\r
      width: 100%;\r
      padding: 12px 16px;\r
      border: none;\r
      border-radius: 8px;\r
      font-size: 14px;\r
      font-weight: 600;\r
      cursor: pointer;\r
      transition: all 0.2s;\r
      display: flex;\r
      align-items: center;\r
      justify-content: center;\r
      gap: 8px;\r
    }\r
\r
    .btn-primary {\r
      background: var(--accent);\r
      color: white;\r
    }\r
\r
    .btn-primary:hover:not(:disabled) {\r
      background: var(--accent-hover);\r
      transform: translateY(-1px);\r
    }\r
\r
    .btn-primary:disabled {\r
      background: var(--bg-tertiary);\r
      color: var(--text-secondary);\r
      cursor: not-allowed;\r
    }\r
\r
    .progress-container {\r
      display: none;\r
      margin-top: 16px;\r
    }\r
\r
    .progress-container.visible {\r
      display: block;\r
    }\r
\r
    .progress-bar {\r
      height: 8px;\r
      background: var(--bg-tertiary);\r
      border-radius: 4px;\r
      overflow: hidden;\r
      margin-bottom: 8px;\r
    }\r
\r
    .progress-fill {\r
      height: 100%;\r
      background: linear-gradient(90deg, var(--accent), #ff6b9d);\r
      border-radius: 4px;\r
      transition: width 0.3s ease;\r
    }\r
\r
    .progress-text {\r
      text-align: center;\r
      font-size: 12px;\r
      color: var(--text-secondary);\r
    }\r
\r
    .status {\r
      margin-top: 12px;\r
      padding: 12px;\r
      border-radius: 6px;\r
      text-align: center;\r
      font-weight: 500;\r
      display: none;\r
      white-space: pre-line;\r
    }\r
\r
    .status.visible {\r
      display: block;\r
    }\r
\r
    .status.success {\r
      background: rgba(76, 175, 80, 0.15);\r
      color: var(--success);\r
    }\r
\r
    .status.error {\r
      background: rgba(244, 67, 54, 0.15);\r
      color: var(--error);\r
    }\r
\r
    .steps {\r
      background: var(--bg-secondary);\r
      border-radius: 8px;\r
      padding: 14px;\r
      margin-bottom: 16px;\r
    }\r
\r
    .step {\r
      display: flex;\r
      align-items: flex-start;\r
      gap: 10px;\r
      margin-bottom: 10px;\r
    }\r
\r
    .step:last-child {\r
      margin-bottom: 0;\r
    }\r
\r
    .step-number {\r
      width: 20px;\r
      height: 20px;\r
      background: var(--bg-tertiary);\r
      border-radius: 50%;\r
      display: flex;\r
      align-items: center;\r
      justify-content: center;\r
      font-size: 11px;\r
      font-weight: 600;\r
      flex-shrink: 0;\r
    }\r
\r
    .step-number.active {\r
      background: var(--accent);\r
    }\r
\r
    .step-number.done {\r
      background: var(--success);\r
    }\r
\r
    .step-text {\r
      color: var(--text-secondary);\r
      font-size: 12px;\r
    }\r
\r
    .step-text.active {\r
      color: var(--text-primary);\r
    }\r
  </style>\r
</head>\r
\r
<body>\r
  <div class="header">\r
    <div class="logo">\u{1F4DC}</div>\r
    <h1>Certificator</h1>\r
  </div>\r
\r
  <div class="section">\r
    <div class="section-title">How to Use</div>\r
    <div class="steps">\r
      <div class="step">\r
        <div class="step-number" id="step1">1</div>\r
        <div class="step-text" id="step1-text">Select a frame to use as your template</div>\r
      </div>\r
      <div class="step">\r
        <div class="step-number" id="step2">2</div>\r
        <div class="step-text" id="step2-text">Upload your CSV file with data</div>\r
      </div>\r
      <div class="step">\r
        <div class="step-number" id="step3">3</div>\r
        <div class="step-text" id="step3-text">Click Generate to create certificates</div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <div class="section">\r
    <div class="section-title">Template</div>\r
    <div class="template-card empty" id="template-info">\r
      <div class="icon">\u{1F4CB}</div>\r
      <div>Select a frame in Figma to use as your certificate template</div>\r
    </div>\r
  </div>\r
\r
  <div class="section">\r
    <div class="section-title">Data Source</div>\r
\r
    <div class="input-group">\r
      <label>Upload CSV File</label>\r
      <div class="file-input-wrapper">\r
        <input type="file" id="csv-file" accept=".csv">\r
        <label for="csv-file" class="file-input-label" id="file-label">\r
          <span>\u{1F4C4}</span>\r
          <span id="file-label-text">Click to select CSV file</span>\r
        </label>\r
      </div>\r
      <div class="hint">\u{1F4A1} Export your data as CSV (comma-separated values)</div>\r
    </div>\r
  </div>\r
\r
  <button class="btn btn-primary" id="generate-btn" disabled>\r
    <span>\u2728</span>\r
    <span>Generate Certificates</span>\r
  </button>\r
\r
  <div class="progress-container" id="progress-container">\r
    <div class="progress-bar">\r
      <div class="progress-fill" id="progress-fill" style="width: 0%"></div>\r
    </div>\r
    <div class="progress-text" id="progress-text">Generating...</div>\r
  </div>\r
\r
  <div class="status" id="status"></div>\r
\r
  <script>\r
    // State\r
    let templateSelected = false;\r
    let placeholders = [];\r
    let csvData = null;\r
\r
    // DOM elements\r
    const templateInfo = document.getElementById('template-info');\r
    const csvFileInput = document.getElementById('csv-file');\r
    const fileLabel = document.getElementById('file-label');\r
    const fileLabelText = document.getElementById('file-label-text');\r
    const generateBtn = document.getElementById('generate-btn');\r
    const progressContainer = document.getElementById('progress-container');\r
    const progressFill = document.getElementById('progress-fill');\r
    const progressText = document.getElementById('progress-text');\r
    const statusDiv = document.getElementById('status');\r
    const step1 = document.getElementById('step1');\r
    const step1Text = document.getElementById('step1-text');\r
    const step2 = document.getElementById('step2');\r
    const step2Text = document.getElementById('step2-text');\r
    const step3 = document.getElementById('step3');\r
\r
    // File input handling\r
    csvFileInput.addEventListener('change', (e) => {\r
      const file = e.target.files[0];\r
      if (file) {\r
        if (!file.name.endsWith('.csv')) {\r
          showStatus('Please select a CSV file', 'error');\r
          return;\r
        }\r
\r
        fileLabelText.textContent = file.name;\r
        fileLabel.classList.add('has-file');\r
\r
        // Read and parse CSV\r
        const reader = new FileReader();\r
        reader.onload = (event) => {\r
          try {\r
            const csv = event.target.result;\r
            csvData = parseCsv(csv);\r
            updateButtonState();\r
            hideStatus();\r
          } catch (error) {\r
            showStatus('Error parsing CSV: ' + error.message, 'error');\r
            csvData = null;\r
            updateButtonState();\r
          }\r
        };\r
        reader.readAsText(file);\r
      } else {\r
        fileLabelText.textContent = 'Click to select CSV file';\r
        fileLabel.classList.remove('has-file');\r
        csvData = null;\r
        updateButtonState();\r
      }\r
    });\r
\r
    // Parse CSV to array of objects\r
    function parseCsv(csv) {\r
      const lines = csv.trim().split('\\n');\r
      if (lines.length < 2) {\r
        throw new Error('CSV must have headers and at least one data row');\r
      }\r
\r
      // Parse header row\r
      const headers = parseCSVLine(lines[0]).map(h => h.trim().toLowerCase());\r
\r
      // Parse data rows\r
      const data = [];\r
      for (let i = 1; i < lines.length; i++) {\r
        const values = parseCSVLine(lines[i]);\r
        const row = {};\r
        headers.forEach((header, index) => {\r
          row[header] = values[index] ? values[index].trim() : '';\r
        });\r
        data.push(row);\r
      }\r
\r
      return data;\r
    }\r
\r
    // Parse a single CSV line (handles quoted values)\r
    function parseCSVLine(line) {\r
      const result = [];\r
      let current = '';\r
      let inQuotes = false;\r
\r
      for (let i = 0; i < line.length; i++) {\r
        const char = line[i];\r
\r
        if (char === '"') {\r
          if (inQuotes && line[i + 1] === '"') {\r
            current += '"';\r
            i++;\r
          } else {\r
            inQuotes = !inQuotes;\r
          }\r
        } else if (char === ',' && !inQuotes) {\r
          result.push(current);\r
          current = '';\r
        } else {\r
          current += char;\r
        }\r
      }\r
\r
      result.push(current);\r
      return result;\r
    }\r
\r
    // Update button state\r
    function updateButtonState() {\r
      generateBtn.disabled = !templateSelected || csvData === null;\r
    }\r
\r
    // Show status message\r
    function showStatus(message, type) {\r
      statusDiv.textContent = message;\r
      statusDiv.className = 'status visible ' + type;\r
    }\r
\r
    // Hide status message\r
    function hideStatus() {\r
      statusDiv.className = 'status';\r
    }\r
\r
    // Event listeners\r
    generateBtn.addEventListener('click', () => {\r
      hideStatus();\r
\r
      if (!csvData) {\r
        showStatus('Please upload a CSV file first', 'error');\r
        return;\r
      }\r
\r
      // Use CSV file data directly\r
      generateBtn.disabled = true;\r
      generateBtn.innerHTML = '<span>\u23F3</span><span>Processing...</span>';\r
\r
      // Check for missing columns\r
      const dataColumns = Object.keys(csvData[0] || {});\r
      const missingColumns = placeholders.filter(p => !dataColumns.includes(p));\r
\r
      if (missingColumns.length > 0) {\r
        showStatus(\`Warning: Missing columns in CSV:\\n\${missingColumns.join(', ')}\`, 'error');\r
      }\r
\r
      // Show progress bar\r
      progressContainer.classList.add('visible');\r
      progressFill.style.width = '0%';\r
      progressText.textContent = \`Generating 0 / \${csvData.length}\`;\r
\r
      // Send data to plugin for generation\r
      parent.postMessage({ pluginMessage: { type: 'generate', data: csvData } }, '*');\r
    });\r
\r
    // Handle messages from plugin\r
    window.onmessage = (event) => {\r
      const msg = event.data.pluginMessage;\r
\r
      if (msg.type === 'template-selected') {\r
        templateSelected = true;\r
        placeholders = msg.placeholders;\r
\r
        let html = \`<div class="template-name">\u{1F4CB} \${msg.name}</div>\`;\r
        if (msg.placeholders.length > 0) {\r
          html += '<div class="placeholders">';\r
          msg.placeholders.forEach(p => {\r
            html += \`<span class="placeholder-tag">#\${p}</span>\`;\r
          });\r
          html += '</div>';\r
        }\r
        templateInfo.innerHTML = html;\r
        templateInfo.classList.remove('empty');\r
\r
        step1.classList.add('done');\r
        step1Text.classList.add('active');\r
        step2.classList.add('active');\r
        step2Text.classList.add('active');\r
\r
        updateButtonState();\r
      }\r
\r
      if (msg.type === 'no-template') {\r
        templateSelected = false;\r
        placeholders = [];\r
        templateInfo.innerHTML = \`\r
          <div class="icon">\u{1F4CB}</div>\r
          <div>Select a frame in Figma to use as your certificate template</div>\r
        \`;\r
        templateInfo.classList.add('empty');\r
\r
        step1.classList.remove('done');\r
        step1.classList.remove('active');\r
        step1Text.classList.remove('active');\r
        step2.classList.remove('active');\r
        step2Text.classList.remove('active');\r
\r
        updateButtonState();\r
      }\r
\r
      if (msg.type === 'progress') {\r
        const percent = (msg.current / msg.total) * 100;\r
        progressFill.style.width = percent + '%';\r
        progressText.textContent = \`Generating \${msg.current} / \${msg.total}\`;\r
      }\r
\r
      if (msg.type === 'complete') {\r
        progressContainer.classList.remove('visible');\r
        showStatus(\`\u2705 Successfully created \${msg.count} certificates!\`, 'success');\r
        generateBtn.disabled = false;\r
        generateBtn.innerHTML = '<span>\u2728</span><span>Generate Certificates</span>';\r
        step3.classList.add('done');\r
      }\r
\r
      if (msg.type === 'error') {\r
        progressContainer.classList.remove('visible');\r
        showStatus('\u274C ' + msg.error, 'error');\r
        generateBtn.disabled = false;\r
        generateBtn.innerHTML = '<span>\u2728</span><span>Generate Certificates</span>';\r
      }\r
    };\r
  <\/script>\r
</body>\r
\r
</html>`,{width:360,height:480,themeColors:!0});var i=null;function x(e){let t=new Set;function a(n){if(n.type==="TEXT"){let r=n.characters.match(/#[a-zA-Z_][a-zA-Z0-9_]*/g);r&&r.forEach(s=>t.add(s.substring(1).toLowerCase()))}"children"in n&&n.children.forEach(o=>a(o))}return a(e),Array.from(t)}function P(e){let t=e.match(/#[a-zA-Z_][a-zA-Z0-9_]*/g);return t?t.map(a=>a.substring(1).toLowerCase()):[]}function p(e,t){return m(this,null,function*(){if(e.type==="TEXT"){let a=e,n=a.characters;yield Promise.all(a.getRangeAllFontNames(0,a.characters.length).map(o=>figma.loadFontAsync(o)));for(let[o,r]of Object.entries(t)){let s=new RegExp(`#${o}`,"gi");n=n.replace(s,r)}a.characters=n}if("children"in e)for(let a of e.children)yield p(a,t)})}function R(e,t){let a=e;for(let[n,o]of Object.entries(t)){let r=new RegExp(`#${n}`,"gi");a=a.replace(r,o)}return a}function S(e){return m(this,null,function*(){if(!i){figma.ui.postMessage({type:"error",error:"No template frame selected"});return}let t=i.width,a=i.height,n=i.x+t+h,o=i.y,r=[];for(let s=0;s<e.length;s++){let l=e[s],c=Math.floor(s/d),g=s%d,w=n+c*(t+h),N=o+g*(a+h),f=i.clone();f.x=w,f.y=N,f.name=R(i.name,l),yield p(f,l),r.push(f),figma.ui.postMessage({type:"progress",current:s+1,total:e.length})}figma.currentPage.selection=r,figma.viewport.scrollAndZoomIntoView(r),figma.ui.postMessage({type:"complete",count:r.length})})}function u(){let e=figma.currentPage.selection;if(e.length===1&&e[0].type==="FRAME"){i=e[0];let t=x(i),a=P(i.name),n=[...new Set([...t,...a])];figma.ui.postMessage({type:"template-selected",name:i.name,placeholders:n})}else i=null,figma.ui.postMessage({type:"no-template"})}figma.on("selectionchange",u);u();figma.ui.onmessage=e=>m(y,null,function*(){if(e.type==="generate"){if(!e.data||e.data.length===0){figma.ui.postMessage({type:"error",error:"No data received"});return}try{yield S(e.data)}catch(t){figma.ui.postMessage({type:"error",error:t instanceof Error?t.message:"Unknown error occurred"})}}e.type==="cancel"&&figma.closePlugin()})});A();})();
