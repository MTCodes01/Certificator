# Certificator

A Figma plugin that automatically generates certificates from a template frame using CSV data.

## Features

- **Template-Based Generation**: Select any Figma frame as your certificate template
- **Dynamic Placeholders**: Use `#columnname` syntax in text layers and frame names to insert data
- **CSV File Upload**: Upload a CSV file with your data directly in the plugin
- **Batch Processing**: Generate hundreds of certificates in seconds
- **Smart Layout**: Automatically arranges generated certificates in columns
- **Progress Tracking**: Real-time progress indicator during generation

## How to Use

### 1. Prepare Your Template

Create a frame in Figma that will serve as your certificate template. Add text layers with placeholders using the `#` syntax:

- `#name` - Will be replaced with the "name" column from your CSV
- `#date` - Will be replaced with the "date" column
- `#course` - Will be replaced with the "course" column
- etc.

You can also use placeholders in the frame name itself!

### 2. Prepare Your Data

Create a CSV file with your data. The first row should contain column headers (lowercase, matching your placeholders):

```csv
name,date,course
John Doe,2024-01-15,Web Development
Jane Smith,2024-01-16,Data Science
```

### 3. Generate Certificates

1. Select your template frame in Figma
2. Run the Certificator plugin (Plugins → Certificator)
3. Upload your CSV file
4. Click "Generate Certificates"

The plugin will create individual certificate frames for each row in your CSV, automatically replacing all placeholders with the corresponding data.

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
4. In Figma Desktop:
   - Go to Plugins → Development → Import plugin from manifest
   - Select the `manifest.json` file from this repository

### For Production

*(Coming soon to Figma Community)*

## Development

### Project Structure

```
Certificator/
├── src/
│   ├── code.ts          # Main plugin logic
│   └── ui.html          # Plugin UI
├── dist/                # Built files
├── manifest.json        # Figma plugin manifest
├── build.js            # Build script
├── package.json        # Dependencies
└── tsconfig.json       # TypeScript config
```

### Build Commands

- `npm run build` - Build the plugin once
- `npm run watch` - Watch for changes and rebuild automatically

### Tech Stack

- **TypeScript** - Main plugin code
- **HTML/CSS/JavaScript** - Plugin UI
- **esbuild** - Fast bundler
- **Figma Plugin API** - For interacting with Figma

## CSV Format Tips

- First row must contain column headers
- Column names should be lowercase and match your placeholders (without the `#`)
- Values can contain spaces, special characters, etc.
- Quoted values are supported for complex data

## Placeholder Examples

**Text Layer Examples:**
- `Certificate of Completion for #name`
- `Awarded on #date`
- `Course: #course`

**Frame Name Examples:**
- `Certificate - #name`
- `#course - #date`

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
