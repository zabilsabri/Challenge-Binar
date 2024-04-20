const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const YAML = require('yaml');
const fs = require('fs');

app.use(express.json());
app.use(cors());

const file = fs.readFileSync('./api-docs.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const v1 = require('./routes/v1');
app.use('/v1', v1);

// 500 error handler
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        status: false,
        message: err.message,
        data: null
    });
});

// 404 error handler
app.use((req, res, next) => {
    res.status(404).json({
        status: false,
        message: `are you lost? ${req.method} ${req.url} is not registered!`,
        data: null
    });
});

module.exports = app;