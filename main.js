document.addEventListener("DOMContentLoaded", function() {
    // Pedir los datos del cliente
    function pedirDatosCliente() {
        alert("Bienvenido a Mundo Tila, la tienda de ropa infantil más completa de Argentina.");
        alert("Por favor, ingrese sus datos para continuar con la compra.");
        const nombre = prompt("Ingrese su nombre y apellido:");
        const dni = prompt("Ingrese su DNI o número de CUIT/CUIL:");
        const direccion = prompt("Ingrese su dirección:");
        return { nombre, dni, direccion };
    }

    // Productos por categoría
    const productos = {
        niño: [
            { nombre: "Remera niño", precio: 7000 },
            { nombre: "Pantalón niño", precio: 15000 },
            { nombre: "Saco niño", precio: 40000 },
            { nombre: "Campera niño", precio: 85000 }
        ],
        niña: [
            { nombre: "Remera niña", precio: 9000 },
            { nombre: "Pantalón niña", precio: 16000 },
            { nombre: "Vestido niña", precio: 23000 },
            { nombre: "Saco niña", precio: 65000 },
            { nombre: "Campera niña", precio: 84000 }
        ],
        bebe: [
            { nombre: "Body bebé", precio: 21000 },
            { nombre: "Remera bebé", precio: 12000 },
            { nombre: "Pantalón bebé", precio: 10000 }
        ]
    };

    // Clase para representar los productos
    class Producto {
        constructor(nombre, precio) {
            this.nombre = nombre;
            this.precio = precio;
        }
    }

    // Clase para el carrito de compras
    class CarritoDeCompras {
        constructor() {
            this.productos = [];
        }

        agregarProducto(producto) {
            this.productos.push(producto);
        }

        calcularSubtotal() {
            return this.productos.reduce((total, producto) => total + producto.precio, 0);
        }

        calcularIVA(subtotal) {
            const TASA_IVA = 0.21;
            return subtotal * TASA_IVA;
        }

        // Costos de envío por ciudad (valores aproximados tomando como destino Mendoza, de nada PROFE ;))
        calcularEnvio(ciudad) {
            const costosEnvioCiudad = {
                "La Plata": 3500, "Mar del Plata": 3700, "Bahía Blanca": 3600, "Tandil": 3550, "Quilmes": 3500,
                "Trenque Lauquen": 3400,
                "San Fernando del Valle de Catamarca": 3200, "Andalgalá": 3250, "Belén": 3250, "Santa María": 3300, "Tinogasta": 3300,
                "Resistencia": 3400, "Presidencia Roque Sáenz Peña": 3450, "Villa Ángela": 3450, "Barranqueras": 3400, "Fontana": 3400,
                "Rawson": 3900, "Comodoro Rivadavia": 4000, "Puerto Madryn": 3950, "Trelew": 3950, "Esquel": 4000,
                "Córdoba": 2500, "Villa Carlos Paz": 2550, "Río Cuarto": 2600, "Villa María": 2550, "Alta Gracia": 2550,
                "Corrientes": 3400, "Goya": 3450, "Mercedes": 3450, "Paso de los Libres": 3500, "Bella Vista": 3450,
                "Paraná": 3100, "Concordia": 3150, "Gualeguaychú": 3150, "Villaguay": 3200, "Colón": 3200,
                "Formosa": 3500, "Clorinda": 3550, "Pirané": 3550, "El Colorado": 3550, "Las Lomitas": 3550,
                "San Salvador de Jujuy": 3300, "Palpalá": 3300, "Perico": 3300, "Libertador General San Martín": 3350, "La Quiaca": 3400,
                "Santa Rosa": 2700, "General Pico": 2750, "Toay": 2750, "Realicó": 2800, "Eduardo Castex": 2800,
                "La Rioja": 3100, "Chilecito": 3150, "Aimogasta": 3150, "Chepes": 3200, "Villa Unión": 3200,
                "Mendoza": 1500, "San Rafael": 1700, "Godoy Cruz": 1500, "Luján de Cuyo": 1500, "Maipú": 1500,
                "Posadas": 3700, "Eldorado": 3750, "Oberá": 3750, "Puerto Iguazú": 3800, "San Vicente": 3750,
                "Neuquén": 2200, "San Martín de los Andes": 2300, "Cutral Có": 2250, "Plottier": 2250, "Zapala": 2300,
                "Viedma": 3900, "San Carlos de Bariloche": 4000, "General Roca": 3950, "Cipolletti": 3950, "Villa Regina": 3950,
                "Salta": 3200, "San Ramón de la Nueva Orán": 3250, "Tartagal": 3250, "Metán": 3300, "Cafayate": 3300,
                "San Juan": 1700, "Rawson": 1700, "Chimbas": 1700, "Pocito": 1700, "Caucete": 1700,
                "San Luis": 2000, "Villa Mercedes": 2050, "Merlo": 2100, "La Punta": 2050, "Justo Daract": 2100,
                "Río Gallegos": 4200, "Caleta Olivia": 4150, "El Calafate": 4200, "Puerto Deseado": 4150, "Las Heras": 4150,
                "Santa Fe": 3100, "Rosario": 3150, "Rafaela": 3200, "Reconquista": 3250, "Venado Tuerto": 3200,
                "Santiago del Estero": 3200, "La Banda": 3250, "Termas de Río Hondo": 3250, "Añatuya": 3300, "Quimilí": 3300,
                "Ushuaia": 4500, "Río Grande": 4450, "Tolhuin": 4450, "Puerto Almanza": 4500, "San Sebastián": 4500,
                "San Miguel de Tucumán": 3200, "Tafí Viejo": 3250, "Concepción": 3250, "Yerba Buena": 3250, "Aguilares": 3250
            };
            return costosEnvioCiudad[ciudad] || 0;
        }

        calcularTotal(ciudad) {
            const subtotal = this.calcularSubtotal();
            const iva = this.calcularIVA(subtotal);
            const envio = this.calcularEnvio(ciudad);
            return subtotal + iva + envio;
        }

        mostrarCarrito() {
            console.log("Productos en tu carrito:");
            this.productos.forEach(producto => {
                console.log(`${producto.nombre}: $${producto.precio}`);
            });
        }
    }

    // Lista de provincias y ciudades principales
    const provincias = {
        Buenos_Aires: ["La Plata", "Mar del Plata", "Bahía Blanca", "Tandil", "Quilmes", "Trenque Lauquen"],
        Catamarca: ["San Fernando del Valle de Catamarca", "Andalgalá", "Belén", "Santa María", "Tinogasta"],
        Chaco: ["Resistencia", "Presidencia Roque Sáenz Peña", "Villa Ángela", "Barranqueras", "Fontana"],
        Chubut: ["Rawson", "Comodoro Rivadavia", "Puerto Madryn", "Trelew", "Esquel"],
        Córdoba: ["Córdoba", "Villa Carlos Paz", "Río Cuarto", "Villa María", "Alta Gracia"],
        Corrientes: ["Corrientes", "Goya", "Mercedes", "Paso de los Libres", "Bella Vista"],
        Entre_Rios: ["Paraná", "Concordia", "Gualeguaychú", "Villaguay", "Colón"],
        Formosa: ["Formosa", "Clorinda", "Pirané", "El Colorado", "Las Lomitas"],
        Jujuy: ["San Salvador de Jujuy", "Palpalá", "Perico", "Libertador General San Martín", "La Quiaca"],
        La_Pampa: ["Santa Rosa", "General Pico", "Toay", "Realicó", "Eduardo Castex"],
        La_Rioja: ["La Rioja", "Chilecito", "Aimogasta", "Chepes", "Villa Unión"],
        Mendoza: ["Mendoza", "San Rafael", "Godoy Cruz", "Luján de Cuyo", "Maipú"],
        Misiones: ["Posadas", "Eldorado", "Oberá", "Puerto Iguazú", "San Vicente"],
        Neuquén: ["Neuquén", "San Martín de los Andes", "Cutral Có", "Plottier", "Zapala"],
        Rio_Negro: ["Viedma", "San Carlos de Bariloche", "General Roca", "Cipolletti", "Villa Regina"],
        Salta: ["Salta", "San Ramón de la Nueva Orán", "Tartagal", "Metán", "Cafayate"],
        San_Juan: ["San Juan", "Rawson", "Chimbas", "Pocito", "Caucete"],
        San_Luis: ["San Luis", "Villa Mercedes", "Merlo", "La Punta", "Justo Daract"],
        Santa_Cruz: ["Río Gallegos", "Caleta Olivia", "El Calafate", "Puerto Deseado", "Las Heras"],
        Santa_Fe: ["Santa Fe", "Rosario", "Rafaela", "Reconquista", "Venado Tuerto"],
        Santiago_Del_Estero: ["Santiago del Estero", "La Banda", "Termas de Río Hondo", "Añatuya", "Quimilí"],
        Tierra_Del_Fuego: ["Ushuaia", "Río Grande", "Tolhuin", "Puerto Almanza", "San Sebastián"],
        Tucumán: ["San Miguel de Tucumán", "Tafí Viejo", "Concepción", "Yerba Buena", "Aguilares"]
    };

    // Pedir provincia y ciudad
    function pedirProvinciaYCiudad() {
        // Elegir provincia
        let listaProvincias = "Elija la provincia:\n";
        const nombresProvincias = Object.keys(provincias);
        nombresProvincias.forEach((prov, idx) => {
            listaProvincias += `${idx + 1}. ${prov}\n`;
        });
        let opcionProvincia = prompt(listaProvincias);
        let idxProvincia = parseInt(opcionProvincia) - 1;
        if (idxProvincia < 0 || idxProvincia >= nombresProvincias.length) {
            alert("Provincia inválida. Saliendo...");
            return null;
        }
        const provinciaElegida = nombresProvincias[idxProvincia];

        // Elegir ciudad
        let listaCiudades = `Elija la ciudad de ${provinciaElegida}:\n`;
        provincias[provinciaElegida].forEach((ciudad, idx) => {
            listaCiudades += `${idx + 1}. ${ciudad}\n`;
        });
        let opcionCiudad = prompt(listaCiudades);
        let idxCiudad = parseInt(opcionCiudad) - 1;
        if (idxCiudad < 0 || idxCiudad >= provincias[provinciaElegida].length) {
            alert("Ciudad inválida. Saliendo...");
            return null;
        }
        const ciudadElegida = provincias[provinciaElegida][idxCiudad];

        return { provincia: provinciaElegida, ciudad: ciudadElegida };
    }

    // Elegir la categoría
    function elegirCategoria() {
        let opcion = prompt(
            "Elija la categoría:\n1. Niño\n2. Niña\n3. Bebé"
        );
        if (opcion === "1") return "niño";
        if (opcion === "2") return "niña";
        if (opcion === "3") return "bebe";
        return null;
    }

    // Mostrar productos y elegir
    function elegirProductos(categoria, carrito) {
        let seguir = true;
        while (seguir) {
            let lista = "Elija un producto:\n";
            productos[categoria].forEach((prod, idx) => {
                lista += `${idx + 1}. ${prod.nombre} - $${prod.precio}\n`;
            });
            lista += `${productos[categoria].length + 1}. Terminar compra`;
            let opcionProd = prompt(lista);

            let idx = parseInt(opcionProd) - 1;
            if (idx >= 0 && idx < productos[categoria].length) {
                carrito.agregarProducto(new Producto(productos[categoria][idx].nombre, productos[categoria][idx].precio));
                alert(`${productos[categoria][idx].nombre} agregado al carrito.`);
            } else if (idx === productos[categoria].length) {
                seguir = false;
            } else {
                alert("Opción inválida.");
            }
        }
    }

    // Ejecutar el carrito de compras

    function principal() {
        const cliente = pedirDatosCliente();
        const ubicacion = pedirProvinciaYCiudad();
        if (!ubicacion) return;

        const carrito = new CarritoDeCompras();

        let seguirComprando = true;
        while (seguirComprando) {
            const categoria = elegirCategoria();
            if (!categoria) {
                alert("Categoría inválida. Saliendo...");
                return;
            }
            elegirProductos(categoria, carrito);

            seguirComprando = prompt("¿Desea comprar en otra categoría? (si/no)").toLowerCase() === "si";
        }

        carrito.mostrarCarrito();

        const subtotal = carrito.calcularSubtotal();

        // Mostrar detalle de productos y subtotal antes del resumen final

        let detalle = "Detalle de productos elegidos:\n";
        carrito.productos.forEach(producto => {
            detalle += `- ${producto.nombre}: $${producto.precio}\n`;
        });
        detalle += `Subtotal: $${subtotal}\n`;
        alert(detalle);

        const iva = carrito.calcularIVA(subtotal);
        const envio = carrito.calcularEnvio(ubicacion.ciudad);
        const total = subtotal + iva + envio;

        let resumen = `Resumen de compra para ${cliente.nombre}:\n` +
            `DNI/CUIT/CUIL: ${cliente.dni}\n` +
            `Provincia: ${ubicacion.provincia}\n` +
            `Ciudad: ${ubicacion.ciudad}\n` +
            `Subtotal: $${subtotal}\n` +
            `IVA (21%): $${iva}\n` +
            `Envío: $${envio}\n` +
            `TOTAL: >>> $${total} <<<`;

        console.log(resumen);
        alert(resumen);

        // Preguntar si desea confirmar la compra
        const confirmar = prompt("¿Desea confirmar la compra? (si/no)");
        if (confirmar && confirmar.toLowerCase() === "si") {
            
            // Mostrar cartel con dirección completa y pedir confirmación
            
            let datosEnvio = `El pedido será enviado a:\nDirección: ${cliente.direccion}\nProvincia: ${ubicacion.provincia}\nCiudad: ${ubicacion.ciudad}\n¿Es correcto? (si/no)`;
            let esCorrecto = prompt(datosEnvio);

            // Si no es correcto, permitir corregir datos
            if (esCorrecto && esCorrecto.toLowerCase() !== "si") {
                cliente.direccion = prompt("Ingrese la dirección correcta:");
                const nuevaUbicacion = pedirProvinciaYCiudad();
                if (nuevaUbicacion) {
                    ubicacion.provincia = nuevaUbicacion.provincia;
                    ubicacion.ciudad = nuevaUbicacion.ciudad;
                }
            }

            const mail = prompt("Ingrese su correo electrónico para enviarle la factura:");
            alert(`¡Gracias por comprar en Mundo Tila! La factura será enviada a: ${mail}`);
        } else {
            alert("Compra cancelada. ¡Gracias por visitar nuestra tienda!");
        }
    }

    // Ejecutar la aplicación del carrito de compras
    principal();
});