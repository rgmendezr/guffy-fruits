var selectorIdioma = {
    idioma: "es",
    opAr: false,

    mostrarOcultarOpcionesIdioma: function () {
        if (selectorIdioma.opAr) {
            $('opciones-idioma').style.display = 'none';
            selectorIdioma.opAr = false;
        } else {
            $('opciones-idioma').style.display = 'block';
            selectorIdioma.opAr = true;
        }

    },

    ocultarOpcionesIdioma: function () {
        $('opciones-idioma').style.display = 'none';
        selectorIdioma.opAr = false;
    },

    seleccionarIdioma: function (codigo, nombre, clave) {
        $('imagen-idioma').style.backgroundImage = "url(../imagenes/registro/banderas/" + codigo + ".png)";
        $('nombre-idioma').innerHTML = nombre;
        selectorIdioma.idioma = clave;
        selectorIdioma.ocultarOpcionesIdioma();
        traducir(traducciones.configuracion, selectorIdioma.idioma);
    },
};


//***************************
var firebaseApp = {
    verificarSesion: function (iniciar) {
        if (firebaseSesion.activo && navigator.onLine) {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    // User is signed in
                    $("nombre-usuario").value = user.displayName;
                    iniciar();
                } else {
                    window.location.href = "../index.html";
                }
                // ...

            });

        }else{
            firebaseSesion.reconectando();
        }
    },
    guardar: function () {
        if (firebaseSesion.activo && navigator.onLine) {

            if ($("nombre-usuario").value !== "") {

                var user = firebase.auth().currentUser;

                user.updateProfile({
                    displayName: $("nombre-usuario").value,
                }).then(function () {

                    var docRef = firebaseSesion.db.collection("usuarios").doc(user.uid);

                    docRef.get().then(function (doc) {

                        var idSesion = cadenaAleatoria(30);
                        window.localStorage.setItem('idSesion', idSesion);
                        if (doc.exists) {

                            docRef.update({
                                    nombre: $("nombre-usuario").value,
                                    idioma: selectorIdioma.idioma,
                                    idSesion: idSesion,
                                })
                                .then(function () {

                                    window.location.href = "../inicio.html";

                                    console.log("Document successfully written!");
                                })
                                .catch(function (error) {
                                    console.error("Error writing document: ", error);
                                });


                        } else {

                            firebaseSesion.db.collection("usuarios").doc(user.uid).set({
                                    nombre: $("nombre-usuario").value,
                                    idioma: selectorIdioma.idioma,
                                    monedas: constantesGlobales.cantidadMonedasIniciales,
                                    idSesion: idSesion,
                                })
                                .then(function () {

                                    window.location.href = "../inicio.html";

                                    console.log("Document successfully written!");
                                })
                                .catch(function (error) {
                                    console.error("Error writing document: ", error);
                                });

                        }


                    }).catch(function (error) {
                        console.log("Error getting document:", error);
                    });



                }).catch(function (error) {
                    cuadroAlerta.mostrar("mensaje", traducciones.configuracionJS["alertaErrorCambiandoNombre"][selectorIdioma.idioma], 0, 0);
                });

            } else {
                cuadroAlerta.mostrar("mensaje", traducciones.configuracionJS["campoInvalido"][selectorIdioma.idioma], 0, 0);
            }


        }else{
            firebaseSesion.reconectando();
        }
    },
};

//*************************
function activarMarcha() {
    $("boton").addEventListener("click", firebaseApp.guardar, false);
    $("contenedor-cargador").style.display = "none";
}

function quitarCargador() {
    cuadroAlerta.insertar();
    firebaseSesion.iniciar();
    firebaseApp.verificarSesion(activarMarcha);
}

function empezar(){
    if(!constantesGlobales.prueba){
       document.addEventListener('deviceready', quitarCargador, false);
    }else{
        quitarCargador();
    }
    
}

window.addEventListener("load", empezar, false);
