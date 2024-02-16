//Variables documento
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

//Contenedor para los resultados
const resultado = document.querySelector("#resultado");

//Variables
const max = new Date().getFullYear();
const min = max - 14;

//Generar un objeto con la busqueda
const datosBusqueda = {
    marca: '',
    modelo: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
};

//Eventos al iniciar el documento

document.addEventListener('DOMContentLoaded', ()=>{
    //Muestra los automoviles al cargar
    mostrarAutos(autos);

    //Llena las opcions de años
    llenarSelect();
});

//EventListener para los selects de busqueda
marca.addEventListener('change', e =>{
    datosBusqueda.marca = e.target.value;

    filtrarAuto();
});

year.addEventListener('change', e =>{
    datosBusqueda.year = parseInt(e.target.value);

    filtrarAuto();
});

minimo.addEventListener('change', e =>{
    datosBusqueda.minimo = e.target.value;

    filtrarAuto();
});

maximo.addEventListener('change', e =>{
    datosBusqueda.maximo = e.target.value;

    filtrarAuto();
});

puertas.addEventListener('change', e =>{
    datosBusqueda.puertas = parseInt(e.target.value);

    filtrarAuto();
});

transmision.addEventListener('change', e =>{
    datosBusqueda.transmision = e.target.value;

    filtrarAuto();
});

color.addEventListener('change', e =>{
    datosBusqueda.color = e.target.value;

    filtrarAuto();
});


//Funciones
function mostrarAutos(autos) {
    //Elimina el HTML previo
    limpiarHTML();

    autos.forEach(auto => {
        const {marca, modelo, year, puertas, transmision, precio, color} = auto
        const autoHTML = document.createElement('p');

        autoHTML.textContent = `
        ${marca} - ${modelo} - ${year} - ${puertas} Puertas - Transmision: ${transmision} - Precio: $${precio} - Color: ${color}
        `;

        //Insertar en el html
        resultado.appendChild(autoHTML);
    });
};

//Genera los años del select
function llenarSelect() {
    for (let i = max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); //Agrega los años al select
    };
};

//Limpiar HTML
function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    };
};

//Funcion que filtra en base a la busqueda
function filtrarAuto() {
    const resultado = autos.filter(filtraMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtraPuertas).filter(filtraTransmision).filter(filtraColor);

    if (resultado.length) {
        mostrarAutos(resultado);
    } else{
        noResultados();
    }
};

function noResultados() {
    
    limpiarHTML();
    
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta','error');
    noResultado.textContent = 'No hay resultados'; 
    resultado.appendChild(noResultado);
};

function filtraMarca(auto) {
    const {marca} = datosBusqueda;
    if (marca) {
        return auto.marca === marca;
    };
    return auto;
};

function filtrarYear(auto) {
    const {year} = datosBusqueda;
    if (year) {
        return auto.year === year;
    };
    return auto;
};

function filtrarMinimo(auto) {
    const {minimo} = datosBusqueda;
    if (minimo) {
        return auto.precio >= minimo;
    };
    return auto;
};

function filtrarMaximo(auto) {
    const {maximo} = datosBusqueda;
    if (maximo) {
        return auto.precio <= maximo;
    };
    return auto;
};

function filtraPuertas(auto) {
    const {puertas} = datosBusqueda;
    if (puertas) {
        return auto.puertas == puertas;
    };
    return auto;
};

function filtraTransmision(auto) {
    const {transmision} = datosBusqueda;
    if (transmision) {
        return auto.transmision === transmision;
    };
    return auto;
};

function filtraColor(auto) {
    const {color} = datosBusqueda;
    if (color) {
        return auto.color === color;
    };
    return auto;
};
