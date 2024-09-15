// Function to load the language file
function loadLanguage(lang) {
    fetch(`https://oinktech.github.io/lang/${lang}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            document.querySelectorAll('[data-key]').forEach(element => {
                const key = element.getAttribute('data-key');
                if (data[key]) {
                    element.textContent = data[key];
                }
            });

            // Change text direction if needed
            const rtlLanguages = ['ar', 'he', 'fa']; // Add any RTL languages here
            if (rtlLanguages.includes(lang)) {
                document.documentElement.setAttribute('dir', 'rtl');
            } else {
                document.documentElement.removeAttribute('dir');
            }
        })
        .catch(error => {
            console.error('Error loading language file:', error);
            // Optionally, you can reload the default language or show an error message
            loadLanguage('en'); // Default to English if there is an error
        });
}

// Function to change the language based on selection
function changeLanguage() {
    const lang = document.getElementById('language-selector').value;
    loadLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
}

// Function to determine language based on IP
function detectLanguageByIP() {
    fetch('https://ipinfo.io?token=68f4994f66fa4a') // Replace YOUR_TOKEN with a valid token
        .then(response => response.json())
        .then(data => {
            const country = data.country; // Get the country code (e.g., 'US', 'JP', etc.)
            let lang;

            // Map country codes to languages
            switch (country) {
                case 'TW':
                case 'HK':
                    lang = 'zh-Hant'; // Traditional Chinese for Taiwan/Hong Kong
                    break;
                case 'CN':
                    lang = 'zh-Hans'; // Simplified Chinese for China
                    break;
                case 'JP':
                    lang = 'ja'; // Japanese for Japan
                    break;
                // Add more cases as needed
                default:
                    lang = 'en'; // Default to English
                    break;
            }

            // Load the detected or preferred language
            const preferredLanguage = localStorage.getItem('preferredLanguage') || lang;
            loadLanguage(preferredLanguage);
            document.getElementById('language-selector').value = preferredLanguage;
        })
        .catch(error => {
            console.error('Error detecting location by IP:', error);
            // Fallback to default language
            const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en';
            loadLanguage(preferredLanguage);
            document.getElementById('language-selector').value = preferredLanguage;
        });
}

// Initialize language on page load
window.onload = function() {
    detectLanguageByIP(); // Detect language based on IP

    // Add event listener for language change
    document.getElementById('language-selector').addEventListener('change', changeLanguage);
}
