document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const nameInput = document.getElementById('last_name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('description');

    // Add blur event listeners to input fields for validation
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    messageInput.addEventListener('blur', validateMessage);

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission

        // Get form input values
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        // Reset previous error messages
        document.querySelectorAll('.error').forEach(error => error.textContent = '');

        // Validate name, email, and message
        validateName();
        validateEmail();
        validateMessage();

        // If all validations pass, submit the form
        if (!document.querySelector('.error')) {
            alert('Form submitted successfully!');
            form.reset(); // Reset the form fields
        }
    });

    function validateName() {
        const nameError = document.getElementById('nameError');
        const nameValue = nameInput.value.trim();
    
        // Regular expression to check if the name contains two words
        const namePattern = /^[a-zA-Z]+ [a-zA-Z]+$/;
    
        if (!namePattern.test(nameValue)) {
            nameError.textContent = 'Name should have of 2 words.';
        } else {
            nameError.textContent = '';
        }
    }

    function validateMessage() {
        const messageError = document.getElementById('messageError');
        const messageValue = messageInput.value.trim();

        if (messageValue.length > 200) {
            messageError.textContent = 'Message should not exceed 200 characters.';
        } else {
            messageError.textContent = '';
        }
    }

    function validateEmail() {
        const emailError = document.getElementById('emailError');
        const emailValue = emailInput.value.trim();

        if (!emailValue.includes('@') || !(emailValue.endsWith('.com') || emailValue.endsWith('.in'))) {
            emailError.textContent = 'Please enter a valid email address.';
        } else {
            emailError.textContent = '';
        }
    }
});
