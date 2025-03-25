const input = document.getElementById('input')
const preview = document.getElementById('preview')
const copyBtn = document.getElementById('copyBtn')
const clearBtn = document.getElementById('clearBtn')
const tooltip = document.getElementById('tooltip')

function takeInput() {
    const inputText = input.value
    preview.innerHTML = marked.parse(inputText)
}

function clearInput() {
    input.value = ""
    preview.innerHTML = ""
}

function copyInput() {
    const inputText = input.value

    navigator.clipboard.writeText(inputText).then(() => {
        // Show tooltip
        tooltip.style.visibility = 'visible'
        tooltip.style.opacity = '1'

        // Hide tooltip after 1.5 seconds
        setTimeout(() => {
            tooltip.style.opacity = '0'
            tooltip.style.visibility = 'hidden'
        }, 1500)
    }).catch(err => {
        console.error('Failed to copy text:', err)
    })
}

// Insert 2 Spaces on Tab Press
function insertTabSpaces(event) {
    if (event.key === "Tab") {
        event.preventDefault();

        let textarea = event.target;
        let start = textarea.selectionStart;
        let end = textarea.selectionEnd;

        let spaces = "  "; // Two spaces
        textarea.value = textarea.value.substring(0, start) + spaces + textarea.value.substring(end);

        // Move cursor after spaces
        textarea.selectionStart = textarea.selectionEnd = start + spaces.length;
    }
}




