var recolectar = {
    activo: false,
    accionSeguida: false,
    tiempoAccionSeguida: null,
    planta: function (x, y, cadena) {

        if (escenas.escenas["Huerta"].elementosEscena[x + ":" + y].estadoCrecimiento == "Tierra" ||
            escenas.escenas["Huerta"].elementosEscena[x + ":" + y].estadoCrecimiento == "Naciendo" ||
            escenas.escenas["Huerta"].elementosEscena[x + ":" + y].estadoCrecimiento == "Creciendo") {

            cuadroAlerta.mostrar("confirmar", traducciones.recolectar["tiempoIncorrecto1"][firebaseSesion.usuario.datos.idioma] + (escenas.escenas["Huerta"].elementosEscena[x + ":" + y].cuadro.sembrar.perdida * -1) + traducciones.recolectar["tiempoIncorrecto2"][firebaseSesion.usuario.datos.idioma],
                function () {
                    recolectar.recolectar(x, y, escenas.escenas["Huerta"].elementosEscena[x + ":" + y].cuadro.sembrar.perdida);
                }, 0);

        } else if (escenas.escenas["Huerta"].elementosEscena[x + ":" + y].estadoCrecimiento == "Perfecto") {

            recolectar.recolectar(x, y, escenas.escenas["Huerta"].elementosEscena[x + ":" + y].cuadro.sembrar.valor);

        } else if (escenas.escenas["Huerta"].elementosEscena[x + ":" + y].estadoCrecimiento == "Marchito") {
            if (recolectar.accionSeguida) {
                recolectar.recolectar(x, y, escenas.escenas["Huerta"].elementosEscena[x + ":" + y].cuadro.sembrar.perdida);
                clearTimeout(recolectar.tiempoAccionSeguida);
                recolectar.tiempoAccionSeguida = setTimeout(function () {
                    recolectar.accionSeguida = false;
                }, 10000);
            } else {
                cuadroAlerta.mostrar("confirmar", traducciones.recolectar["marchito1"][firebaseSesion.usuario.datos.idioma] + (escenas.escenas["Huerta"].elementosEscena[x + ":" + y].cuadro.sembrar.perdida * -1) + traducciones.recolectar["marchito2"][firebaseSesion.usuario.datos.idioma],
                    function () {
                        recolectar.recolectar(x, y, escenas.escenas["Huerta"].elementosEscena[x + ":" + y].cuadro.sembrar.perdida);
                        recolectar.accionSeguida = true;
                        recolectar.tiempoAccionSeguida = setTimeout(function () {
                            recolectar.accionSeguida = false;
                        }, 10000);
                    }, 0);
            }
        }

    },
    recolectar: function (x, y, cantidadMonedas) {

        if (monedas.comprobar(cantidadMonedas)) {

            var cuadroEntero = {
                x: x,
                y: y,
                tipo: planedifComunes.Vacio.tipo,
                tipoPadre: planedifComunes.Vacio.tipo,
                planta: false,
            };

            escenaHuerta.actualizadoRapido(x + ":" + y, cuadroEntero);
            escenaHuerta.actualizarCuadro(x, y, cantidadMonedas, cuadroEntero, true);

        } else {
            cuadroAlerta.mostrar("mensaje", traducciones.huertaJS["sinMonedas"][firebaseSesion.usuario.datos.idioma], 0, 0);
        }

    },

    cadena: function (x, y) {

        var tipoInicial = escenas.escenas["Huerta"].elementosEscena[x + ":" + y];
        var xInicial = x - 2;
        var yInicial = y - 2;
        var faltanMonedas = false;

        for (var i = 0; i < 5; i++) {
            for (var f = 0; f < 5; f++) {

                var elemento = escenas.escenas["Huerta"].elementosEscena[(xInicial + i) + ":" + (yInicial + f)];

                if (monedas.comprobar(tipoInicial.cuadro.sembrar.perdida)) {

                    if (typeof elemento !== "undefined" &&
                        typeof elemento.cuadroEntero.planta != "undefined" &&
                        elemento.cuadroEntero.planta == true &&
                        !elemento.actualizando &&
                        (elemento.estadoCrecimiento == "Perfecto" || elemento.estadoCrecimiento == "Marchito") &&
                        tipoInicial.cuadro.tipo == elemento.cuadro.tipo) {

                        recolectar.planta(xInicial + i, yInicial + f);

                    }

                } else {
                    faltanMonedas = true;
                }
            }

        }

        if (faltanMonedas) {
            cuadroAlerta.mostrar("mensaje", traducciones.huertaJS["sinMonedas"][firebaseSesion.usuario.datos.idioma], 0, 0);
        }
        accionesBotonesSuperiores.alargarTiempoCancelarCadena();

    },

};
