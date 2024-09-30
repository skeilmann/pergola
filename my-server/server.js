const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files like HTML, CSS, JS
app.use(express.static('public'));

// POST route to simulate 'get_pergola'
app.post('/get_pergola', (req, res) => {
    const pergolaType = req.body.pergola; // Assume you send 'pergola' as a key

    // Simulate response based on pergola type
    let responseData = {
        html: '<h1>Default Pergola</h1>',
        height: 'Default Height',
        width: 'Default Width'
    };

    if (pergolaType === 'bioclimatica') {
        responseData = {
            html: '<h1>Bioclimatica Pergola</h1>',
            height: '3.5m',
            width: '5m',
            pergola: 'bioclimatica'
        };
    }

    res.json(responseData); // Send JSON response
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
