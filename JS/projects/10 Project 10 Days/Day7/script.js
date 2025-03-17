const inputText = document.getElementById('inputText')
const checkPalindromeButton = document.getElementById('checkPalindromeButton')
const resultMessage = document.getElementById('resultMessage')

checkPalindromeButton.addEventListener('click', checkPalindrome)

function checkPalindrome() {
    const text = inputText.value.toLowerCase().replace(/[^a-z0-9]/g, '')
    const reverseText = text.split("").reverse().join("")

    if (text === reverseText){
        resultMessage.textContent = `${inputText.value} is a palindrome`
        resultMessage.style.color='green'
    }else{
        resultMessage.textContent = `${inputText.value} is NOT a palindrome`
        resultMessage.style.color='red'
    }
}