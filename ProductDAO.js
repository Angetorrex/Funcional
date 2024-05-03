class ProductDAO {
    constructor(data) {
        this.products = [];
        this.loadProducts(data);
    }

    loadProducts(data) {
        const lines = data.split('\n');
        lines.shift(); 
        lines.forEach(line => {
            const parts = line.split('|').map(part => part.trim());
            if (parts.length === 7) {
                this.products.push({
                    clave: parts[0],
                    descripcion: parts[1],
                    precio: parseFloat(parts[2]),
                    clasificacion: parts[3],
                    existencia: parseInt(parts[4]),
                    existenciaMin: parseInt(parts[5]),
                    existenciaMax: parseInt(parts[6])
                });
            }
        });
    }

    productosExistenciaMayor20() {
        return this.products.filter(p => p.existencia > 20).length;
    }

    productosExistenciaMenor15() {
        return this.products.filter(p => p.existencia < 15).length;
    }

    productosMismaClasifPrecioMayor1550() {
        return this.products.filter(p => p.precio > 15.50).reduce((acc, p) => {
            if (!acc[p.clasificacion]) acc[p.clasificacion] = [];
            acc[p.clasificacion].push(p.descripcion);
            return acc;
        }, {});
    }

    productosPrecioEntre2030Y4500() {
        return this.products.filter(p => p.precio > 20.30 && p.precio < 45.00).map(p => p.descripcion);
    }

    numeroProductosPorClasificacion() {
        return this.products.reduce((acc, p) => {
            acc[p.clasificacion] = (acc[p.clasificacion] || 0) + 1;
            return acc;
        }, {});
    }
}

