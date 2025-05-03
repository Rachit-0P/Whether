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
    const shareButton = document.getElementById('share-prank');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = themeToggleBtn.querySelector('i');
    const welcomeModal = document.getElementById('welcome-modal');
    const closeModal = document.querySelector('.close-modal');
    const startButton = document.getElementById('start-button');

    // Show welcome modal for first-time visitors
    if (!localStorage.getItem('visitedBefore')) {
        welcomeModal.classList.add('show');
    }

    closeModal.addEventListener('click', () => {
        welcomeModal.classList.remove('show');
        localStorage.setItem('visitedBefore', 'true');
    });

    startButton.addEventListener('click', () => {
        welcomeModal.classList.remove('show');
        localStorage.setItem('visitedBefore', 'true');
        cityInput.focus();
    });

    // Check for saved theme preference or use dark mode as default
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        // Only use light mode if explicitly set
    } else {
        // Use dark mode as default
        document.body.classList.add('dark-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark'); // Save the preference
    }

    themeToggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Update icon
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

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
        "Running advanced weather algorithms...",
        "Triangulating geospatial coordinates...",
        "Consulting with meteorologists...",
        "Calibrating barometric sensors...",
        "Analyzing humidity patterns...",
        "Establishing connection with NOAA...",
        "Interpreting Doppler radar data...",
        "Calculating UV index values...",
        "Mapping regional weather fronts...",
        "Accessing historical weather databases...",
        "Predicting microclimatic variations..."
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
        
        // Update loading message faster - every 1 second instead of 2
        const messageInterval = setInterval(() => {
            loadingMessage.textContent = loadingMessages[messageIndex];
            messageIndex = (messageIndex + 1) % loadingMessages.length;
        }, 1000); // Reduced from 2000ms to 1000ms
        
        // Update progress bar much faster
        const progressInterval = setInterval(() => {
            progress += 5; // Increased from 2 to 5 (2.5x faster)
            progressFill.style.width = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(progressInterval);
                clearInterval(messageInterval);
                
                // Show prank immediately
                showPrankResult(city);
            }
        }, 50); // Reduced from 100ms to 50ms (2x faster)
    });
    
    function showPrankResult(city) {
        loadingSection.classList.add('hidden');
        weatherResult.classList.remove('hidden');
        
        // Choose random prank response
        const randomResponse = prankResponses[Math.floor(Math.random() * prankResponses.length)];
        
        prankMessage.textContent = `Weather in ${city}: ${randomResponse.message}`;
        prankImage.src = randomResponse.image;
        
        // Add confetti effect
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
    
    tryAgainButton.addEventListener('click', function() {
        weatherResult.classList.add('hidden');
        cityInput.value = '';
        cityInput.focus();
    });

    shareButton.addEventListener('click', async function() {
        const city = cityInput.value;
        const shareText = `I just checked the weather in ${city} using BeyondWhether and got pranked! Try it yourself!`;
        const shareUrl = window.location.href;
        
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'WeatherNow Prank',
                    text: shareText,
                    url: shareUrl
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            // Fallback for browsers that don't support Web Share API
            prompt('Copy this link to share:', `${shareText} ${shareUrl}`);
        }
    });
});