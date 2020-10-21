const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let jugador = {
    nombre:'',
    apellido: '',
    score:''
   };

let respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
};

app.get('/', function (req, res) {
    respuesta = {
        error: true,
        codigo: 200,
        mensaje: 'Punto de inicio'
       };
    res.send(respuesta);
});

app.get('/hola', function (req, res) {
    res.send('[GET]Saludos desde express');
});

app.listen(3000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});


app.post('/gamer', function (req, res){
    var nombrej = req.body.nombre || '';
    var apellidoj = req.body.apellido || '';
    var scorej = req.body.score || '';

    if( nombrej == '' || apellidoj == '' || scorej == '')
    {
        respuesta =
        {
            error: true,
            codigo: 502,
            mensaje: 'El campo nombre, apellido y score son requeridos'
        };
    }
    else
    {
        if(jugador.nombre == nombrej && jugador.apellido == apellidoj)
        {
            respuesta = 
            {
                error: true,
                codigo: 503,
                mensaje: 'El jugador ya fue creado previamente'
            };   
        }
        else
        {
            jugador = {
            nombre: nombrej,
            apellido: apellidoj,
            score: scorej
            };
            respuesta =
            {
                error: false,
                codigo: 200,
                mensaje: "Jugador creado",
                resposta: jugador
            };
        }
    }
    res.send(respuesta);
});