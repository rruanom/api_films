require('dotenv').config();

const bodyParser= require('body-parser')
const express = require('express')
const app = express()
const port = 3000

// Middlewares
const error404 = require('./middlewares/error404');
const morgan = require('./middlewares/morgan');

// Logger
app.use(morgan(':method :host :status :param[id] - :response-time ms :body'));

//habilito carpetas public para archivos estaticos
app.use(express.static('public'));

//Para detectar en el body un string de una film
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
const filmsRoutes = require("./routes/films.routes")

// Habilito recepción de JSON en servidor
app.use(express.json()); 

// Habilito recepción de formulario
app.use(express.urlencoded({extended: true})); 

//rutas vistas
app.get('/', function(req, res){
  res.render('home.pug');
});

app.get('/film/:title', filmsRoutes)

//Configuracion de vistas PUG
app.set('view engine', 'pug')
app.set('views','./views');

// Rutas
//WEB
app.post("/film", filmsRoutes)

// Para rutas no existentes
app.use('*',error404);

app.listen(port, () => {
  console.log(`Funcionando en: http://localhost:${port}`)
})