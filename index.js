const options = {
    componentRestrictions: { country: "br" },
};

const inputOrigem = document.querySelector("input.origem");
new google.maps.places.Autocomplete(inputOrigem, options);

const inputDestino = document.querySelector("input.destino");
new google.maps.places.Autocomplete(inputDestino, options);

const resultado = document.querySelector("span.valor");
const divResultadoOK = document.querySelector("div.resultado-ok");
const divResultadoERRO = document.querySelector("div.resultado-erro");

function calculaValor() {
    const request = {
        origin: inputOrigem.value,
        destination: inputDestino.value,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
    };

    new google.maps.DirectionsService().route(request, function(result, status) {
        if (status === 'OK') {
            const qntKm = result.routes[0].legs[0].distance.value / 1000;
            const precoPorKm = 5;
            const valorFinal = qntKm * precoPorKm;

            resultado.innerHTML = "R$ " + valorFinal.toFixed(2).replace(".", ",");

            divResultadoOK.style.display = "block";

        } else {
            divResultadoERRO.style.display = "block";
        }
    });
}