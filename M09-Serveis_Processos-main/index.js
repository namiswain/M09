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

app.get('/jugadores/:user', function (req, res){
    respuesta.error = true;
        for(i= 0; i < jugadores.length; i++)
        {
            if(jugadores[i].alies == req.params.user) 
            {
                res.send(jugadores[i]);
                respuesta.error = false;
            }
        }
        if(respuesta.error)
        {
            respuesta = {
            error: true, 
            codi: 504,
            mensaje: "El jugador no existe"
            }
            res.send(respuesta);
        }
});


app.post('/jugadores/:alies', function (req, res){
    var nomPlayer = req.body.nom || '';
    var cognomPlayer = req.body.congnom || '';
    var scorePlayer = req.body.score || '';
    var aliesPlayer = req.body.alies || '';
    var posicioPlayer = req.body.posicio || ''; 
    respuesta.error = false;

    if(nomPlayer == ''|| cognomPlayer == '' || parseInt(scorePlayer) <= 0 || aliesPlayer == ''|| posicioPlayer == '') {
        respuesta = {
            error: true,
            codi: 502,
            missatge: 'El campo alias, nombre, apellido y score son requeridos'
        };
    } 
    else if(aliesPlayer != req.params.user) {
        respuesta = {
            error: true,
            codi: 503,
            missatge: "El jugador ya existe"
        };
    } 
    else 
    {
        for(var x = 0; x < jugadores.length ; x++)
        {
            if(jugadores[x].nom == nomPlayer && jugadores[x].congnom == cognomPlayer && jugadores[x].alies == aliesPlayer) 
            {
                respuesta = {
                    error: true,
                    codi: 503,
                    mensaje: "El jugador ya fue creado previamente"
                };
            }
        }
        if(!respuesta.error)
        {
            jugadores.push(
                {
                    posicio: posicioPlayer,
                    alies: aliesPlayer,
                    nom: nomPlayer,
                    congnom: cognomPlayer,
                    score: scorePlayer
                }
            ) 
            respuesta = {                 
                error: false, 
                codigo: 200,               
                mensaje: 'Jugador Creado',   
                respuesta: jugadores[jugadores.length - 1]          
            };
        }
    }
});  

app.put('/jugadores/:alies', function (req, res){
    var nomPlayer = req.body.nom || '';
    var cognomPlayer = req.body.congnom || '';
    var scorePlayer = req.body.score || '';
    var aliesPlayer = req.body.alies || '';
    var posicioPlayer = req.body.posicio || ''; 
    respuesta.error = false;


    if(nomPlayer == '' || cognomPlayer == '' || parseInt(scorePlayer) <= 0|| aliesPlayer == ''|| posicioPlayer == '') {
        respuesta = {
            error: true,
            codi: 502,
            mensaje: 'El campo alias, nombre, apellido y score son requeridos'
        };
    } 
    else if(aliesPlayer != req.params.user) {
        respuesta = {
            error: true,
            codigo: 504,
            mensaje: 'El jugador ya existe'
        };
    } 
    else {
        for(var x = 0; x < jugadores.length ; x++)
        {
            if(jugadores[x].nom == nomPlayer && jugadores[x].congnom == cognomPlayer && jugadores[x].alies == aliesPlayer) 
            {
                jugadores[x] = {
                    posicio: posicioPlayer,
                    alies: aliesPlayer,
                    nom: nomPlayer,
                    congnom: cognomPlayer,
                    score: scorePlayer
                };

                respuesta = {
                    error: false,
                    codi: 505,
                    mensaje: 'jugador actualizado',
                    respuesta: jugadores[x]
                };
                playerFound = true;
            }
        }
        if(!buscarjugador)
        {
            respuesta = {
                error: true,
                codi: 504,
                mensaje: 'El jugador existe'
            };
        }
    }
    res.send(respuesta);
});