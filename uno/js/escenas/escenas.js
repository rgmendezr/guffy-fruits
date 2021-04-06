var escenas = {

    escenas: [],
    escenaActual: "",

    cambiarEscena: function (proximaEscena) {
        
        escenas.escenas[escenaCargador.nombreEscena] = escenaCargador;
        escenas.escenas[escenaCargador.nombreEscena].iniciar();
        escenas.escenaActual = escenaCargador.nombreEscena;
        
        var correcto = function (){
            escenas.escenas[proximaEscena.nombreEscena] = proximaEscena;
            escenas.escenas[proximaEscena.nombreEscena].iniciar();
            escenas.escenaActual = proximaEscena.nombreEscena;
        }
        
        cargador.cargarArchivos(proximaEscena.archivos, correcto);

    },

    activar: function (delta, contexto) {

            escenas.escenas[escenas.escenaActual].activar(delta, contexto);

    },

};
