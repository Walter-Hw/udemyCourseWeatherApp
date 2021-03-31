//jshint esversion:6

const express = require('express');
const https = require('https');
const { key } = require('./config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {

  const city = req.body.cityName;
  const key = process.env.API_KEY;
  const units = `metric`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}`;
  
  https.get(url, (response) => {

    console.log('response code is', response.statusCode);

    response.on('data', (data) => {

      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      
      res.write(`<h1 style="color:blue;text-align:center;">${city} Weather</h1>`);
      res.write(`<h2 style="color:blue;text-align:center;">Today is ${description}.`);
      res.write(`<img src=${imageURL}>`);
      res.write(`<h2 style="color:blue;text-align:center;">The temperature in ${city} is ${temp} celsius degree.</h2>`);
      res.send();
    });

  });
});

/*

*/

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});