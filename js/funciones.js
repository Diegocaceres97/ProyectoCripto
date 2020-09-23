
//Area de importaciones
import { criptomonedasSelect,
    formulario,
resultado,
uno,
dos,
But1, 
monedaSelect,
But2 } from "./selectores.js";
import { formatNumber } from "./formatNumber.js";
//creamos el promise
const obtenerCriptomonedas = criptomonedas =>new Promise(resolve=>{
    resolve(criptomonedas);
})

//objeto creado para parametrizar y llenar
export const objBusqueda ={
    moneda: '',
    criptomoneda: ''
}

//funciones
export function consultarCriptos(){
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
    fetch(url).then(respuesta=>respuesta.json()).
    then(resultado => obtenerCriptomonedas(resultado.Data))
    .then(criptomonedas=>selectCriptos(criptomonedas))
}
export function selectCriptos(criptomonedas){
    criptomonedas.forEach(element => {
       const{FullName, Name} = element.CoinInfo;
       const option = document.createElement('option');
       option.value=Name;
       option.textContent=FullName;
       criptomonedasSelect.appendChild(option);
    });
}
export function submitFormulario(e){
    e.preventDefault();
    const {moneda, criptomoneda} = objBusqueda;

    if (moneda==''||criptomoneda=='') {
        mostrarAlerta('Ambos campos son obligatorios');
        return;
    } 
    //Consultar la API con los resultados
    ConsultarAPI();
}
export function SelecccionMoneda(e){
   objBusqueda[e.target.name] = e.target.value;
   //console.info(objBusqueda);
}
export function mostrarAlerta(mensaje){
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
export function ConsultarAPI(){
    cleanHtml();
    const {moneda, criptomoneda} = objBusqueda;
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
fetch(url).then(respuesta=>respuesta.json())
.then(cotizacion => mostrarCotizacion(cotizacion.RAW[criptomoneda][moneda]))
}
export function mostrarCotizacion(cotizacion){
    But2.remove();
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
    boton.addEventListener('click',()=>{
       
        
        
         nuevoBotoncancelar(); //creamos el nuevo boton al ofertar de cancelar
         oferta();
    })
}
export function cleanHtml(){
    while(resultado.firstChild){
resultado.removeChild(resultado.firstChild);
    }
}
export function oferta(){
    uno.textContent='¿Que ofertaras?';
    dos.textContent='¿Que esperas obtener?';
    But1.value='¡Ofertar ya!';
    removeOptions(criptomonedasSelect);
    removeOptions(monedaSelect);
       llenar(monedaSelect);
       llenar(criptomonedasSelect);
}
function removeOptions(selectElement) {
    var i, L = selectElement.options.length - 1;
    for(i = L; i >= 0; i--) {
       selectElement.remove(i);
    }
 }
 function nuevoBotoncancelar(){
    document.querySelector('.nuevo').remove();//eliminamos el boton antiguo de oferta
    const boton = document.createElement('button');
    boton.classList.add('buttom-secondary','nuevodos');
  boton.textContent='CANCELAR';
    resultado.appendChild(boton);
 }
 function llenar(select){
    const ofertas = ['Criptomoneda','Moneda','Producto','Servicio'];
    ofertas.forEach(valor =>{
     const option = document.createElement('option');
     option.value=valor;
    option.textContent=valor;
    select.appendChild(option);
    });
    
  DuringOferta();
 }
 function DuringOferta(){
    const boton = document.querySelector('.nuevodos');
    boton.addEventListener('click',()=>
    location.reload()
    );
    But1.addEventListener('click',()=>{
        activeModal();
    })
 }
 function activeModal(){
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    // When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
 }
}
 

