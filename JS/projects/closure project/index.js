let displayDiv= document.getElementsByClassName('display')[0]

function createColorBtn(color){
    let colorBtn=document.createElement('button')
    colorBtn.type='button'   
    colorBtn.innerHTML=color.toUpperCase()
    displayDiv.appendChild(colorBtn)
    colorBtn.addEventListener('click',()=>{
        // change background-color
        document.body.style.backgroundColor=color
    })
    
}

document.getElementById('createBTN').addEventListener('click', (event) => {
    let colorList = document.getElementById('colorDropDownList');

    if (colorList.value.toString() !== 'myColor') {
        let color = colorList.value.toString().toLowerCase();
        createColorBtn(color);
    } else {
        // Create input field and submit button
        let myColorInput = document.createElement('input');
        let myColorBtn = document.createElement('button');

        myColorInput.type = 'text';
        myColorInput.id = 'myColorInput';  
        myColorInput.placeholder = 'Enter your color';
        myColorInput.required = true;

        myColorBtn.innerText = 'Create BTN';
        displayDiv.appendChild(myColorInput);
        displayDiv.appendChild(myColorBtn);

        // Fetching the user inputted color value
        myColorBtn.addEventListener('click', (e) => {
            e.stopPropagation();  // Prevent event bubbling up
            
            let myColor = myColorInput.value.toString().toLowerCase();
            if (myColor.trim() !== "") {
                createColorBtn(myColor);
            }
        });
    }
}, false);  
