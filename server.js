const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(__dirname + '/public'));

// Parse request bodies as JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve the index.html file when the root URL is requested
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Handle form submissions
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;

    // Validate the form data
    if (!name || !email || !message) {
        return res.status(400).send('Please fill out all fields');
    }

    // Write the form data to a text file
    fs.appendFile(
        'data.txt', `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n##################################################################`
        , (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error writing file');
            } else {
                res.status(200).send('Message sent successfully');
            }
        });
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});