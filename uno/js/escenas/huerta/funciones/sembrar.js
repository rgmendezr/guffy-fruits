var sembrar = {

    // Esta variables tambien son utilizadas por recolectar
    funcionCadena: false,
    tiempoCancelarCadena: null,

    activo: false,
    tipo: null,

    toggleCuadro: function (tipo) {

        if (!sembrar.activo) {
            sembrar.tipo = tipo;
            escenas.escenas["Huerta"].sembrando = true;
            sembrar.activo = true;
        } else {
            sembrar.tipo = null;
            escenas.escenas["Huerta"].sembrando = false;
            sembrar.activo = false;
        }

    },

    planta: function (x, y) {

        var tipo = sembrar.tipo;

            if (monedas.comprobar(tipo.sembrar.costo)) {

                function fecha(horas) {
                    var fechaActual = firebase.firestore.Timestamp.now();
                    fechaActual = fechaActual.toDate();
                    var segundosCorridos = fechaActual.getSeconds();
                    fechaActual.setSeconds(segundosCorridos + (horas * 3600));

                    return fechaActual;
                }

                var fechaNaciendo = fecha(tipo.sembrar.tiempoCrecimientoEnHoras.naciendo);

                var fechaCreciendo = fecha(tipo.sembrar.tiempoCrecimientoEnHoras.creciendo);

                var fechaPerfecto = fecha(tipo.sembrar.tiempoCrecimientoEnHoras.perfecto);

                var fechaMarchito = fecha(tipo.sembrar.tiempoCrecimientoEnHoras.marchito);

                var cuadroEntero = {
                    x: x,
                    y: y,
                    tipo: tipo.tipo,
                    tipoPadre: tipo.tipo,
                    planta: true,
                    estados: {
                        naciendo: fechaNaciendo,
                        creciendo: fechaCreciendo,
                        perfecto: fechaPerfecto,
                        marchito: fechaMarchito,
                    },

                };

                var cantidadMonedas = tipo.sembrar.costo;

                escenaHuerta.actualizadoRapido(x + ":" + y, cuadroEntero);
                escenaHuerta.actualizarCuadro(x, y, cantidadMonedas, cuadroEntero, false);

            } else {
                cuadroAlerta.mostrar("mensaje", traducciones.huertaJS["sinMonedas"][firebaseSesion.usuario.datos.idioma], 0, 0);
            }

    },

    cadena: function (x, y) {
        var xInicial = x - 2;
        var yInicial = y - 2;
        var faltanMonedas = false;
        for (var i = 0; i < 5; i++) {
            for (var f = 0; f < 5; f++) {
                if (monedas.comprobar(sembrar.tipo.sembrar.costo)) {

                    var elemento = escenas.escenas["Huerta"].elementosEscena[(xInicial + i) + ":" + (yInicial + f)];
                    if (typeof elemento !== "undefined" &&
                        elemento.cuadro.tipo == "Vacio" &&
                        !elemento.actualizando) {

                        sembrar.planta(xInicial + i, yInicial + f);

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
