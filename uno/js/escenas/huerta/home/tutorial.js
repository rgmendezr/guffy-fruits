var tutorial = {
    activo: false,
    pasos: [],
    iniciar: function () {
        if (typeof escenas.escenas["Huerta"].huerta.tutorial == "undefined") {        
            tutorial.activo = true;
            tutorial.paso(0);        
        }
    },
    paso: function (paso) {
        if (tutorial.activo && tutorial.pasos.indexOf("Paso" + paso) == -1) {
            switch (paso) {
                case 0:
                    tutorial.pasos.push("Paso"+paso);
                    $("contenedor-interfaz").style.display = "none";
                    cuadroAlerta.mostrar("confirmar", traducciones.tutorial["m0"][firebaseSesion.usuario.datos.idioma], tutorial.cerrarTutorial, function(){
                        tutorial.activo = false;
                        tutorial.cerrarTutorial();
                    });
                    break;
                case 2:
                    tutorial.pasos.push("Paso"+paso);
                    cuadroAlerta.mostrar("mensaje", traducciones.tutorial["m1"][firebaseSesion.usuario.datos.idioma], 0, 0);
                    break;
                case 3:
                    tutorial.pasos.push("Paso"+paso);
                    cuadroAlerta.mostrar("mensaje", traducciones.tutorial["m2"][firebaseSesion.usuario.datos.idioma], 0, 0);
                    break;
                case 4:
                    tutorial.pasos.push("Paso"+paso);
                    cuadroAlerta.mostrar("mensaje", traducciones.tutorial["m3"][firebaseSesion.usuario.datos.idioma], function () {
                        tutorial.paso(5);
                    }, 0);
                    break;
                case 5:
                    tutorial.pasos.push("Paso"+paso);
                    cuadroAlerta.mostrar("mensaje", traducciones.tutorial["m4"][firebaseSesion.usuario.datos.idioma], 0, 0);
                    break;
                case 6:
                    tutorial.pasos.push("Paso"+paso);
                    cuadroAlerta.mostrar("mensaje", traducciones.tutorial["m5"][firebaseSesion.usuario.datos.idioma], 0, 0);
                    break;
                case 7:
                    tutorial.pasos.push("Paso"+paso);
                    cuadroAlerta.mostrar("mensaje", traducciones.tutorial["m6"][firebaseSesion.usuario.datos.idioma], 0, 0);
                    break;
                case 8:
                    tutorial.pasos.push("Paso"+paso);
                    cuadroAlerta.mostrar("mensaje", traducciones.tutorial["m7"][firebaseSesion.usuario.datos.idioma], 0, 0);
                    break;

            }
        }

    },
    cerrarTutorial: function () {
        $("contenedor-interfaz").style.display = "block";

        var docRef = firebaseSesion.db.doc("huertas/" + firebaseSesion.usuario.uid);
        docRef.update({
                tutorial: "Mostrado",
            }).then(function () {
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });

    },
};
