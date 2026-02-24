/*
2.1 Un cliente necesita una función que cuente cuántas vocales hay en un texto, pero nos dice 
que siempre cuenta de menos. No nos da más detalles, solo el código.
1. Identifica el bug - ¿Qué está mal?
    La comparacion no considera mayusculas
2. Explica el problema - ¿Por qué no cuenta todas las vocales?
    Al comparar letra por letra con el array vowels, se observa que algunas vocales están en 
    mayúscula. Como el array contiene solo vocales en minúscula, estas no coinciden y no 
    son consideradas en la sumatoria.
3. Arregla el código - Corrígelo para que funcione correctamente
    Se puede corregir de dos formas:
    1. aniadiendo vocales mayusculas al array(vowels), donde se tendria
        ["a", "e", "i", "o", "u","A", "E", "I", "O", "U"]
    2. convirtiendo la letra en monuscila usando la funciona .toLowerCase(), que seria aniadida
        en la condicion if, momento en la cual se compara

    para este ejercicio se opto por la solucion 2

4. Prueba con varios casos - Verifica con diferentes textos
 */

function countVowels(text) {
    const vowels = ["a", "e", "i", "o", "u"]; 
    let counter = 0; 
    for (let i = 0; i < text.length; i++) {
         if (vowels.includes(text[i].toLowerCase())) { 
            counter++; 
            } 
        }
    return counter;
} 
const phrase = "Antes no programaba. Ahora si!"; 
const result = countVowels(phrase); 
console.log(`La frase tiene ${result} vocales`);

//prubea 2
const phrase2 = "HoY El SoL BrIlLa SoBrE El CaMiNo,UnA VoZ SuAvE ReCuErDa El PaSaDo."; //25
console.log(`La frase tiene ${countVowels(phrase2)} vocales`);
//prueba 3
const phrase3 = "EN El SiLeNcIo De La NoChE OsCuRa,La LuNa ObSeRvA LoS SuEnOs CaLlAdOs, El AlMa EsCuChA Su PrOpIa VoZ"; //37
console.log(`La frase tiene ${countVowels(phrase3)} vocales`)
//prueba 4
const phrase4 = "programar es crear con paciencia, una idea que crece con errores, hasta que el codigo finalmente fluye"; //39
console.log(`La frase tiene ${countVowels(phrase4)} vocales`)
//prueba 5
const phrase5 = "ENTRE PALABRAS QUE VAN Y VIENEN, SE ESCONDE UNA HISTORIA SILENCIOSA, QUE EL TIEMPO LEE CON CALMA LENTA"; //39
console.log(`La frase tiene ${countVowels(phrase5)} vocales`)


/*
2.2 Un cliente necesita una función que duplique cada número en un array (multiplicar por 2),
 pero nos dice que el array original también se está modificando y no quiere eso.
1. Identifica el bug - ¿Por qué se modifica el array original?
    Al ejecutar la función duplicateNumbers, se envía una referencia al array original.
    Dentro de la función se modifican sus valores mediante la multiplicación, por lo que los 
    cambios afectan tanto al array original como al resultado retornado..
2. Explica el concepto - ¿Qué significa "pasar por referencia"?
    El concepto se refiere que cuando tratas de copiar un valor como objetos o array, no se copia
    el valor como tal, si no que pasas una referencia, apuntado al objeto inicial, y al editar dicha
    copia, se modifica tambien el valor original
3. Arregla el código - Haz que NO modifique el original
    Se soluciona usando la funcion duplicateNumbers, el cual crea un nuevo array copiando al origial
    y no referenciandolo 

4. Bonus: Reescríbelo usando .map()
    Algo que me di cuenta es que se puede referencial directamente al array original, y este no
    sera modifcado, por lo que map al ejecutarse crea un nuevo array evitando modificar la original
function
*/

function duplicateNumbers(numbers) {
     for (let i = 0; i < numbers.length; i++) { 
        numbers[i] = numbers[i] * 2; 
    }
    return numbers; 
} 

const original = [1, 2, 3, 4, 5]; 
const duplicated_array = original
const duplicated = duplicateNumbers(duplicated_array); 
console.log("Original:", original); 
console.log("Duplicated:", duplicated);

//const duplicated_map = original
const duplicatedmap = original.map(num=>num*2)
console.log("Usnado la funcion map: ",duplicatedmap)