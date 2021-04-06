var cuadroAlerta = {
    tipo: "",
    funcionOk: 0,
    funcionCancelar: 0,
    centrar: 0,

    mostrar: function (tipo, mensaje, funcionOk, funcionCancelar) {
        
        cuadroAlerta.tipo = tipo;
        cuadroAlerta.funcionOk = funcionOk;
        cuadroAlerta.funcionCancelar = funcionCancelar;

        addEvent($("b-ok"), "click", cuadroAlerta.accionOk, false);
        addEvent($("b-cancelar"), "click", cuadroAlerta.accionCancelar, false);

        $("mensajeAlerta").innerHTML = mensaje;

        if (cuadroAlerta.tipo == "sentencia") {
            $("b-ok").style.display = "none";
            $("b-cancelar").style.display = "none";
        } else if (cuadroAlerta.tipo == "mensaje") {
            $("b-cancelar").style.display = "none";
        } else if (cuadroAlerta.tipo == "confirmar") {
            $("b-cancelar").style.display = "block";
        }

        $("contenedorAlerta").style.display = "block";
        document.body.style.overflow = "hidden";

        cuadroAlerta.centarF();
        
        window.addEventListener("resize", function(){cuadroAlerta.centarF();}, false);

    },
    
    centarF: function(){
        var anchoCuadroAlerta = $("cuadroAlerta").offsetWidth;
        var anchoPantalla = window.innerWidth;
        var xFinal = (anchoPantalla / 2) - (anchoCuadroAlerta / 2);
        $("cuadroAlerta").style.left = xFinal + "px";

        var altoCuadroAlerta = $("cuadroAlerta").offsetHeight;
        var alturaPantalla = window.innerHeight;
        var yFinal = (alturaPantalla / 2) - (altoCuadroAlerta / 2);
        $("cuadroAlerta").style.top = yFinal + "px";
    },
    ocultar: function () {   
        $("contenedorAlerta").style.display = "none";
        $("body").style.overflow = "auto";
    },
    accionOk: function () {
        cuadroAlerta.ocultar();
        if (typeof cuadroAlerta.funcionOk === 'function') {
                cuadroAlerta.funcionOk();
        }
        cuadroAlerta.limpiarFunciones();
    },
    accionCancelar: function () {
        cuadroAlerta.ocultar();
        if (typeof cuadroAlerta.funcionCancelar === 'function') {
            cuadroAlerta.funcionCancelar();
        }
        cuadroAlerta.limpiarFunciones();
    },
    limpiarFunciones: function(){
        cuadroAlerta.funcionOk = 0;
        cuadroAlerta.funcionCancelar = 0;
    },
    
    insertar: function(){
        var contenedorAlerta = document.createElement("div");
        contenedorAlerta.setAttribute("class", "contenedorAlerta");
        contenedorAlerta.setAttribute("id", "contenedorAlerta");
        
        
        var cuadroAlerta = document.createElement("div");
        cuadroAlerta.setAttribute("class", "cuadroAlerta");
        cuadroAlerta.setAttribute("id", "cuadroAlerta");
        
        var mensajeAlerta = document.createElement("div");
        mensajeAlerta.setAttribute("class", "mensajeAlerta");
        mensajeAlerta.setAttribute("id", "mensajeAlerta");
        
        cuadroAlerta.appendChild(mensajeAlerta);
        
        var contenedorBotonesAlerta = document.createElement("div");
        
        var bCancelar = document.createElement("button");
        bCancelar.setAttribute("id", "b-cancelar");
        bCancelar.setAttribute("class", "botonAlerta b-cancelar");
        bCancelar.setAttribute("data-idTraduccion", "bAlertaCancelar");
        bCancelar.innerHTML = "Cancelar";
        
        var bOk = document.createElement("button");
        bOk.setAttribute("id", "b-ok");
        bOk.setAttribute("class", "botonAlerta b-ok");
        bOk.setAttribute("data-idTraduccion", "bAlertaAceptar");
        bOk.innerHTML = "Aceptar";
        
        contenedorBotonesAlerta.appendChild(bCancelar);
        contenedorBotonesAlerta.appendChild(bOk);
        
        cuadroAlerta.appendChild(contenedorBotonesAlerta);
        
        contenedorAlerta.appendChild(cuadroAlerta);
        
        document.body.appendChild(contenedorAlerta);
    },
    
};
