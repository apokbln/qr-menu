// Language and direction management
const languages = {
    ar: { dir: 'rtl', lang: 'ar' },
    en: { dir: 'ltr', lang: 'en' },
    tr: { dir: 'ltr', lang: 'tr' }
};

// Current language (default: Arabic)
let currentLang = 'ar';

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeLanguage();
    initializeCategories();
    setLanguage('ar'); // Set Arabic as default
});

// Initialize language functionality
function initializeLanguage() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
            
            // Update active button
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Set language and update content
function setLanguage(lang) {
    currentLang = lang;
    const html = document.documentElement;
    const body = document.body;
    
    // Set direction and language
    html.setAttribute('dir', languages[lang].dir);
    html.setAttribute('lang', languages[lang].lang);
    body.setAttribute('dir', languages[lang].dir);
    
    // Update all translatable elements
    updateContent(lang);
}

// Update all content based on selected language
function updateContent(lang) {
    const translatableElements = document.querySelectorAll('[data-ar], [data-en], [data-tr]');
    
    translatableElements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });
    
    // Add smooth transition effect
    document.body.style.opacity = '0.8';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 150);
}

// Initialize category navigation
function initializeCategories() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuSections = document.querySelectorAll('.menu-section');
    const menuContent = document.querySelector('.menu-content');
    const menuNav = document.querySelector('.menu-nav');
    const backBtn = document.querySelector('.back-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Hide categories and show menu content
            menuNav.style.display = 'none';
            menuContent.classList.add('active');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding section
            menuSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === category) {
                    section.classList.add('active');
                }
            });
            
            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
    
    // Back button functionality
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            // Hide menu content and show categories
            menuContent.classList.remove('active');
            menuNav.style.display = 'grid';
            
            // Remove active state from all sections
            menuSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Remove active state from all category buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Add smooth scrolling for better UX
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Add loading animation for better UX
function showLoading() {
    document.body.classList.add('loading');
}

function hideLoading() {
    document.body.classList.remove('loading');
}

// Add touch support for mobile devices
if ('ontouchstart' in window) {
    // Add touch feedback for buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Language switching with keyboard
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                setLanguage('ar');
                updateActiveLanguageButton('ar');
                break;
            case '2':
                e.preventDefault();
                setLanguage('en');
                updateActiveLanguageButton('en');
                break;
            case '3':
                e.preventDefault();
                setLanguage('tr');
                updateActiveLanguageButton('tr');
                break;
        }
    }
});

// Update active language button
function updateActiveLanguageButton(lang) {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
}

// Add animation for menu items
function animateMenuItems() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('animate-in');
    });
}

// Add CSS animation class
const style = document.createElement('style');
style.textContent = `
    .menu-item {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s ease;
    }
    
    .menu-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .menu-section.active {
        animation: slideIn 0.5s ease-out;
    }
`;
document.head.appendChild(style);

// Initialize animations when sections become active
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('active')) {
            animateMenuItems();
        }
    });
}, { threshold: 0.1 });

// Observe menu sections
document.querySelectorAll('.menu-section').forEach(section => {
    observer.observe(section);
});

// Add local storage for language preference
function saveLanguagePreference(lang) {
    localStorage.setItem('preferredLanguage', lang);
}

function loadLanguagePreference() {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && languages[savedLang]) {
        setLanguage(savedLang);
        updateActiveLanguageButton(savedLang);
    }
}

// Load saved language preference on page load
document.addEventListener('DOMContentLoaded', function() {
    loadLanguagePreference();
});

// Save language preference when changed
function setLanguage(lang) {
    currentLang = lang;
    const html = document.documentElement;
    const body = document.body;
    
    html.setAttribute('dir', languages[lang].dir);
    html.setAttribute('lang', languages[lang].lang);
    body.setAttribute('dir', languages[lang].dir);
    
    updateContent(lang);
    saveLanguagePreference(lang);
}

// Add print styles for QR code usage
const printStyle = document.createElement('style');
printStyle.textContent = `
    @media print {
        body {
            background: white !important;
        }
        
        .container {
            box-shadow: none !important;
            margin: 0 !important;
            padding: 10px !important;
        }
        
        .language-selector {
            display: none !important;
        }
        
        .menu-nav {
            display: none !important;
        }
        
        .menu-section {
            display: block !important;
            page-break-inside: avoid;
        }
        
        .menu-item {
            page-break-inside: avoid;
        }
    }
`;
document.head.appendChild(printStyle); 