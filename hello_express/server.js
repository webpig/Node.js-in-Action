const express = require('express');
const app = new express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Express web app on localhost: 3000');
});