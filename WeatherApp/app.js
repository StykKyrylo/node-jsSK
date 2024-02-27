const express = require('express');
const hbs = require('hbs');
const fetch = require('node-fetch');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('main.hbs');
});

app.get('/weather', (req, res) => {
    res.render('weather.hbs');
});

app.get('/weather(/:city?)', async (req, res) => {
    let city = req.params.city;

    if (!city) {
        city = req.query.city;
    }

    if (!city) {
        res.render('400');
        return;
    }

    const key = 'e81661c6ac741eb35a6a5acf48e8552d';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    let response = await fetch(url);
    let weather = await response.json();

    res.render('weather', {city, weather});
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000');
});