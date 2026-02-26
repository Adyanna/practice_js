/*
EJERCICIO 5: Gestión de Taller
Retomamos el ejercicio del parque de coches que vimos en clase. De tal forma que vamos a ampliar las funciones para gestionar el inventario del taller.
Datos base: Usa el modelo de datos que creamos en clase (puedes simplificarlo si lo necesitas) y añade 5 coches más, con diferentes datos.
    
    Funciones a implementar:
    1. getCarsWithBeacon(cars):
    Retorna array con los coches que TIENEN baliza V16.
    2. getCarsWithApprovedBeacon(cars):
    Retorna array con coches que tienen baliza V16 Y está homologada, 
    útil para saber qué coches cumplen la normativa.
    3. getCarsWithLowPressure(cars, minPressure):
    Recibe un mínimo de presión (ej: 2.0 bar). Retorna coches con AL MENOS UNA rueda por debajo del 
    mínimo. Incluye información de qué ruedas están bajas
    4. getCarReport(cars, licensePlate):
    Busca un coche por matrícula. Genera un informe legible en texto. Incluye: datos básicos (matrícula, marca, Kms, propietario…), 
    estado de seguridad, ruedas, historial de visitas al taller.

Requisitos técnicos:
    - Usa métodos de arrays (`.filter()`, `.map()`, `.find()`),
    - NO mutes los datos originales
    - Maneja casos donde no se encuentre el coche

TAREAS:
    1. Array de datos con al menos 5 coches variados
    2. Las 4 funciones implementadas
    3. Ejemplos de uso de cada función
    4. Comentarios explicando la lógica (si fuera necesario)
*/
//ESTRUCTURA
const carsTaller = [
    {
        licensePlate: "1234-ABC",
        brand: "Toyota",
        model: "Corolla",
        year: 2019,
        kilometers: 45000,
        owner: {
            name: "Ana García",
            phone: "+34 612 345 678"
        },
        safety: {
            hasV16Beacon: true,
            v16Approved: true,
            lastITV: "2024-01-10"  // caducada (más de 1 año)
        },
        tires: {
            frontLeft: 2.2,
            frontRight: 2.2,
            rearLeft: 1.7,
            rearRight: 2.0
        },
        visits: [
            { date: "2024-01-10", service: "ITV", cost: 45, description: "ITV pasada con éxito" },
            { date: "2024-06-20", service: "Cambio de aceite", cost: 80, description: "Aceite 5W30 + filtro" }
        ]
    },
    {
        licensePlate: "5678-XYZ",
        brand: "Ford",
        model: "Focus",
        year: 2017,
        kilometers: 98000,
        owner: {
            name: "Carlos López",
            phone: "+34 699 876 543"
        },
        safety: {
            hasV16Beacon: false,
            v16Approved: false,
            lastITV: "2025-03-15"  // vigente
        },
        tires: {
            frontLeft: 1.5,  // baja presión
            frontRight: 2.1,
            rearLeft: 2.0,
            rearRight: 1.4   // baja presión
        },
        visits: [
            { date: "2025-03-15", service: "Revisión general", cost: 120, description: "Frenos + ITV" }
        ]
    },
    {
        licensePlate: "9999-ZZZ",
        brand: "Seat",
        model: "Ibiza",
        year: 2021,
        kilometers: 22000,
        owner: {
            name: "María Torres",
            phone: "+34 655 111 222"
        },
        safety: {
            hasV16Beacon: true,
            v16Approved: true,
            lastITV: "2023-11-01"  // caducada (más de 1 año)
        },
        tires: {
            frontLeft: 2.3,
            frontRight: 2.3,
            rearLeft: 2.1,
            rearRight: 2.2
        },
        visits: []
    },
    {
        licensePlate: "4321-DEF",
        brand: "Volkswagen",
        model: "Golf",
        year: 2018,
        kilometers: 67000,
        owner: {
            name: "Pedro Sánchez",
            phone: "+34 611 222 333"
        },
        safety: {
            hasV16Beacon: true,
            v16Approved: false, // tiene V16 pero NO homologada
            lastITV: "2024-09-05"
        },
        tires: {
            frontLeft: 2.1,
            frontRight: 2.0,
            rearLeft: 2.2,
            rearRight: 2.1
        },
        visits: [
            { date: "2024-09-05", service: "ITV", cost: 50, description: "ITV favorable" }
        ]
    },
    {
        licensePlate: "2468-GHI",
        brand: "Renault",
        model: "Clio",
        year: 2016,
        kilometers: 112000,
        owner: {
            name: "Lucía Romero",
            phone: "+34 677 444 555"
        },
        safety: {
            hasV16Beacon: false,
            v16Approved: false,
            lastITV: "2023-08-20" // caducada
        },
        tires: {
            frontLeft: 1.3, // baja presión
            frontRight: 2.0,
            rearLeft: 1.4,  // baja presión
            rearRight: 2.1
        },
        visits: [
            { date: "2023-08-20", service: "ITV", cost: 45, description: "ITV con observaciones" }
        ]
    },
    {
        licensePlate: "1357-JKL",
        brand: "Hyundai",
        model: "Tucson",
        year: 2022,
        kilometers: 18000,
        owner: {
            name: "Jorge Medina",
            phone: "+34 688 999 111"
        },
        safety: {
            hasV16Beacon: true,
            v16Approved: true, // V16 homologada
            lastITV: "2026-02-10"
        },
        tires: {
            frontLeft: 2.4,
            frontRight: 2.4,
            rearLeft: 2.3,
            rearRight: 2.3
        },
        visits: []
    },
    {
        licensePlate: "8642-MNO",
        brand: "Peugeot",
        model: "208",
        year: 2015,
        kilometers: 134000,
        owner: {
            name: "Raúl Navarro",
            phone: "+34 622 777 888"
        },
        safety: {
            hasV16Beacon: true,
            v16Approved: false, // no homologada
            lastITV: "2024-02-01"
        },
        tires: {
            frontLeft: 1.2, // baja presión
            frontRight: 1.3, // baja presión
            rearLeft: 2.0,
            rearRight: 2.1
        },
        visits: [
            { date: "2024-02-01", service: "Cambio de neumáticos", cost: 300, description: "Recomendado cambio delantero" }
        ]
    },
    {
        licensePlate: "7777-PQR",
        brand: "BMW",
        model: "Serie 1",
        year: 2020,
        kilometers: 39000,
        owner: {
            name: "Elena Ruiz",
            phone: "+34 633 555 666"
        },
        safety: {
            hasV16Beacon: false,
            v16Approved: false,
            lastITV: "2025-11-18"
        },
        tires: {
            frontLeft: 2.2,
            frontRight: 2.2,
            rearLeft: 2.2,
            rearRight: 2.2
        },
        visits: [
            { date: "2025-01-10", service: "Revisión general", cost: 150, description: "Todo correcto" }
        ]
    }
]

