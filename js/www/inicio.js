var correcto = false;

var firebaseApp = {
    iniciar: function () {
        firebaseSesion.getDoc("huertas/" + firebaseSesion.usuario.uid, firebaseApp.existe, firebaseApp.crearHuerta);
    },
    existe: function (doc) {
        if (typeof doc.finalizado !== "undefined" &&
            doc.finalizado == "Logrado") {
            $("personaje").classList.add("p-final");
            dialogo.indiceConversacion = 10;
        } else {
            $("personaje").classList.add("p-2");
            dialogo.indiceConversacion = -3;
        }
        dialogo.iniciar();
    },
    crearHuerta: function () {
        dialogo.iniciar();

        var parametros = {
            cuadrosX: constantesGlobales.cantidadCuadrosInicialX,
            cuadrosY: constantesGlobales.cantidadCuadrosInicialY,
            valorCuadroMenorX: (constantesGlobales.cantidadCuadrosInicialX / 2) * -1,
            valorCuadroMenorY: (constantesGlobales.cantidadCuadrosInicialY / 2) * -1,
            creacion: firebase.firestore.FieldValue.serverTimestamp(),
        };

        var referencia = "huertas/" + firebaseSesion.usuario.uid;

        firebaseSesion.setDoc(referencia, parametros, function () {
            correcto = true;
        }, 0);

    },

};


