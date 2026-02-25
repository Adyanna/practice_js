/*
EJERCICIO 3: Transformaciones
Un cliente tiene un array de desarrolladores y nos pide extraer información específica usando
 métodos de arrays. Quiere obtener los programadores que tengan como habilidad JavaScript y 
 un listado de los proyectos en los que están trabajando
 
 TAREAS:
    1. Filtrar desarrolladores que tengan "JavaScript" como habilidad.
    2. Extraer un array con TODOS los nombres de proyectos (sin duplicados).
 */

const data = [
    {
        id: 1,
        nombre: 'Juan',
        habilidades: ['JavaScript', 'HTML', 'CSS'],
        proyectos: [{ id: 1, nombre: 'Proyecto 1' }, { id: 2, nombre: 'Proyecto 2' }]
    },
    {
        id: 2,
        nombre: 'María',
        habilidades: ['Python', 'SQL', 'Django'],
        proyectos: [{ id: 3, nombre: 'Proyecto 3' }, { id: 4, nombre: 'Proyecto 4' }]
    },
    {
        id: 3,
        nombre: 'Miriam',
        habilidades: ['UX', 'Figma', 'HTML', 'JavaScript'],
        proyectos: [{ id: 5, nombre: 'Proyecto 1' }, { id: 6, nombre: 'Proyecto 4' }]
    }
];


// 1. Filtrar
function JavaScriptDevelopers(dev){

    let dev_js = []
    for (let i = 0; i<dev.length; i++)
    {
        habilidades = dev[i].habilidades
        if (habilidades.includes('JavaScript'))
        {
            dev_js.push(dev[i])
        }
    }
    return dev_js
}

function getJavaScriptDevelopers(dev)
{
    return dev.filter(({habilidades}) => habilidades.includes("JavaScript"));
}

console.log("forma tradicional: ",JavaScriptDevelopers(data))
console.log("con destructuring: ",getJavaScriptDevelopers(data))

// 2. Extraer
function proyects(dev){
    return [...new Set(dev.flatMap((developer) => developer.proyectos.map((proy=>proy.nombre))))];
}

console.log(proyects(data))

