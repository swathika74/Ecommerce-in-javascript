document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    
    function clearForm() {
        username.value = '';
        email.value = '';
        password.value = '';
        confirmPassword.value = '';
    }

    clearForm();

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (checkInputs()) {
            const userData = {
                username: username.value.trim(),
                email: email.value.trim(),
                password: password.value.trim(),
                confirmPassword: confirmPassword.value.trim()
            };
            localStorage.setItem("userData", JSON.stringify(userData));
            alert("Your data is saved in local storage");
        }
    });

    function checkInputs() {
        const usernameValue = username.value.trim();
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();
        const confirmPasswordValue = confirmPassword.value.trim();
        let success = true;

        if (usernameValue === '') {
            setErrorFor(username, 'Username cannot be blank');
            success = false;
        } else {
            setSuccessFor(username);
        }

        if (emailValue === '') {
            setErrorFor(email, 'Email cannot be blank');
            success = false;
        } else if (!isEmail(emailValue)) {
            setErrorFor(email, 'Not a valid email');
            success = false;
        } else {
            setSuccessFor(email);
        }

        if (passwordValue === '') {
            setErrorFor(password, 'Password cannot be blank');
            success = false;
        } else {
            setSuccessFor(password);
        }

        if (confirmPasswordValue === '') {
            setErrorFor(confirmPassword, 'Confirm Password cannot be blank');
            success = false;
        } else if (passwordValue !== confirmPasswordValue) {
            setErrorFor(confirmPassword, 'Passwords do not match');
            success = false;
        } else {
            setSuccessFor(confirmPassword);
             window.location.href='../../loginform/html/signin.html'
        }

        return success;

    }
    
    function setErrorFor(input, message) {
        const formControl = input.parentElement;
        const small = formControl.querySelector('.error-message');
        small.innerText = message;
        formControl.className = 'form-control error';
    }

    function setSuccessFor(input) {
        const formControl = input.parentElement;
        formControl.className = 'form-control success';
    }

    function isEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});