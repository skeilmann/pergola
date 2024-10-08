// Server-side validation functions

function validateName(name) {
    return name.trim().length > 0;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;  // Assumes a 10-digit phone number
    return phoneRegex.test(phone);
}

function validateField(checkfield) {
    return checkfield === 'on'; // Ensure the checkbox is checked
}

function validateForm(formData) {
    const errors = {};
    // Function to hide error messages
    function hideError(fieldId) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none'; // Hide error message
        }
    }

    if (!validateName(formData.nume)) {
        errors.nume = "Numele este obligatoriu.";
    } else {
        hideError('nume');
    }

    if (!validateEmail(formData.c_email)) {
        errors.c_email = "Adresa de email nu este validă.";
    } else {
        hideError('c_email');
    }

    if (!validatePhone(formData.c_telefon)) {
        errors.c_telefon = "Numărul de telefon nu este valid.";
    } else {
        hideError('c_telefon');
    }

    if (!validateField(formData.gdpr)) {
        errors.gdpr = "Trebuie să acceptați prelucrarea datelor personale";
    } else {
        hideError('gdpr');
    }

    // Add more validations as needed

    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}



module.exports = {
    validateForm
};