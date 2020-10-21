const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let jugador = {
    posicion:'',
    alias: '', 
    nombre:'',
    apellido: '',
    score:''
   };
let jugadores = [{
    posicio: 3,
    alies: "jperez",
    nom: "Jose",
    congnom: "Perez",
    score: 1000
},
{
    posicio: 1,
    alies: "jsanz",
    nom: "Juan",
    congnom: "Sanz",
    score: 950
},
{
    posicio: 2,
    alies: "mgutierrez",
    nom: "Maria",
    congnom: "Gutierrez",
    score: 850
}
]
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

app.get('/ranking', function (req, res){


    jugadores.sort((a,b) => (a.score < b.score ? 1: -1));
    for (i=0;i<jugadores.length;i++)
    {
        jugadores[i].posicio=i+1;
    }
    res.send(jugadores);

});

app.get('/jugadores'(alies), function (req, res){
    res.send(jugadores);
});