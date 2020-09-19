const criptomonedasSelect = document.querySelector('#criptomonedas');
const formulario = document.querySelector('#formulario');
const monedaSelect = document.querySelector('#moneda');
const resultado = document.querySelector('#resultado');
//creamos el promise
const obtenerCriptomonedas = criptomonedas =>new Promise(resolve=>{
    resolve(criptomonedas);
})
const objBusqueda ={
    moneda: '',
    criptomoneda: ''
}
document.addEventListener('DOMContentLoaded',()=>{
consultarCriptos();
formulario.addEventListener('submit',submitFormulario);
criptomonedasSelect.addEventListener('change',SelecccionMoneda);
monedaSelect.addEventListener('change',SelecccionMoneda);
});

function consultarCriptos(){
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
    fetch(url).then(respuesta=>respuesta.json()).
    then(resultado => obtenerCriptomonedas(resultado.Data))
    .then(criptomonedas=>selectCriptos(criptomonedas))
}
function selectCriptos(criptomonedas){
    criptomonedas.forEach(element => {
       const{FullName, Name} = element.CoinInfo;
       const option = document.createElement('option');
       option.value=Name;
       option.textContent=FullName;
       criptomonedasSelect.appendChild(option);
    });
}
function submitFormulario(e){
    e.preventDefault();
    const {moneda, criptomoneda} = objBusqueda;

    if (moneda==''||criptomoneda=='') {
        mostrarAlerta('Ambos campos son obligatorios');
        return;
    } 
    //Consultar la API con los resultados
    ConsultarAPI();
}
function SelecccionMoneda(e){
   objBusqueda[e.target.name] = e.target.value;
   //console.info(objBusqueda);
}
function mostrarAlerta(mensaje){
    const existError = document.querySelector('.error');
    if (!existError) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('error');
        //mensaje de error
        divMensaje.textContent = mensaje;
        formulario.appendChild(divMensaje);
    
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);  
    }
    
}
function ConsultarAPI(){
    cleanHtml();
    const {moneda, criptomoneda} = objBusqueda;
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
fetch(url).then(respuesta=>respuesta.json())
.then(cotizacion => mostrarCotizacion(cotizacion.RAW[criptomoneda][moneda]))
}
function mostrarCotizacion(cotizacion){
    const {PRICE, HIGHDAY,LOWDAY,CHANGEPCT24HOUR, LASTUPDATE} = cotizacion;
const valor = formatNumber.new(parseInt(PRICE));
    const precio = document.createElement('p');
    precio.classList.add('precio');
    precio.innerHTML = `El precio es: <span>$${valor}</span> <br>
    
    El precio mas alto del dia: $${formatNumber.new(parseInt(HIGHDAY))}`;
    const boton = document.createElement('button');
    boton.classList.add('buttom-secondary','nuevo');


    resultado.appendChild(precio);
    resultado.appendChild(boton);
}
function cleanHtml(){
    while(resultado.firstChild){
resultado.removeChild(resultado.firstChild);
    }
}
var formatNumber = {
    separador: ".", // separador para los miles
    sepDecimal: ',', // separador para los decimales
    formatear:function (num){
    num +='';
    var splitStr = num.split('.');
    var splitLeft = splitStr[0];
    var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
    var regx = /(\d+)(\d{3})/;
    while (regx.test(splitLeft)) {
    splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
    }
    return this.simbol + splitLeft +splitRight;
    },
    new:function(num, simbol){
    this.simbol = simbol ||'';
    return this.formatear(num);
    }
   }