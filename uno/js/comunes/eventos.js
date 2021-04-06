var eventos = {
    x: 0,
    y: 0,
    click: false,
    apc: false,
    iniciarEventos: function (eventos) {
        for (var x = 0; x < eventos.length; x++) {
            eventos[x]();
        }
    },
    verificarClic: function () {

        if (eventos.click) {
            var accion = 0;
            var parametros = "";

            if (escenas.escenas[escenas.escenaActual].cargado == true) {

                for (var y = escenaHuerta.huerta.valorCuadroMenorY, yF = 0; yF < escenaHuerta.huerta.cuadrosY; y++, yF++) {
                    for (var x = escenaHuerta.huerta.valorCuadroMenorX, xF = 0; xF < escenaHuerta.huerta.cuadrosX; x++, xF++) {

                        if (escenas.escenas[escenas.escenaActual].elementosEscena[x + ":" + y].cuadro.tipo != "Ocupado") {
                            var objeto = escenas.escenas[escenas.escenaActual].elementosEscena[x + ":" + y].verificar();
                            if (this.detectarColision(objeto.tipo, objeto.xInicioCuadro, objeto.yInicioCuadro, objeto.ancho, objeto.alto)) {
                                parametros = objeto.parametros;
                                accion = objeto.accion;
                            }
                        }

                    }
                }

                for (var i in escenas.escenas[escenas.escenaActual].elementosExtra) {

                    if (escenas.escenas[escenas.escenaActual].elementosExtra[i] !== null) {
                        var objeto = escenas.escenas[escenas.escenaActual].elementosExtra[i].verificar();
                        if (this.detectarColision(objeto.tipo, objeto.xInicioCuadro, objeto.yInicioCuadro, objeto.ancho, objeto.alto)) {
                            parametros = objeto.parametros;
                            accion = objeto.accion;
                        }
                    }
                }

            }

            if (typeof accion === 'function') {
                eventos.apc = true;
                accion(parametros);

            }
            eventos.click = false;
            eventos.apc = false;

        }

    },

    detectarColision: function (tipo, x, y, ancho, alto, opcional) {

        if (tipo == "rombo") {
            var y2 = eventos.y - y;
            var y3 = y + alto;
            var y4 = y3 - eventos.y;
            var x2 = eventos.x - (x + (ancho / 2));
            var escala = ancho / alto;

            if (eventos.click || opcional) {

                if (y2 > 0 && y2 < alto / 2) {
                    if (x2 > (y2 * -1) * escala && x2 < y2 * escala) {
                        return true;
                    }

                } else if (y4 > 0 && y4 < alto / 2) {
                    if (x2 > (y4 * -1) * escala && x2 < y4 * escala) {
                        return true;
                    }
                }
            }
        }
        return false;
    },


};
