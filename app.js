const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    console.log('Server is running on port 4000');
    res.send('Hello World');
})
app.listen(4000);