var firebaseApp = {

    iniciar: function () {
        traducir(traducciones.huerta, firebaseSesion.usuario.datos.idioma);
        $("contador-monedas").innerHTML = firebaseSesion.usuario.datos.monedas;

        $("contenedor-interfaz").style.display = "block";
        programador.iniciar();
    },

};
