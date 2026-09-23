const languages = {
    ar: { dir: 'rtl', lang: 'ar' },
    en: { dir: 'ltr', lang: 'en' },
    tr: { dir: 'ltr', lang: 'tr' }
};

let currentLang = 'ar';

document.addEventListener('DOMContentLoaded', () => {
    initializeLanguage();
    initializeCategories();
    setLanguage('ar');
    updateActiveLanguageButton('ar');
});

function initializeLanguage() {
    document.querySelectorAll('.lang-btn').forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            setLanguage(lang);
            updateActiveLanguageButton(lang);
        });
    });
}

function setLanguage(lang) {
    if (!languages[lang]) return;

    currentLang = lang;
    const { dir, lang: htmlLang } = languages[lang];

    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', htmlLang);
    document.body.setAttribute('dir', dir);

    updateContent(lang);
}

function updateContent(lang) {
    document.querySelectorAll('[data-ar], [data-en], [data-tr]').forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });

    document.body.style.animation = 'none';
    requestAnimationFrame(() => {
        document.body.style.animation = 'fadeIn 0.3s ease';
    });
}

function updateActiveLanguageButton(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
}

function initializeCategories() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuSections = document.querySelectorAll('.menu-section');
    const menuContent = document.querySelector('.menu-content');
    const menuNav = document.querySelector('.menu-nav');
    const backBtn = document.querySelector('.back-btn');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');

            menuNav.style.display = 'none';
            menuContent.classList.add('active');

            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            menuSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === category) {
                    section.classList.add('active');
                    animateMenuItems(section);
                }
            });

            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            menuContent.classList.remove('active');
            menuNav.style.display = '';

            menuSections.forEach(section => section.classList.remove('active'));
            categoryButtons.forEach(btn => btn.classList.remove('active'));

            resetMenuItemAnimations();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

function animateMenuItems(section) {
    const items = section.querySelectorAll('.menu-item');
    items.forEach(item => item.classList.remove('visible'));

    items.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.05}s`;
        requestAnimationFrame(() => {
            item.classList.add('visible');
        });
    });
}

function resetMenuItemAnimations() {
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('visible');
        item.style.transitionDelay = '';
    });
}

document.addEventListener('keydown', (e) => {
    if (!(e.ctrlKey || e.metaKey)) return;

    const langMap = { '1': 'ar', '2': 'en', '3': 'tr' };
    if (langMap[e.key]) {
        e.preventDefault();
        setLanguage(langMap[e.key]);
        updateActiveLanguageButton(langMap[e.key]);
    }
});

if ('ontouchstart' in window) {
    document.querySelectorAll('button, a.phone-item').forEach(el => {
        el.addEventListener('touchstart', () => el.classList.add('touch-active'), { passive: true });
        el.addEventListener('touchend', () => el.classList.remove('touch-active'), { passive: true });
    });
}
