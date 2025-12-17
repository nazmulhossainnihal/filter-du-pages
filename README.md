# Facebook Page Filter Chrome Extension

![Facebook Page Filter Icon](icon500.png)

This Chrome extension filters out Facebook posts from pages containing specific keywords related to Dhaka University.

## Filtered Keywords

The extension will hide posts from pages with these keywords in their names:
- DU
- Dhaka University
- ঢাবি
- ঢাকা বিশ্ববিদ্যালয়

## Installation Instructions

### Step 1: Download the Extension

1. Go to the [Releases section](https://github.com/nazmulhossainnihal/filter-du-pages/releases) on GitHub

2. Download the latest `du-page-filter.zip` file

3. Extract the ZIP file to a folder on your computer

### Step 2: Install in Chrome

1. Open Chrome and go to: [chrome://extensions/](chrome://extensions/)

2. Enable "Developer mode" (toggle in the top-right corner)

3. Click "Load unpacked"

4. Select the extracted folder containing the extension files

5. The extension should now be installed and active!

## How It Works

- The extension runs automatically on Facebook
- It monitors the page for posts
- When it detects a post from a page with any of the filtered keywords, it hides that post
- Posts are filtered in real-time as you scroll

## Customizing Keywords

To add or remove keywords:

1. Open the `content.js` file
2. Find the `FILTER_KEYWORDS` array at the top
3. Add or remove keywords as needed
4. Save the file
5. Go to `chrome://extensions/` and click the refresh icon on the extension

## Troubleshooting

- **Extension not working?** Make sure you've added the icon files
- **Some posts not filtered?** Facebook's layout changes frequently. The extension uses multiple selectors to find page names.
- **False positives?** Consider making your keywords more specific to avoid filtering unintended posts

## Privacy

This extension:
- Runs only on Facebook
- Does NOT collect any data
- Does NOT send any information anywhere
- Works entirely locally in your browser