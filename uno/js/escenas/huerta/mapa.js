var mapa = {

    zoom: 1,
    xMapa: 0,
    yMapa: 0,
    anchoMapa: 0,
    altoMapa: 0,
    bordeMapa: 50,


    iniciar: function () {

        mapa.anchoMapa = (constantesHuerta.anchoCuadroInicial * escenaHuerta.huerta.cuadrosX) * mapa.zoom;
        mapa.altoMapa = (constantesHuerta.altoCuadroInicial * escenaHuerta.huerta.cuadrosY) * mapa.zoom;

        var distanciaDexMapaACentroMapa = mapa.anchoMapa / 2;
        var distanciaDeyMapaACentroMapa = mapa.altoMapa / 2;

        mapa.xMapa = pantalla.centroPantallaX - distanciaDexMapaACentroMapa;
        mapa.yMapa = pantalla.centroPantallaY - distanciaDeyMapaACentroMapa;

    },

    actualizar: function () {

        mapa.anchoMapa = (constantesHuerta.anchoCuadroInicial * escenaHuerta.huerta.cuadrosX) * mapa.zoom;
        mapa.altoMapa = (constantesHuerta.altoCuadroInicial * escenaHuerta.huerta.cuadrosY) * mapa.zoom;

        limites.actualizar();

    },

    cambiarCentroMapaACentroPantallaX: function () {
        var distanciaDexMapaACentroMapa = mapa.anchoMapa / 2;      
        mapa.xMapa = pantalla.centroPantallaX - distanciaDexMapaACentroMapa;
    },
    
    cambiarCentroMapaACentroPantallaY: function() {
        var distanciaDeyMapaACentroMapa = mapa.altoMapa / 2;
        mapa.yMapa = pantalla.centroPantallaY - distanciaDeyMapaACentroMapa;
    },

};

var limites = {

    limiteArriba: 0,
    limiteAbajo: 0,
    limiteDerecha: 0,
    limiteIzquierda: 0,

    actualizar: function () {

        limites.limiteArriba = {
            x: mapa.xMapa,
            y: mapa.yMapa - 10,
            ancho: mapa.anchoMapa,
            alto: 10,
        };
        limites.limiteAbajo = {
            x: mapa.xMapa,
            y: mapa.yMapa + mapa.altoMapa,
            ancho: mapa.anchoMapa,
            alto: 10,
        };
        limites.limiteIzquierda = {
            x: mapa.xMapa - 10,
            y: mapa.yMapa,
            ancho: 10,
            alto: mapa.altoMapa,
        };
        limites.limiteDerecha = {
            x: mapa.xMapa + mapa.anchoMapa,
            y: mapa.yMapa,
            ancho: 10,
            alto: mapa.altoMapa,
        };

    },

};
