var escenaCargador = {
    nombreEscena: "Cargador",
    elementosEscena: [],
    cargado: false,
    iniciar: function () {
        this.crear();
        this.cargado = true;
    },
    crear: function () {
        var elementosEscena = [];

        var cuadro1 = objetosEscenaCargador.crearCuadro();
        cuadro1.iniciar(pantalla.centroPantallaX - 5, pantalla.centroPantallaY - 5, 10, 10, "derecha", 50, 0);

        this.elementosEscena.push(cuadro1);

        var cuadro2 = objetosEscenaCargador.crearCuadro();
        cuadro2.iniciar(pantalla.centroPantallaX - 5, pantalla.centroPantallaY - 5, 10, 10, "izquierda", 50, 0);

        this.elementosEscena.push(cuadro2);

        var cuadro3 = objetosEscenaCargador.crearCuadro();
        cuadro3.iniciar(pantalla.centroPantallaX - 5, pantalla.centroPantallaY - 5, 10, 10, "arriba", 50, 0);

        this.elementosEscena.push(cuadro3);

        var cuadro4 = objetosEscenaCargador.crearCuadro();
        cuadro4.iniciar(pantalla.centroPantallaX - 5, pantalla.centroPantallaY - 5, 10, 10, "abajo", 50, 0);

        this.elementosEscena.push(cuadro4);
    },
    activar: function (delta, contexto) {
        if (this.cargado == true) {
            for (var i = 0; i < this.elementosEscena.length; i++) {
                this.elementosEscena[i].actualizar(delta);
                this.elementosEscena[i].verificar();
                this.elementosEscena[i].dibujar(contexto);
            }
        }
    },
};
