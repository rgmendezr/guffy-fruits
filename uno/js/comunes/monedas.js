var monedas = {
    comprobar: function (cantidad) {
        var monedas = firebaseSesion.usuario.datos.monedas + cantidad;
        return (monedas >= 0) ? true : false;
    },
    actualizar: function (cantidad) {

        if (firebaseSesion.activo && navigator.onLine) {
            var monedasDespues = firebaseSesion.usuario.datos.monedas + cantidad;

            if (monedasDespues >= 0) {
                
                firebaseSesion.usuario.datos.monedas = monedasDespues;
                $("contador-monedas").innerHTML = firebaseSesion.usuario.datos.monedas
                
                firebaseSesion.updateDoc("usuarios/" + firebaseSesion.usuario.uid, {
                    monedas: monedasDespues,
                }, 0, function(){
                    firebaseSesion.usuario.datos.monedas = firebaseSesion.usuario.datos.monedas - cantidad;
                    $("contador-monedas").innerHTML = firebaseSesion.usuario.datos.monedas;
                });
            }
        }else{
            firebaseSesion.reconectando();
        }

    },
    
    revisar: function(){
        var docRef = "usuarios/" + firebaseSesion.usuario.uid;
        
        firebaseSesion.getDoc(docRef, function(dato){
            firebaseSesion.usuario.datos.monedas = dato.monedas;
            $("contador-monedas").innerHTML = dato.monedas;
        }, 0, 0);
        
    },
}
