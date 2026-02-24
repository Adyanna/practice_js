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