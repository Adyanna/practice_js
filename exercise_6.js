/**
 * EJERCICIO 6: Validaciones con Regex
Crear un sistema completo de validación de formularios usando expresiones regulares (regex).
Función principal
Debes crear una función validateForm(data) que valide todos los campos de un formulario.
Campos a validar:
- Email: Formato válido, debe contener @ y terminar en .loquesea
- Password: Mínimo 8 caracteres, al menos una mayúscula, al menos una minúscula, al menos un número, 
  al menos un caracter especial de estos: !@#$%^&*
- Phone: Asegurar que contiene +34. Debe empezar por 6 o 7. El número de teléfono debe tener 9 dígitos.
  Puede tener espacios, guiones o estar junto.
- DNI: Formato español: 12345678A, 8 dígitos seguidos de 1 letra mayúscula
- Birthdate: Formato DD/MM/YYYY, Debe ser una fecha válida. La persona debe ser mayor de 18 años.
 */

//=============================== DATA =======================================================================
const formData = {
    email: "ana@example.com", 
    password: "Pass123!", 
    phone: "+34 612 345 678", 
    dni: "12345678A",
    birthdate: "15/03/1990"
};

const formData2 = {
    email: "carlos.lopez@mail.es",
    password: "StrongP4ssword!",
    phone: "+34.699.123.456",
    dni: "87654321Z",
    birthdate: "15/07/1988"
};
const formData3 = {
    email: "anaexample.com",
    password: "Pass123aaaaa*",
    phone: "+34 612 345 678",
    dni: "12345678A",
    birthdate: "28/02/1995"
};
const formData4 = {
    email: "ana@example.com",
    password: "Pa1*",
    phone: "+34 612 345 678",
    dni: "12345678A",
    birthdate: "28/02/1995"
};
const formData5 = {
    email: "ana@example.com",
    password: "pass1234*",
    phone: "+34 612 345 678",
    dni: "12345678A",
    birthdate: "28/02/1995"
};
const formData6 = {
    email: "ana@example.com",
    password: "Pass1234*",
    phone: "+35 612 345 678",
    dni: "12345678A",
    birthdate: "28/02/1995"
};
const formData7 = {
    email: "ana@example.com",
    password: "Pass1234*",
    phone: "+34 612 345 678",
    dni: "1234A5678",
    birthdate: "28/02/1995"
};
const formData8 = {
    email: "ana@example.com",
    password: "Pass1234*",
    phone: "+34 612 345 678",
    dni: "12345678A",
    birthdate: "31/02/2020"
};
const formData9 = {
    email: "ana@example.com",
    password: "Pass1234*",
    phone: "+34 612 345 678",
    dni: "12345678A",
    birthdate: "10/12/2035"
};
const formData10 = {
    email: "ana@com",
    password: "password",
    phone: "612345678",
    dni: "12345678A",
    birthdate: "28/02/1995"
};
//================================FUNCIONES PARA VALIDAR=====================================================
function validate_email(email) {
    const valid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-z]{2,}$/;
    return valid.test(email)? {resp:true,comm:""}:{resp:false,comm:"Formato de email inválido"};
}

function validate_password(password) {
    const rules =[
        {test: pass => pass.length>=8, comm:"La contraseña debe tener al menos 8 caracteres"},
        {test: pass => /(?=.*[a-z])/.test(pass), comm:"La contraseña debe tener al menos una minuscula"},
        {test: pass => /(?=.*[A-Z])/.test(pass), comm:"La contraseña debe tener al menos una mayuscula"},
        {test: pass => /(?=.*[0-9])/.test(pass), comm:"La contraseña debe tener al menos un numero"},
        {test: pass => /(?=.*[!@#$%^&*])/.test(pass), comm:"La contraseña debe tener al menos un caracter especial"},
    ];
    //return rules.find(({test,comm})=>{});
    for(const rule of rules){
        if(!rule.test(password)){
            return {resp:false,comm:rule.comm};
        }
    }
    return {resp:true,comm:""};
}

function normalize_phone(phone) {
    const newphone = phone.replace('+34', "").replace(/[.\s]/g, "");
    return '+34 '+newphone;
}
function validate_phone(phone) {
    //Se reemplaza los espacion y puntos de forma global en parametro  para posteriormente validar el formato
    const newphone = phone.replace(/[.\s]/g, "");
    const valid = /^\+34[67]\d{8,}$/;
    return valid.test(newphone)? {resp:true,comm:""}:{resp:false,comm:"Formato de telefono inválido"};
}

function validate_dni(dni) {
    const valid = /^[0-9]{8}[A-Z]$/;
    return valid.test(dni)? {resp:true,comm:""}:{resp:false,comm:"Formato de DNI inválido"};
}
function calculate_age(birthdate){
    const [d,m,y] = birthdate.split('/').map(Number);
    const actual_date = new Date();
    let age = actual_date.getFullYear()-y;
    if(actual_date.getMonth()<m-1||(actual_date.getMonth()===m-1&&actual_date.getDate<d)){
        age -= 1;
    }
    return age;
}

function validate_birthdate(birthdate) {
    // se valida el formato de la fecha en texto, posteriormente se convierte esta fecha y verifica que exista
    // en el calendario, y finalmente se valida que la edad supere los 17 anios.
    const fecha = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
    if (!fecha.test(birthdate)){
        return {resp:false,comm:"Formato de fecha inválido"};
        
    };
    const [d,m,y] = birthdate.split('/').map(Number);
    const date = new Date(y,m-1,d);
    if (date.getFullYear()!==y||date.getMonth()!==m-1||date.getDate()!==d){
        return {resp:false,comm:"Formato de fecha inválido"};
    };
    if (calculate_age(birthdate) <18){
         return {resp:false,comm:"La edad es menor a 18 anios."};
    }
    return  {resp:true,comm:""};
}

//============================== FUNCION PARA VALIDAR TODOS LOS ERRORES ======================================
function validate_errors(data) {
    const errors = [
        {name:"email",valFun: p => validate_email(p)},
        {name:"password",valFun: p => validate_password(p)},
        {name:"phone",valFun: p => validate_phone(p)}, 
        {name:"dni",valFun: p => validate_dni(p)},
        {name:"birthdate",valFun: p => validate_birthdate(p)},
    ];
    let errorsArray=[];
    Object.entries(data).forEach(([nameObj, val]) => {
        const valid_fun = errors.find(v=>v.name===nameObj);
        const resp = valid_fun.valFun(val);
        if(!resp.resp){
            errorsArray.push({field: nameObj, message: resp.comm});
        };
    });
    return errorsArray;
}

//============================ FUNCION PRINCIAPAL PARA DEVOVER EL ARRAY =====================================

function validateForm(data) {
    const errors = validate_errors(data);
    return validate = {
        valid: !errors.length>0,
        errors,
        data:{...data,emailNormalized: data.email.toLowerCase(),
            age:calculate_age(data.birthdate),
            phone: normalize_phone(data.phone),
        }
    }
}

//============================== PRUEBAS DE LA FUNCION =======================================================
console.log("Prueba 1: ",validateForm(formData));
console.log("Prueba 2: ",validateForm(formData2));
console.log("Prueba 3: ",validateForm(formData3));
console.log("Prueba 4: ",validateForm(formData4));
console.log("Prueba 5: ",validateForm(formData5));
console.log("Prueba 6: ",validateForm(formData6));
console.log("Prueba 7: ",validateForm(formData7));
console.log("Prueba 8: ",validateForm(formData8));
console.log("Prueba 9: ",validateForm(formData9));
console.log("Prueba 10: ",validateForm(formData10));
