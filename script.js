function showSidebar() {
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
}

function hideSidebar() {
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
}

// Theme Switcher
const checkbox = document.getElementById("checkbox")
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark")
})

// Language Switcher
const translations = {
    en: {
        motto: "Your Motto Here",
        description: "Short description about your company or services.",
        service1: "Service 1",
        service2: "Service 2",
        service3: "Service 3"
    },
    ua: {
        motto: "Ваш Девіз Тут",
        description: "Короткий опис вашої компанії або послуг.",
        service1: "Послуга 1",
        service2: "Послуга 2",
        service3: "Послуга 3"
    }
};

function toggleLanguage() {
    const currentLanguage = document.documentElement.lang === 'en' ? 'ua' : 'en';
    document.documentElement.lang = currentLanguage;
    document.getElementById('motto').textContent = translations[currentLanguage].motto;
    document.getElementById('description').textContent = translations[currentLanguage].description;
    document.getElementById('service1').textContent = translations[currentLanguage].service1;
    document.getElementById('service2').textContent = translations[currentLanguage].service2;
    document.getElementById('service3').textContent = translations[currentLanguage].service3;
}


