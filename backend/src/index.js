const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
//Declaro o uso de json na minha aplicação
app.use(express.json());
//Declaro que uso as rotas aqui
app.use(routes);

app.listen(3333);