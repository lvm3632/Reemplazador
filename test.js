document.getElementById("generar").addEventListener("click", function () {

    let palabra = document.getElementById('entrada_original').value;
    let expresion_regular = document.getElementById('expresion_regular').value;
    let cadena_reemplazadora = document.getElementById('cadena_reemplazadora').value

    if (palabra == "" || expresion_regular == "" || cadena_reemplazadora == "") {

        alert("Llena todos los campos vacíos");
        return;
    }

    let reemplazador = new Reemplazador(palabra, expresion_regular, cadena_reemplazadora);
    reemplazador.inicializacion();
    reemplazador.repeticion();
    document.getElementById('resultado_area').value = reemplazador.entrada;

});

document.getElementById("limpiar").addEventListener("click", function () {
    document.getElementById('entrada_original').value = "";
    document.getElementById('expresion_regular').value = "";
    document.getElementById('cadena_reemplazadora').value = "";
    document.getElementById('resultado_area').value = "";
});