var dialogo = {
    indiceConversacion: 0,
    indice: 0,
    impresor: null,
    texto: "",
    textoBoton: "",
    continuar: function () {
        dialogo.indiceConversacion++;
        dialogo.iniciar();
    },
    iniciar: function () {
        $("personaje").style.display = "block";
        $("contenedor-dialogo").style.display = "block";
        $("boton").style.display = "none";

        switch (dialogo.indiceConversacion) {
            case -3:
                dialogo.escribirTexto(traducciones.inicioJS["dialogoM3"][firebaseSesion.usuario.datos.idioma], traducciones.inicioJS["botonM3"][firebaseSesion.usuario.datos.idioma]);
                break;
            case -2:
                dialogo.escribirTexto(traducciones.inicioJS["dialogoM2"][firebaseSesion.usuario.datos.idioma], traducciones.inicioJS["botonM2"][firebaseSesion.usuario.datos.idioma]);
                break;
            case -1:
                dialogo.escribirTexto(traducciones.inicioJS["dialogoM1"][firebaseSesion.usuario.datos.idioma], "#");
                setTimeout(function () {
                    window.location.href = "huerta.html";
                }, 2000);

                break;
            case 0:
                dialogo.escribirTexto(traducciones.inicioJS["dialogo0"][firebaseSesion.usuario.datos.idioma] + firebaseSesion.usuario.datos.nombre, traducciones.inicioJS["boton0"][firebaseSesion.usuario.datos.idioma]);
                break;
            case 1:
                dialogo.escribirTexto(traducciones.inicioJS["dialogo1"][firebaseSesion.usuario.datos.idioma], traducciones.inicioJS["boton1"][firebaseSesion.usuario.datos.idioma]);
                break;
            case 2:
                dialogo.escribirTexto(traducciones.inicioJS["dialogo2"][firebaseSesion.usuario.datos.idioma], traducciones.inicioJS["boton2"][firebaseSesion.usuario.datos.idioma]);
                break;
            case 3:
                dialogo.escribirTexto(traducciones.inicioJS["dialogo3"][firebaseSesion.usuario.datos.idioma], traducciones.inicioJS["boton3"][firebaseSesion.usuario.datos.idioma]);
                break;
            case 4:
                dialogo.escribirTexto(traducciones.inicioJS["dialogo4"][firebaseSesion.usuario.datos.idioma], traducciones.inicioJS["boton4"][firebaseSesion.usuario.datos.idioma]);
                break;
            case 5:
                dialogo.escribirTexto(traducciones.inicioJS["dialogo5"][firebaseSesion.usuario.datos.idioma], traducciones.inicioJS["boton5"][firebaseSesion.usuario.datos.idioma]);
                break;
            case 6:
                dialogo.escribirTexto(traducciones.inicioJS["dialogo6"][firebaseSesion.usuario.datos.idioma], traducciones.inicioJS["boton6"][firebaseSesion.usuario.datos.idioma]);
                break;
            case 7:
                dialogo.escribirTexto(traducciones.inicioJS["dialogo7"][firebaseSesion.usuario.datos.idioma], traducciones.inicioJS["boton7"][firebaseSesion.usuario.datos.idioma]);
                break;
            case 8:
                dialogo.escribirTexto(traducciones.inicioJS["dialogo8"][firebaseSesion.usuario.datos.idioma], traducciones.inicioJS["boton8"][firebaseSesion.usuario.datos.idioma]);
                break;
            case 9:
                dialogo.escribirTexto(traducciones.inicioJS["dialogo9"][firebaseSesion.usuario.datos.idioma], "#");
                setTimeout(function () {

                    if (correcto) {
                        window.location.href = "huerta.html";
                    } else {
                        cuadroAlerta.mostrar("sentencia", "Error: CH0001", 0, 0);
                    }

                }, 1000);
                break;
            case 10:
                dialogo.escribirTexto(traducciones.inicioJS["mensajeFinal10"][firebaseSesion.usuario.datos.idioma], traducciones.inicioJS["boton10"][firebaseSesion.usuario.datos.idioma]);
                break;
            case 11:
                dialogo.escribirTexto(traducciones.inicioJS["mensajeFinal11"][firebaseSesion.usuario.datos.idioma], traducciones.inicioJS["boton11"][firebaseSesion.usuario.datos.idioma]);
                break;
            case 12:
                dialogo.escribirTexto(traducciones.inicioJS["mensajeFinal12"][firebaseSesion.usuario.datos.idioma], traducciones.inicioJS["boton12"][firebaseSesion.usuario.datos.idioma]);
                break;
            case 13:
                dialogo.escribirTexto(traducciones.inicioJS["mensajeFinal13"][firebaseSesion.usuario.datos.idioma], traducciones.inicioJS["boton13"][firebaseSesion.usuario.datos.idioma]);
                break;
            case 14:
                dialogo.escribirTexto(traducciones.inicioJS["mensajeFinal14"][firebaseSesion.usuario.datos.idioma], traducciones.inicioJS["boton14"][firebaseSesion.usuario.datos.idioma]);
                break;
            case 15:
                dialogo.escribirTexto(traducciones.inicioJS["mensajeFinal15"][firebaseSesion.usuario.datos.idioma], traducciones.inicioJS["boton15"][firebaseSesion.usuario.datos.idioma]);
                break;
            case 16:
                dialogo.escribirTexto(traducciones.inicioJS["mensajeFinal16"][firebaseSesion.usuario.datos.idioma], traducciones.inicioJS["boton16"][firebaseSesion.usuario.datos.idioma]);
                break;
            case 17:
                $("personaje").classList.add("iconoApp");
                dialogo.escribirTexto(traducciones.inicioJS["mensajeFinal17"][firebaseSesion.usuario.datos.idioma], traducciones.inicioJS["boton17"][firebaseSesion.usuario.datos.idioma]);
                break;
            case 18:
                dialogo.escribirTexto(traducciones.inicioJS["mensajeFinal18"][firebaseSesion.usuario.datos.idioma], traducciones.inicioJS["boton18"][firebaseSesion.usuario.datos.idioma]);
                break;
            case 19:
                dialogo.escribirTexto(traducciones.inicioJS["mensajeFinal19"][firebaseSesion.usuario.datos.idioma], traducciones.inicioJS["boton12"][firebaseSesion.usuario.datos.idioma]);
                break;
            case 20:
                dialogo.escribirTexto(traducciones.inicioJS["mensajeFinal20"][firebaseSesion.usuario.datos.idioma], traducciones.inicioJS["boton20"][firebaseSesion.usuario.datos.idioma]);
                break;
            case 21:
                dialogo.escribirTexto(traducciones.inicioJS["mensajeFinal21"][firebaseSesion.usuario.datos.idioma], traducciones.inicioJS["boton21"][firebaseSesion.usuario.datos.idioma]);
                break;
            case 22:
                dialogo.escribirTexto(traducciones.inicioJS["mensajeFinal22"][firebaseSesion.usuario.datos.idioma], traducciones.inicioJS["boton22"][firebaseSesion.usuario.datos.idioma]);
                break;
            case 23:
                var docRef = firebaseSesion.db.doc("huertas/" + firebaseSesion.usuario.uid);
                docRef.update({
                        finalizado: "Finalizado",
                    }).then(function () {
                        console.log("Correcto");
                    })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                    });
                    
                dialogo.escribirTexto(traducciones.inicioJS["mensajeFinal23"][firebaseSesion.usuario.datos.idioma] + firebaseSesion.usuario.datos.nombre + ".", traducciones.inicioJS["boton23"][firebaseSesion.usuario.datos.idioma]);
                break;
            case 24:
                dialogo.escribirTexto(traducciones.inicioJS["mensajeFinal24"][firebaseSesion.usuario.datos.idioma], "#");
                setTimeout(function () {
                    window.location.href = "huerta.html";
                }, 2000);
                break;


        }

    },
    escribirTexto: function (texto, textoBoton) {
        dialogo.texto = texto;
        dialogo.textoBoton = textoBoton;

        $("texto-dialogo").innerHTML = "";
        dialogo.impresor = setInterval(function () {
            if (dialogo.indice < dialogo.texto.length) {
                $("texto-dialogo").innerHTML += dialogo.texto.charAt(dialogo.indice);
                dialogo.indice++;
            } else {
                $("texto-boton").innerHTML = dialogo.textoBoton;
                if (dialogo.textoBoton != "#") {
                    $("boton").style.display = "block";
                }
                clearInterval(dialogo.impresor);
                dialogo.indice = 0;
            }
        }, 80);

    },
};

function activarMarcha() {
    document.addEventListener("backbutton", function () {}, false);
    firebaseApp.iniciar();
    $("contenedor-cargador").style.display = "none";
}

function quitarCargador() {
    cuadroAlerta.insertar();
    firebaseSesion.iniciar();
    firebaseSesion.verificarSesion(activarMarcha);
    $("boton").addEventListener("click", dialogo.continuar, false);
}

function empezar() {
    if (!constantesGlobales.prueba) {
        document.addEventListener('deviceready', quitarCargador, false);
    } else {
        quitarCargador();
    }

}

window.addEventListener("load", empezar, false);
