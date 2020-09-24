import { criptomonedasSelect,
    formulario,
monedaSelect,
But2 } from "./selectores.js";
import { consultarCriptos,
submitFormulario,
SelecccionMoneda,
nuevoBotoncancelar, //creamos el nuevo boton al ofertar de cancelar
oferta} from "./funciones.js";

(
    function () {
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
)();
//Llamos al evento de inicio que es cuando carga la pagina
document.addEventListener('DOMContentLoaded',()=>{
consultarCriptos();
formulario.addEventListener('submit',submitFormulario);
criptomonedasSelect.addEventListener('change',SelecccionMoneda);
monedaSelect.addEventListener('change',SelecccionMoneda);
But2.addEventListener('click',()=>{
    nuevoBotoncancelar(); //creamos el nuevo boton al ofertar de cancelar
    oferta(false);
})
});
