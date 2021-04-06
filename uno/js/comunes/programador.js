var programador = {
    
    ultimoCuadro: 0,
    contexto: null,
    canvas: null,
    velocidadAnimacion: 0.3,
    sonidos: true,
    escenas: [],
    escenaActual: "cargador",
    delta: 0,
    iniciar: function () {
        
        
        programador.canvas = document.getElementById("juego");
        programador.contexto = programador.canvas.getContext("2d");
        
        pantalla.iniciar();
        
        escenas.cambiarEscena(escenaHuerta);
        

        window.obtenerCuadroAnimacion = (function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback, element) {
                    window.setTimeout(programador.buclePrincipal, 1000 / 60);
                };
        })();
        obtenerCuadroAnimacion(programador.buclePrincipal);
    },
    
    buclePrincipal: function () {

        pantalla.actualizar();

        var esteCuadro = new Date().getTime();
        programador.delta = (esteCuadro - programador.ultimoCuadro) / 1000;
        programador.ultimoCuadro = esteCuadro;

        programador.contexto.fillStyle = "#8ea50f";
        programador.contexto.fillRect(0, 0, pantalla.anchoPantalla, pantalla.altoPantalla);

        escenas.activar(programador.delta, programador.contexto);
        
        obtenerCuadroAnimacion(programador.buclePrincipal);
    }
    

};
