var menuSuperior = {
    botonMenu: function () {
        tutorial.paso(6);
        menuSuperior.accionAtras();
    },
    accionAtras: function () {
        menuSuperior.toggle();
    },
    iniciar: function () {
        $("b-herramientas").addEventListener("click", menuSuperior.botonMenu, false);
        $("b-ocultar").addEventListener("click", accionesBotonesSuperiores.bOcultar, false);
        $("b-cadena").addEventListener("click", accionesBotonesSuperiores.bCadena, false);
        //vulumen
        document.addEventListener("volumeupbutton", menuSuperior.botonMenu, false);
        document.addEventListener("volumedownbutton", menuSuperior.cancelarYMostrar, false);
    },
    toggle: function () {
        $("cont-menu-superior").classList.toggle("cont-menu-superior-activo");
    },
    mostrar: function () {
        $("cont-menu-superior").classList.add("cont-menu-superior-activo");
    },
    ocultar: function () {
        $("cont-menu-superior").classList.remove("cont-menu-superior-activo");
    },
    cancelarYMostrar: function () {
        sembrar.funcionCadena = false;
        $("b-herramientas").classList.remove("b-cadena");
        variablesHuerta.ocultarElemento = false;
        $("b-herramientas").classList.remove("b-ocultar");
        menuSuperior.mostrar();
        menuSuperior.accionAtras = function () {
            menuSuperior.toggle();
        };
    }

};


var accionesBotonesSuperiores = {
    bOcultar: function () {
        tutorial.paso(7);
        variablesHuerta.ocultarElemento = true;

        menuSuperior.ocultar();
        $("b-herramientas").classList.add("b-ocultar");

        menuSuperior.accionAtras = function () {
            variablesHuerta.ocultarElemento = false;
            $("b-herramientas").classList.remove("b-ocultar");
            menuSuperior.accionAtras = function () {
                menuSuperior.toggle();
            };
        };
    },
    bCadena: function () {

        if (typeof escenas.escenas["Huerta"].huerta !== "undefined" &&
            escenas.escenas["Huerta"].huerta.cuadrosX * escenas.escenas["Huerta"].huerta.cuadrosY >= 150) {

            sembrar.funcionCadena = true;

            menuSuperior.ocultar();
            $("b-herramientas").classList.add("b-cadena");

            menuSuperior.accionAtras = function () {
                sembrar.funcionCadena = false;
                $("b-herramientas").classList.remove("b-cadena");
                menuSuperior.accionAtras = function () {
                    menuSuperior.toggle();
                };
            };

            accionesBotonesSuperiores.alargarTiempoCancelarCadena();

        } else {
            if (!tutorial.activo || (tutorial.activo && tutorial.pasos.indexOf("Paso8") !== -1)) {
                cuadroAlerta.mostrar("mensaje", traducciones.huertaJS["funcionCadenaInhabilitada"][firebaseSesion.usuario.datos.idioma], 0, 0);
            }

        }
        
        tutorial.paso(8);

    },
    cancelarCadena: function () {
        sembrar.funcionCadena = false;
        $("b-herramientas").classList.remove("b-cadena");
        menuSuperior.accionAtras = function () {
            menuSuperior.toggle();
        };
    },
    alargarTiempoCancelarCadena: function () {
        clearTimeout(sembrar.tiempoCancelarCadena);
        sembrar.tiempoCancelarCadena = setTimeout(accionesBotonesSuperiores.cancelarCadena, 15000);
    },
};