// Aclaracion: Las funciones que son version old, son la forma en la cual encuentro mas fasil el poder desarrollar el ejercicio, 
// posteriormente este lo acondiciono a la verion avanzada, donde utilizo las funciones de array's y objetos

//EJERCICIO 1
/*
Version Old (getCarsWithBeacon_old): se realiza la iteracion del array mediante for, obteniendo asi cada objeto y el valor de la valiza,
             acumulando los registros que cumplas con esta condicion en un array nuevo.
Version avanzada (getCarsWithBeacon): se utiliza la funcion filter, el cual crea un nuevo array y dentro de estos aniade los registros
            que cumplan con la condicion indicada. Para la condicion se utiliza una funcion fecha, donde se obtene 
            el objeto safety utilizando destructuring, y se compara la propiedad hasv1Beacon con true.
*/
function getCarsWithBeacon_old(cars) {
    let resp = [];
    for (let i = 0; i < cars.length; i++) {
        if (cars[i].safety.hasV16Beacon === true) {
            resp.push(cars[i]);
        }
    }
    return resp
}
function getCarsWithBeacon(cars) {
    return cars.filter(({ safety }) => safety.hasV16Beacon === true);
}

//PRUBEAS EJERCICIO 1
console.log("Coches que tiene valiza V16: ", getCarsWithBeacon_old(carsTaller));
console.log("Coches que tiene valiza V16: ", getCarsWithBeacon(carsTaller));

