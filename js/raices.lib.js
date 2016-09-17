var Raices = {
    calcular: function(coefPolinomio) {
        var Pn = coefPolinomio[coefPolinomio.length - 1]
        var divisores = this.encontrarDivisores(Pn)
        var raices = new Array
        for (var i = 0; i < divisores.length; i++) {
            var divisor = divisores[i]
            var resContarRaiz = this.contarRaiz(divisor, coefPolinomio)
            if (resContarRaiz > 0) {
                for (var j = 0; j < resContarRaiz; j++) {
                    raices.push(divisor)
                }
            }
        }
        return raices
    },
    encontrarDivisores: function(Pn) {
        var divisores = new Array()
        for (var i = 0; i < Pn; i++) {

            if (Pn % i === 0) {
                divisores.push(i);
                divisores.push(-i);
            }
        }
        return divisores
    },

    contarRaiz: function(divisor, coefPolinomio) {
        var contador = 0
        var resEsRaiz = true
        while (resEsRaiz) {
            var resultado = this.esRaiz(divisor, coefPolinomio)
            resEsRaiz = resultado[0]
            if (resEsRaiz) {
                var coefResiduo = resultado[1]
                coefPolinomio = coefResiduo.slice(0, coefResiduo.length - 1)
                contador++
            }
        }
        return contador
    },
    esRaiz: function(divisor, coefPolinomio) {
        var orden = coefPolinomio.length - 1
        var coefResiduo = new Array(orden)
        coefResiduo[0] = coefPolinomio[0]
        for (var i = 1; i <= orden; i++) {
            coefResiduo[i] = (divisor * coefResiduo[i - 1]) + coefPolinomio[i]
        }
        return [coefResiduo[orden] == 0, coefResiduo]
    }
}
