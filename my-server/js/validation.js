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

    if (!validateName(formData.nume)) {
        errors.nume = "Numele este obligatoriu.";
    }

    if (!validateEmail(formData.c_email)) {
        errors.c_email = "Adresa de email nu este validă.";
    }

    if (!validatePhone(formData.c_telefon)) {
        errors.c_telefon = "Numărul de telefon nu este valid.";
    }

    if (!validateField(formData.gdpr)) {
        errors.gdpr = "Trebuie să acceptați prelucrarea datelor personale";
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