//EJERCICIO 2
/*
Version Old (getCarsWithApprovedBeacon_old): se realiza la iteracion del array mediante for, obteniendo asi cada objeto y el valor de la valiza y 
            la misma se encuentra aprobada, acumulando los registros que cumplan con esta condicion en un array nuevo.
Version avanzada (getCarsWithApprovedBeacon): se utiliza la funcion filter, el cual crea un nuevo array y dentro de estos aniade los registros
            que cumplan con las condiciones de si tiene valiza y si se encuentra autorizada. Para la condicion se 
            utiliza una funcion fecha, donde se obtene el objeto safety utilizando destructuring.
*/
function getCarsWithApprovedBeacon_old(cars) {
    let resp = [];
    for (let i = 0; i < cars.length; i++) {
        if (cars[i].safety.hasV16Beacon === true && cars[i].safety.v16Approved === true) {
            resp.push(cars[i]);
        }
    }
    return resp
}
function getCarsWithApprovedBeacon(cars) {
    return cars.filter(({ safety }) => safety.hasV16Beacon === true && safety.v16Approved === true);
}
// PRUEBAS EJERCICIO 2
console.log("Coches que tiene valiza V16 y estan aprobadas: ", getCarsWithApprovedBeacon_old(carsTaller));
console.log("Coches que tiene valiza V16 y estan aprobadas: ", getCarsWithApprovedBeacon(carsTaller));

//EJERCISIO 3
/*
Version Old (getCarsWithLowPressure_old): Es la version con la cual iteramos el array usando el bucle for, usando el condicionante if para poder identificar
            si las llantas se encuentran por debajo de parametro enviado, para la misma que cumpla esta condicion se anade un 
            nuevo campo _commt, donde se indica la observacion.
Version avanzada (getCarsWithLowPressure): Se utiliza la función filter con la condición de que alguna de las llantas se encuentre por debajo de la presión 
            indicada como parámetro. Posteriormente, los registros devueltos se procesan con la función map para añadir las observaciones de las llantas que 
            no cumplen la condición. Para ello, se utilizan las funciones Object.entries y forEach, creando nuevos campos y retornando el objeto completo.
*/
function getCarsWithLowPressure_old(cars, minPressure) {
    let new_array = []
    for (let i = 0; i < cars.length; i++) {
        let car = cars[i];

        if (car.tires.frontLeft < Number(minPressure) || car.tires.frontRight < Number(minPressure) || car.tires.rearLeft < Number(minPressure) || car.tires.rearRight < Number(minPressure)) {

            let newTires = {
                frontLeft: car.tires.frontLeft,
                frontRight: car.tires.frontRight,
                rearLeft: car.tires.rearLeft,
                rearRight: car.tires.rearRight,
            }

            if (newTires.frontLeft < minPressure) { newTires.frontLeftcommt = "Llanta frontal izquierda con presión baja" };
            if (newTires.frontRight < minPressure) { newTires.frontRigthcommt = "Llanta frontal derecha con presión baja" };
            if (newTires.rearLeft < minPressure) { newTires.rearLeftcommt = "Llanta trasera izquierda con presión baja" };
            if (newTires.rearRight < minPressure) { newTires.rearRightcommt = "Llanta trasera derecha con presión baja" };

            new_array.push({ ...car, tires: newTires })
        }
    }
    return new_array
}
function getCarsWithLowPressure(cars, minPressure) {
    return cars.filter((car)=>
        car.tires.frontLeft<minPressure||car.tires.frontRight<minPressure||car.tires.rearLeft<minPressure||car.tires.rearRight<minPressure
    ).map((car)=>{
        let newtires = {...car.tires}; 
        Object.entries(car.tires).forEach(([tire,pressure])=>{
            if(pressure<minPressure){
                let name
                switch (tire) {
                    case "frontLeft": name ="frontal izquierda"; break
                    case "frontRight": name ="frontal derehcha"; break
                    case "rearLeft": name ="tracera izquierda"; break
                    case "rearRight": name ="tracera derecha"; break
                    default: name ="no identificada";  }
                newtires[`${tire}Comment`]=`La llanta ${name} tiene presion baja`;
            }
        });
        return {...car,tires:newtires}
    })
}

