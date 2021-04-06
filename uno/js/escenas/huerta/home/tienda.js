var tienda = {
    add: function (elemento, cuadro, planta) {
        elemento.addEventListener("click", function () {
            if (planta === undefined || planta == false) {
                accionesBotones.construir(cuadro);
            } else {
                accionesBotones.sembrar(cuadro);
            }

        }, false);
    },

    iniciar: function () {

        for (let i in edificios) {

            var contenedorOpcion = document.createElement("div");
            contenedorOpcion.setAttribute("class", "contenedor-opcion");

            var imagenMuestra = document.createElement("div");
            imagenMuestra.setAttribute("class", "imagen-muestra");
            imagenMuestra.setAttribute("style", "background-image: url('" + edificios[i].imagen + "')");

            contenedorOpcion.appendChild(imagenMuestra);

            var info = document.createElement("div");
            info.setAttribute("class", "info");

            var infoTitulo = document.createElement("div");
            infoTitulo.setAttribute("class", "info-titulo");
            infoTitulo.innerHTML = edificios[i].titulo[firebaseSesion.usuario.datos.idioma];

            info.appendChild(infoTitulo);

            var contBoton = document.createElement("div");
            contBoton.setAttribute("class", "info-cont-boton");

            var boton = document.createElement("div");
            boton.setAttribute("class", "boton-comprar");
            boton.setAttribute("id", "b-c-" + i);

            var textoBoton = document.createElement("div");
            textoBoton.setAttribute("class", "texto-boton-comprar");
            textoBoton.innerHTML = (edificios[i].construccion.costo * -1) + " <img class='info-moneda' src='imagenes/interfaz/moneda.png'>";

            boton.appendChild(textoBoton);

            contBoton.appendChild(boton);

            info.appendChild(contBoton);

            contenedorOpcion.appendChild(info);

            var limpiador = document.createElement("div");
            limpiador.setAttribute("style", "clear: both;");

            contenedorOpcion.appendChild(limpiador);

            $("area-construcciones").appendChild(contenedorOpcion);

            tienda.add($("b-c-" + i), edificios[i]);
        }


        for (var i in plantas) {
            var contenedorOpcion = document.createElement("div");
            contenedorOpcion.setAttribute("class", "contenedor-opcion");

            var imagenMuestra = document.createElement("div");
            imagenMuestra.setAttribute("class", "imagen-muestra");
            imagenMuestra.setAttribute("style", "background-image: url('" + plantas[i].icono + "')");

            contenedorOpcion.appendChild(imagenMuestra);

            var info = document.createElement("div");
            info.setAttribute("class", "info");

            var infoTitulo = document.createElement("div");
            infoTitulo.setAttribute("class", "info-titulo");
            infoTitulo.innerHTML = plantas[i].titulo[firebaseSesion.usuario.datos.idioma];

            info.appendChild(infoTitulo);

            var contBoton = document.createElement("div");
            contBoton.setAttribute("class", "info-cont-boton");

            var boton = document.createElement("div");
            boton.setAttribute("class", "boton-comprar");
            boton.setAttribute("id", "b-s-" + i);


            var textoBoton = document.createElement("div");
            textoBoton.setAttribute("class", "texto-boton-comprar");
            textoBoton.innerHTML = (plantas[i].sembrar.costo * -1) + " <img class='info-moneda' src='imagenes/interfaz/moneda.png'>";

            boton.appendChild(textoBoton);

            contBoton.appendChild(boton);

            info.appendChild(contBoton);

            var datosPlanta = document.createElement("div");
            datosPlanta.setAttribute("class", "datos-planta");
            datosPlanta.innerHTML = traducciones.huertaJS["recoleccion"][firebaseSesion.usuario.datos.idioma] + plantas[i].sembrar.valor + " <img class='datos-moneda' src='imagenes/interfaz/moneda.png'>  " +
                " / " + traducciones.huertaJS["tiempo"][firebaseSesion.usuario.datos.idioma] + tienda.calcularTiempo(plantas[i].sembrar.tiempoCrecimientoEnHoras.perfecto);

            info.appendChild(datosPlanta);

            contenedorOpcion.appendChild(info);

            var limpiador = document.createElement("div");
            limpiador.setAttribute("style", "clear: both;");

            contenedorOpcion.appendChild(limpiador);

            $("area-plantas").appendChild(contenedorOpcion);

            tienda.add($("b-s-" + i), plantas[i], true);
        }

        for (var i in productos) {
            var contenedorOpcion = document.createElement("div");
            contenedorOpcion.setAttribute("class", "contenedor-opcion");

            var imagenMuestra = document.createElement("div");
            imagenMuestra.setAttribute("class", "imagen-muestra");
            imagenMuestra.setAttribute("style", "background-image: url('" + productos[i].icono + "')");

            contenedorOpcion.appendChild(imagenMuestra);

            var info = document.createElement("div");
            info.setAttribute("class", "info");

            var infoTitulo = document.createElement("div");
            infoTitulo.setAttribute("class", "info-titulo");
            infoTitulo.innerHTML = productos[i].titulo[firebaseSesion.usuario.datos.idioma];

            info.appendChild(infoTitulo);

            var contBoton = document.createElement("div");
            contBoton.setAttribute("class", "info-cont-boton");

            var boton = document.createElement("div");
            boton.setAttribute("class", "boton-comprar");
            boton.setAttribute("id", "b-t-" + i);


            var textoBoton = document.createElement("div");
            textoBoton.setAttribute("class", "texto-boton-comprar");
            textoBoton.innerHTML = traducciones.huertaJS["comprar"][firebaseSesion.usuario.datos.idioma];

            boton.appendChild(textoBoton);

            contBoton.appendChild(boton);

            info.appendChild(contBoton);

            contenedorOpcion.appendChild(info);

            var limpiador = document.createElement("div");
            limpiador.setAttribute("style", "clear: both;");

            contenedorOpcion.appendChild(limpiador);

            $("area-productos").appendChild(contenedorOpcion);

            $("b-t-" + i).addEventListener("click", productos[i].comprar, false);
        }


    },
    calcularTiempo: function (horas) {

        var texto;
        if (horas < 1) {
            var minutos = Math.floor(horas / 0.0166666666666666);
            if (minutos == 1) {
                texto = "1 " + traducciones.huertaJS["minuto"][firebaseSesion.usuario.datos.idioma];
            } else {
                texto = minutos + " " + traducciones.huertaJS["minutos"][firebaseSesion.usuario.datos.idioma];
            }
        } else if (horas < 24) {
            if (horas == 1) {
                texto = "1 " + traducciones.huertaJS["hora"][firebaseSesion.usuario.datos.idioma];;
            } else {
                texto = horas + " " + traducciones.huertaJS["horas"][firebaseSesion.usuario.datos.idioma];
            }
        } else {
            var dias = Math.floor(horas / 24);
            if (dias == 1) {
                texto = "1 " + traducciones.huertaJS["dia"][firebaseSesion.usuario.datos.idioma];
            } else {
                texto = dias + " " + traducciones.huertaJS["dias"][firebaseSesion.usuario.datos.idioma];
            }
        }

        return texto;

    },

    mostrarArea: function (id) {
        $(id).classList.remove("area-menu-oculto");
        menu.accionAtras = function () {
            tienda.ocultarArea(id);
        };
    },
    ocultarArea: function (id) {
        $(id).classList.add("area-menu-oculto");
        menu.accionAtras = function () {
            menu.toggle();
        };
    },
};
