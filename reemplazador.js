class Reemplazador {
    constructor(entrada, regex, palabra) {
        this.entrada = entrada;
        this.regex = regex;
        this.palabra = palabra;
        this.asterisco = false;
        this.arrayRegex = this.regex;
        this.arrayRegex.includes("*") ? this.asterisco = true : this.asterisco = false;
        this.arrayRegex = this.regex.split("+");
        this.ciclo = 0;
        this.pos = 0;
        this.posicionInicial = 0;
        this.tamanioFijo = 0;
        this.firstLetter = [];
    }
    inicializacion() {
        // Con asterisco
        if (this.asterisco == true) {
            let exp = "";
            let pre = "";
            let pos = "";
            for (let i = 0; i < this.arrayRegex.length; i++) {
                exp = "";
                pre = "";
                pos = "";
                for (let j = 0; j < this.arrayRegex[i].length; j++) {
                    if (this.arrayRegex[i].charAt(j) == '*') {
                        pre = this.arrayRegex[i].substring(0, j - 1);
                        pos = this.arrayRegex[i].substring(j + 1, this.arrayRegex[i].length);
                        console.log("PRE", pre);
                        console.log("POS", pos);
                        console.log("EXP", exp);
                        exp = pre + pos;
                        exp != "" ? this.arrayRegex.push(exp) : ""
                        console.log(this.arrayRegex[i], "arrayRegex[i]")
                        console.log(exp, " [EXP]")
                    }
                }
            }
        }
        for (let i = 0; i < this.arrayRegex.length; i++) {
            let str = this.arrayRegex[i];
            this.firstLetter.push(str.charAt(0));
        }
        return;
    }
    verificar() {
        let len = this.entrada.length - 1;
        if (len < this.pos) this.ciclo = 2;
        //console.log("verificar", "this.pos>len");
        if (this.firstLetter.includes(this.entrada.charAt(this.pos))) {
            //console.log("Palabra primera letra (verificar): ", this.entrada.charAt(this.pos));
            //console.log("Posicion inicial (verificar): ", this.pos);
            this.posicionInicial = this.pos;
            this.ciclo = 1;
            //console.log("verificar", "primer if");
        } else {
            this.pos++;
            /*console.log("letra de la posicion inicial guardada", this.entrada.charAt(this.posicionInicial));
            console.log("posicion inicial guardada", this.posicionInicial);
            console.log("letra indice", this.entrada.charAt(this.pos));
            console.log("this.pos++", this.pos);*/
        }
    }
    coin(c = "") {
        //console.log(c, "IMPRIME CARACTER")
        let k = 0;
        for (let i = 0; i < c.length; i++)
            c.charAt(i) === '*' ? k = k + 2 : "";
        return k;
    }
    validar() {
        this.tamanioFijo = 0;
        this.ciclo = 0;
        for (let i = 0; i < this.arrayRegex.length; i++) {
            let expSize = this.arrayRegex[i].length;
            let wordExp = this.arrayRegex[i];
            for (let j = 0; j < expSize; j++) {
                // Validar si la entrada es distinta a la palabra de la expresión regular
                // Sí sí, damos a la posición inicial al indice
                // de la letra inicial, y pasamos a la sig exp regular en el for
                // por ejemplo si es hila y la palabra a modificar es hola, 
                // nuestro algoritmo no la modificara
                if (wordExp.charAt(j) != this.entrada.charAt(this.pos)) {
                    //Damos la posinicial de la palabra que empieza con h otra vez, y 
                    // rompemos el ciclo para compararlo de nuevo con al sig iteracion de la exp regular
                    this.pos = this.posicionInicial;
                    this.tamanioFijo = 0;
                    break;
                }
                if (wordExp.charAt(j + 1) == '*' && expSize - 1 > j) {
                    // Enviamos el indice del arreglo donde tenemos nuestras exp regulares (i)
                    // Y la posicion donde se encuentra el asteristico - 1
                    this.kleene(i, this.entrada.length - 1, j);
                    j++;
                }
                if (expSize - 1 <= j) {
                    let prefijo = this.entrada.substring(0, this.posicionInicial);
                    this.ciclo = 0;
                    console.log("[PREFIJO]", prefijo)
                    this.pos = this.posicionInicial + this.palabra.length;
                    let posfijo = this.entrada.substring(this.posicionInicial + this.arrayRegex[i].length - this.coin(this.arrayRegex[i]) + this.tamanioFijo, this.entrada.length);
                    this.entrada = prefijo + this.palabra + posfijo;
                    console.log("[ENTRADA]", this.entrada)
                    console.log("[POSFIJO]", posfijo)
                    return;
                }
                this.pos++;
            }
        }
        //console.log("validar, si no cumple con la condicion del if o del for, regresamos la posicionInicial+1 a pos y despues se suma 1 en el switch", this.posicionInicial + 1);
        this.pos = this.posicionInicial + 1;
        //console.log(this.entrada.charAt(this.pos), "[CHAR]" + (this.posicionInicial + 1));

    }
    repeticion() {
        while (1) {
            switch (this.ciclo) {
                case 0:
                    console.log("[Verificar]")
                    this.verificar();
                    break;
                case 1:
                    console.log("[Validar]")
                    this.validar();
                    break;
                case 2:
                    return;
                default:
                    return;
            }
        }
        return;
    }
    // Cerradura
    // arrPos: la posición en el arreglo de la expRegular
    // letraPos: posicion del char de la expRegular
    // Palabralen: longitud de la palabra de entrada
    kleene(arrPos = 0, palabraLen = 0, letraPos = 0) {
        //this.entrada.length-1
        // i j
        while (1) {
            if (this.arrayRegex[arrPos].charAt(letraPos) == this.entrada.charAt(this.pos)) {
                ++this.pos;
                ++this.tamanioFijo;
                console.log("[kleene]", this.tamanioFijo);
            } else {
                --this.pos;
                break;
            }
        }
        //console.log("entro funcion")
        //console.log(this.entrada, "ENTRADA EN CERRADURA")
        return;
    }
}
//let reemplazador = new Reemplazador("abaa  aab aaanbbb", "aba*+bbb*", "ccc");
//let reemplazador = new Reemplazador("bbbbbbb", "b*+a*+c*", "ccc");
//let reemplazador = new Reemplazador("abaa  aab aaanbbb", "aba*+bbb*", "ccc");
//console.log("Salida = “cccbaaaanccc”")
//let reemplazador = new Reemplazador("abaaaabaaanbbb", "aba*+bbb*", "ccc");
let reemplazador = new Reemplazador("aaaaaaaaarco aadios aaangel aaaarmadillo baaaarquillo iguaaana", "hola+a*", "B");
//let reemplazador = new Reemplazador("aaaaaaa", "a", "B");
//let reemplazador = new Reemplazador("bbbbbbbbbbb", "b*", "W");

//let reemplazador = new Reemplazador("bbbbbbbbbbb", "b*", "W");
console.log("Entrada antes: ", reemplazador.entrada);
let antes = reemplazador.entrada;
reemplazador.inicializacion();
reemplazador.repeticion();
console.log("arrayRegex: ", reemplazador.arrayRegex);
console.log("Primera letra", reemplazador.firstLetter);
console.log("Entrada antes: ", antes);
console.log("Entrada despues: ", reemplazador.entrada);
console.log("Regex: ", reemplazador.regex);
console.log("Palabra: ", reemplazador.palabra);
console.log("Salida = “cccbaaaanccc”")