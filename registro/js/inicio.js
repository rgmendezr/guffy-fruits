var intento = false;

function iniciarEventos() {

    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    var userIN = firebase.auth().currentUser;

    console.log(userIN);

    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
            if (!intento) {
                window.location.href = "huerta.html";
            }
        } else {
            $("contenedor-cargador").style.display = 'none';
        }
        intento = true;
    });

    inicioSesion.crearUI();
}

var inicioSesion = {
    crearUI: function () {
        var uiConfig = {
            signInSuccessUrl: 'registro/configuracion.html',
            signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
        ],
            // tosUrl and privacyPolicyUrl accept either url string or a callback
            // function.
            // Terms of service url/callback.
            tosUrl: 'https://guffy-fruits.web.app/legal/terms-and-conditions.html',
            // Privacy policy url/callback.
            privacyPolicyUrl: function () {
                window.location.assign('https://guffy-fruits.web.app/legal/privacy-policies.html');
            }
        };

        // Initialize the FirebaseUI Widget using Firebase.
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        // The start method will wait until the DOM is loaded.
        ui.start('#contenedor-sesion', uiConfig);
    },
};

function empezar() {
    if (!constantesGlobales.prueba) {
        document.addEventListener('deviceready', iniciarEventos, false);
    } else {
        iniciarEventos();
    }

}

window.addEventListener("load", empezar, false);
