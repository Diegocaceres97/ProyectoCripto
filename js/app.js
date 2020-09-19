import { criptomonedasSelect,
    formulario,
monedaSelect } from "./selectores.js";
import { consultarCriptos,
submitFormulario,
SelecccionMoneda } from "./funciones.js";

//Llamos al evento de inicio que es cuando carga la pagina
document.addEventListener('DOMContentLoaded',()=>{
consultarCriptos();
formulario.addEventListener('submit',submitFormulario);
criptomonedasSelect.addEventListener('change',SelecccionMoneda);
monedaSelect.addEventListener('change',SelecccionMoneda);
});
