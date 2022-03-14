//validacion formulario.ejs
window.addEventListener('load', function() {
    
    let formulario = document.querySelector('container my-5');
    formulario.addEventListener('submit', function(event) {
  
      event.preventDefault();
    let nombre = document.querySelector('nombre_completo')
    let password = document.querySelector('password')
    if (nombre.value == null){
      console.log('Hubo un error en el nombre')
    } 
    if (password.value.length <= 4){
      console.log( 'El password debe ser mayor a 4 caracteres y contener una letra mayuscula y un numero')
    }
    
  
    })
    
  });
 