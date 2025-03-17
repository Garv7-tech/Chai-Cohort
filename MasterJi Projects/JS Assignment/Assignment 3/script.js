const categories = [
    'backgrounds', 'fashion', 'nature', 'science', 'education',
    'feelings', 'health', 'people', 'places', 'animals',
    'industry', 'computer', 'food', 'sports', 'transportation',
    'travel', 'buildings', 'business', 'music'
];
const category = categories[Math.floor(Math.random() * categories.length)]


const quoteContent = document.getElementById('quoteContent')
const newQuoteBtn = document.getElementById('newQuote')
const copyQuoteBtn = document.getElementById('copyQuote')
const shareXBtn = document.getElementById('shareX')
const exportBtn = document.getElementById('export')
const message = document.getElementById('message')



async function generateAndDisplayQuote() {
    const url = 'https://api.freeapi.app/api/v1/public/quotes/quote/random'
    const options = { method: 'GET', headers: { accept: 'application/json' } }

    try {
        const quoteResponse = await fetch(url, options);
        const quoteData = await quoteResponse.json();

        quoteContent.textContent = `${quoteData.data.content} ~ ${quoteData.data.author}`
        getRandomBgImage(quoteData.data.content)
    } catch (error) {
        console.error(error);
    }

}

function copyQuoteToClipBoard() {
    const quote = quoteContent.innerText
    window.navigator.clipboard.writeText(quote)
    .then(() => {
        message.textContent = "Copied To Clipboard"
    })
    .catch((error) => {
        message.textContent = error
    })
}

function sharePostToX() {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quoteContent.innerText)}&hashtags=chaicode`
    window.open(url, '_blank')
}

function getRandomBgImage() {
    
    // Remove the previous background image if it exists
    const existingImg = document.querySelector('.random-bg-image')
    if (existingImg) {
        existingImg.remove()
    }
    
    const img = document.createElement('img')
    img.src = `https://api.algobook.info/v1/randomimage?category=${category}&random=${Math.random()}`  // Force new image
    img.classList.add('random-bg-image')
    
    
    
    // Add the image to the DOM
    document.body.appendChild(img)
    
    img.onerror = () => {
        console.error('Failed to load image')
    };
    
}

async function exportImage() {
    try {
        const response = await fetch(`https://api.algobook.info/v1/randomimage?category=${category}`)
        
        if (!response.ok) {
            throw new Error('Image download failed')
        }
        
        const blob = await response.blob()
        const fileObject = new File([blob], 'random-quote-bg-image.jpg', { type: blob.type })
        
        // Create a temporary anchor element to trigger download
        const anchorTag = document.createElement('a')
        anchorTag.href = URL.createObjectURL(fileObject)
        anchorTag.download = fileObject.name
        
        // Trigger the download
        document.body.appendChild(anchorTag)
        anchorTag.click()

        // Clean up
        URL.revokeObjectURL(anchorTag.href)
        document.body.removeChild(anchorTag)
        
        alert('Background Image downloaded successfully')
    } catch (error) {
        console.error('Error downloading image:', error)
        alert('Failed to download image')
    }
    
}

newQuoteBtn.addEventListener('click', generateAndDisplayQuote)
copyQuoteBtn.addEventListener('click', copyQuoteToClipBoard)
shareXBtn.addEventListener('click', sharePostToX)
exportBtn.addEventListener('click', exportImage)

