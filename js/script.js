var orden = null;

/**
 * Esta funcion se usa para dar los espacios de los coeficientes
 * ingresando el orden de la ecuacion
 */
function armarCondiciones() {
    //Solicita datos (Orden)
    var temp = document.getElementById("orden").value;
    orden = Number(temp);

    //Analiza si se ingreso el orden adecuado
    if (orden === null || orden === 0) {
        alert("Ingrese Orden");
        return;
    }
    armarTablaCoefientes()
    armarTablaValoresIniciales()
}

function armarTablaCoefientes() {
    //Crea los espacios para los coeficientes
    var t = document.getElementById("tablaCoeficientes");
    t.innerHTML = ''
    var f = t.insertRow(-1);
    for (j = 0; j < orden + 1; j++) {
        var z = f.insertCell(-1);
        var CELDA = '<input type="text"';
        CELDA += 'data-fila="' + j + '" ';
        CELDA += 'size="3">';
        CELDA += ' X^' + (orden - j) + ' '
        if (j < orden) {
            CELDA += ' + ';
        } else {
            CELDA += ' = 0'
        }

        z.innerHTML = CELDA;
    }
}

function armarTablaValoresIniciales() {
    //Crea los espacios para los coeficientes
    var t = document.getElementById("tablaValoresIniciales");
    t.innerHTML = ''
    for (j = 0; j < orden; j++) {
        var f = t.insertRow(-1);
        var z = f.insertCell(-1);
        var CELDA = ' F_' + (j) + ': '
        CELDA += '<input type="text"'
        CELDA += 'data-columna="' + j + '" ';
        CELDA += 'size="3">'

        z.innerHTML = CELDA;
    }
}

function convertirStringANumeros(parametros) {
    var arreglo = parametros
    for (var i = 0; i < parametros.length; i++) {
        if (typeof(parametros[i]) === "object") {
            for (var j = 0; j < parametros[i].length; j++) {
                arreglo[i][j] = Number(parametros[i][j])
            }
        } else {
            arreglo[i] = Number(parametros[i])
        }
    }
    return arreglo
}

function convertirColumnaAArreglo(columnas, tabla) {
    var arreglo = new Array()
    for (j = 0; j < columnas; j++) {
        var valor = tabla.querySelectorAll('[data-columna="' + j + '"]')[0].value
        arreglo.push(valor)
    }
    return arreglo
}

function convertirFilaAArreglo(filas, tabla) {
    var arreglo = new Array()
    for (i = 0; i < filas; i++) {
        var valor = tabla.querySelectorAll('[data-fila="' + i + '"]')[0].value
        arreglo.push(valor)
    }
    return arreglo
}

var es = {
    vacio: function(str) {
        if (str === '' || str === null) {
            return true
        } else {
            return false
        }
    },
    entero: function(str) {
        if (str === parseInt(str, 10).toString()) {
            return true
        } else {
            return false
        }
    },
    numero: function(str) {
        if (str === parseFloat(str).toString()) {
            return true
        } else {
            return false
        }
    },
    par: function(num) {
        if (num % 2 === 0) {
            return true
        } else {
            return false
        }
    }
}

function validarVacio(parametros) {
    for (var i = 0; i < parametros.length; i++) {
        if (typeof(parametros[i]) === "object") {
            for (var j = 0; j < parametros.length; j++) {
                if (es.vacio(parametros[i][j])) {
                    return true
                }
            }
        } else if (es.vacio(parametros[i])) {
            return true
        }
    }
    return false
}

function validarNumero(parametros) {
    for (var i = 0; i < parametros.length; i++) {
        if (typeof(parametros[i]) === "object") {
            for (var j = 0; j < parametros[i].length; j++) {
                if (!es.numero(parametros[i][j])) {
                    return false
                }
            }
        } else if (!es.numero(parametros[i])) {
            return false
        }
    }
    return true
}


