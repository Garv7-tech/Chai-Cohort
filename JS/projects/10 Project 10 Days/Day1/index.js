const timeElement = document.getElementById('time')
const dateElement = document.getElementById('date')

function updateClock() {
    const now = new Date()
    const hours = (now.getHours() % 12) || 12
    const minutes = now.getMinutes().toString().padStart(2,"0")
    // const minutes = (now.getMinutes() < 10 ) ? `0${now.getMinutes()}` : `${now.getMinutes()}`
    const seconds = now.getSeconds().toString().padStart(2,"0")
    const ampm = ( now.getHours() >= 12 ) ? "PM" : "AM"

    timeElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`

    const options= {
        weekday : "long",
        year : "numeric",
        month : "long",
        day : "numeric"
    }

    dateElement.textContent = now.toLocaleString(undefined,options)
}

setInterval(updateClock,1000) // increments the clock's time every one second

updateClock() // on rendering the page the clock shows the current time instead of "00:00:00 AM"