const data = `
Clave | Descripción | Precio | Clasificación | Existencia | Existencia Mínima | Existencia Máxima
P001 | Manzana| 38.41 | Frutas | 2 | 8 | 56
P002 | Platano | 43.17 | Frutas | 14 | 3 | 62
P003 | Fresa | 29.02 | Frutas | 21 | 2 | 71
P004 | Mango | 21.81 | Frutas | 99 | 9 | 76
P005 | Uvas | 15.14 | Frutas | 9 | 3 | 91
P006 | Durazno | 35.02 | Frutas | 98 | 1 | 62
P007 | Naranja | 31.29 | Frutas | 4 | 9 | 78
P008 | Mandarina | 42.37 | Frutas | 66 | 0 | 85
P009 | Pera | 15.19 | Frutas | 18 | 5 | 88
P010 | Kiwi | 18.92 | Frutas | 23 | 2 | 83
P011 | Pina | 40 | Frutas | 5 | 10 | 80
P012 | Mandarina | 7.53 | Frutas | 47 | 3 | 82
P013 | Moras | 30.48 | Frutas | 32 | 7 | 50
P014 | Frambueza | 35.99 | Frutas | 20 | 1 | 65
P015 | Papaya | 30.56 | Frutas | 78 | 0 | 54
P016 | Sandia | 32.41 | Frutas | 49 | 4 | 76
P017 | Zanahoria | 20.63 | Verduras | 86 | 2 | 92
P018 | Tomate | 10.25 | Verduras | 70 | 4 | 85
P019 | Papa | 37.91 | Verduras | 28 | 0 | 79
P020 | Cebolla | 42.95 | Verduras | 52 | 6 | 64
P021 | Lechuga | 35.21 | Verduras | 64 | 2 | 94
P022 | Espinacas | 41.39 | Verduras | 69 | 9 | 81
P023 | Pepino | 40.84 | Verduras | 70 | 2 | 74
P024 | Brocoli | 20.23 | Verduras | 11 | 6 | 75
P025 | Ajo | 43.53 | Verduras | 3 | 0 | 95
P026 | Coliflor | 33.7 | Verduras | 53 | 10 | 65
P027 | Apio | 18.91 | Verduras | 68 | 5 | 56
P028 | Elote | 23.53 |Verduras | 52 | 7 | 77
P029 | Calabaza | 28.82 | Verduras | 18 | 6 | 83
P030 | Berenjenas | 49.7 | Verduras | 7 | 8 | 55
P031 | Betabel | 42.97 | Verduras | 20 | 6 | 85
P032 | Pan | 40.39 | Panadería | 7 | 7 | 68
P033 | Torilla de harina | 14.21 | Panadería | 94 | 3 | 73
P034 | Tortilla de maiz | 22.58 | Panadería | 40 | 1 | 89
P035 | Leche | 35.16 | Lácteos | 3 | 5 | 86
P036 | Yogurt | 40.98 | Lácteos | 93 | 3 | 64
P037 | Mantequilla | 7.19 | Lácteos | 12 | 9 | 81
P038 | Huevos | 36.6 | Lácteos | 40 | 4 | 87
P039 | Queso | 50 | Lácteos | 23 | 1 | 100
P040 | Papas fritas | 13.56 | Snacks | 21 | 9 | 57
P041 | Palomitas | 9.28 | Snacks | 59 | 6 | 80
P042 | Nachos | 21.2 | Snacks | 21 | 0 | 68
P043 | Galletas | 20.96 | Snacks | 5 | 9 | 100
P044 | Chicharrones | 15.5 | Snacks | 90 | 6 | 74
P045 | Anillos de cebolla | 16 | Snacks | 63 | 5 | 82
P046 | Pretzels | 40 | Snacks | 19 | 0 | 99
P047 | Frutos secos | 40.9 | Snacks | 12 | 1 | 80
P048 | Fruta deshidratada | 9.42 | Snacks | 34 | 8 | 79
P049 | Barritas de proteínas | 6.34 | Snacks | 35 | 6 | 99
P050 | Muffins | 25.15 | Snacks | 27 | 9 | 72
P051 | Cupcakes | 48.84 | Snacks | 65 | 4 | 66
P052 | Res | 33.32 | Carnes | 14 | 7 | 95
P053 | Pollo | 45.06 | Carnes | 7 | 7 | 81
P054 | Cerdo | 29.34 |Carnes | 22 | 8 | 68
P055 | Detergente | 18.18 | Limpieza y Hogar | 66 | 9 | 98
P056 | Desinfectante | 29.35 | Limpieza y Hogar | 33 | 7 | 91
P057 | Jabon | 44.45 | Limpieza y Hogar | 93 | 7 | 58
P058 | Bolsas de basura | 21.22 | Limpieza y Hogar | 60 | 2 | 54
P059 | Velas | 9.5 | Limpieza y Hogar | 79 | 0 | 89
P060 | Fosforos | 13.27 | Limpieza y Hogar | 70 | 5 | 78
P061 | Bombillas | 45.33 | Limpieza y Hogar | 54 | 8 | 75
P062 | Pilas | 25.86 | Limpieza y Hogar | 74 | 10 | 60
P063 | Jabon | 37.36 | Higiene Personal y Farmacia | 4 | 6 | 64
P064 | Shampoo | 16.25 | Higiene Personal y Farmacia | 30 | 1 | 89
P065 | Pasta de dientes | 47.36 | Higiene Personal y Farmacia | 78 | 5 | 73
P066 | Crema corporal | 46.29 | Higiene Personal y Farmacia | 13 | 9 | 66
P067 | Desobrantes | 10.58 | Higiene Personal y Farmacia | 29 | 9 | 58
P068 | Protector solar | 22.08 | Higiene Personal y Farmacia | 83 | 5 | 96
P069 | Toallas femeninas | 32.37 |Higiene Personal y Farmacia | 16 | 8 | 52
P070 | Vitaminas | 43.85 | Higiene Personal y Farmacia | 89 | 6 | 80
P071 | Suplementos | 17.25 | Higiene Personal y Farmacia | 55 | 2 | 50
P072 | Insecticidas | 43.92 | Jardinería | 18 | 0 | 97
P073 | Raticidas | 11.42 | Jardinería | 53 | 7 | 87
P074 | Plantas y flores | 13.43 | Jardinería | 44 | 5 | 93
P075 | Cuadernos | 13.29 | Papelería | 5 | 3 | 67
P076 | Boligrafos | 24.46 | Papelería | 11 | 4 | 80
P077 | Borrador | 30.29 | Papelería | 23 | 2 | 76
P078 | Colores | 17.28 | Papelería | 41 | 9 | 88
P079 | Marcatextos | 17.57 | Papelería | 11 | 10 | 80
P080 | Sacapuntas | 20.88 | Papelería | 48 | 0 | 55
`;

const dao = new ProductDAO(data);
console.log("Productos con existencia > 20:", dao.productosExistenciaMayor20());
console.log("Productos con existencia < 15:", dao.productosExistenciaMenor15());
console.log("Productos por clasificación con precio > $15.50:", dao.productosMismaClasifPrecioMayor1550());
console.log("Productos con precio entre $20.30 y $45.00:", dao.productosPrecioEntre2030Y4500());
console.log("Número de productos por clasificación:", dao.numeroProductosPorClasificacion());
