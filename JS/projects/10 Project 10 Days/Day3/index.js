const colorInput = document.getElementById('colorInput')
const colorCode = document.getElementById('colorCode')
const copyButton = document.getElementById('copyButton')
const complementaryContainer = document.getElementById('complementaryContainer')
const saveColorButton = document.getElementById('saveColorButton')
const favoritesContainer = document.getElementById('favoritesContainer')

colorInput.addEventListener('input', () => {
    const selectedColor = colorInput.value

    updateColorDisplay(selectedColor)
    showComplementaryColor(selectedColor)
})

function updateColorDisplay(color) {
    colorCode.textContent = color
    colorCode.style.color = color
}

function showComplementaryColor(color) {
    const complementaryColors = getComplementaryColor(color)
    complementaryContainer.innerHTML = "" // clear previous color
    complementaryColors.forEach((compColor) => {
        const colorBox = document.createElement('div')
        colorBox.classList.add('color-box')
        colorBox.style.backgroundColor = compColor
        complementaryContainer.appendChild(colorBox)
    })
}

function getComplementaryColor(color) {
    if (!color || !color.startsWith('#')) return ['#000000'];
    const base = parseInt(color.slice(1), 16)
    const compliment = (0xFFFFFF ^ base).toString(16).padStart(6, '0')
    return [`#${compliment}`]
}

copyButton.addEventListener('click', () => {
    navigator.clipboard
        .writeText(colorCode.textContent)
        .then(() => alert('Color Code Copied'))
        .catch(e => console.error('Failed to copy', e))

})

function addFavoriteColor(color) {
    const colorBox = document.createElement('div');
    colorBox.classList.add('color-box');
    colorBox.style.backgroundColor = color;
    colorBox.title = color; // optional
    favoritesContainer.appendChild(colorBox);
}

saveColorButton.addEventListener('click', () => {
    const color = colorCode.textContent;
    addFavoriteColor(color);
    addFavoriteColor(getComplementaryColor(color)[0]);
})

