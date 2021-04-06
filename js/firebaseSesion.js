var firebaseSesion = {
    usuario: undefined,
    activo: false,
    db: null,
    reconectar: null,
    iniciar: function () {

        if (navigator.onLine && typeof firebase !== "undefined") {
            firebase.initializeApp(firebaseConfig);
            firebase.analytics();
            firebaseSesion.db = firebase.firestore();

            firebaseSesion.activo = true;
        } else {
            firebaseSesion.reconectando();
        }
    },
    verificarSesion: function (iniciar) {
        if (firebaseSesion.activo && navigator.onLine) {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    // User is signed in

                    var docRef = firebaseSesion.db.collection("usuarios").doc(user.uid);

                    docRef.get().then(function (doc) {

                        if (doc.exists) {

                            var data = doc.data();
                            if (typeof data.idSesion !== "undefined" &&
                                data.idSesion == window.localStorage.getItem("idSesion")) {
                                firebaseSesion.usuario = {
                                    uid: user.uid,
                                    datos: doc.data(),
                                };

                                docRef.onSnapshot(function (doc) {
                                    var nuevoUsuario = doc.data();
                                    if (nuevoUsuario.idSesion != window.localStorage.getItem("idSesion")) {
                                        cuadroAlerta.mostrar("mensaje", "It looks like you are logged into another device.", function () {
                                            $("contenedor-cargador").style.display = "block";
                                            firebase.auth().signOut()
                                                .then(() => {
                                                    window.location.href = "index.html";
                                                })
                                                .catch(e => {
                                                    console.error('Sign Out Error', e);
                                                });
                                        }, 0);
                                    }
                                    firebase.usuario = nuevoUsuario;
                                });


                                if (typeof iniciar === "function") {
                                    iniciar();
                                }
                            } else {
                                firebase.auth().signOut();
                                window.location.href = "index.html";
                            }

                        } else {

                            firebaseSesion.activo = false;
                            firebase.auth().signOut();

                            cuadroAlerta.mostrar("mensaje", "Error: IN0019", function () {
                                window.location.href = "index.html";
                            }, 0);

                        }

                    }).catch(function (error) {
                        console.log("Error getting document:", error);
                    });

                } else {
                    window.location.href = "index.html";
                }
                // ...

            });

        } else {
            firebaseSesion.reconectando();
        }
    },
    getDoc: function (referencia, existe, noExiste, errorFuncion) {

        if (firebaseSesion.activo && navigator.onLine) {

            var docRef = firebaseSesion.db.doc(referencia);

            docRef.get().then(function (doc) {

                if (doc.exists) {

                    existe(doc.data());

                } else {

                    if (typeof noExiste === "function") {
                        noExiste();
                    }

                }

            }).catch(function (error) {
                if (typeof errorFuncion === "function") {
                    errorFuncion();
                }
                console.log(error);
            });

        } else {

            if (typeof errorFuncion === "function") {
                errorFuncion();
            }
            console.log("Firebase no iniciado o fuera de línea.");
            firebaseSesion.reconectando();
        }

    },
    setDoc: function (referencia, parametros, exito, errorFuncion) {
        if (firebaseSesion.activo && navigator.onLine) {

            firebaseSesion.db.doc(referencia).set(parametros)
                .then(function () {
                    if (typeof exito === "function") {
                        exito();
                    }
                })
                .catch(function (error) {
                    if (typeof errorFuncion === "function") {
                        errorFuncion();
                    }
                    console.log(error);
                });


        } else {

            if (typeof errorFuncion === "function") {
                errorFuncion();
            }
            console.log("Firebase no iniciado o fuera de línea.");
            firebaseSesion.reconectando();
        }
    },
    getDocs: function (referencia, correcto, errorFuncion) {

        if (firebaseSesion.activo && navigator.onLine) {

            var arrayDatos = []
            firebaseSesion.db.collection(referencia).get()
                .then(function (querySnapshot) {

                    querySnapshot.forEach(function (doc) {
                        // doc.data() is never undefined for query doc snapshots
                        arrayDatos[doc.id] = doc.data();
                    });

                    correcto(arrayDatos);
                })
                .catch(function (error) {
                    if (typeof errorFuncion === "function") {
                        errorFuncion();
                    }
                    console.log(error);
                });
        } else {
            firebaseSesion.reconectando();
        }

    },
    updateDoc: function (referencia, parametros, exito, errorFuncion) {
        if (firebaseSesion.activo && navigator.onLine) {
            firebaseSesion.db.doc(referencia).update(parametros)
                .then(function () {
                    if (typeof exito === "function") {
                        exito();
                    }
                })
                .catch(function (error) {
                    if (typeof errorFuncion === "function") {
                        errorFuncion();
                    }
                    console.log(error);
                });

        } else {
            firebaseSesion.reconectando();
        }

    },
    reconectando: function () {
        cuadroAlerta.mostrar("sentencia", "The internet connection may be failing.", 0, 0);
        clearInterval(firebaseSesion.reconectar);
        firebaseSesion.reconectar = setInterval(function () {
            if (navigator.onLine) {
                location.reload();
            }
        }, 10000);
    }
};