//PRUEBAS EJERCICIO 3
console.log("Coches con presion baja en las llantas: ",getCarsWithLowPressure_old(carsTaller, 2))
console.log("Coches con presion baja en las llantas: ",getCarsWithLowPressure(carsTaller,2));

// EJERCICIO 4
/*
Version Old (getCarReport_old): Es la version con la cual iteramos el array usando el bucle for, usando el condicionante if para poder identificar
           si el numero de matricula coincide con el parametro enviado, si es asi, creamos el reporte con los datos del vehiculo e iteramos con otro 
           for el objeto de las visitas, finalmente lo concatenamos y devolvemos el texto.
Version avanzada (getCarReport): Se utiliza la función find, la cual devuelve un único objeto que coincide con la condición. Posteriormente, se utiliza 
            una condición if para validar su existencia y así generar el reporte. Para iterar las visitas, se emplea la función map, creando un nuevo 
            arreglo que luego se convierte en texto mediante la función join.
*/
function getCarReport_old(cars, licensePlate){
    let report
    for (let i = 0; i<cars.length; i++ ){
        if (cars[i].licensePlate===licensePlate){
            let visits
            report = `Datos generales del vehículo
    Matrícula: ${cars[i].licensePlate}
    Marca: ${cars[i].brand}
    Modelo: ${cars[i].model}
    Año: ${cars[i].year}
    Kilometraje: ${cars[i].kilometers} km
Datos del propietario
    Nombre: ${cars[i].owner.name}
    Teléfono: ${cars[i].owner.phone}
Estado de seguridad
    Baliza V16 instalada: ${cars[i].safety.hasV16Beacon}
    Baliza V16 homologada: ${cars[i].safety.v16Approved}
    Última ITV: ${cars[i].safety.lastITV}
Estado de las ruedas:
    Delantera izquierda: ${cars[i].tires.frontLeft}
    Delantera derecha: ${cars[i].tires.frontRight}
    Trasera izquierda: ${cars[i].tires.rearLeft}
    Trasera derecha: ${cars[i].tires.rearRight}`;
            if (cars[i].visits.length>0){
                visits=`\nHistorial de visitas al taller`;
                for (let j = 0; j<cars[i].visits.length; j++ )
                {
                    visits += `\n    10/01/2024
    Servicio: ${cars[i].visits[j].service}
    Costo: ${cars[i].visits[j].cost} €`;
                }
            }
            report=report+visits;
            return report;
        }
    }
}

function getCarReport(cars, licensePlate)
{
    const car = cars.find((car)=>car.licensePlate===licensePlate);
    if (!car)
    {
        return `El vehiculo con placa ${licensePlate} no fue encontrado`;
    }else{
        const report = car.visits.length>0? `Historial de Visitas al taller\n${car.visits.map(visit=>
    `    ${visit.date}, servicio: ${visit.service}, costo: ${visit.cost} €`
        ).join("\n")}`:"";

        return `Datos generales del vehículo
    Matrícula: ${car.licensePlate}
    Marca: ${car.brand}
    Modelo: ${car.model}
    Año: ${car.year}
    Kilometraje: ${car.kilometers} km
Datos del propietario
    Nombre: ${car.owner.name}
    Teléfono: ${car.owner.phone}
Estado de seguridad
    Baliza V16 instalada: ${car.safety.hasV16Beacon}
    Baliza V16 homologada: ${car.safety.v16Approved}
    Última ITV: ${car.safety.lastITV}
Estado de las ruedas:
    Delantera izquierda: ${car.tires.frontLeft}
    Delantera derecha: ${car.tires.frontRight}
    Trasera izquierda: ${car.tires.rearLeft}
    Trasera derecha: ${car.tires.rearRight}
${report}`;
    };
}

//PRUEBAS EJERCICIO 4
console.log(getCarReport_old(carsTaller,"2468-GHI"))
console.log(getCarReport(carsTaller,"1234-ABC"))
console.log(getCarReport(carsTaller,"9999-ACCC"))
