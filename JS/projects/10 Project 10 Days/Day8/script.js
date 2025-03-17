const limit = 200
const textInput = document.getElementById('textInput')
const charCount = document.getElementById('charCount')
const warningMessage = document.getElementById('warningMessage')
const uniqueWordsCount = document.getElementById('uniqueWordsCount')

function updateCharCount() {
    const charCountValue = textInput.value.length

    const wordsValue = textInput.value.split(" ") || []
    const uniqueWordsValue = [...new Set(wordsValue)]
    const index = uniqueWordsValue.indexOf(" ")
    uniqueWordsValue.splice(index, 1)

    charCount.innerText = `${charCountValue} / ${limit} characters`
    warningMessage.innerText = ''
    uniqueWordsCount.innerText = `${uniqueWordsValue.length} unique words`


    if (charCountValue < limit) {
        charCount.style.color = 'green'
    }
    else if (charCountValue === limit) {
        charCount.style.color = 'orange'
    }
    else {
        charCount.style.color = 'red'
        warningMessage.innerText = 'Character Limit Exceeded'
    }
}

textInput.addEventListener('input', updateCharCount)