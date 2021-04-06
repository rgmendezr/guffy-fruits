var comprar = {
    zona: function (zona) {

        function compra(huerta) {
            var totalCuadros = huerta.cuadrosX * huerta.cuadrosY;

            if (totalCuadros < constantesGlobales.cantidadMaximaDeCuadros) {

                var costoFila = Math.floor(((totalCuadros * constantesGlobales.valorFilaPor500) / constantesGlobales.cantidadMaximaDeCuadros) * totalCuadros);

                cuadroAlerta.mostrar("confirmar", traducciones.comprarJS["seTeCobrara1"][firebaseSesion.usuario.datos.idioma] + costoFila + traducciones.comprarJS["seTeCobrara2"][firebaseSesion.usuario.datos.idioma],
                    function () {
                        if (monedas.comprobar(costoFila * -1)) {

                            switch (zona) {
                                case "norte":
                                    huerta.valorCuadroMenorX--;
                                    huerta.cuadrosX++;
                                    break;
                                case "sur":
                                    huerta.cuadrosX++;
                                    break;
                                case "este":
                                    huerta.valorCuadroMenorY--;
                                    huerta.cuadrosY++;
                                    break;
                                case "oeste":
                                    huerta.cuadrosY++;
                                    break;
                            }

                            var referencia = "huertas/" + firebaseSesion.usuario.uid;

                            firebaseSesion.setDoc(referencia, huerta, function () {
                                monedas.actualizar(costoFila * -1);
                                comprar.actualizarMapa(zona, huerta);
                                cuadroAlerta.mostrar("mensaje", traducciones.huertaJS["compraExitosa"][firebaseSesion.usuario.datos.idioma], function () {
                                    if (huerta.cuadrosY * huerta.cuadrosX >= constantesGlobales.cantidadMaximaDeCuadros) {

                                        var docRef = firebaseSesion.db.doc("huertas/" + firebaseSesion.usuario.uid);
                                        docRef.update({
                                                finalizado: "Logrado",
                                            }).then(function () {
                                                window.location.href = "inicio.html";
                                            })
                                            .catch(function (error) {
                                                console.error("Error writing document: ", error);
                                            });

                                    }
                                }, 0);

                            }, 0);


                        } else {
                            cuadroAlerta.mostrar("mensaje", traducciones.huertaJS["sinMonedas"][firebaseSesion.usuario.datos.idioma], 0, 0);
                        }
                    }, 0);

            } else {
                cuadroAlerta.mostrar("mensaje", traducciones.comprarJS["limiteTerreno"][firebaseSesion.usuario.datos.idioma], 0, 0);
            }

        }

        var referencia = "huertas/" + firebaseSesion.usuario.uid;
        var huerta = firebaseSesion.getDoc(referencia, compra, 0, 0);

    },
    actualizarMapa: function (zona, huerta) {

        var x, y, xF, yF;


        if (zona == "norte") {
            x = huerta.valorCuadroMenorX;
            y = huerta.valorCuadroMenorY;
            xF = escenas.escenas["Huerta"].elementosEscena[(x + 1) + ":" + y].xF - 1;
            yF = escenas.escenas["Huerta"].elementosEscena[(x + 1) + ":" + y].yF;
        } else if (zona == "sur") {
            x = huerta.valorCuadroMenorX + huerta.cuadrosX - 1;
            y = huerta.valorCuadroMenorY;
            xF = escenas.escenas["Huerta"].elementosEscena[(x - 1) + ":" + y].xF + 1;
            yF = escenas.escenas["Huerta"].elementosEscena[(x - 1) + ":" + y].yF;
        } else if (zona == "este") {
            x = huerta.valorCuadroMenorX;
            y = huerta.valorCuadroMenorY;
            xF = escenas.escenas["Huerta"].elementosEscena[x + ":" + (y + 1)].xF;
            yF = escenas.escenas["Huerta"].elementosEscena[x + ":" + (y + 1)].yF - 1;
        } else if (zona == "oeste") {
            y = huerta.valorCuadroMenorY + huerta.cuadrosY - 1;
            x = huerta.valorCuadroMenorX;
            xF = escenas.escenas["Huerta"].elementosEscena[x + ":" + (y - 1)].xF;
            yF = escenas.escenas["Huerta"].elementosEscena[x + ":" + (y - 1)].yF + 1;
        }

        if (zona == "norte" || zona == "sur") {
            for (var i = y, iF = yF; i < huerta.valorCuadroMenorY + huerta.cuadrosY; i++, iF++) {

                var cEntero = {
                    tipo: planedifComunes.Vacio.tipo,
                    tipoPadre: planedifComunes.Vacio.tipo,
                    planta: false,
                    tipoPadre: undefined,
                    x: x,
                    y: i,
                };

                var cuadroFinal = funcionesEscenaHuerta.crearCuadro(xF, iF, cEntero);
                cuadroFinal.actualizar();
                escenas.escenas["Huerta"].elementosEscena[x + ":" + i] = cuadroFinal;

            }
        } else {
            for (var i = x, iF = xF; i < huerta.valorCuadroMenorX + huerta.cuadrosX; i++, iF++) {

                var cEntero = {
                    tipo: planedifComunes.Vacio.tipo,
                    tipoPadre: planedifComunes.Vacio.tipo,
                    planta: false,
                    tipoPadre: undefined,
                    x: i,
                    y: y,
                };

                var cuadroFinal = funcionesEscenaHuerta.crearCuadro(iF, yF, cEntero);
                cuadroFinal.actualizar();
                escenas.escenas["Huerta"].elementosEscena[i + ":" + y] = cuadroFinal;

            }
        }

        escenas.escenas["Huerta"].huerta = huerta;

    },
};
