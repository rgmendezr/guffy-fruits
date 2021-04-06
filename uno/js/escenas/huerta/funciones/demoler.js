var demoler = {
    activo: false,
    tipo: "",
    construccion: function (x, y) {

        if (escenas.escenas["Huerta"].elementosEscena[x + ":" + y].cuadroEntero.planta === undefined ||
            escenas.escenas["Huerta"].elementosEscena[x + ":" + y].cuadroEntero.planta == false) {

            if (escenas.escenas["Huerta"].elementosEscena[x + ":" + y].cuadro.tipo == demoler.tipo) {

                demoler.demoler(x, y, escenas.escenas["Huerta"].elementosEscena[x + ":" + y].cuadro.construccion.demoler);

            } else {
                cuadroAlerta.mostrar("confirmar", traducciones.demoler["seTeCobrara1"][firebaseSesion.usuario.datos.idioma] + (escenas.escenas["Huerta"].elementosEscena[x + ":" + y].cuadro.construccion.demoler * -1) + traducciones.demoler["seTeCobrara2"][firebaseSesion.usuario.datos.idioma],
                    function () {
                        demoler.tipo = escenas.escenas["Huerta"].elementosEscena[x + ":" + y].cuadro.tipo;
                        demoler.demoler(x, y, escenas.escenas["Huerta"].elementosEscena[x + ":" + y].cuadro.construccion.demoler);
                    }, 0);
            }

        } else {
            cuadroAlerta.mostrar("mensaje", traducciones.demoler["imposible"][firebaseSesion.usuario.datos.idioma], 0, 0);
        }
    },
    demoler: function (x, y, cantidadMonedas) {

        if (monedas.comprobar(cantidadMonedas)) {

            var cuadroAnterior = escenas.escenas["Huerta"].elementosEscena[x + ":" + y].cuadro;
            var cuadroEntero;

            for (var yy = 0; yy < escenas.escenas["Huerta"].elementosEscena[x + ":" + y].cantidadCuadrosX; yy++) {
                for (var xx = 0; xx < escenas.escenas["Huerta"].elementosEscena[x + ":" + y].cantidadCuadrosX; xx++) {

                    id = (xx + x) + ":" + (yy + y);

                    if (id != x + ":" + y) {

                        cuadroEntero = {
                            x: xx + x,
                            y: yy + y,
                            tipo: planedifComunes.Vacio.tipo,
                            tipoPadre: planedifComunes.Vacio.tipo,
                            planta: false,
                        };

                        escenaHuerta.actualizadoRapido(id, cuadroEntero);

                    }

                }

            }

            cuadroEntero = {
                x: x,
                y: y,
                tipo: planedifComunes.Vacio.tipo,
                tipoPadre: planedifComunes.Vacio.tipo,
                planta: false,
            };

            escenaHuerta.actualizadoRapido(x + ":" + y, cuadroEntero);
            escenaHuerta.actualizarCuadro(x, y, cantidadMonedas, cuadroEntero, true, cuadroAnterior);

        } else {
            cuadroAlerta.mostrar("mensaje", traducciones.huertaJS["sinMonedas"][firebaseSesion.usuario.datos.idioma], 0, 0);
        }

    },
};
