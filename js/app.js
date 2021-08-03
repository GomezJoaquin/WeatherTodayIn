
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
})

function buscarClima(e) {
    e.preventDefault();

    //Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    //Consultar la API
    consultarAPI(ciudad, pais);

}

function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100');

    if (!alerta) {
        //Crear una alerta.
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
    <strong class ="font-blof">Error!</strong>
    <span class ="block">${mensaje}</span>
    `;
        container.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 5000);
    }


}

function consultarAPI(ciudad, pais) {

    const appId = 'e200a1189cd75329c94c27ff00cf547c';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {

            limpiarHTML();

            if (datos.cod === "404") {
                mostrarError('Ciudad no encontrada.');
                return;
            }
            //Imprime respuesta en html.
            mostrarClima(datos);

        })


}

function mostrarClima(datos) {

    // Formatear el Clima...
  
    const { name, main: { temp, temp_max, temp_min } } = datos;
  
  
    const grados = KelvinACentigrados(temp);
    const min = KelvinACentigrados(temp_max);
    const max = KelvinACentigrados(temp_min);
    
    const nombreCiudad = document.createElement('p');
    nombreCiudad.innerHTML = `Clima en: ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl')
  
    const actual = document.createElement('p');
    actual.innerHTML = `${grados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl')
  
    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${max} &#8451;`;
    tempMaxima.classList.add('text-xl')
  
  
    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Min: ${min} &#8451;`;
    tempMinima.classList.add('text-xl')
  
  
    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white')
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);
  
    resultado.appendChild(resultadoDiv);
}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

const kelvinACentigrados = grados => { parseInt(grados - 273.15); }


