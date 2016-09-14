/**
 */
var orden = null;
var con = null;
var tam = 0;
var sitema = null;
var raiz = null;
var solucion = null;

function armarCondiciones() {

	var temp = document.getElementById("orden").value;
	orden = Number(temp);
	var estadob1 = document.getElementById("coeficientes");
	var estadob2 = document.getElementById("capturar");
	if (orden == null || orden == 0) {
		alert("Ingrese orden");
		return;
	} else {
		estadob1.disabled = true;
		estadob2.disabled = false;
	}
	var t = document.getElementById("tabla1");
	var f = t.insertRow(-1);
	for ( j = 0; j < orden + 1; j++) {
		var nid = "" + j;
		var z = f.insertCell(-1);
		var CELDA = "<input type=\"text\"";
		CELDA = CELDA + "id=\"" + nid + "\"";
		CELDA = CELDA + "size=\"3\">";
		z.innerHTML = CELDA;
	}
}

function armarC(tam) {

	var t2 = document.getElementById("tabla2");
	for ( i = 0; i < tam; i++) {
		var f3 = t2.insertRow(-1);
		for ( j = 0; j < 2; j++) {
			var nid = "" + i + j;
			var z2 = f3.insertCell(-1);
			var CELDA3 = "<input type=\"text\"";
			CELDA3 = CELDA3 + "id=\"" + nid + "\"";
			CELDA3 = CELDA3 + "size=\"3\">";
			z2.innerHTML = CELDA3;
		}
	}

}

function capturarCondiciones(orden) {

	var estadob3 = document.getElementById("solucion");
	var estadob2 = document.getElementById("capturar");
	var c = new Array(orden + 1);
	for ( j = 0; j <= orden; j++) {
		var temp = document.getElementById("" + j).value;
		c[j] = Number(temp);
		if (c[0] == 0) {
			alert("Ingrese coeficientes");
			return;
		} else {
			estadob3.disabled = false;
			estadob2.disabled = true;
		}
	}

	raices(c, orden);
}

function raices(c, orden) {

	tam = orden;
	raiz = new Array(tam);

	if (orden == 2) {
		raiz[0] = (-c[1] + Math.sqrt((Math.pow(c[1], 2)) - (4 * c[0] * c[2]))) / (2 * c[0]);
		raiz[1] = (-c[1] - Math.sqrt((Math.pow(c[1], 2)) - (4 * c[0] * c[2]))) / (2 * c[0]);
	} else {
		var cont = 0;
		var modulo = 0;
		var or = 0;

		if (c[orden] > 0) {
			var posRaices = new Array(c[orden]);
			or = c[orden];
		} else {
			var posRaices = new Array(c[orden] * (-1));
			or = c[orden] * (-1);
		}

		for ( i = 1; i <= or; i++) {
			if ((or % i) == 0) {
				posRaices[i - 1] = i;
				cont++;
			} else {
				posRaices[i - 1] = 0;
			}
		}

		var posR = new Array(cont * 2);
		var k = 0;
		for ( i = 0; i < or; i++) {
			if (posRaices[i] != 0) {
				posR[k] = posRaices[i];
				posR[k + 1] = -posR[k];
				k = k + 2;
			}
		}

		var aux = 0;
		var div = 0;
		var coef = 0;
		var dif = 0;
		var r = new Array(cont * 2);
		for ( i = 0; i < cont * 2; i++) {
			aux = posR[i];
			div = 1;
			coef = c[0];
			for ( j = 1; j < orden + 1; j++) {
				div = (aux * coef) + c[j];
				coef = div;
			}
			if (div == 0) {
				r[i] = posR[i];
				dif++;
			} else {
				r[i] = 0;
			}
		}

		var prueba = true;
		for ( i = 0; i < cont * 2; i++) {
			if (r[i] != 0) {
				prueba = false;
			}
		}
		if (prueba == true) {
			alert("Las raices no son Reales ingrese otros coeficientes");
			document.location.href = "SOLUCIONECUACIONES.html";
			return;

		}

		var j = 0;
		for ( i = 0; i < tam; i++) {
			if (r[j] != 0) {
				raiz[i] = r[j];
				j = j + 1;
			} else {
				i = i - 1;
				j = j + 1;
			}
			if (tam == dif + 1) {
				raiz[tam - 1] = raiz[tam - 2];
			}
		}

		for ( i = 0; i < tam; i++) {
			if (raiz[i] == undefined) {
				raiz[i] = raiz[i - 1];
			}
		}
	}

	armarC(tam);

}

function capturarC(tam, raiz) {

	con = new Array(tam);
	for ( i = 0; i < tam; i++) {
		con[i] = new Array(2);
		for ( j = 0; j < 2; j++) {
			var tem = document.getElementById("" + i + j).value;
			con[i][j] = Number(tem);
		}
	}

	sistemaEcuaciones(raiz, con, tam);
}

function sistemaEcuaciones(raiz, con, tam) {

	sistema = new Array(tam);
	for ( i = 0; i < tam; i++) {
		sistema[i] = new Array(tam + 1);
		sistema[i][0] = 1 * Math.pow(raiz[0], con[i][0]);
		var k = 1;
		for ( j = 1; j < tam; j++) {
			if (raiz[j] != raiz[j - 1]) {
				sistema[i][j] = 1 * Math.pow(raiz[j], con[i][0]);
			} else {
				sistema[i][j] = 1 * Math.pow(raiz[j], con[i][0]) * Math.pow(con[i][0], k);
				k++;
			}
		}
		sistema[i][tam] = con[i][1];
	}
    /*for(i=0; i<tam; i++){
    	for(j=0; j<=tam; j++){
    		alert(sistema[i][j]);
    	}
    }*/
	Gauss(sistema, tam);
	mostrarSolucion(solucion, raiz, tam);

}

function Gauss(sistema, tam) {
	for ( i = 0; i < tam; ++i) {
		var pivote = sistema[i][i];
		for ( j = 0; j < tam + 1; ++j) {
			sistema[i][j] = sistema[i][j] / pivote;
		}
		for ( z = 0; z < tam; ++z) {
			if (z != i) {
				var aux = sistema[z][i];
				for ( jk = i; jk < tam + 1; ++jk) {
					sistema[z][jk] = sistema[z][jk] - (aux * sistema[i][jk]);
				}
			}
		}
	}
	solucion = new Array(tam);
	for ( i = 0; i < tam; i++) {
		solucion[i] = sistema[i][tam];
	}

}

function mostrarSolucion(solucion, raiz, tam) {

	var sol = document.getElementById("soluciongen");
	var solu = "fn = " + "(" + solucion[0] + ")" + "(" + raiz[0] + "<sup>n</sup> )";
	var k = 1;
	for ( i = 1; i < tam; i++) {
		if (raiz[i] != raiz[i - 1]) {
			solu = solu + " + (" + solucion[i] + ")" + "(" + raiz[i] + "<sup>n</sup> )";
		} else {
			solu = solu + " + (" + solucion[i] + ")" + "n<sup>" + k + "</sup>" + "(" + raiz[i] + "<sup>n</sup>)";
			k++;
		}
	}

	sol.innerHTML = solu;

}

function cargar() {
	document.location.href = "SOLUCIONECUACIONES.html";
	return;
}
