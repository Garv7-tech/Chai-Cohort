async function generateQuote() {
    
    const url = 'https://api.freeapi.app/api/v1/public/quotes/quote/random';
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    try {
        console.log('inside generateQuote function')
        const quoteResponse = await fetch(url,options)
        console.log(quoteResponse)
        const quote = await quoteResponse.json()
        console.log(quote)
        document.getElementById('quoteDisplay').innerText = `${quote.data.content} - ${quote.data.author}`
    } catch (error) {
        console.error(error)
    }
}

document.getElementById('generateButton').addEventListener('click',generateQuote)