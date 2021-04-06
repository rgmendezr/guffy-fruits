var escenaHuerta = {
    nombreEscena: "Huerta",
    elementosEscena: [],
    elementosExtra: [],
    copiasSeguridad: [],
    cargado: false,
    archivos: archivosHuerta,
    huerta: null,
    sembrando: false,

    actualizadoRapido: function (id, cuadroEntero) {
        var xF = escenas.escenas["Huerta"].elementosEscena[id].xF;
        var yF = escenas.escenas["Huerta"].elementosEscena[id].yF;

        escenas.escenas["Huerta"].copiasSeguridad[id] = escenas.escenas["Huerta"].elementosEscena[id];
        var cuadroFinal = funcionesEscenaHuerta.crearCuadro(xF, yF, cuadroEntero);
        cuadroFinal.actualizar();
        cuadroFinal.actualizando = true;
        escenas.escenas["Huerta"].elementosEscena[id] = cuadroFinal;
    },
    revertirActualizacion: function (ids) {
        for (var i = 0; i < ids.length; i++) {
            cuadroAlerta.mostrar("mensaje", "No hemos podido actualizar el cuadro. Revertiremos los cambios.", 0, 0);
            escenas.escenas["Huerta"].elementosEscena[ids[i]] = escenas.escenas["Huerta"].copiasSeguridad[ids[i]];
            escenas.escenas["Huerta"].copiasSeguridad[ids[i]] = undefined;
        }

    },
    actualizarCuadro: function (x, y, cantidadMonedas, cuadroEntero, vacio, cuadroAnterior) {

        if (firebase.usuario.idSesion == window.localStorage.getItem("idSesion")) {
            var cuadro;

            if (cuadroEntero.tipo == "Vacio") {
                cuadro = planedifComunes.Vacio;
            } else if (cuadroEntero.tipo == "#") {
                cuadro = planedifComunes.Ocupado;
            } else if (typeof cuadroEntero.planta !== "undefined" && cuadroEntero.planta == true) {
                cuadro = plantas[cuadroEntero.tipo];
            } else {
                cuadro = edificios[cuadroEntero.tipo];
            }

            var cantidadCuadrosX;
            var cantidadCuadrosY;

            if (typeof cuadroAnterior !== "undefined") {
                cantidadCuadrosX = cuadroAnterior.cantidadCuadrosX;
                cantidadCuadrosY = cuadroAnterior.cantidadCuadrosY;
            } else {
                cantidadCuadrosX = cuadro.cantidadCuadrosX;
                cantidadCuadrosY = cuadro.cantidadCuadrosY;
            }

            if (cantidadCuadrosX === undefined) {
                cantidadCuadrosX = 1;
                cantidadCuadrosY = 1;
            }

            var ids = [];
            var idsSecundarios = [];

            for (var yy = 0; yy < cantidadCuadrosY; yy++) {
                for (var xx = 0; xx < cantidadCuadrosX; xx++) {

                    ids.push((xx + x) + ":" + (yy + y));

                    if ((xx + x) + ":" + (yy + y) !== x + ":" + y) {
                        idsSecundarios.push({
                            x: (xx + x),
                            y: (yy + y)
                        });
                    }
                }
            }

            firebaseSesion.setDoc("huertas/" + firebaseSesion.usuario.uid + "/cuadros/" + x + ":" + y, cuadroEntero, function () {
                var cuadroEnteroSecundario;
                for (var i = 0; i < idsSecundarios.length; i++) {
                    if (vacio) {
                        cuadroEnteroSecundario = {
                            x: idsSecundarios[i].x,
                            y: idsSecundarios[i].y,
                            tipo: planedifComunes.Vacio.tipo,
                            tipoPadre: planedifComunes.Vacio.tipo,
                            planta: false,
                        };
                    } else {
                        cuadroEnteroSecundario = {
                            tipo: "#",
                            tipoPadre: cuadroEntero.tipo,
                            x: idsSecundarios[i].x,
                            y: idsSecundarios[i].y,
                        };
                    }

                    firebaseSesion.setDoc("huertas/" + firebaseSesion.usuario.uid + "/cuadros/" + idsSecundarios[i].x + ":" + idsSecundarios[i].y, cuadroEnteroSecundario, 0, 0);
                    escenas.escenas["Huerta"].elementosEscena[idsSecundarios[i].x + ":" + idsSecundarios[i].y].actualizando = false;
                }

                monedas.actualizar(cantidadMonedas);
                escenas.escenas["Huerta"].elementosEscena[x + ":" + y].actualizando = false;

            }, function () {
                escenas.escenas["Huerta"].revertirActualizacion(ids);
                monedas.revisar();
            });

        } else {
            $("contenedor-cargador").style.display = "block";
            firebase.auth().signOut()
                .then(() => {
                    window.location.href = "index.html";
                })
                .catch(e => {
                    console.error('Sign Out Error', e);
                });
        }


    },
    iniciar: function () {

        eventos.iniciarEventos([eventosTouchHuerta.iniciar, eventosRatonHuerta.iniciar]);

        function existe(dato) {

            escenaHuerta.huerta = dato;

            function correcto(datos) {
                escenaHuerta.crear(datos);
            }

            var ref = "huertas/" + firebaseSesion.usuario.uid + "/cuadros";
            firebaseSesion.getDocs(ref, correcto, 0);

        }

        var docHuerta = "huertas/" + firebaseSesion.usuario.uid;

        firebaseSesion.getDoc(docHuerta, existe, 0, 0);

    },
    crear: function (datos) {

        mapa.iniciar();
        interfaz.iniciar();

        //dibujar cuadros
        for (var y = escenaHuerta.huerta.valorCuadroMenorY, yF = 0; yF < escenaHuerta.huerta.cuadrosY; y++, yF++) {
            for (var x = escenaHuerta.huerta.valorCuadroMenorX, xF = 0; xF < escenaHuerta.huerta.cuadrosX; x++, xF++) {

                if (typeof datos[x + ":" + y] == "undefined") {
                    datos[x + ":" + y] = {
                        tipo: planedifComunes.Vacio.tipo,
                        tipoPadre: planedifComunes.Vacio.tipo,
                        planta: false,
                        tipoPadre: undefined,
                        x: x,
                        y: y,
                    };
                }

                var cuadroFinal = funcionesEscenaHuerta.crearCuadro(xF, yF, datos[x + ":" + y]);
                cuadroFinal.actualizar();
                this.elementosEscena[x + ":" + y] = cuadroFinal;

            }
        }

        this.cargado = true;
        tutorial.iniciar();

    },

    activar: function (delta, contexto) {

        if (this.cargado == true) {

            if (!constantesGlobales.prueba) {
                var cuadrosEnTotal = escenaHuerta.huerta.cuadrosX * escenaHuerta.huerta.cuadrosY;

                if (cuadrosEnTotal >= constantesGlobales.minimoDeCuadrosParaPublicidad) {
                    if (!publicidad.mostrado && !publicidad.presionado) {

                        if (!publicidad.iniciado) {
                            publicidad.iniciado = true;
                            publicidad.iniciarEventos();
                            publicidad.mostrado = true;
                            setTimeout(function () {
                                publicidad.mostrarPublicidad();
                            }, 5000);
                        } else {
                            publicidad.mostrado = true;
                            publicidad.mostrarPublicidad();
                        }


                    }
                }
            }

            mapa.actualizar();

            var cuadrosHijos = [];
            for (var y = escenaHuerta.huerta.valorCuadroMenorY, yF = 0; yF < escenaHuerta.huerta.cuadrosY; y++, yF++) {
                for (var x = escenaHuerta.huerta.valorCuadroMenorX, xF = 0; xF < escenaHuerta.huerta.cuadrosX; x++, xF++) {

                    this.elementosEscena[x + ":" + y].actualizar(delta);
                    this.elementosEscena[x + ":" + y].dibujar(contexto);

                    if (this.elementosEscena[x + ":" + y].cantidadCuadrosX > 1 ||
                        this.elementosEscena[x + ":" + y].cantidadCuadrosY > 1) {
                        for (var iy = 0; iy < this.elementosEscena[x + ":" + y].cantidadCuadrosY; iy++) {
                            for (var ix = 0; ix < this.elementosEscena[x + ":" + y].cantidadCuadrosY; ix++) {
                                if (iy != 0) {
                                    cuadrosHijos[(x + ix) + ":" + (y + iy)] = {
                                        idPadre: x + ":" + y,
                                    };
                                }

                            }
                        }
                    }

                    if (typeof cuadrosHijos[x + ":" + y] !== "undefined") {
                        this.elementosEscena[cuadrosHijos[x + ":" + y].idPadre].actualizar(delta);
                        this.elementosEscena[cuadrosHijos[x + ":" + y].idPadre].dibujar(contexto);
                    }

                }
            }

            for (var i in this.elementosExtra) {
                if (this.elementosExtra[i] !== null) {
                    this.elementosExtra[i].actualizar(delta);
                    this.elementosExtra[i].dibujar(contexto);
                }

            }

            eventos.verificarClic();

        }


    }
}
