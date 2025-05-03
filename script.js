document.addEventListener('DOMContentLoaded', function() {
    const weatherForm = document.getElementById('weather-form');
    const cityInput = document.getElementById('city-input');
    const loadingSection = document.getElementById('loading-section');
    const weatherResult = document.getElementById('weather-result');
    const loadingMessage = document.getElementById('loading-message');
    const progressFill = document.getElementById('progress-fill');
    const prankMessage = document.getElementById('prank-message');
    const prankImage = document.getElementById('prank-image');
    const tryAgainButton = document.getElementById('try-again');

    // Loading messages to cycle through
    const loadingMessages = [
        "Connecting to weather satellites...",
        "Analyzing atmospheric conditions...",
        "Checking cloud formations...",
        "Measuring wind speeds...",
        "Calculating precipitation probability...",
        "Connecting to local weather stations...",
        "Processing meteorological data...",
        "Downloading temperature readings...",
        "Syncing with weather radar...",
        "Running advanced weather algorithms..."
    ];

    // Prank responses
    const prankResponses = [
       
        // Short funny responses
        {
            message: "Just look outside, duh! 🙄",
            image: "https://media.giphy.com/media/3o7TKQ8kAP0f9X5PoY/giphy.gif"
        },
        {
            message: "Windows exist. Use them! 👉",
            image: "https://media.giphy.com/media/l4FGuhL4U2WyjdkaY/giphy.gif"
        },
        {
            message: "Weather app? Use eyes! 👀",
            image: "https://media.giphy.com/media/tJeGZumxDB01q/giphy.gif"
        },
        {
            message: "Turn around. See window? 🪟",
            image: "https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif"
        },
        {
            message: "Google 'what are windows' 🤦‍♂️",
            image: "https://media.giphy.com/media/WrNfErHio7ZAc/giphy.gif"
        },
        {
            message: "Nice weather app... NOT! 😎",
            image: "https://media.giphy.com/media/kDIhIpwRRIi3K/giphy.gif"
        },
        {
            message: "Touch grass. Check weather. ☀️",
            image: "https://media.giphy.com/media/l4pTfx2qLszoacZRS/giphy.gif"
        },
        {
            message: "Weather.exe has stopped working 💀",
            image: "https://media.giphy.com/media/j9GASQ5ocrIRicnmyq/giphy.gif"
        }
    ];

    weatherForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const city = cityInput.value;
        if (!city) return;
        
        // Hide result and show loading
        weatherResult.classList.add('hidden');
        loadingSection.classList.remove('hidden');
        
        // Reset progress bar
        progressFill.style.width = '0%';
        
        let messageIndex = 0;
        let progress = 0;
        
        // Update loading message every 2 seconds
        const messageInterval = setInterval(() => {
            loadingMessage.textContent = loadingMessages[messageIndex];
            messageIndex = (messageIndex + 1) % loadingMessages.length;
        }, 2000);
        
        // Update progress bar
        const progressInterval = setInterval(() => {
            progress += 2;
            progressFill.style.width = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(progressInterval);
                clearInterval(messageInterval);
                
                // Show prank after loading completes
                setTimeout(() => {
                    showPrankResult(city);
                }, 500);
            }
        }, 100);
    });
    
    function showPrankResult(city) {
        loadingSection.classList.add('hidden');
        weatherResult.classList.remove('hidden');
        
        // Choose random prank response
        const randomResponse = prankResponses[Math.floor(Math.random() * prankResponses.length)];
        
        prankMessage.textContent = `Weather in ${city}: ${randomResponse.message}`;
        prankImage.src = randomResponse.image;
    }
    
    tryAgainButton.addEventListener('click', function() {
        weatherResult.classList.add('hidden');
        cityInput.value = '';
        cityInput.focus();
    });
});