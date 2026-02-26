/*
EJERCICIO 4: Arreglar bug asíncrono
El cliente está intentando obtener datos de un usuario usando su ID (el ID 1 debería existir), 
pero siempre obtiene undefined. Nos ha pasado el código para que lo revisemos y arreglemos.

TAREAS:
1. Identifica el problema (¿por qué da undefined?)
    Es porque la asignación del valor a user se realiza 2 segundos después, 
    mientras que el valor se retorna e imprime en consola antes de que esa asignación ocurra.
2. Explica qué es la asincronía y por qué causa este problema
    La asincronica es la forma de ejecutar funciones o tareas al terminal una operacion.
    Por lo que dentro de la funcion, al retonar el valor de user, este aun no se encuentra asignado,
    posteriormente, se ejecuta el setTimeout en donde si se realiza la asignacion el objeto

3. Arréglalo usando Promises
4. Arréglalo también usando async/await
Código a arreglar, simula una llamada a un API que trae usuarios de una base de datos:
*/

const users = [
  { id: 1, name: "Ana García" },
  { id: 2, name: "Carlos López" },
  { id: 3, name: "María Torres" },
  { id: 4, name: "Luis Fernández" },
  { id: 5, name: "Sofía Ramírez" },
  { id: 6, name: "Diego Molina" }
]

//FUNCION INICIAL
function getUser(id) { 
    let user; 
    setTimeout(() => { 
        if (id === 1) {
            user = { id: 1, name: "John Doe" }; 
        } 
    }, 2000);
    return user; 
} 
    
const user = getUser(1);
console.log(user);

//FUNCION CON PROMESAS
function getUserprom(id){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            let user = users.find(u=>u.id===id);
            if(user){
                resolve(user);
            }else{
                reject(`Usuario con id ${id} no encontrado`)
            }
        },2000);
    })
}

//USO CON PRIMISES
getUserprom(5)
.then((user)=>{
    console.log('Usuario encontrado promises: ', user)
    console.log("Busqueda finalizada promises");
})
.catch((error) => {
    console.log("Error: ",error);
})

// FUNCION ASYNC/AWAIT 
async function getUserawait(id) {
    console.log("Inicia busqueda Async/await");
    try{
        let user = await getUserprom(id)
        console.log('Usuario encontrado Async/Await: ', user)
        console.log("Busqueda Finalizada await");
    }catch(error)
    {
        console.log("Error: ", error);
    }   
}

//PRUEBAS
getUserawait(1);
getUserawait(2);
getUserawait(10);