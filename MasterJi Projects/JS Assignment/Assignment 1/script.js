const happyBtn = document.getElementById('happyBtn');
const sadBtn = document.getElementById('sadBtn');
const neutralBtn = document.getElementById('neutralBtn');
const excitedBtn = document.getElementById('excitedBtn');
const dayViewBtn = document.getElementById('dayViewBtn');
const weekViewBtn = document.getElementById('weekViewBtn');
const monthViewBtn = document.getElementById('monthViewBtn');
const calendarViewBtn = document.getElementById('calendarViewBtn');
const moodLogContainer = document.getElementById('moodLogContainer');
const calendarContainer = document.getElementById('calendarContainer');

// Get current date in YYYY-MM-DD format
function getCurrentDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

// Save mood to localStorage
function saveMood(mood) {
    const currentDate = getCurrentDate();
    const moods = JSON.parse(localStorage.getItem('moods')) || {};
    moods[currentDate] = mood;
    localStorage.setItem('moods', JSON.stringify(moods));
    alert(`Mood for ${currentDate} saved as: ${mood}`);
}

// Load moods from localStorage
function loadMoods() {
    return JSON.parse(localStorage.getItem('moods')) || {};
}

// Display moods in different views
function displayMoods(view) {
    const moods = loadMoods();
    moodLogContainer.innerHTML = `<h2>${view} View</h2>`;
    let htmlContent = '';

    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000;

    for (const [date, mood] of Object.entries(moods)) {
        const moodDate = new Date(date);
        const differenceInDays = Math.floor((today - moodDate) / oneDay);

        if (
            (view === 'Day' && differenceInDays === 0) ||
            (view === 'Week' && differenceInDays < 7) ||
            (view === 'Month' && differenceInDays < 30)
        ) {
            htmlContent += `<p>${date}: ${mood}</p>`;
        }
    }

    moodLogContainer.innerHTML += htmlContent || '<p>No mood data available.</p>';
}

// Create a calendar view for the current month
function generateCalendar() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const moods = loadMoods();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

    let calendarHTML = `<h2>${today.toLocaleString('default', { month: 'long' })} ${currentYear}</h2>`;
    calendarHTML += `<div class="calendar-grid">`;

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let day of dayNames) {
        calendarHTML += `<div class="calendar-day-name">${day}</div>`;
    }

    for (let i = 0; i < firstDay; i++) {
        calendarHTML += `<div class="calendar-day empty"></div>`;
    }

    for (let day = 1; day <= totalDays; day++) {
        const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const mood = moods[date] || '';
        calendarHTML += `<div class="calendar-day">${day} ${mood}</div>`;
    }

    calendarHTML += `</div>`;
    calendarContainer.innerHTML = calendarHTML;
    calendarContainer.setAttribute('style', 'display: block')
}

// Event listeners
happyBtn.addEventListener('click', () => saveMood('😀'));
sadBtn.addEventListener('click', () => saveMood('😟'));
neutralBtn.addEventListener('click', () => saveMood('😐'));
excitedBtn.addEventListener('click', () => saveMood('🤩'));
dayViewBtn.addEventListener('click', () => displayMoods('Day'));
weekViewBtn.addEventListener('click', () => displayMoods('Week'));
monthViewBtn.addEventListener('click', () => displayMoods('Month'));
calendarViewBtn.addEventListener('click', generateCalendar);

displayMoods('Day');
