// validacion formulario.ejs
window.addEventListener('load', function() {
    let formulario = document.querySelector('.formulario');
    console.log(formulario)
    formulario.addEventListener('submit', function(event) {
      let errores = [];
      let nombre = document.querySelector('.nombre_completo');
      
      if(nombre.value == ""){
        errores.push("El campo nombre está vacío");
      }
      let password = document.querySelector('.password');
      // var passformat = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{4,20}$";
      if(password.value.length < 4 ){
        errores.push('El password debe ser mayor a 4 caracteres y contener una letra mayuscula y un numero');
      }
      if(errores.length > 0){
        event.preventDefault();
        let ulErrores = document.querySelector(".errores ul");
        for (i=0; i<errores.length; i++){
        ulErrores.innerHTML += "<li class= 'list-group-item list-group-item-danger' >" + errores[i] + "</li>"
        }
      }
    });
})