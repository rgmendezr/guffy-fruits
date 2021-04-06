
function activarMarcha() {
    firebaseApp.iniciar();
    $("contenedor-cargador").style.display = "none";
}

function quitarCargador() {
    cuadroAlerta.insertar();
    firebaseSesion.iniciar();
    firebaseSesion.verificarSesion(activarMarcha);
}

function empezar(){
    if(!constantesGlobales.prueba){
       document.addEventListener('deviceready', quitarCargador, false);
    }else{
        quitarCargador();
    }
    
}

window.addEventListener("load", empezar, false);