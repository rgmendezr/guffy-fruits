function traducir(texto, idioma) {
    for (var i in texto) {
        var elem = document.querySelectorAll("[data-idTraduccion='" + i + "']")[0];
        if (typeof idioma == "undefined") {
            idioma = "es";
        }
        
        if (texto[i]["atributo"] != undefined &&
            texto[i]["atributo"] != null) {
            elem.setAttribute(texto[i]["atributo"], texto[i][idioma]);          
        } else {
            elem.innerHTML = texto[i][idioma];
        }

    }
};
