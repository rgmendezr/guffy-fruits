var productos = {
    TerrenoNorte: {
        titulo: {
            es: "Terreno al Norte",
            en: "Land to the North",
        },
        icono: "imagenes/huerta/productos/zonas/norte.png",
        comprar: function(){
            comprar.zona("norte");
        }     
    },
    TerrenoSur: {
        titulo: {
            es: "Terreno al Sur",
            en: "Land to the South",
        },
        icono: "imagenes/huerta/productos/zonas/sur.png",
        comprar: function(){
            comprar.zona("sur");
        }
    },
    TerrenoEste: {
        titulo: {
            es: "Terreno al Este",
            en: "Land to the East",
        },
        icono: "imagenes/huerta/productos/zonas/este.png",
        comprar: function(){
            comprar.zona("este");
        }
    },
    TerrenoOeste: {
        titulo: {
            es: "Terreno al Oeste",
            en: "Land to the West",
        },
        icono: "imagenes/huerta/productos/zonas/oeste.png",
        comprar: function(){
            comprar.zona("oeste");
        }
    },
    
};