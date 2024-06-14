const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serwowanie statycznych plików z katalogu "public"
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint do serwowania pliku cities.xml
app.get('/cities.xml', (req, res) => {
    res.sendFile(path.join(__dirname, 'cities.xml'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
