const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { validateForm } = require('./js/validation');
const { sendConfirmationEmail } = require('./js/emailSender');

const app = express();
const port = 3000;

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files like HTML, CSS, JS
app.use(express.static('public'));

// Function to save form data to JSON file
function saveFormData(data) {
    const filePath = path.join(__dirname, 'formData.json');
    let formData = [];

    // Read existing data if file exists
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        formData = JSON.parse(fileContent);
        // // Ensure formData is an array
        // if (!Array.isArray(formData)) {
        //     formData = [];
        // }
    }

    // Limit to the latest 100 entries
    if (formData.length > 3) {
        formData.shift(); // Remove the oldest entry (first one in the array)
    }

    // Add new form submission with timestamp
    formData.push({
        id: Date.now(),
        timestamp: new Date().toISOString(),
        data: data
    });
    console.log('Form data to save:', formData);
    // Write updated data back to file
    fs.writeFileSync(filePath, JSON.stringify(formData, null, 2));
}

// POST route to handle form submissions
app.post('/submit-form', async (req, res) => {
    let responseData = {};

    try {
        const validationResult = validateForm(req.body);

        if (!validationResult.isValid) {
            // Handle validation errors
            responseData = { errors: validationResult.errors };
            return res.status(400).json({ errors: validationResult.errors });
        }

        // try {
        //     await sendConfirmationEmail(req.body.c_email, req.body.nume);
        // } catch (emailError) {
        //     console.error('Error sending confirmation email:', emailError);
        //     // We'll continue even if email sending fails
        // }

        responseData = { message: 'Form data saved successfully', data: req.body }; // Include any additional info if needed


        // Send JSON response back to the client
        res.status(200).json({ message: 'Form data saved successfully (code 200)' });
    } catch (error) {
        console.error('Error processing form submission:', error);
        res.status(500).json({ message: 'Error (500) processing form submission' });
    }

    saveFormData(req.body);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
