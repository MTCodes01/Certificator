# Certificator - Figma Certificate Generator Plugin

A Figma plugin that automatically generates certificates from a template frame using data from Google Sheets.

## Features

- 📋 **Template-based**: Select any frame as your certificate template
- 🔗 **Google Sheets Integration**: Import data directly from public Google Sheets
- ✨ **Placeholder System**: Use `#column-name` syntax for dynamic text replacement
- 📐 **Smart Layout**: Generated certificates are arranged in columns automatically
- 🌙 **Dark Theme UI**: Clean, modern interface that matches Figma's aesthetic

## Installation

### For Development

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the plugin:
   ```bash
   npm run build
   ```
4. In Figma Desktop, go to **Plugins > Development > Import plugin from manifest**
5. Select the `manifest.json` file from this directory

### For Production

Coming soon to Figma Community!

## Usage

### 1. Create Your Template

Design a certificate frame in Figma with placeholder text:

- Use `#name` where you want the recipient's name
- Use `#date` for the date
- Use `#course`, `#email`, or any other column name from your sheet
- The frame name can also include placeholders (e.g., `#name Certificate`)

**Example placeholders:**
```
This certificate is awarded to #name
for completing #course on #date
```

### 2. Prepare Your Google Sheet

1. Create a Google Sheet with your data
2. Use column headers that match your placeholders (e.g., `name`, `date`, `course`)
3. **Important**: Share the sheet publicly ("Anyone with the link can view")

| name | date | course |
|------|------|--------|
| John Doe | January 2026 | Web Development |
| Jane Smith | January 2026 | UI Design |

### 3. Generate Certificates

1. Select your template frame in Figma
2. Run the plugin (**Plugins > Certificator**)
3. Paste your Google Sheet URL
4. Click **Generate Certificates**

The plugin will create a new certificate for each row in your sheet, positioned in columns next to your template.

## Project Structure

```
Certificator/
├── manifest.json      # Figma plugin manifest
├── package.json       # Node.js dependencies
├── tsconfig.json      # TypeScript configuration
├── build.js           # Build script
├── src/
│   ├── code.ts        # Main plugin logic
│   └── ui.html        # Plugin UI
└── dist/              # Built files (generated)
    ├── code.js
    └── ui.html
```

## Development

Watch mode for development:
```bash
npm run watch
```

Build for production:
```bash
npm run build
```

## Limitations

- Google Sheet must be publicly accessible
- Uses a free CORS proxy for fetching sheet data
- Only the first sheet in the spreadsheet is used

## License

MIT
