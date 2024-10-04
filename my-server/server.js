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
    let formData = {};

    // Read existing data if file exists
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        formData = JSON.parse(fileContent);
    }

    // Add new form submission with timestamp
    formData.push({
        timestamp: new Date().toISOString(),
        data: data
    });

    // Write updated data back to file
    fs.writeFileSync(filePath, JSON.stringify(formData, null, 2));
}

// POST route to handle form submissions
app.post('/submit-form', async (req, res) => {
    const formData = req.body;
    console.log('Received form data:', formData); // Log the received data

    const filePath = path.join(__dirname, 'formData.json');
    fs.writeFileSync(filePath, JSON.stringify(responseData, null, 2));

    // Send JSON response back to the client
    res.json(responseData);

    try {
        const validationResult = validateForm(req.body);

        if (!validationResult.isValid) {
            return res.status(400).json({ errors: validationResult.errors });
        }

        saveFormData(req.body);

        try {
            await sendConfirmationEmail(req.body.c_email, req.body.nume);
        } catch (emailError) {
            console.error('Error sending confirmation email:', emailError);
            // We'll continue even if email sending fails
        }

        res.status(200).json({ message: 'Form data saved successfully' });
    } catch (error) {
        console.error('Error processing form submission:', error);
        res.status(500).json({ message: 'Error processing form submission' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
