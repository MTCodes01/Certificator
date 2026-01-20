# Alternative: Manual CSV Upload

Since Google Sheets API access from Figma plugins has CORS restrictions, here's a simple workaround:

## Option 1: Publish to Web (Recommended)

1. In your Google Sheet, go to **File → Share → Publish to web**
2. Choose **Comma-separated values (.csv)** format
3. Click **Publish**
4. Copy the published URL (it will look like: `https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv`)
5. Use this URL in the plugin

This published URL works without CORS issues!

## Option 2: Use the Plugin with Manual CSV

If the above doesn't work, you can:

1. Download your Google Sheet as CSV (File → Download → CSV)
2. I can modify the plugin to accept CSV file upload instead of a URL

Let me know which option you'd prefer!
