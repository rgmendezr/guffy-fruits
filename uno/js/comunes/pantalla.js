var pantalla = {

    xPantalla: 0,
    yPantalla: 0,
    anchoPantalla: 0,
    altoPantalla: 0,
    centroPantallaX: 0,
    centroPantallaY: 0,

    iniciar: function () {

        pantalla.anchoPantalla = window.innerWidth;
        pantalla.altoPantalla = window.innerHeight;

        programador.canvas.width = pantalla.anchoPantalla;
        programador.canvas.height = pantalla.altoPantalla;

        pantalla.centroPantallaX = pantalla.anchoPantalla / 2;
        pantalla.centroPantallaY = pantalla.altoPantalla / 2;

        //pantalla.xPantallaEnMapa = ;
        //pantalla.yPantallaEnMapa = ;

    },

    actualizar: function () {

        var anchoPantallaAntes = pantalla.anchoPantalla;
        var altoPantallaAntes = pantalla.altoPantalla;

        pantalla.anchoPantalla = window.innerWidth;
        pantalla.altoPantalla = window.innerHeight;

        programador.canvas.width = pantalla.anchoPantalla;
        programador.canvas.height = pantalla.altoPantalla;

        pantalla.centroPantallaX = pantalla.anchoPantalla / 2;
        pantalla.centroPantallaY = pantalla.altoPantalla / 2;

        if (pantalla.anchoPantalla != anchoPantallaAntes || pantalla.altoPantalla != altoPantallaAntes) {
            if (escenas.escenaActual == "Huerta") {
                mapa.cambiarCentroMapaACentroPantallaX();
                mapa.cambiarCentroMapaACentroPantallaY();
            }
        }


    },
};
