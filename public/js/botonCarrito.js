window.addEventListener('load', function() {
    // localStorage.removeItem('arrayNew')
    let botonCarrito = document.querySelector('.addCarrito');
    
    botonCarrito.addEventListener('click', function(event){
        
        if(localStorage.getItem('arrayNew')== null){

            let arrayNew = []
            arrayNew.push(event.target.id);
            localStorage.setItem('arrayNew', JSON.stringify(arrayNew))
        }

        else{

            let arrayNew = JSON.parse(localStorage.getItem('arrayNew'))
            arrayNew.push(event.target.id)
            localStorage.setItem('arrayNew', JSON.stringify(arrayNew))
        }
    })
});
