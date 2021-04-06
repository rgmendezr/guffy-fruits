var eventosTouchHuerta = {

    prePresionado: false,
    xInicio: 0,
    yInicio: 0,
    toques: [],
    actualizado: false,
    limpiador: 0,
    cZoom: null,
    clk: false,
    movimiento: 0,

    iniciar: function () {

        var el = programador.canvas;

        el.addEventListener("touchstart", eventosTouchHuerta.start, false);
        el.addEventListener("touchend", eventosTouchHuerta.end, false);
        el.addEventListener("touchcancel", eventosTouchHuerta.end, false);
        el.addEventListener("touchmove", eventosTouchHuerta.moviendoDedos, {
            passive: false
        });

    },

    eventoClic: function () {
        eventos.click = true;
    },

    start: function (evt) {
        evt.preventDefault();

        var touches = evt.changedTouches;

        eventosTouchHuerta.toques.push(touches[0]);

        if (touches[0].identifier == 0) {

            eventosTouchHuerta.xInicio = touches[0].pageX;
            eventosTouchHuerta.yInicio = touches[0].pageY;

            eventos.x = touches[0].pageX;
            eventos.y = touches[0].pageY;

            eventosTouchHuerta.clk = true;
            eventosTouchHuerta.prePresionado = setTimeout(function () {
                eventosTouchHuerta.clk = false;
            }, 100);

            if (construir.verificarPresionado()) {
                construir.presionado = true;
            }
            
            eventosTouchHuerta.movimiento = 0;

        }

    },
    moviendoDedos: function (event) {
        event.preventDefault();

        var touches;
        var indiceToquePrimero = 0;

        touches = event.changedTouches;

        if (touches.length == 1) {

            eventos.x = touches[0].pageX;
            eventos.y = touches[0].pageY;

        } else {
            for (var x = 0; x < touches.length; x++) {
                if (touches[x].identifier == 0) {
                    eventos.x = touches[x].pageX;
                    eventos.y = touches[x].pageY;
                    indiceToquePrimero = x;
                }
            }
        }

        if (touches.length == 1 && eventosTouchHuerta.toques.length == 1) {
            eventosTouchHuerta.mover(touches);

        } else if (touches.length == 2 && eventosTouchHuerta.toques.length == 2) {
            eventosTouchHuerta.hacerZoom(touches);
        } else if (touches.length == 3) {
            //toggleFullScreen($("contenedorTotal"));
        }

        eventosTouchHuerta.xInicio = touches[indiceToquePrimero].pageX;
        eventosTouchHuerta.yInicio = touches[indiceToquePrimero].pageY;

    },

    mover: function (toques) {
        

        var movimientoDerecha = (toques[0].pageX - eventosTouchHuerta.xInicio);
        var movimientoAbajo = (toques[0].pageY - eventosTouchHuerta.yInicio);

        eventosTouchHuerta.movimiento += Math.abs(movimientoDerecha)  + Math.abs(movimientoAbajo);
        
        if (construir.activo && construir.presionado) {

            construir.moverX(movimientoDerecha);
            construir.moverY(movimientoAbajo);

        } else {

            if (limites.limiteIzquierda.x + movimientoDerecha < pantalla.anchoPantalla / 2 &&
                limites.limiteDerecha.x + movimientoDerecha > pantalla.anchoPantalla / 2) {

                mapa.xMapa += movimientoDerecha;
                if (escenas.escenas["Huerta"].elementosExtra["Construccion"] != null) {
                    escenas.escenas["Huerta"].elementosExtra["Construccion"].pocicionTemporalX += movimientoDerecha;
                    escenas.escenas["Huerta"].elementosExtra["Construccion"].xDibujo += movimientoDerecha;
                }

            }

            if (limites.limiteArriba.y + movimientoAbajo < pantalla.altoPantalla / 2 &&
                limites.limiteAbajo.y + movimientoAbajo > pantalla.altoPantalla / 2) {

                mapa.yMapa += movimientoAbajo;
                if (escenas.escenas["Huerta"].elementosExtra["Construccion"] != null) {
                    escenas.escenas["Huerta"].elementosExtra["Construccion"].pocicionTemporalY += movimientoAbajo;
                    escenas.escenas["Huerta"].elementosExtra["Construccion"].yDibujo += movimientoAbajo;
                }

            }
        }

    },
    hacerZoom: function (toques) {
        var x1, x2, y1, y2;

        if (toques[0].pageX < toques[1].pageX) {
            x1 = toques[0].pageX;
            x2 = toques[1].pageX;
        } else {
            x1 = toques[1].pageX;
            x2 = toques[0].pageX;
        }

        if (toques[0].pageY < toques[1].pageY) {
            y1 = toques[0].pageY;
            y2 = toques[1].pageY;
        } else {
            y1 = toques[1].pageY;
            y2 = toques[0].pageY;
        }

        var centroToqueX = ((x2 - x1) / 2) + x1;
        var centroToqueY = ((y2 - y1) / 2) + y1;

        var zoom = Math.abs((toques[0].pageY - toques[1].pageY) + toques[0].pageX - toques[1].pageX);

        if (eventosTouchHuerta.preZoom != zoom ) {

            var anchoMapaActual = constantesHuerta.anchoMapaInicial * mapa.zoom;

            // alert("Ancho mapa actual:"+ anchoMapaActual +" ancho Pantalla"+ pantalla.anchoPantalla);

            if (zoom > eventosTouchHuerta.preZoom) {
                //agrandando
                if ((constantesHuerta.anchoCuadroInicial * mapa.zoom) * 2 < pantalla.anchoPantalla) {
                    eventosTouchHuerta.funcionZoom(centroToqueX, centroToqueY, 1);
                }

            } else {
                //achicando
                if ((constantesHuerta.anchoCuadroInicial * mapa.zoom) * 10 > pantalla.anchoPantalla) {
                    eventosTouchHuerta.funcionZoom(centroToqueX, centroToqueY, 2);
                }
            }

            eventosTouchHuerta.preZoom = zoom;
        }

    },

    funcionZoom: function (centroToqueX, centroToqueY, tipo) {

        var d = pantalla.centroPantallaX - mapa.xMapa;
        var dy = pantalla.centroPantallaY - mapa.yMapa;
        var c = pantalla.centroPantallaX - centroToqueX;
        var cy = pantalla.centroPantallaY - centroToqueY;
        var e = (d - c);
        var ey = (dy - cy);

        var centroToqueEnMapaX = (d - c) + mapa.xMapa;
        var centroToqueEnMapaY = (dy - cy) + mapa.yMapa;

        if ((centroToqueEnMapaX > mapa.xMapa && centroToqueEnMapaX < mapa.xMapa + mapa.anchoMapa) &&
            (centroToqueEnMapaY > mapa.yMapa && centroToqueEnMapaY < mapa.yMapa + mapa.altoMapa)) {

            var ee;
            var eey;

            var mayor = 1 + constantesHuerta.cantidadZoom;
            var menor = 1 - constantesHuerta.cantidadZoom;

            if (tipo == 1) {

                mapa.zoom *= mayor;
                ee = e * mayor;
                eey = ey * mayor;

            } else {

                mapa.zoom *= menor;
                ee = e * menor;
                eey = ey * menor;

            }

            var xNew = ee - e;
            var yNew = eey - ey;

            mapa.xMapa -= xNew;
            mapa.yMapa -= yNew;

        }

    },

    end: function (event) {
        if (eventosTouchHuerta.toques.length == 1) {
            if (eventosTouchHuerta.clk && eventosTouchHuerta.movimiento < 10) {
                eventosTouchHuerta.eventoClic();
            }
        }
        eventosTouchHuerta.clk = false;
        eventosTouchHuerta.toques = [];;
        construir.presionado = false;
        if (escenas.escenas["Huerta"].elementosExtra["Construccion"] != null) {
            escenas.escenas["Huerta"].elementosExtra["Construccion"].restablecer = true;
        }

    },

    buscarToquePorId: function (idBuscado) {
        for (var i = 0; i < eventos.toques.length; i++) {
            var id = eventos.toques[i].identifier;

            if (id == idBuscado) {
                return i;
            }
        }
        return -1;
    },


};