function calcular() {
    var tablaCoeficientes = document.getElementById("tablaCoeficientes")
    var filas = orden + 1
    var coeficientes = convertirFilaAArreglo(filas, tablaCoeficientes)

    var tablaValoresIniciales = document.getElementById("tablaValoresIniciales")
    var columnas = orden
    var valoresIniciales = convertirColumnaAArreglo(columnas, tablaValoresIniciales)
    try {
        if (validarVacio(coeficientes)) {
            throw new Error('Algunos campos de los coeficientes se encuentran vacíos.')
        }
        if (!validarNumero(coeficientes)) {
            throw new Error('Algunos campos de los coheficientes no son números.')
        }
        if (validarVacio(valoresIniciales)) {
            throw new Error('Algunos campos de los valores iniciales se encuentran vacíos.')
        }
        if (!validarNumero(valoresIniciales)) {
            throw new Error('Algunos campos de los valores iniciales no son números.')
        }
    } catch (e) {
        window.alert(e)
        return e
    }
    coeficientes = convertirStringANumeros(coeficientes)
    console.log("coeficientes", coeficientes)
    var raices = Raices.calcular(coeficientes)
    if(raices.length === 0){
      window.alert("Las raices del polinomio no son reales.")
      return
    }
    console.log("raices", raices)
    valoresIniciales = convertirStringANumeros(valoresIniciales)
    console.log("valoresIniciales", valoresIniciales)
    var matrizCoefConstantes = calcularMatrizCoefConstantes(valoresIniciales, raices)
    console.log("matrizCoefConstantes", matrizCoefConstantes)
    var arregloConstantes = calcularArregloConstantes(matrizCoefConstantes, valoresIniciales)
    console.log("arregloConstantes", arregloConstantes)

    window.c = coeficientes
    window.r = raices
    window.vi = valoresIniciales
    window.mcc = matrizCoefConstantes
    window.ac = arregloConstantes

    var contenedorRespuesta = document.getElementById('soluciongen')
    var texto = construirTextoEcuacionRecurrencia(raices, arregloConstantes)
    contenedorRespuesta.innerHTML = texto
}

function calcularMatrizCoefConstantes(valoresIniciales, raices) {
    var matrizCoefConstantes = new Array(valoresIniciales.length)
    for (var n = 0; n < matrizCoefConstantes.length; n++) {
        var coefConstantes = new Array(raices.length)
        for (var i = 0; i < coefConstantes.length; i++) {
            coefConstantes[i] = Math.pow(raices[i], n)
            var retroceso = 1
            while (raices[i] == raices[i - retroceso]) {
                coefConstantes[i] = n * coefConstantes[i]
                retroceso++
            }
        }
        matrizCoefConstantes[n] = coefConstantes
    }
    //var fn = condicionesIniciales
    return matrizCoefConstantes
}

function calcularArregloConstantes(matrizCoefConstantes, valoresIniciales) {
    var detGeneral = Determinante.calcular(matrizCoefConstantes)
    var arregloConstantes = new Array(valoresIniciales.length)
    for (var i = 0; i < arregloConstantes.length; i++) {
        var matrizParticular = calcularMatrizParticular(i, matrizCoefConstantes, valoresIniciales)
        console.log(matrizParticular)
        detParticular = Determinante.calcular(matrizParticular)
        arregloConstantes[i] = detParticular / detGeneral
    }
    return arregloConstantes
}

function calcularMatrizParticular(indice, matrizCoefConstantes, valoresIniciales) {
    var matrizParticular = new Array(valoresIniciales.length)
    for (var i = 0; i < matrizParticular.length; i++) {
        var filaParticular = Object.assign({}, matrizCoefConstantes[i]);//copy
        filaParticular[indice] = valoresIniciales[i]
        matrizParticular[i] = filaParticular
    }
    return matrizParticular
}

function construirTextoEcuacionRecurrencia(raices, arregloConstantes) {
    var texto = 'Fn = '
    for (var i = 0; i < raices.length; i++) {
        var retroceso = 1
        while (raices[i] == raices[i - retroceso]) {
            retroceso++
        }
        var exponente = retroceso - 1
        if (exponente > 0) {
          texto += ' n^' + exponente + ' * '
        }
        texto += arregloConstantes[i] + ' (' + raices[i] + ')^n '
        if (i < raices.length - 1) {
            texto += ' + ';
        }
    }
  return texto
}
