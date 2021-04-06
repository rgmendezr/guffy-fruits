var planedifComunes = {
    Ocupado: {
        tipo: "Ocupado",
        imagen: 'imagenes/huerta/Ocupado.png',
        ancho: 150,
        alto: 72,
        xCuadro: 0,
        xCuadroTermino: 150,
        yCuadro: 0,
        yCuadroTermino: 75,
    },
    Oculto: {
        tipo: "Oculto",
        imagen: 'imagenes/huerta/Oculto.png',
        ancho: 500,
        alto: 309,
        xCuadro: 0,
        xCuadroTermino: 500,
        yCuadro: 0,
        yCuadroTermino: 309,
    },

    Vacio: {
        tipo: "Vacio",
        imagen: 'imagenes/huerta/Vacio.png',
        ancho: 200,
        alto: 124,
        xCuadro: 0,
        xCuadroTermino: 200,
        yCuadro: 0,
        yCuadroTermino: 124,
    },

    Tierra: {
        tipo: "Tierra",
        imagen: 'imagenes/huerta/plantas/Tierra.png',
        ancho: 200,
        alto: 200,
        xCuadro: 0,
        xCuadroTermino: 200,
        yCuadro: 104,
        yCuadroTermino: 200,
    },
    Apto: {
        tipo: "Apto",
        imagen: 'imagenes/huerta/Apto.png',
        ancho: 500,
        alto: 240,
        xCuadro: 0,
        xCuadroTermino: 500,
        yCuadro: 0,
        yCuadroTermino: 240,
    },

    NoApto: {
        tipo: "NoApto",
        imagen: 'imagenes/huerta/NoApto.png',
        ancho: 500,
        alto: 240,
        xCuadro: 0,
        xCuadroTermino: 500,
        yCuadro: 0,
        yCuadroTermino: 240,
    },

};

