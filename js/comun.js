function $(id) {
    return document.getElementById(id);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function toggleFullScreen() {
    var docEl = document.body;
    var doc = window.document;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
    } else {
        cancelFullScreen.call(doc);
    }
}

function addEvent(elemento, nomevento, funcion, captura) {
    if (elemento.attachEvent) {
        elemento.attachEvent('on' + nomevento, funcion);
        return true;
    } else if (elemento.addEventListener) {
        elemento.addEventListener(nomevento, funcion, captura);
        return true;
    } else return false;
}


function crearXMLHttpRequest() {
    var xmlHttp = null;
    if (window.ActiveXObject) xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    else if (window.XMLHttpRequest) xmlHttp = new XMLHttpRequest();
    return xmlHttp;
}

function cadenaAleatoria(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * (charactersLength - 1)));
   }
   return result;
}