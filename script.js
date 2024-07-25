    /**
     * Select the form element from the DOM.
     * @type {HTMLFormElement}
     */
    const form = document.querySelector('#form');

    /**
     * Select the username input field from the DOM.
     * @type {HTMLInputElement}
     */
    const username = document.querySelector('#username');

    /**
     * Select the email input field from the DOM.
     * @type {HTMLInputElement}
     */
    const email = document.querySelector('#email');

    /**
     * Select the password input field from the DOM.
     * @type {HTMLInputElement}
     */
    const password = document.querySelector('#password');

    /**
     * Select the confirm password input field from the DOM.
     * @type {HTMLInputElement}
     */
    const cpassword = document.querySelector('#cpassword');

    /**
     * Add an event listener to the form to handle the submit event.
     * @param {Event} e - The submit event.
     */
    form.addEventListener('submit', (e) => {
        // Prevent form submission if inputs are not valid
        if (!validateInputs()) {
            e.preventDefault();
        }
    });

    /**
     * Validate the input fields.
     * @returns {boolean} - Returns true if all inputs are valid, false otherwise.
     */
    function validateInputs() {
        const usernameVal = username.value.trim();
        const emailVal = email.value.trim();
        const passwordVal = password.value.trim();
        const cpasswordVal = cpassword.value.trim();
        let success = true;

        if (usernameVal === '') {
            success = false;
            setError(username, 'Username is required');
        } else {
            setSuccess(username);
        }

        if (emailVal === '') {
            success = false;
            setError(email, 'Email is required');
        } else if (!validateEmail(emailVal)) {
            success = false;
            setError(email, 'Please enter a valid email');
        } else {
            setSuccess(email);
        }

        if (passwordVal === '') {
            success = false;
            setError(password, 'Password is required');
        } else if (passwordVal.length < 8) {
            success = false;
            setError(password, 'Password must be at least 8 characters long');
        } else {
            setSuccess(password);
        }

        if (cpasswordVal === '') {
            success = false;
            setError(cpassword, 'Confirm password is required');
        } else if (cpasswordVal !== passwordVal) {
            success = false;
            setError(cpassword, 'Passwords do not match');
        } else {
            setSuccess(cpassword);
        }

        return success;
    }

    /**
     * Display an error message for the specified input element.
     * @param {HTMLElement} element - The input element.
     * @param {string} message - The error message to display.
     */
    function setError(element, message) {
        const inputGroup = element.parentElement;
        const errorElement = inputGroup.querySelector('.error');

        errorElement.innerText = message;
        inputGroup.classList.add('error');
        inputGroup.classList.remove('success');
    }

    /**
     * Display a success message for the specified input element.
     * @param {HTMLElement} element - The input element.
     */
    function setSuccess(element) {
        const inputGroup = element.parentElement;
        const errorElement = inputGroup.querySelector('.error');

        errorElement.innerText = '';
        inputGroup.classList.add('success');
        inputGroup.classList.remove('error');
    }

    /**
     * Validate the email format.
     * @param {string} email - The email address to validate.
     * @returns {boolean} - Returns true if the email is valid, false otherwise.
     */
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
