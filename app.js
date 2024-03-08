//el DOM es el puente para conectar el html con js
let numSecreto = 0;   //numSecreto es variable global
let intento = 0;
let listaNumSorteado = []; //inicializamos la lista
let numMaximo = 10;

//creamos la funcion asignarTextoElemento
function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento); //esta linea retorna el h1 del html
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value); //accedemos al input de nuesstro html a travez de su id, ya que tendremos varios inputs
    console.log(numSecreto);
    console.log(numeroDeUsuario);

    if(numeroDeUsuario === numSecreto){
        asignarTextoElemento('p', `Acertaste el numero en ${intento} ${(intento === 1) ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');

    }else{
        //el usuario no acerto
        if(numeroDeUsuario > numSecreto){
            asignarTextoElemento('p', 'El numero secreto es menor');
        }else{
            asignarTextoElemento('p', 'El numero secreto es mayor');
        }
        intento = intento+1;
        limpiarCaja();
    }
    return;
}

function limpiarCaja(){
    document.querySelector('#valorUsuario').value=''; //le decimos al queryselector que lo queremos por ID
}

function generarNumSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numMaximo)+1;

    console.log(numeroGenerado);
    console.log (listaNumSorteado);

    //preguntamos si ya se sortearon todos los numeros posibles en funcion al rango definido
    if(listaNumSorteado.length == numMaximo){
        asignarTextoElemento('p', 'Ya se sortearon todos los numeros posibles.');
    }else{
        //caso contraio seguimos jugando
        if(listaNumSorteado.includes(numeroGenerado)){ //el includes recorre nuestro arreglo y verifica si algo ya existe, nos devuelve un booleano
            return generarNumSecreto(); //vuelve a ejecutar la funcion
        }else{
            listaNumSorteado.push(numeroGenerado);
            return numeroGenerado;
        }
    }

}

function condicionesIniciales(){
    asignarTextoElemento('h1', 'Juego del numero secreto.');
    asignarTextoElemento('p', `Indica un N° del 1 al ${numMaximo}.`);

    numSecreto = generarNumSecreto(); 
    intento = 1;
}

function reiniciarJuego(){
    //limpiar caja
    limpiarCaja();
    //indicar mensaje de intervalos de numeros
    //generar el numero aleatorio
    //inicializar el numero de intentos
    condicionesIniciales();
    //deshabuilitar el boton de Nuevo Juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

condicionesIniciales();