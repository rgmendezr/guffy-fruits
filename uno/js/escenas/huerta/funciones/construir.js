var construir = {

    activo: false,
    apto: false,
    tipo: null,

    presionado: false,

    toggleCuadro: function (cuadro) {

        if (!construir.activo) {

            construir.tipo = cuadro.tipo;
            escenas.escenas["Huerta"].sembrando = true;
            construir.activo = true;

            if (cuadro.tipo != "Camino1") {
                var cuadroFinal = funcionesEscenaExtra.crearCuadroContruir(cuadro);
                cuadroFinal.actualizar();
                escenas.escenas[escenas.escenaActual].elementosExtra["Construccion"] = cuadroFinal;
            }


        } else {
            escenas.escenas["Huerta"].sembrando = false;
            escenas.escenas["Huerta"].elementosExtra["Construccion"] = null;
            construir.activo = false;
            construir.tipo = null;
        }

    },

    verificarPresionado: function () {

        if (escenas.escenas["Huerta"].elementosExtra["Construccion"] != null) {
            var objeto = escenas.escenas["Huerta"].elementosExtra["Construccion"].verificar();
            if (eventos.detectarColision(objeto.tipo, objeto.xInicioCuadro, objeto.yInicioCuadro, objeto.ancho, objeto.alto, true)) {
                return true;
            }
        }

        return false;
    },

    moverX: function (movimiento) {
        if (escenas.escenas["Huerta"].elementosExtra["Construccion"] !== null) {
            escenas.escenas["Huerta"].elementosExtra["Construccion"].pocicionTemporalX += movimiento;
        }

    },

    moverY: function (movimiento) {
        if (escenas.escenas["Huerta"].elementosExtra["Construccion"] !== null) {
            escenas.escenas["Huerta"].elementosExtra["Construccion"].pocicionTemporalY += movimiento;
        }

    },

    edificio: function (tipo, x, y) {

        if (construir.apto) {
            if (monedas.comprobar(tipo.construccion.costo)) {

                var id = x + ":" + y;
                var cuadroEntero;

                for (var yy = 0; yy < tipo.cantidadCuadrosY; yy++) {
                    for (var xx = 0; xx < tipo.cantidadCuadrosX; xx++) {

                        id = (xx + x) + ":" + (yy + y);

                        if (id != x + ":" + y) {

                            cuadroEntero = {
                                tipo: "#",
                                tipoPadre: tipo.tipo,
                                x: xx + x,
                                y: yy + y,
                            };

                            escenaHuerta.actualizadoRapido(id, cuadroEntero);

                        }

                    }

                }

                cuadroEntero = {
                    x: x,
                    y: y,
                    tipo: tipo.tipo,
                    tipoPadre: tipo.tipo,
                    planta: false,
                    creacion: firebase.firestore.Timestamp.now(),
                };

                escenaHuerta.actualizadoRapido(x + ":" + y, cuadroEntero);
                escenaHuerta.actualizarCuadro(x, y, tipo.construccion.costo, cuadroEntero, false);

                escenas.escenas["Huerta"].elementosExtra["Construccion"] = null;
                menu.accionAtras();

            } else {
                cuadroAlerta.mostrar("mensaje", traducciones.huertaJS["sinMonedas"][firebaseSesion.usuario.datos.idioma], 0, 0);
            }

        } else {
            cuadroAlerta.mostrar("mensaje", traducciones.construir["noDisponible"][firebaseSesion.usuario.datos.idioma], 0, 0);
        }


    },
    camino: function (x, y) {
        var tipo = edificios.Camino1;

        if (monedas.comprobar(tipo.construccion.costo)) {

            if (tutorial.paso == 7) {
                tutorial.siguiente();
            }

            var cuadroEntero = {
                x: x,
                y: y,
                tipo: tipo.tipo,
                tipoPadre: tipo.tipo,
                planta: false,
                creacion: firebase.firestore.Timestamp.now(),
            };

            escenaHuerta.actualizadoRapido(x + ":" + y, cuadroEntero);
            escenaHuerta.actualizarCuadro(x, y, tipo.construccion.costo, cuadroEntero, false);

        } else {
            cuadroAlerta.mostrar("mensaje", traducciones.huertaJS["sinMonedas"][firebaseSesion.usuario.datos.idioma], 0, 0);
        }

    },

};
