var StartAppAds;

var publicidad = {

    iniciado: false,
    mostrado: false,
    presionado: false,

    iniciarEventos: function () {

        //*************************************
        //
        //*************************************

        document.addEventListener('startappads.banner.load', () => {
            //banner has been loaded and displayed.
            //do something here
            console.log("startappads.banner.load");
        });

        document.addEventListener('startappads.banner.load_fail', () => {
            //banner failed to load
            //do something here
            //IMPORTANT: if banner failed to load dont use StartAppAds.showBanner(); again. StartAppAds will load a new one by itself!

            console.log("startappads.banner.load_fail");
        });

        document.addEventListener('startappads.banner.clicked', () => {
            //banner has been clicked
            //do something here. Usefull to hide banner to prevent click bombing.
            console.log("startappads.banner.clicked");

            publicidad.presionado = true;
            StartAppAds.hideBanner();
            publicidad.mostrado = false;

            setTimeout(function () {
                publicidad.presionado = false;
            }, 120000);

        });

        document.addEventListener('startappads.banner.hide', () => {
            //banner has been removed
            //do something here
            console.log("startappads.banner.hide");
        });

        //*************************************
        //
        //*************************************

        document.addEventListener('startappads.interstitial.closed', () => {
            //interstitial closed by user
            //do something here
            console.log("startappads.interstitial.closed");
        });

        document.addEventListener('startappads.interstitial.displayed', () => {
            //interstitial showed up
            //do something here
            console.log("startappads.interstitial.displayed");
        });

        document.addEventListener('startappads.interstitial.clicked', () => {
            //interstitial clicked by user
            //do something here
            console.log("startappads.interstitial.clicked");
        });

        document.addEventListener('startappads.interstitial.not_displayed', () => {
            //interstitial loaded and ready but somehow not showed to user
            //do something here
            console.log("startappads.interstitial.not_displayed");
        });

        document.addEventListener('startappads.interstitial.load_fail', () => {
            //interstitial failed to load
            //do something here
            console.log("startappads.interstitial.load_fail");
        });

        //*************************************
        //
        //*************************************

        document.addEventListener('startappads.reward_video.reward', () => {
            //user watched video reward can be given now
            //do something here
            console.log("startappads.reward_video.reward");
        });

        document.addEventListener('startappads.reward_video.load', () => {
            //reward video finished loading
            //do something here
            console.log("startappads.reward_video.load");
        });

        document.addEventListener('startappads.reward_video.load_fail', () => {
            //reward video failed to load. Probably no Ads available at the moment
            //do something here
            console.log("startappads.reward_video.load_fail");
        });

        //StartAppAds.init("206700236");

    },
    mostrarPublicidad: function () {
        if (!constantesGlobales.prueba) {
            //StartAppAds.showBanner();
        }

    },

};
