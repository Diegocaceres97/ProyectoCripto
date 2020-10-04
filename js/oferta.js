export function nuevoselementosOferta(){
    const parrafo = document.createElement('label');//creamos los imput y labels que se mostraran
    const redes = document.createElement('input');//al momento de alguien querer ofertar algo
    const redes1 = document.createElement('input');
    const redes2 = document.createElement('input');
    parrafo.textContent = 'Link Redes de contacto';
    redes.classList.add('u-full-width','entrada');
    redes1.classList.add('u-full-width','entrada1');
    redes2.classList.add('u-full-width','entrada2');
    redes.placeholder='Coloca el link de tu red social para que te contacten';
    redes1.placeholder='Coloca el link de tu red social para que te contacten';
    redes2.placeholder='Coloca el link de tu red social para que te contacten';
    parrafo.style='margin-top:-5px';
    formulario.firstElementChild.nextElementSibling.appendChild(parrafo);//avanzamos en a estrucura del formulario para
    formulario.firstElementChild.nextElementSibling.appendChild(redes);//colocar los elementos nuevos en su respectivo sitio
    formulario.firstElementChild.nextElementSibling.appendChild(redes1);//colocar los elementos nuevos en su respectivo sitio
    formulario.firstElementChild.nextElementSibling.appendChild(redes2);//colocar los elementos nuevos en su respectivo sitio
 } 
export function oferto(){
   const acerca = prompt('Cuentanos acerca de lo que ofertas/Tell us about your offer');
   if(acerca==null||acerca==""){
     location.reload();
   }else{
      const valorswal = swal("Good job!", "Éxito!", "success");
      setTimeout(() => {
         location.reload();
      }, 1000);
   }
}