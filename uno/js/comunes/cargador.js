var cargador = {
    cantidadArchivosNecesarios: {
        imagenes: 0,
        sonidos: 0,
    },
    cantidadArchivosCargados: {
        imagenes: 0,
        sonidos: 0,
    },
    cargarArchivos: function (archivos, correcto) {
        cargador.cantidadArchivosNecesarios.imagenes = archivos.imagenes.length;
        cargador.cantidadArchivosNecesarios.sonidos = archivos.sonidos.length;
        cargador.cantidadArchivosCargados.imagenes = 0;
        cargador.cantidadArchivosCargados.sonidos = 0;

        for (var i = 0; i < archivos.imagenes.length; i++) {
            if (archivosGlobales.imagenes[archivos.imagenes[i]] == undefined ||
                archivosGlobales.imagenes[archivos.imagenes[i]] == null) {
                archivosGlobales.imagenes[archivos.imagenes[i]] = new Image();
                archivosGlobales.imagenes[archivos.imagenes[i]].onload = function () {
                    cargador.cantidadArchivosCargados.imagenes++;
                    cargador.verificador(correcto);
                }
                archivosGlobales.imagenes[archivos.imagenes[i]].src = archivos.imagenes[i];
            }else{
                cargador.cantidadArchivosCargados.imagenes++;
                cargador.verificador(correcto);
            }

        }
        for (var i = 0; i < archivos.sonidos.length; i++) {
            if (archivosGlobales.sonidos[archivos.sonidos[i]] == undefined ||
                archivosGlobales.sonidos[archivos.sonidos[i]] == null) {
                archivosGlobales.sonidos[archivos.sonidos[i]] = new Audio();
                archivosGlobales.sonidos[archivos.sonidos[i]].src = archivos.sonidos[i];
                cargador.cantidadArchivosCargados.sonidos++;
                cargador.verificador(correcto);
            }else{
                cargador.cantidadArchivosCargados.sonidos++;
                cargador.verificador(correcto);
            }

        }

    },
    verificador: function (correcto) {
        if (cargador.cantidadArchivosCargados.imagenes == cargador.cantidadArchivosNecesarios.imagenes &&
            cargador.cantidadArchivosCargados.sonidos == cargador.cantidadArchivosNecesarios.sonidos) {
            correcto();
        }
    },

};
