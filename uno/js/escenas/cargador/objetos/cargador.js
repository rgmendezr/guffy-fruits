var objetosEscenaCargador = {

    crearCuadro: function () {

        return {

            x: 0,
            y: 0,
            ancho: 0,
            alto: 0,
            direccion: "derecha",
            velocidadAnimacion: 0,
            velocidad: 1,
            unaAccion: false,
            retrasoInicioAnimacion: 0,
            tiempoAcumuladoParaAnimacion: 0,
            color: "#000000",

            iniciar: function (x, y, ancho, alto, direccion, velocidad, retrasoInicioAnimacion) {

                //definida aquí mismo
                this.velocidadAnimacion = 0.05;

                this.x = x;
                this.y = y;
                this.ancho = ancho;
                this.alto = alto;
                this.direccion = direccion;
                this.velocidad = velocidad;
                this.retrasoInicioAnimacion = retrasoInicioAnimacion;
            },

            actualizar: function (delta) {

                if (this.retrasoInicioAnimacion > 0) {
                    this.retrasoInicioAnimacion -= delta;
                } else {
                    this.tiempoAcumuladoParaAnimacion += delta;
                    if (this.tiempoAcumuladoParaAnimacion >= this.velocidadAnimacion) {
                        this.tiempoAcumuladoParaAnimacion = 0;
                        this.animar();
                    }
                }

            },

            animar: function () {

                this.color = "#" + Math.floor(Math.random() * (999999 - 100000) + 100000);

                if (this.direccion == "derecha") {


                    if (this.x + this.ancho + this.velocidad > pantalla.anchoPantalla) {

                        this.direccion = "abajo";

                    } else {
                        this.x += this.velocidad;
                    }


                } else if (this.direccion == "abajo") {

                    if (this.y + this.alto + this.velocidad > pantalla.altoPantalla) {

                        this.direccion = "izquierda";

                    } else {
                        this.y += this.velocidad;
                    }

                } else if (this.direccion == "izquierda") {


                    if (this.x - this.velocidad < 0) {

                        this.direccion = "arriba";

                    } else {
                        this.x -= this.velocidad;
                    }

                } else {

                    if (this.y - this.velocidad < 0) {

                        this.direccion = "derecha";

                    } else {
                        this.y -= this.velocidad;
                    }
                }
            },

            verificar: function () {

            },

            dibujar: function (contexto) {
                contexto.fillStyle = this.color;
                contexto.fillRect(this.x, this.y, this.ancho, this.alto);
            },

        };
    },

};
