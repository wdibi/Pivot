const express = require('express');
const app = express();

app.use(express.json({ extended: false }));

const data = require('./data.json');
app.engine('.html', require('ejs').__express);
app.set('views', __dirname);
app.set('view engine', 'html');

app.use('/', (req, res) => {
  res.render('index', { data: JSON.stringify(data) });
});

module.exports = app;
