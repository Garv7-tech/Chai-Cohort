const videoCardContainer = document.querySelector('.video-container')
const getVideos = document.querySelector('.btn-get-videos')
const searchBar = document.getElementById('searchBar')

let videoDataArray = [] // Store fetched videos for filtering

// Fetch videos from the API
async function fetchVideos() {
    const url = 'https://api.freeapi.app/api/v1/public/youtube/videos?page=1&limit=10&query=javascript&sortBy=keep%2520one%253A%2520mostLiked%2520%257C%2520mostViewed%2520%257C%2520latest%2520%257C%2520oldest'
    const options = { method: 'GET', headers: { accept: 'application/json' } }

    try {
        const response = await fetch(url, options)
        const videoData = await response.json()
        videoDataArray = videoData.data.data // Store videos for later filtering
        displayVideos(videoDataArray) // Display all videos initially
    } catch (error) {
        console.error(error)
    }
}

// Display the videos on the screen
function displayVideos(videos) {
    videoCardContainer.innerHTML = '' // Clear previous videos
    videos.forEach((video) => {
        const thumbnail = video.items.snippet.thumbnails.medium
        const videoTitle = video.items.snippet.title
        const channelName = video.items.snippet.channelTitle

        const videoElement = document.createElement('div')
        videoElement.classList.add('video-element')
        videoElement.innerHTML = `
            <div class="video-card">
                <div class="thumbnail-wrapper">
                    <a href="https://www.youtube.com/watch?v=${video.items.id}" target='_blank' title='${videoTitle}'>
                        <img src="${thumbnail.url}" alt="Video Thumbnail" width="${thumbnail.width}">
                    </a>
                </div>
                <div class="content-wrapper">
                    ${videoTitle} - Channel: ${channelName}
                </div>
            </div>`;
        videoCardContainer.appendChild(videoElement)
    });
}

// Event listener to load videos when the button is clicked
getVideos.addEventListener('click', fetchVideos)

// Event listener for the search bar to filter videos
searchBar.addEventListener('input', () => {
    const searchQuery = searchBar.value.trim().toLowerCase() // Get user input and convert to lowercase
    const filteredVideos = videoDataArray.filter((video) => 
        video.items.snippet.title.toLowerCase().includes(searchQuery) // Filter videos based on title
    )
    displayVideos(filteredVideos); // Display filtered videos
})
