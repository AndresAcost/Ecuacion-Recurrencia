var Determinante = {
    //https://es.wikipedia.org/wiki/F%C3%B3rmula_de_Leibniz_para_el_c%C3%A1lculo_de_determinantes
    calcular: function(matriz) {
        var sumatoria = 0
        var n = matriz.length
        var sigma = this.S(n)
        var permutaciones = this.permutator(sigma)
        for (var a = 0; a < permutaciones.length; a++) {
            var sigma_a = permutaciones[a]
            var sgn = this.permutationSign(sigma_a)
            var prod = this.productoria(matriz, sigma_a, n)
                //console.log("sig", sgn, prod)
            sumatoria += sgn * prod
        }
        return sumatoria
    },
    S: function(n) {
        var arreglo = new Array()
        for (var i = 1; i <= n; i++) {
            arreglo.push(i)
        }
        return arreglo
    },
    productoria: function(matriz, sigma, n) {
        producto = 1
        for (var i = 0; i < n; i++) {
            //console.log(matriz,sigma,sigma[i],i)
            producto = producto * matriz[sigma[i] - 1][i]
        }
        return producto
    },
    //http://stackoverflow.com/questions/9960908/permutations-in-javascript
    permutator: function(inputArr) {
        var results = []

        function permute(arr, memo) {
            var cur, memo = memo || []
            for (var i = 0; i < arr.length; i++) {
                cur = arr.splice(i, 1)
                if (arr.length === 0) {
                    results.push(memo.concat(cur))
                }
                permute(arr.slice(), memo.concat(cur))
                arr.splice(i, 0, cur[0])
            }
            return results
        }
        return permute(inputArr)
    },
    //http://math.stackexchange.com/questions/65923/how-does-one-compute-the-sign-of-a-permutation
    permutationSign: function(sigma) {
        var productoria = 1
        for (var i = 0; i < sigma.length; i++) {
            for (var j = 0; j < sigma.length; j++) {
                if (i < j) {
                    var frac = (sigma[i] - sigma[j]) / (i - j)
                    productoria = productoria * frac
                }
            }
        }
        return productoria
    }
}
