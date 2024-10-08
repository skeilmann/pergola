// Client-side validation functions

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
    console.log(errors);

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


function displayFieldErrors(errorFields) {
    // First, remove any previous error styling from all fields
    $('input, textarea, select').each(function () {
        const $field = $(this);
        const $parent = $field.parent();
        // Remove error classes and attributes
        $field.removeClass('invalid-field-child');
        $parent.removeClass('invalid-field-parent').removeAttr('data-error');
    });

    // Now, apply the error style only to fields that have errors
    for (const field in errorFields) {
        const errorMessage = errorFields[field];
        const $field = $('[name="' + field + '"]'); // Select the field by name attribute
        const $parent = $field.parent(); // Select the immediate parent element
        // Add the invalid class and set the data-error attribute for error styling
        $field.addClass('invalid-field-child');
        $parent.addClass('invalid-field-parent mb-4').attr('data-error', errorMessage);
    }
}

// Function to hide error message if a field passes validation
function hideError(field) {
    const $field = $('[name="' + field + '"]'); // Select the field by name attribute
    const $parent = $field.parent(); // Select the immediate parent element
    // Remove the error classes and error message
    $field.removeClass('invalid-field-child');
    $parent.removeClass('invalid-field-parent mb-4').removeAttr('data-error');
}

// Make the validateForm function available globally
window.validateForm = validateForm;