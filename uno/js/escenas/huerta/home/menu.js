var menu = {
    botonMenu: function () {
        tutorial.paso(2);
        menu.accionAtras();
    },
    botonAtras: function () {
        if ($("contenedorAlerta").style.display == "block") {
            cuadroAlerta.accionCancelar();
        } else {
            menu.accionAtras();
        }
    },
    accionAtras: function () {
        menu.toggle();
    },
    iniciar: function () {
        $("b-inicio").addEventListener("click", menu.botonMenu, false);
        $("b-construir").addEventListener("click", accionesBotones.bConstruir, false);
        $("b-sembrar").addEventListener("click", accionesBotones.bSembrar, false);
        $("b-demoler").addEventListener("click", accionesBotones.bDemoler, false);
        $("b-ocultar").addEventListener("click", accionesBotones.bOcultar, false);
        $("b-productos").addEventListener("click", accionesBotones.bProductos, false);
        $("b-sesion").addEventListener("click", menu.cerrarSesion, false);


        document.addEventListener("backbutton", menu.botonAtras, false);
    },
    toggleHerramientas: function () {
        $("cont-menu-superior").classList.toggle("cont-menu-superior-activo");
    },
    toggle: function () {
        $("cont-menu").classList.toggle("cont-menu-activo");
    },
    mostrar: function () {
        $("cont-menu").classList.add("cont-menu-activo");
    },
    ocultar: function () {
        $("cont-menu").classList.remove("cont-menu-activo");
    },
    cerrarSesion: function () {
        cuadroAlerta.mostrar("confirmar", traducciones.huertaJS["cerrarSesion"][firebaseSesion.usuario.datos.idioma],
            function () {

                if (publicidad.mostrado) {
                    StartAppAds.hideBanner();
                }
                $("contenedor-cargador").style.display = "block";
                firebase.auth().signOut()
                    .then(() => {
                        window.location.href = "index.html";
                    })
                    .catch(e => {
                        console.error('Sign Out Error', e);
                    });

            }, 0);

    },
};


var accionesBotones = {
    bConstruir: function () {
        tutorial.paso(4);
        tienda.mostrarArea("area-construcciones");
    },
    bSembrar: function () {
        tutorial.paso(3);
        tienda.mostrarArea("area-plantas");
    },
    bDemoler: function () {
        demoler.activo = true;

        menu.ocultar();
        $("b-inicio").classList.add("b-demoler");

        menu.accionAtras = function () {
            demoler.activo = false;
            $("b-inicio").classList.remove("b-demoler");
            menu.accionAtras = function () {
                menu.toggle();
            };
        };
    },
    bProductos: function (zona) {
        tienda.mostrarArea("area-productos");
    },
    construir: function (cuadro) {

        $("b-inicio").classList.add("b-construir");
        construir.toggleCuadro(cuadro);
        menu.ocultar();
        menu.accionAtras = function () {
            $("b-inicio").classList.remove("b-construir");
            construir.toggleCuadro(cuadro);
            menu.toggle();
            menu.accionAtras = function () {
                tienda.ocultarArea("area-construcciones");
            };
        };

    },
    sembrar: function (cuadro) {

        $("b-inicio").setAttribute("style", "background-image: url('" + cuadro.icono + "')");

        sembrar.toggleCuadro(cuadro);
        menu.ocultar();
        menu.accionAtras = function () {
            $("b-inicio").setAttribute("style", "");
            sembrar.toggleCuadro(cuadro);
            menu.toggle();
            menu.accionAtras = function () {
                tienda.ocultarArea("area-plantas");
            };
        };
    },

};
