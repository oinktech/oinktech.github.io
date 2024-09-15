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
            loadLanguage('en'); // Default to English
        });
}

function changeLanguage() {
    const lang = document.getElementById('language-selector').value;
    loadLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
}

// Initialize language on page load
window.onload = function() {
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en'; // Set default to English
    loadLanguage(preferredLanguage);
    document.getElementById('language-selector').value = preferredLanguage;

    // Add event listener for language change
    document.getElementById('language-selector').addEventListener('change', changeLanguage);
}
