let memory = null // Stores the last calculated value for MR
let inputSequence = '' // Store user input as a string

// Function to evaluate an expression
function evaluateExpression(expression) {
    try {
        // Replace custom operators with JavaScript operators
        let formattedExpression = expression
            .replace(/plus/g, '+')
            .replace(/minus/g, '-')
            .replace(/multiply/g, '*')
            .replace(/divide/g, '/')
            .replace(/percent/g, '/100')
            .replace(/sqrt(\d+(\.\d+)?)/g, 'Math.sqrt($1)')

        // Evaluate the expression safely
        let result = eval(formattedExpression)
        return isFinite(result) ? result : 'Error'
    } catch (error) {
        return 'Error'
    }
}

// Function to update calculator display
function updateScreen(value) {
    document.getElementById('screen').innerText = value
    // document.querySelector('#screen').appendChild(value)
}

// Event Listener for Button Clicks
document.addEventListener('click', (event) => {
    let button = event.target

    if (button.id === 'darkModeToggle') {
        // toggle dark-mode on/off
        document.getElementById('darkModeToggle').addEventListener('click', (event) => {
            if (document.body.classList.contains('dark-mode')) {
                document.body.classList.remove('dark-mode');
            } else {
                document.body.classList.add('dark-mode');
            }
        })
        return
    }

    if (button.hasAttribute('data-key')) {
        let key = button.getAttribute('data-key')

        if (key === 'on') {
            inputSequence = ''; // Reset input
            updateScreen('0');
        } else if (key === 'off') {
            inputSequence = ''; // Clear input
            updateScreen('');
            return;
        } else if (key === 'equals') {
            let result = evaluateExpression(inputSequence)
            updateScreen(result);
            inputSequence = result.toString(); // Store result for next calculation
        } else if (key === 'm-plus') {
            memory = evaluateExpression(inputSequence) // Store result in memory
        } else if (key === 'mr') {
            if (memory !== null) {
                inputSequence += memory.toString() // Append memory value
                updateScreen(inputSequence)
            }
        } else {
            // Append key to input sequence
            inputSequence += key === 'dot' ? '.' : key;
            updateScreen(inputSequence);
        }
    }
});

