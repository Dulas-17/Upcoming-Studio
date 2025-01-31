//SECTION MANAGEMENT 
        function scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }

        function showSection(sectionId) {
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => section.classList.remove('active'));
            const activeSection = document.getElementById(sectionId);
            if (activeSection) {
                activeSection.classList.add('active');
            }
        }



//MUSIC PLAYER HANDLER 
    // Get all music players
    const musicPlayers = document.querySelectorAll('.music-player');

    // Loop through each music player
    musicPlayers.forEach((musicPlayer) => {
      const audio = musicPlayer.querySelector('.audio');
      const playPauseBtn = musicPlayer.querySelector('.play-pause-btn');
      const progressBar = musicPlayer.querySelector('.progress-bar');
      const currentTimeDisplay = musicPlayer.querySelector('.current-time');
      const durationDisplay = musicPlayer.querySelector('.duration');

      // Add event listener to the play/pause button
      playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
          audio.play();
          playPauseBtn.textContent = 'Pause';
        }  else {
          audio.pause();
          playPauseBtn.textContent = 'Play';
        }
      });

      // Update the progress bar
      audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;
        const minutes = Math.floor(audio.currentTime / 60);
        const seconds = Math.floor(audio.currentTime % 60);
        currentTimeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      });

      // Update the duration display
      audio.addEventListener('loadedmetadata', () => {
        const minutes = Math.floor(audio.duration / 60);
        const seconds = Math.floor(audio.duration % 60);
        durationDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      });

      // Add event listener to the progress bar
      progressBar.addEventListener('input', () => {
        const progress = progressBar.value;
        audio.currentTime = (progress / 100) * audio.duration;
      });
    });




//AUDIO AND VIDEO MANAGEMENT 
// Get all audio and video elements
const mediaElements = document.querySelectorAll('audio, video');

// Add an event listener to each media element
mediaElements.forEach((element) => {
  element.addEventListener('play', () => {
    // Pause all other media elements when this one starts playing
    mediaElements.forEach((otherElement) => {
      if (otherElement !== element) {
        otherElement.pause();
      }
    });
  });
});

//CONTROLSLIST
document.addEventListener('DOMContentLoaded', () => {
  const mediaElements = document.querySelectorAll('audio, video');
  mediaElements.forEach((element) => {
    element.setAttribute('controlsList', 'nodownload');
  });
});



//AUTO VEDIO PLAY
const videos = document.querySelectorAll('video');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.play();
    } else {
      entry.target.pause();
    }
  });
}, {
  threshold: 0.8,
});

videos.forEach((video) => {
  observer.observe(video);
});



//DEV TOOLS 
// Disable right-click context menu
document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

// Detect DevTools opening
(function() {
    let devtools = false;
    const element = new Image();
    Object.defineProperty(element, 'id', {
        get: function() {
            devtools = true;
            throw new Error('DevTools detected!');
        }
    });
    setInterval(() => {
        devtools = false;
        console.log(element);
        if (devtools) {
            alert('Developer Tools are not allowed on this platform.');
        }
    }, 1000);
})();

// Disable F12 and other key combinations
document.addEventListener('keydown', (event) => {
    if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'I')) {
        event.preventDefault();
        alert('Developer Tools are disabled.');
    }
});



//LOADING ANIMATIONS MANAGEMENT 
// Wait for the page to finish loading
document.addEventListener("DOMContentLoaded", () => {
  // Get all audio and video elements on the page
  const mediaElements = document.querySelectorAll("audio, video");

  // Set the preload attribute to "auto" for each media element
  mediaElements.forEach((element) => {
    element.preload = "auto"; // Load media after page load
  });
});

// Show loader when page is loading
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.loader');
 
  // Hide loader and show main content when page has finished loading
  loader.classList.add('loaded');
  mainContent.style.display = 'block';
});

