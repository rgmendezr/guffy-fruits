var eventosRatonHuerta = {

    prePresionado: false,
    abajo: false,
    xInicio: 0,
    yInicio: 0,
    tiempoAcumulado: 0,
    toques: [],
    movimiento: 0,
    actualizado: false,
    limpiador: 0,
    clk: false,


    iniciar: function () {
        var el = programador.canvas;
        el.addEventListener("dblclick", eventosRatonHuerta.dobleClick, false);
        el.addEventListener("mousedown", eventosRatonHuerta.start, false);
        el.addEventListener("mouseup", eventosRatonHuerta.end, false);
        el.addEventListener("mouseout", eventosRatonHuerta.end, false);
        el.addEventListener("mousemove", eventosRatonHuerta.moviendoRaton, {
            passive: false
        });
        el.addEventListener("wheel", eventosRatonHuerta.hacerZoom, false);

    },

    eventoClic: function () {
        eventos.click = true;
    },

    dobleClick: function () {
        eventosRatonHuerta.end();
        toggleFullScreen($("contenedorTotal"));
    },
    start: function (evento) {
        evento.preventDefault();

        console.log("start");


        eventosRatonHuerta.xInicio = evento.pageX;
        eventosRatonHuerta.yInicio = evento.pageY;

        eventos.x = evento.pageX;
        eventos.y = evento.pageY;
        
        eventosRatonHuerta.abajo = true;
        

        eventosRatonHuerta.clk = true;
        eventosRatonHuerta.prePresionado = setTimeout(function () {
            eventosRatonHuerta.clk = false;
        }, 200);

        if (construir.verificarPresionado()) {
            construir.presionado = true;
        }


    },

    moviendoRaton: function (evento) {
        event.preventDefault();

        console.log("moviendo 1");
        eventos.x = evento.pageX;
        eventos.y = evento.pageY;

        if (eventosRatonHuerta.abajo) {
            eventosRatonHuerta.mover(evento);
        }


        eventosRatonHuerta.xInicio = evento.pageX;
        eventosRatonHuerta.yInicio = evento.pageY;

    },

    mover: function (evento) {

        var movimientoDerecha = (evento.pageX - eventosRatonHuerta.xInicio);
        var movimientoAbajo = (evento.pageY - eventosRatonHuerta.yInicio);

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

    hacerZoom: function (evento) {

        var anchoMapaActual = constantesHuerta.anchoMapaInicial * mapa.zoom;

        if (evento.deltaY > 0) {
            //agrandando
            if ((constantesHuerta.anchoCuadroInicial * mapa.zoom) * 2 < pantalla.anchoPantalla) {
                eventosRatonHuerta.funcionZoom(evento, 1);
                //eventosTouchHuerta.funcionZoom(pantalla.centroPantallaX, pantalla.centroPantallaY, 1);
            }

        } else {
            //achicando
            if ((constantesHuerta.anchoCuadroInicial * mapa.zoom) * 10 > pantalla.anchoPantalla) {
                eventosRatonHuerta.funcionZoom(evento, 2);
                //eventosTouchHuerta.funcionZoom(pantalla.centroPantallaX, pantalla.centroPantallaY, 2);
            }
        }


    },

    funcionZoom: function (evento, tipo) {

        var d = pantalla.centroPantallaX - mapa.xMapa;
        var dy = pantalla.centroPantallaY - mapa.yMapa;
        var c = pantalla.centroPantallaX - evento.pageX;
        var cy = pantalla.centroPantallaY - evento.pageY;
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

        if (eventosRatonHuerta.clk) {
            eventosRatonHuerta.eventoClic();
        }

        eventosRatonHuerta.clk = false;
        eventosRatonHuerta.abajo = false;
        construir.presionado = false;
        if(escenas.escenas["Huerta"].elementosExtra["Construccion"] != null){
           escenas.escenas["Huerta"].elementosExtra["Construccion"].restablecer = true;
           }

    },


};
