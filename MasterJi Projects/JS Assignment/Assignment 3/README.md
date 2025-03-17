# Quote of the Day - MasterJi Assignment 3

This project is a simple and elegant **Quote of the Day** web application that displays a random quote with a beautiful background image. You can generate new quotes, copy them to the clipboard, share them on X (formerly Twitter), and even download the background image.

---

## Application Features

1. **Random Quote Generation**
   - Fetches a random quote from an API and displays it on the screen.
   
2. **Dynamic Background Image**
   - Displays a beautiful, randomly selected background image from various categories.
   
3. **Copy to Clipboard**
   - Easily copy the quote to your clipboard with a single click.
   
4. **Share on X (formerly Twitter)**
   - Instantly share the quote on X with a pre-generated link and hashtag.

5. **Export Background Image**
   - Download the displayed background image directly to your device.

---

## Technologies Used

- **HTML:** Structuring the application.
- **CSS:** Styling and responsive design.
- **JavaScript:** Handling API calls and DOM manipulation.
- **Quote API:** Fetching random quotes.
- **Random Image API:** Generating random background images.

---

## Screenshots

### Home Page (with Random Quote and Background)
![Screenshot 2025-03-18 000755.png](<https://media-hosting.imagekit.io//b82880a0c6994dd3/Screenshot 2025-03-18 000755.png?Expires=1836844933&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=YkUFX7F1soJd-RmpcLGbPXbPeelowV6qGLPipXchZTqBK5ymIYFyP6CB7i4VTCfK4y-hEXNuA4TIj-YBxZGIcvHEclnOp05MOEieL3NqzLDB7RFtRMfkHOwUhGYCJSCnSWGbu1HPfoH0ctMX~UinvVaw6HxGBiU8X3I-BVu275JsmwLt3FUXrn9yEJOQFKkjX3nIzBJz1P4D-ypBl16IgDr9uKP6aQeaj7jTb8kxtJ-w3SjbgO82yLwIPZYQbQHNEtVMFyvK~KOnA-hiIKgeI7vbNVeejwjXMx2nCeFvYomgIJa6-vLchryzaAGqSq5AHQ2jN-xKq~iSloPrZZ2tBA__>)

### Share on X (Twitter)
![Screenshot 2025-03-18 000835.png](<https://media-hosting.imagekit.io//d3862c2b2664468a/Screenshot 2025-03-18 000835.png?Expires=1836844933&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=W5paVQIzvRt9zm-25HUxvpB~dIEo12VBp53ngkt7EvvxwqcxRNCig1bVnn4dxKPobFU-ZVUw8UV404WSyQKWbPZLyGSFwjpi8AsdlpQ0Kyab3cnZEGVMu46bAtasYhJW~MEdjBksvuA2EPNXUJTAWD0kPoz5ixaYAloLCMQxQM4RfWPE1Uq09BtOwQ1x0NVc2MCNlyOZkqwBzXmdeOwFLXe30ELATYbvxe2OYHQF51bsULYo1St2OMESPrvj4L6AOTVF32vNH2ImYygouCmuYkRxoSQIJyWbWyogDuYTloK~7uIbDl3fKk04F5CkSdtpecYChi0-RD8RC7zsnIp3Ig__>)


### Export Background Image
![Screenshot 2025-03-18 000908.png](<https://media-hosting.imagekit.io//9bfb016daeae4441/Screenshot 2025-03-18 000908.png?Expires=1836844933&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=bgiGnNE7gAOvZmDNKltfOERWnyb4m8wAhtnzV17yKKm~rFGD~82yPTgyFcbHon35b4uKVv3BIkap71AEfVnzFPBrS5Pja9-LwTkYBZHQsbNY6Xn8XKJM6DV2jWNp7Er-68Nv1s9eADa9vSgkpjF3ijsii3tJWO2LUv8JQM7WfEV9ELDDwcGn3J5GX1HWWjfAzL0~QuBCAWxcurn0Io3hxntnTiUfczF35~eCLx8fTceT-FQtytlqOGOocfbdVwH6xVHVOyFssKArPekbCs7~64kkHXc4TWx2LB0ksIn6J~HlYdhc2ETzMVAOSU8tN9dvrO67Gs8uaYlQHNfe8rdQcQ__>)


---

## Deployment Link

You can try the live version of the project here: [Quote of the Day - Live Demo](https://quote-display-masterji-assignment.vercel.app/)

---

## Installation Instructions

Follow these steps to run the project locally:

### Step 1: Clone the Repository
To get a copy of this project on your local machine, run:
```bash
git clone https://github.com/YourUsername/quote-of-the-day.git
```

### Step 2: Navigate to the Project Directory
After cloning the repository, move into the project directory:
```bash
cd quote-of-the-day
```

### Step 3: Install Dependencies (if any)
This project uses plain HTML, CSS, and JavaScript without any backend or package dependencies. So, no need to install any packages.

### Step 4: Open the Project in Your Preferred Code Editor
To make changes or explore the code, open the project in your favorite code editor:
```bash
code .
```
*(Replace `code .` with your editor's command, like `subl .` for Sublime Text or `atom .` for Atom)*

### Step 5: Run the Application
Since this is a simple frontend application, you can directly open the `index.html` file in your default browser:
```bash
open index.html
```
Or just double-click the file to open it in your browser.

---

## Usage Instructions

1. **Get a New Quote**
   - Click the **"Get New Quote"** button to fetch a random quote from the API.

2. **Copy Quote to Clipboard**
   - Click the **"Copy Quote To Clipboard"** button to copy the displayed quote.
   - A message will appear confirming the copy.

3. **Share on X (Twitter)**
   - Click the **"Share on X"** button to open a new tab with the pre-filled tweet containing the quote and hashtag.

4. **Export Background Image**
   - Click the **"Export Quote Image"** button to download the current background image to your device.

---

## Troubleshooting

If you encounter issues while running the application, try the following:

1. **Quote Not Displaying:**
   - Check your internet connection.
   - Make sure the API service is available.
   - Open the browser console (`F12` -> Console) to see any error messages.

2. **Image Not Loading:**
   - Sometimes the random image API might fail.
   - Try clicking **"Get New Quote"** to refresh both the quote and the background.

3. **Clipboard Copy Not Working:**
   - Some older browsers may not support the Clipboard API.
   - Try using a modern browser like Chrome or Firefox.

---

## How to Customize

1. **Change API Source:**
   - Modify the API endpoint in the `script.js` file to use a different quote API.

2. **Modify UI Design:**
   - Edit the `style.css` file to update colors, fonts, or layout.

3. **Add New Features:**
   - You can add more sharing options or support for multiple quote categories.

---
