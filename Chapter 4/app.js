const express = require('express');
const app = express();

app.use(express.json());

const v1 = require('./routes/v1');
app.use('/v1', v1);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});