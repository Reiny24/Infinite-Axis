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

function toggleLanguage() {
    const currentLanguage = document.documentElement.lang === 'en' ? 'ua' : 'en';
    document.documentElement.lang = currentLanguage;
    document.getElementById('motto').textContent = translations[currentLanguage].motto;
    document.getElementById('description').textContent = translations[currentLanguage].description;
    document.getElementById('service1').textContent = translations[currentLanguage].service1;
    document.getElementById('service2').textContent = translations[currentLanguage].service2;
    document.getElementById('service3').textContent = translations[currentLanguage].service3;
}

// Contact us page

const scriptURL = "https://script.google.com/macros/s/AKfycbwh83WW9u2uG_iKq1y8o7IkuyPGfvTZvkpQ1_C9HKR2dDodV90TJMN4Q8cp1mxGuKRz/exec"
const form = document.querySelector('#form')
const btn = document.querySelector('#submit')
const firstname = document.querySelector('#firstname')
const lastname = document.querySelector('#lastname')
const email = document.querySelector('#email')
const phone = document.querySelector('#phone')
const validation = [false, false, false, true]  // Validation flags

form.addEventListener('submit', e => {
    e.preventDefault()
    validateInputs()
    
    let post = true;
    for (let i in validation) {
        if (!validation[i]) {
            post = false
            break
        }
    }

    if (post) {
        btn.disabled = true
        btn.innerHTML = "Loading..."

        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
            .then(response => {
                btn.disabled = false
                btn.innerHTML = "Submit"
                alert('Success!', response) })
            .catch(error => {
                btn.disabled = false
                btn.innerHTML = "Submit"
                alert ('Error!', error.message)
            })
    }
})

const setError = (element, flag_index, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
    validation[flag_index] = false
}

const setSuccess = (element, flag_index) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
    validation[flag_index] = true
};

const isValidName = name => {
    const re = /^[A-Za-zА-Яа-я\s'-]+$/;
    return re.test(String(name).toLowerCase());
}

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const isValidPhone = phone => {
    const re = /^[+0-9]{10,15}$/;
    return re.test(String([phone]).toLowerCase());
}

const validateInputs = () => {
    const firstnameValue = firstname.value.trim()
    const lastnameValue = lastname.value.trim()
    const emailValue = email.value.trim()
    const phoneValue = phone.value.trim()

    if (firstnameValue === '') {
        setError(firstname, 0, 'First name is required');
    } else if (!isValidName(firstnameValue)) {
        setError(firstname, 0, 'Provide your valid first name');
    }
    else {
        setSuccess(firstname, 0)
    }

    if (lastnameValue === '') {
        setError(lastname, 1, 'Last name is required');
    } else if (!isValidName(lastnameValue)) {
        setError(lastname, 1, 'Provide your valid last name');
    }
    else {
        setSuccess(lastname, 1)
    }

    if(emailValue === '') {
        setError(email, 2, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 2, 'Provide a valid email address');
    } else {
        setSuccess(email, 2);
    }

    if(phoneValue !== '') {
        if (!isValidPhone(phoneValue)) {
            setError(phone, 3, 'Provide a valid phone');
        } else {
            setSuccess(phone, 3);
        }
    } else {
        const inputControl = phone.parentElement;
        const errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerText = '';
        inputControl.classList.remove('error')
        inputControl.classList.remove('success')
    }
}
