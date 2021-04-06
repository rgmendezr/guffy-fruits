var funcionesEscenaHuerta = {

    crearCuadro: function (xF, yF, cuadroEntero) {

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

        return {
            actualizando: false,

            cuadro: cuadro,
            cuadroEntero: cuadroEntero,

            xF: xF,
            yF: yF,

            imagen: null,

            pocicionXCuadro: 0,
            pocicionYCuadro: 0,

            xCuadroFinal: cuadro.xCuadro,
            yCuadroFinal: cuadro.yCuadro,

            cantidadCuadrosX: 1,
            cantidadCuadrosY: 1,

            xDibujo: 0,
            yDibujo: 0,

            dx: 0,
            dy: 0,

            anchoImagenFinal: 0,
            altoImagenFinal: 0,

            apc: false,

            oculto: false,

            estadoCrecimiento: undefined,

            actualizar: function (delta) {

                this.cantidadCuadrosX = this.cuadro.cantidadCuadrosX;
                this.cantidadCuadrosY = this.cuadro.cantidadCuadrosY;

                if (this.cantidadCuadrosX === undefined) {
                    this.cantidadCuadrosX = 1;
                    this.cantidadCuadrosY = 1;
                }

                var escala = (this.cantidadCuadrosY * constantesHuerta.altoCuadroInicial) / (this.cuadro.yCuadroTermino - this.cuadro.yCuadro);

                var escalaX = (this.cantidadCuadrosX * constantesHuerta.anchoCuadroInicial) / (this.cuadro.xCuadroTermino - this.cuadro.xCuadro);

                var anchoImagen = (this.cuadro.xCuadroTermino - this.cuadro.xCuadro) * escalaX;
                anchoImagen *= mapa.zoom;

                var altoImagen = (this.cuadro.yCuadroTermino - this.cuadro.yCuadro) * escala;
                altoImagen *= mapa.zoom;

                this.anchoImagenFinal = this.cuadro.ancho * escalaX;
                this.anchoImagenFinal *= mapa.zoom;

                this.altoImagenFinal = this.cuadro.alto * escala;
                this.altoImagenFinal *= mapa.zoom;

                this.xCuadroFinal = this.cuadro.xCuadro * escalaX;
                this.xCuadroFinal *= mapa.zoom;
                this.yCuadroFinal = this.cuadro.yCuadro * escala;
                this.yCuadroFinal *= mapa.zoom;

                this.xDibujo = (constantesHuerta.anchoCuadroInicial * escenaHuerta.huerta.cuadrosX) / 2;
                this.xDibujo -= constantesHuerta.anchoCuadroInicial / 2;
                this.xDibujo -= (this.yF + (this.cantidadCuadrosY - 1)) * (constantesHuerta.anchoCuadroInicial / 2);
                this.xDibujo += (this.xF * (constantesHuerta.anchoCuadroInicial / 2));
                this.xDibujo *= mapa.zoom;
                this.xDibujo -= this.xCuadroFinal;
                this.xDibujo += mapa.xMapa;

                this.yDibujo = this.yF * (constantesHuerta.altoCuadroInicial / 2);
                this.yDibujo += this.xF * (constantesHuerta.altoCuadroInicial / 2);
                this.yDibujo *= mapa.zoom;
                this.yDibujo -= this.yCuadroFinal;
                this.yDibujo += mapa.yMapa;

                this.pocicionXCuadro = this.xDibujo + this.xCuadroFinal;
                this.pocicionYCuadro = this.yDibujo + this.yCuadroFinal;

                if (cuadroEntero.planta !== undefined && cuadroEntero.planta == true) {
                    this.seleccionarImagen();
                } else {
                    this.imagen = archivosGlobales.imagenes[cuadro.imagen];
                }


            },
            seleccionarImagen: function () {

                var fechaActual = firebase.firestore.Timestamp.now();
                fechaActual = fechaActual.toDate();

                var naciendo = this.cuadroEntero.estados.naciendo;
                var creciendo = this.cuadroEntero.estados.creciendo;
                var perfecto = this.cuadroEntero.estados.perfecto;
                var marchito = this.cuadroEntero.estados.marchito;

                if (this.cuadroEntero.estados.marchito.constructor !== Date) {
                    naciendo = naciendo.toDate();
                    creciendo = creciendo.toDate();
                    perfecto = perfecto.toDate();
                    marchito = marchito.toDate();
                }

                if (fechas.comparar(marchito, fechaActual) == -1) {

                    this.imagen = archivosGlobales.imagenes[cuadro.estados.marchito];
                    this.estadoCrecimiento = "Marchito";

                } else if (fechas.comparar(perfecto, fechaActual) == -1) {

                    this.imagen = archivosGlobales.imagenes[cuadro.estados.perfecto];
                    this.estadoCrecimiento = "Perfecto";

                } else if (fechas.comparar(creciendo, fechaActual) == -1) {

                    this.imagen = archivosGlobales.imagenes[cuadro.estados.creciendo];
                    this.estadoCrecimiento = "Creciendo";

                } else if (fechas.comparar(naciendo, fechaActual) == -1) {

                    this.imagen = archivosGlobales.imagenes[cuadro.estados.naciendo];
                    this.estadoCrecimiento = "Naciendo";

                } else {
                    this.imagen = archivosGlobales.imagenes[planedifComunes.Tierra.imagen];
                    this.estadoCrecimiento = "Tierra";
                }



            },
            verificar: function () {

                var accion = function (parametros) {

                    var elemento = escenas.escenas["Huerta"].elementosEscena[parametros.id];
                    if (!elemento.actualizando && eventosTouchHuerta.movimiento < 10) {

                        if (variablesHuerta.ocultarElemento) {
                            if (elemento.cuadro.tipo != "Vacio" &&
                                elemento.cuadro.tipo != "Camino1") {
                                if (elemento.oculto) {
                                    escenas.escenas["Huerta"].elementosEscena[parametros.id].oculto = false;
                                } else {
                                    escenas.escenas["Huerta"].elementosEscena[parametros.id].oculto = true;
                                }
                            }

                        } else if (sembrar.activo && elemento.cuadro.tipo == "Vacio") {
                            if (!sembrar.funcionCadena) {
                                sembrar.planta(parametros.x, parametros.y);
                            } else {
                                sembrar.cadena(parametros.x, parametros.y);
                            }

                        } else if (construir.activo && construir.tipo == "Camino1" && elemento.cuadro.tipo == "Vacio") {
                            construir.camino(parametros.x, parametros.y);
                        } else if (typeof elemento.cuadroEntero.planta != "undefined" && elemento.cuadroEntero.planta == true) {
                             if (!sembrar.funcionCadena) {
                                 recolectar.planta(parametros.x, parametros.y);
                             }else{
                                 recolectar.cadena(parametros.x, parametros.y);
                             }
                            
                        } else if (demoler.activo &&
                            (typeof elemento.cuadroEntero.planta == "undefined" ||
                                elemento.cuadroEntero.planta == false) &&
                            elemento.cuadro.tipo != "Vacio" &&
                            elemento.cuadro.tipo != "Ocupado") {
                            demoler.construccion(parametros.x, parametros.y);
                        }

                    }

                };

                return {
                    tipo: "rombo",
                    xInicioCuadro: this.pocicionXCuadro,
                    yInicioCuadro: this.pocicionYCuadro,
                    ancho: (this.cantidadCuadrosX * constantesHuerta.anchoCuadroInicial) * mapa.zoom,
                    alto: (this.cantidadCuadrosY * constantesHuerta.altoCuadroInicial) * mapa.zoom,
                    accion: accion,
                    parametros: {
                        id: this.cuadroEntero.x + ":" + this.cuadroEntero.y,
                        x: this.cuadroEntero.x,
                        y: this.cuadroEntero.y,
                    }
                };

            },
            dibujar: function (contexto) {
                if (!this.oculto) {
                    var imagen = this.imagen;

                    if (this.cuadro.tipo == "Vacio" && !escenas.escenas["Huerta"].sembrando) {
                        imagen = archivosGlobales.imagenes[planedifComunes.Ocupado.imagen];
                    }

                    contexto.drawImage(imagen, this.dx, this.dy, this.cuadro.ancho, this.cuadro.alto, this.xDibujo, this.yDibujo, this.anchoImagenFinal, this.altoImagenFinal);

                } else {
                    this.dibujarOculto(contexto);
                }

            },
            dibujarOculto: function (contexto) {

                var iOculto = archivosGlobales.imagenes[planedifComunes.Oculto.imagen];

                var escala = (this.cantidadCuadrosY * constantesHuerta.altoCuadroInicial) / (planedifComunes.Oculto.yCuadroTermino - planedifComunes.Oculto.yCuadro);

                var escalaX = (this.cantidadCuadrosX * constantesHuerta.anchoCuadroInicial) / (planedifComunes.Oculto.xCuadroTermino - planedifComunes.Oculto.xCuadro);

                var anchoImagenFinal = planedifComunes.Oculto.ancho * escalaX;
                anchoImagenFinal *= mapa.zoom;

                var altoImagenFinal = planedifComunes.Oculto.alto * escala;
                altoImagenFinal *= mapa.zoom;

                var xCuadroFinal = planedifComunes.Oculto.xCuadro * escalaX;
                var yCuadroFinal = planedifComunes.Oculto.yCuadro * escala;

                var xDibujo = (constantesHuerta.anchoCuadroInicial * escenaHuerta.huerta.cuadrosX) / 2;
                xDibujo -= constantesHuerta.anchoCuadroInicial / 2;
                xDibujo -= (this.yF + (this.cantidadCuadrosY - 1)) * (constantesHuerta.anchoCuadroInicial / 2);
                xDibujo += (this.xF * (constantesHuerta.anchoCuadroInicial / 2));
                xDibujo -= xCuadroFinal;
                xDibujo *= mapa.zoom;
                xDibujo += mapa.xMapa;

                var yDibujo = this.yF * (constantesHuerta.altoCuadroInicial / 2);
                yDibujo += this.xF * (constantesHuerta.altoCuadroInicial / 2);
                yDibujo -= yCuadroFinal;
                yDibujo *= mapa.zoom;
                yDibujo += mapa.yMapa;

                contexto.drawImage(iOculto, this.dx, this.dy, planedifComunes.Oculto.ancho, planedifComunes.Oculto.alto, xDibujo, yDibujo, anchoImagenFinal, altoImagenFinal);

            }

        };
    },

};
