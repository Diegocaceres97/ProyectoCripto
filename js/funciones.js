
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
       
        
        
         nuevoBotoncancelar(true); //creamos el nuevo boton al ofertar de cancelar
         oferta(true);
    })
}
export function cleanHtml(){
    while(resultado.firstChild){
resultado.removeChild(resultado.firstChild);
    }
}
export function oferta(valor){
    uno.textContent='¿Que ofertaras?';
    dos.textContent='¿Que esperas obtener?';
    But1.value='¡Ofertar ya!';
    removeOptions(criptomonedasSelect);
    removeOptions(monedaSelect);
       llenar(monedaSelect,valor);//llenamos los select con las nuevas opciones
       llenar(criptomonedasSelect,valor);//para poder ofertar adecuadamente
       console.info(formulario.firstElementChild.nextElementSibling);
       
      nuevoselementosOferta();
    
    //formulario.appendChild(redes);
    }
function removeOptions(selectElement) {//con esta funcion eliminamos 
    var i, L = selectElement.options.length - 1;//las antiguas opciones del select
    for(i = L; i >= 0; i--) {
       selectElement.remove(i);
    }
 }
 export function nuevoBotoncancelar(entrada){
     if(entrada==true){
    document.querySelector('.nuevo').remove();//eliminamos el boton antiguo de oferta
    const boton = document.createElement('button');
    boton.classList.add('buttom-secondary','nuevodos');
  boton.textContent='CANCELAR';
    resultado.appendChild(boton);
}
 }
 function llenar(select,valor){//sabremos el valor que llega (el cual sera un booleano) para saber
    const ofertas = ['Criptomoneda','Moneda','Producto','Servicio'];//si la oferta se hace
    ofertas.forEach(valor =>{//desde el primer momento o despues de buscar el precio de una cripto
     const option = document.createElement('option');
     option.value=valor;
    option.textContent=valor;
    select.appendChild(option);
    });
    
  DuringOferta(valor);
 }
 function DuringOferta(valor){
     if(valor==true){
    const boton = document.querySelector('.nuevodos');
    boton.addEventListener('click',()=>
    location.reload()
    );
     }else{
         But2.value='Cancelar';
But2.classList.remove('button-tercer');
But2.classList.add('button-four');

But2.addEventListener('click',()=>{
    location.reload()
})
     }
 }
 function nuevoselementosOferta(){
    const parrafo = document.createElement('label');//creamos los imput y labels que se mostraran
    const redes = document.createElement('input');//al momento de alguien querer ofertar algo
    const redes1 = document.createElement('input');
    const redes2 = document.createElement('input');
    parrafo.textContent = 'Link Redes de contacto';
    redes.classList.add('u-full-width');
    redes1.classList.add('u-full-width');
    redes2.classList.add('u-full-width');
    redes.placeholder='Coloca el link de tu red social para que te contacten';
    redes1.placeholder='Coloca el link de tu red social para que te contacten';
    redes2.placeholder='Coloca el link de tu red social para que te contacten';
    parrafo.style='margin-top:-5px';
    formulario.firstElementChild.nextElementSibling.appendChild(parrafo);//avanzamos en a estrucura del formulario para
    formulario.firstElementChild.nextElementSibling.appendChild(redes);//colocar los elementos nuevos en su respectivo sitio
    formulario.firstElementChild.nextElementSibling.appendChild(redes1);//colocar los elementos nuevos en su respectivo sitio
    formulario.firstElementChild.nextElementSibling.appendChild(redes2);//colocar los elementos nuevos en su respectivo sitio
 } 

