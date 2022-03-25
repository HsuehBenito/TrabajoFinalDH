//validacion formulario.ejs
// window.addEventListener('load', function() {
    let formulario = document.querySelector('.formulario');
    console.log(formulario)
    formulario.addEventListener('submit', function(event) {
      debugger
      let errores = [];
      let nombre = document.querySelector('.nombre_completo');
      let password = document.querySelector('.password');
      if(nombre.value == ""){
        errores.push("El campo nombre está vacío");
      }
      if(password.value.length <= 4){
        errores.push( 'El password debe ser mayor a 4 caracteres y contener una letra mayuscula y un numero');
      }
      if(errores.length > 0){
        event.preventDefault();
        let ulErrores = document.querySelector(".errores ul");
        errores.forEach(error => {
        ulErrores.innerHTML += <li>${error}</li>
      });
      
}
      
      }  
    
)
  

  // });

  // sessionstorage
//En local storage solo se puede guardar texto de modo que si queremos guardar arrays y objetos
//antes del set.item hay que pasar la info por JSON.stringify();
//   window.addEventListener('load', function() {

// capturar item carrito
// if(localStorage.getItem("localstorage buscado") == null) { //preguntar si ya esta guardado
// //acciones a realizar en el caso que sea null

// }else {
//   //si ya existe hacer 
// }
// localStorage.setItem("itemCapturado", itemCapturado)




//   });
 