var plantas = {

    Cebollas: {
        titulo: {
            es: "Cebollas",
            en: "Onions",
        },
        tipo: "Cebollas",
        icono: "imagenes/huerta/iconos/cebolla.svg",
        ancho: 200,
        alto: 200,
        xCuadro: 0,
        xCuadroTermino: 200,
        yCuadro: 104,
        yCuadroTermino: 200,

        sembrar: {
            costo: 0,
            valor: 1,
            perdida: 0,
            tiempoCrecimientoEnHoras: {
                naciendo: 0.0055555555555556,
                creciendo: 0.0111111111111111,
                perfecto: 0.0166666666666667,
                marchito: 24,
            }
        },

        estados: {
            naciendo: 'imagenes/huerta/plantas/cebollas/1.png',
            creciendo: 'imagenes/huerta/plantas/cebollas/2.png',
            perfecto: 'imagenes/huerta/plantas/cebollas/3.png',
            marchito: 'imagenes/huerta/plantas/cebollas/4.png',
        },
    },
    Fresas: {
        titulo: {
            es: "Fresas",
            en: "Strawberries",
        },
        tipo: "Fresas",
        icono: "imagenes/huerta/iconos/fresa.svg",
        ancho: 200,
        alto: 200,
        xCuadro: 0,
        xCuadroTermino: 200,
        yCuadro: 104,
        yCuadroTermino: 200,

        sembrar: {
            costo: -1,
            valor: 3,
            perdida: -1,
            tiempoCrecimientoEnHoras: {
                naciendo: 0.0111111111111111,
                creciendo: 0.0222222222222222,
                perfecto: 0.0333333333333333,
                marchito: 24,
            }
        },

        estados: {
            naciendo: 'imagenes/huerta/plantas/fresas/1.png',
            creciendo: 'imagenes/huerta/plantas/fresas/2.png',
            perfecto: 'imagenes/huerta/plantas/fresas/3.png',
            marchito: 'imagenes/huerta/plantas/fresas/4.png',
        },
    },
    Zanahorias: {
        titulo: {
            es: "Zanahorias",
            en: "Carrots",
        },
        tipo: "Zanahorias",
        icono: "imagenes/huerta/iconos/zanahoria.svg",
        ancho: 200,
        alto: 200,
        xCuadro: 0,
        xCuadroTermino: 200,
        yCuadro: 104,
        yCuadroTermino: 200,

        sembrar: {
            costo: -1,
            valor: 3,
            perdida: -1,
            tiempoCrecimientoEnHoras: {
                naciendo: 0.0111111111111111,
                creciendo: 0.0222222222222222,
                perfecto: 0.0333333333333333,
                marchito: 24,
            }
        },

        estados: {
            naciendo: 'imagenes/huerta/plantas/zanahorias/1.png',
            creciendo: 'imagenes/huerta/plantas/zanahorias/2.png',
            perfecto: 'imagenes/huerta/plantas/zanahorias/3.png',
            marchito: 'imagenes/huerta/plantas/zanahorias/4.png',
        },
    },
    Remolachas: {
        titulo: {
            es: "Remolachas",
            en: "Beets",
        },
        tipo: "Remolachas",
        icono: "imagenes/huerta/iconos/remolacha.svg",
        ancho: 200,
        alto: 200,
        xCuadro: 0,
        xCuadroTermino: 200,
        yCuadro: 104,
        yCuadroTermino: 200,

        sembrar: {
            costo: -1,
            valor: 3,
            perdida: -1,
            tiempoCrecimientoEnHoras: {
                naciendo: 0.0111111111111111,
                creciendo: 0.0222222222222222,
                perfecto: 0.0333333333333333,
                marchito: 24,
            }
        },

        estados: {
            naciendo: 'imagenes/huerta/plantas/remolachas/1.png',
            creciendo: 'imagenes/huerta/plantas/remolachas/2.png',
            perfecto: 'imagenes/huerta/plantas/remolachas/3.png',
            marchito: 'imagenes/huerta/plantas/remolachas/4.png',
        },
    },
    Repollos: {
        titulo: {
            es: "Repollos",
            en: "Cabbages",
        },
        tipo: "Repollos",
        icono: "imagenes/huerta/iconos/repollo.svg",
        ancho: 200,
        alto: 200,
        xCuadro: 0,
        xCuadroTermino: 200,
        yCuadro: 104,
        yCuadroTermino: 200,

        sembrar: {
            costo: -2,
            valor: 7,
            perdida: -2,
            tiempoCrecimientoEnHoras: {
                naciendo: 0.033,
                creciendo: 0.066,
                perfecto: 0.1,
                marchito: 24,
            }
        },

        estados: {
            naciendo: 'imagenes/huerta/plantas/repollos/1.png',
            creciendo: 'imagenes/huerta/plantas/repollos/2.png',
            perfecto: 'imagenes/huerta/plantas/repollos/3.png',
            marchito: 'imagenes/huerta/plantas/repollos/4.png',
        },
    },
    Tomates: {
        titulo: {
            es: "Tomates",
            en: "Tomatoes",
        },
        tipo: "Tomates",
        icono: "imagenes/huerta/iconos/tomate.svg",
        ancho: 200,
        alto: 200,
        xCuadro: 0,
        xCuadroTermino: 200,
        yCuadro: 104,
        yCuadroTermino: 200,

        sembrar: {
            costo: -2,
            valor: 7,
            perdida: -2,
            tiempoCrecimientoEnHoras: {
                naciendo: 0.033,
                creciendo: 0.066,
                perfecto: 0.1,
                marchito: 24,
            }
        },

        estados: {
            naciendo: 'imagenes/huerta/plantas/tomates/1.png',
            creciendo: 'imagenes/huerta/plantas/tomates/2.png',
            perfecto: 'imagenes/huerta/plantas/tomates/3.png',
            marchito: 'imagenes/huerta/plantas/tomates/4.png',
        },
    },
    MedulaVegetal: {
        titulo: {
            es: "Médula Vegetal",
            en: "Vegetable Marrow",
        },
        tipo: "MedulaVegetal",
        icono: "imagenes/huerta/iconos/medula-vegetal.svg",
        ancho: 200,
        alto: 200,
        xCuadro: 0,
        xCuadroTermino: 200,
        yCuadro: 104,
        yCuadroTermino: 200,

        sembrar: {
            costo: -2,
            valor: 7,
            perdida: -2,
            tiempoCrecimientoEnHoras: {
                naciendo: 0.033,
                creciendo: 0.066,
                perfecto: 0.1,
                marchito: 24,
            }
        },

        estados: {
            naciendo: 'imagenes/huerta/plantas/medulaVegetal/1.png',
            creciendo: 'imagenes/huerta/plantas/medulaVegetal/2.png',
            perfecto: 'imagenes/huerta/plantas/medulaVegetal/3.png',
            marchito: 'imagenes/huerta/plantas/medulaVegetal/4.png',
        },
    },
    Sandias: {
        titulo: {
            es: "Sandías",
            en: "Watermelons",
        },
        tipo: "Sandias",
        icono: "imagenes/huerta/iconos/sandia.svg",
        ancho: 200,
        alto: 200,
        xCuadro: 0,
        xCuadroTermino: 200,
        yCuadro: 104,
        yCuadroTermino: 200,

        sembrar: {
            costo: -4,
            valor: 14,
            perdida: -5,
            tiempoCrecimientoEnHoras: {
                naciendo: 0.0833333333333333,
                creciendo: 0.1666666666666667,
                perfecto: 0.25,
                marchito: 24,
            }
        },

        estados: {
            naciendo: 'imagenes/huerta/plantas/sandias/1.png',
            creciendo: 'imagenes/huerta/plantas/sandias/2.png',
            perfecto: 'imagenes/huerta/plantas/sandias/3.png',
            marchito: 'imagenes/huerta/plantas/sandias/4.png',
        },
    },
    Ajos: {
        titulo: {
            es: "Ajos",
            en: "Garlic",
        },
        tipo: "Ajos",
        icono: "imagenes/huerta/iconos/ajo.svg",
        ancho: 200,
        alto: 200,
        xCuadro: 0,
        xCuadroTermino: 200,
        yCuadro: 104,
        yCuadroTermino: 200,

        sembrar: {
            costo: -4,
            valor: 14,
            perdida: -5,
            tiempoCrecimientoEnHoras: {
                naciendo: 0.0833333333333333,
                creciendo: 0.1666666666666667,
                perfecto: 0.25,
                marchito: 24,
            }
        },

        estados: {
            naciendo: 'imagenes/huerta/plantas/ajos/1.png',
            creciendo: 'imagenes/huerta/plantas/ajos/2.png',
            perfecto: 'imagenes/huerta/plantas/ajos/3.png',
            marchito: 'imagenes/huerta/plantas/ajos/4.png',
        },
    },
    Melones: {
        titulo: {
            es: "Melones",
            en: "Melons",
        },
        tipo: "Melones",
        icono: "imagenes/huerta/iconos/melon.svg",
        ancho: 200,
        alto: 200,
        xCuadro: 0,
        xCuadroTermino: 200,
        yCuadro: 104,
        yCuadroTermino: 200,

        sembrar: {
            costo: -4,
            valor: 14,
            perdida: -5,
            tiempoCrecimientoEnHoras: {
                naciendo: 0.0833333333333333,
                creciendo: 0.1666666666666667,
                perfecto: 0.25,
                marchito: 24,
            }
        },
        
        
        estados: {
            naciendo: 'imagenes/huerta/plantas/melones/1.png',
            creciendo: 'imagenes/huerta/plantas/melones/2.png',
            perfecto: 'imagenes/huerta/plantas/melones/3.png',
            marchito: 'imagenes/huerta/plantas/melones/4.png',
        },
    },
    Berenjenas: {
        titulo: {
            es: "Berenjenas",
            en: "Aubergines",
        },
        tipo: "Berenjenas",
        icono: "imagenes/huerta/iconos/berenjena.svg",
        ancho: 200,
        alto: 200,
        xCuadro: 0,
        xCuadroTermino: 200,
        yCuadro: 104,
        yCuadroTermino: 200,

        sembrar: {
            costo: -8,
            valor: 26,
            perdida: -10,
            tiempoCrecimientoEnHoras: {
                naciendo: 0.1666666666666667,
                creciendo: 0.3333333333333333,
                perfecto: 0.5,
                marchito: 24.5,
            }
        },

        estados: {
            naciendo: 'imagenes/huerta/plantas/berenjenas/1.png',
            creciendo: 'imagenes/huerta/plantas/berenjenas/2.png',
            perfecto: 'imagenes/huerta/plantas/berenjenas/3.png',
            marchito: 'imagenes/huerta/plantas/berenjenas/4.png',
        },
        
    },
    Papas: {
        titulo: {
            es: "Papas",
            en: "Potatoes",
        },
        tipo: "Papas",
        icono: "imagenes/huerta/iconos/papa.svg",
        ancho: 200,
        alto: 200,
        xCuadro: 0,
        xCuadroTermino: 200,
        yCuadro: 104,
        yCuadroTermino: 200,

        sembrar: {
            costo: -8,
            valor: 26,
            perdida: -10,
            tiempoCrecimientoEnHoras: {
                naciendo: 0.1666666666666667,
                creciendo: 0.3333333333333333,
                perfecto: 0.5,
                marchito: 24.5,
            }
        },

        estados: {
            naciendo: 'imagenes/huerta/plantas/papas/1.png',
            creciendo: 'imagenes/huerta/plantas/papas/2.png',
            perfecto: 'imagenes/huerta/plantas/papas/3.png',
            marchito: 'imagenes/huerta/plantas/papas/4.png',
        },
    },
    Pepinos: {
        titulo: {
            es: "Pepinos",
            en: "Cucumbers",
        },
        tipo: "Pepinos",
        icono: "imagenes/huerta/iconos/pepino.svg",
        ancho: 200,
        alto: 200,
        xCuadro: 0,
        xCuadroTermino: 200,
        yCuadro: 104,
        yCuadroTermino: 200,

        sembrar: {
            costo: -16,
            valor: 48,
            perdida: -20,
            tiempoCrecimientoEnHoras: {
                naciendo: 0.33,
                creciendo: 0.66,
                perfecto: 1,
                marchito: 25,
            }
        },

        estados: {
            naciendo: 'imagenes/huerta/plantas/pepinos/1.png',
            creciendo: 'imagenes/huerta/plantas/pepinos/2.png',
            perfecto: 'imagenes/huerta/plantas/pepinos/3.png',
            marchito: 'imagenes/huerta/plantas/pepinos/4.png',
        },
    },
    Calabazas: {
        titulo: {
            es: "Calabazas",
            en: "Pumpkins",
        },
        tipo: "Calabazas",
        icono: "imagenes/huerta/iconos/calabaza.svg",
        ancho: 200,
        alto: 200,
        xCuadro: 0,
        xCuadroTermino: 200,
        yCuadro: 104,
        yCuadroTermino: 200,

        sembrar: {
            costo: -16,
            valor: 48,
            perdida: -20,
            tiempoCrecimientoEnHoras: {
                naciendo: 0.33,
                creciendo: 0.66,
                perfecto: 1,
                marchito: 25,
            }
        },

        estados: {
            naciendo: 'imagenes/huerta/plantas/calabazas/1.png',
            creciendo: 'imagenes/huerta/plantas/calabazas/2.png',
            perfecto: 'imagenes/huerta/plantas/calabazas/3.png',
            marchito: 'imagenes/huerta/plantas/calabazas/4.png',
        },
    },
    
};
