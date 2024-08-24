document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById("signinForm");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");


    function clearForm() {
        email.value = '';
        password.value = '';
    }

    clearForm();

    form.addEventListener('submit', function(e) {
        if (!checkInput()) {
            e.preventDefault();
        } else {
            localStorage.setItem("email", email.value.trim());
            localStorage.setItem("password", password.value.trim());
            alert("Your email and password are saved in local storage");
        }
    });

    function checkInput() {
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();
        let success = true;

        if (emailValue === '') {
            success = false;
            setError(email, emailError, 'Email cannot be blank');
        } else if (!isEmail(emailValue)) {
            success = false;
            setError(email, emailError, 'Not a valid email');
        } else {
            setSuccess(email, emailError);
        }

        if (passwordValue === '') {
            success = false;
            setError(password, passwordError, 'Password cannot be blank');
        } else {
            setSuccess(password, passwordError);
             window.location.href='../../Ecommerce/index.html'
        }

        return success;
        
    }
    
    function setError(input, errorElement, message) {
        errorElement.innerText = message;
        input.classList.add('error');
        input.classList.remove('success');
    }

    function setSuccess(input, errorElement) {
        errorElement.innerText = '';
        input.classList.add('success');
        input.classList.remove('error');
    }

    function isEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});