// Optional: Add event listener to detect when loader is fully hidden
document.addEventListener('transitionend', (e) => {
  if (e.target.classList.contains('loader')) {
    // Remove loader from DOM after it's fully hidden
    e.target.remove();
  }
});



//SEARCH FUNCTION 
// Filter Functionality
        function filterItems(containerClass, query) {
            const items = document.querySelectorAll(`.${containerClass}`);
            query = query.toLowerCase();

            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(query)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }




//FONT 
// Function to handle font scaling
function adjustFontScaling() {
  const rootElement = document.documentElement;
  const defaultFontSize = 16; // Default font size in pixels
  const currentFontSize = parseFloat(
    window.getComputedStyle(rootElement).fontSize
  );
  
  // Ensure layout doesn't break
  if (currentFontSize > defaultFontSize) {
    rootElement.style.fontSize = `${defaultFontSize}px`;
  }
}

// Monitor for changes in the font size
window.addEventListener("resize", adjustFontScaling);
window.addEventListener("load", adjustFontScaling);



//MEMORY ASSISTANCE 
// Check device memory and adjust resource scaling
function adjustResourceScaling() {
    const memory = navigator.deviceMemory || 1; // Default to 1 if unsupported

    // Dynamic resource scaling based on memory
    if (memory > 4) {
        console.log("High-memory device detected. Enabling high-performance mode.");
        document.body.classList.add('high-performance'); // Add class for high-res animations, resources
    } else {
        console.log("Low-memory device detected. Enabling optimized mode.");
        document.body.classList.add('low-performance'); // Add class for optimized settings
    }
}



//LAZY LOADING 
// Lazy loading for images, audio, and video
function lazyLoadMedia() {
    const lazyMedia = document.querySelectorAll('img[data-src], audio[data-src], video[data-src]');

    // Observer for lazy loading
    const lazyObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;

                // Replace data-src with src
                if (element.tagName === "IMG" || element.tagName === "VIDEO" || element.tagName === "AUDIO") {
                    element.src = element.dataset.src;
                }

                // Load additional data if available
                if (element.tagName === "VIDEO" || element.tagName === "AUDIO") {
                    element.load();
                }

                // Stop observing the loaded element
                observer.unobserve(element);
            }
        });
    });

    // Observe all lazy media
    lazyMedia.forEach(media => lazyObserver.observe(media));
}

// Call the functions on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    adjustResourceScaling();
    lazyLoadMedia();
});




//REFRESH-RATE 
// Get the device's refresh rate
const refreshRate = window.screen.refreshRate || 60;

// Adjust animation based on refresh rate
if (refreshRate >= 90) {
  // High refresh rate, enable smooth animations
  document.body.classList.add('high-refresh-rate');
} else {
  // Low refresh rate, reduce animation complexity
  document.body.classList.add('low-refresh-rate');
}



//CACHE 
// Function to set data with an expiration time
function setDataWithExpiry(key, value, expiryTimeInHours = 1) {
    const now = new Date();
    const expiry = now.getTime() + expiryTimeInHours * 60 * 60 * 1000; // 1 hour in milliseconds
    const data = {
        value: value,
        expiry: expiry
    };
    localStorage.setItem(key, JSON.stringify(data));
}

// Function to get data, check expiry, and delete if expired
function getDataWithExpiry(key) {
    const dataString = localStorage.getItem(key);
    if (!dataString) {
        return null; // Data doesn't exist
    }

    const data = JSON.parse(dataString);
    const now = new Date();

    // Check if data is expired
    if (now.getTime() > data.expiry) {
        localStorage.removeItem(key); // Remove expired data
        return null; // Data is expired
    }

    return data.value; // Data is still valid
}

// Example usage
setDataWithExpiry('exampleKey', 'exampleValue');

// Retrieve data later
const storedValue = getDataWithExpiry('exampleKey');
if (storedValue) {
    console.log('Data:', storedValue); // Valid data
} else {
    console.log('Data has expired or does not exist.');
}

