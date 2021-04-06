var funcionesEscenaExtra = {
    crearCuadroContruir: function (cuadro) {

        return {
            cuadro: cuadro,

            x: null,
            y: null,

            dx: 0,
            dy: 0,

            cantidadCuadrosX: 1,
            cantidadCuadrosY: 1,

            anchoImagenFinal: 0,
            altoImagenFinal: 0,

            xCuadroFinal: 0,
            yCuadroFinal: 0,

            pocicionTemporalX: null,
            pocicionTemporalY: null,

            xDibujo: null,
            yDibujo: null,

            pocicionXCuadro: 0,
            pocicionYCuadro: 0,

            restablecer: false,

            actualizar: function (delta) {

                if (this.restablecer) {
                    this.pocicionTemporalX = this.pocicionXCuadro;
                    this.pocicionTemporalY = this.pocicionYCuadro;
                    this.restablecer = false;
                }

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


                if (this.xDibujo == null && this.yDibujo == null) {
                    var d2 = this.anchoImagenFinal / 2;
                    var un = d2 - ((this.cuadro.xCuadro * escalaX) + (anchoImagen / 2));
                    this.xDibujo = pantalla.centroPantallaX - d2 + un;


                    var d2y = this.anchoImagenFinal / 2;
                    var uny = d2y - ((this.cuadro.yCuadro * escala) + (altoImagen / 2));
                    this.yDibujo = pantalla.centroPantallaY - d2y + uny;

                    this.pocicionXCuadro = this.xDibujo + this.xCuadroFinal;
                    this.pocicionYCuadro = this.yDibujo + this.yCuadroFinal;

                    this.pocicionTemporalX = this.pocicionXCuadro;
                    this.pocicionTemporalY = this.pocicionYCuadro;

                }


                var anchoUnCuadro = constantesHuerta.anchoCuadroInicial * mapa.zoom;
                var altoUnCuadro = constantesHuerta.altoCuadroInicial * mapa.zoom;

                var anchoCuadro = anchoUnCuadro * this.cantidadCuadrosX;
                var altoCuadro = altoUnCuadro * this.cantidadCuadrosY;

                construir.puesto = false;

                for (var i in escenas.escenas["Huerta"].elementosEscena) {

                    var xD = escenas.escenas["Huerta"].elementosEscena[i].pocicionXCuadro;
                    xD += (escenas.escenas["Huerta"].elementosEscena[i].cantidadCuadrosX - 1) * (anchoUnCuadro / 2);

                    var yD = escenas.escenas["Huerta"].elementosEscena[i].pocicionYCuadro;

                    if (xD + (anchoUnCuadro / 2) > this.pocicionTemporalX + (anchoCuadro / 2) - (anchoUnCuadro / 2) &&
                        xD + (anchoUnCuadro / 2) < this.pocicionTemporalX + (anchoCuadro / 2) + (anchoUnCuadro / 2) &&
                        yD > this.pocicionTemporalY &&
                        yD < this.pocicionTemporalY + (altoUnCuadro / 2)) {

                        this.xDibujo = xD;
                        this.xDibujo -= this.xCuadroFinal;
                        this.xDibujo -= (anchoUnCuadro / 2) * (this.cantidadCuadrosX - 1);

                        this.yDibujo = yD - this.yCuadroFinal;

                        this.x = escenas.escenas["Huerta"].elementosEscena[i].cuadroEntero.x;
                        this.y = escenas.escenas["Huerta"].elementosEscena[i].cuadroEntero.y;


                    }

                }

                this.pocicionXCuadro = this.xDibujo + this.xCuadroFinal;
                this.pocicionYCuadro = this.yDibujo + this.yCuadroFinal;

                construir.apto = true;

                if (this.x != null && this.y != null) {
                    for (var y = 0; y < this.cantidadCuadrosY; y++) {
                        for (var x = 0; x < this.cantidadCuadrosX; x++) {
                            var id = (x + this.x) + ":" + (y + this.y);

                            if (x + this.x > escenas.escenas["Huerta"].huerta.valorCuadroMenorX +
                                escenas.escenas["Huerta"].huerta.cuadrosX - 1 ||
                                y + this.y > escenas.escenas["Huerta"].huerta.valorCuadroMenorY +
                                escenas.escenas["Huerta"].huerta.cuadrosY - 1) {
                                construir.apto = false;
                                console.log("f1");
                            }
                            if (construir.apto) {
                                if (escenas.escenas["Huerta"].elementosEscena[id].cuadro.tipo != "Vacio") {
                                    construir.apto = false;
                                }
                            }
                        }

                    }
                } else {
                    construir.apto = false;
                }



            },
            verificar: function () {

                var accion = function (parametros) {
                    construir.edificio(parametros.cuadro, parametros.x, parametros.y);
                };

                return {
                    tipo: "rombo",
                    xInicioCuadro: this.pocicionXCuadro,
                    yInicioCuadro: this.pocicionYCuadro,
                    ancho: (this.cantidadCuadrosX * constantesHuerta.anchoCuadroInicial) * mapa.zoom,
                    alto: (this.cantidadCuadrosY * constantesHuerta.altoCuadroInicial) * mapa.zoom,
                    accion: accion,
                    parametros: {
                        x: this.x,
                        y: this.y,
                        cuadro: this.cuadro,
                    }
                };

            },
            dibujar: function (contexto) {
                var imagen = archivosGlobales.imagenes[cuadro.imagen];

                this.dibujarApto(contexto);

                contexto.globalAlpha = 0.5;
                contexto.drawImage(imagen, this.dx, this.dy, cuadro.ancho, cuadro.alto, this.xDibujo, this.yDibujo, this.anchoImagenFinal, this.altoImagenFinal);
                contexto.globalAlpha = 1;

            },

            dibujarApto: function (contexto) {

                var iApto = archivosGlobales.imagenes[planedifComunes.NoApto.imagen];

                if (construir.apto) {
                    iApto = archivosGlobales.imagenes[planedifComunes.Apto.imagen];
                }

                var anchoImagenFinal = this.cantidadCuadrosX * constantesHuerta.anchoCuadroInicial;
                anchoImagenFinal *= mapa.zoom;

                var altoImagenFinal = this.cantidadCuadrosY * constantesHuerta.altoCuadroInicial;
                altoImagenFinal *= mapa.zoom;

                var xDibujo = this.pocicionXCuadro;
                var yDibujo = this.pocicionYCuadro;

                contexto.drawImage(iApto, this.dx, this.dy, planedifComunes.Apto.ancho, planedifComunes.Apto.alto, xDibujo, yDibujo, anchoImagenFinal, altoImagenFinal);
            },


        };
    },
};
