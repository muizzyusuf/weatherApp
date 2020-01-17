const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const request = require('request');

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.render("index.ejs");
});

app.post('/', function (req, res) {
    let long = req.body.long;
    let lat = req.body.lat;
    let url = `https://api.darksky.net/forecast/*****************************/${lat},${long}`;
    
  
    request(url, function (err, response, body) {
      if(err){
        res.render('index.ejs', {weather: null, error: 'Error, please try again'});
        
      } else {
        let weather = JSON.parse(body)
        if(weather == undefined){
          res.render('index.ejs', {weather: null, error: 'Error, please try again'});
          
        } else {
          let weatherText = `It's ${weather.currently.temperature} degrees!`;
          res.render('index.ejs', {weather: weatherText, error: null});
        }
      }
    });
})



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
