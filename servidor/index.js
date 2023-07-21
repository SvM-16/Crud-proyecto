const express = require('express')
const conectarDB = require('./config/db');
const cors = require("cors")

const app = express();

conectarDB();
app.use(cors())

app.use(express.json())

app.use('/api/produstos', require('./routes/producto'))

app.listen(4000,() => {
    console.log('iniciando server')
})