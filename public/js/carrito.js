window.addEventListener('load', function() {

  let contenedorGrande = document.querySelector('.contenedorGrande');
  let botonVaciar = document.querySelector('.botonVaciar');
  let botonPagar = document.querySelector('.pagar');
  let pagarForm = document.querySelector('.pagarFormulario');
  let cancelPagarForm = document.querySelector('.cancelPagarForm');
  let confirmarPago = document.querySelector('.botonPagarForm');
  let arrayProdSelec = JSON.parse(localStorage.getItem('arrayNew'));
  
  

  botonVaciar.addEventListener('click',function(){
    localStorage.removeItem('arrayNew');
    location.reload();
  })
  botonPagar.addEventListener('click', function(){
    pagarForm.style.display = "block";
  })
  cancelPagarForm.addEventListener('click', function(){
    pagarForm.style.display = "none";
  })
  

  fetch ('/api')

				.then(response => response.json())
				.then(productos =>{
					
					let listaProductos=[];

					for (p of productos.data){
            for(i of arrayProdSelec){
              if(i == p.id){

                let objaux={
                  
                  id: p.id,
                  nombre:  p.nombre,
                  precio:  p.precio,
                  img: p.img
                }
        
                listaProductos.push(objaux);
                break

              }
            }
					}
          
          for (a of listaProductos){
            
            let externalHTML = `<div class="basket-product">
                                  <div class="item">
                                    <div class="product-image">
                                      <img src="/img/${a.img}" alt="Placholder Image 2" class="product-frame">
                                    </div>
                                    <div class="product-details">
                                      <h1 class="nombreProducto">${a.nombre}</h1>
                                      
                                    </div>
                                  </div>
                                  <div class="price">$${a.precio}</div>
                                  <div class="quantity">
                                    <input type="number" value="0" min="1" class="quantity-field">
                                  </div>
                                  
                                  <div class="remove btn btn-secondary">
                                    <button id = "${a.id}">Remover</button>
                                  </div>
                                </div>`
             contenedorGrande.innerHTML += externalHTML
        }
    var removeCartItemButtons = document.getElementsByClassName('remove')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('quantity-field')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
  
function removeCartItem(event) {
    var buttonClicked = event.target
    console.log(event.target.id)
    buttonClicked.parentElement.parentElement.parentElement.remove()

    function checkArray(arrayProdSelec){
      return arrayProdSelec !== event.target.id
    }
    const result = arrayProdSelec.filter(checkArray)
    localStorage.setItem('arrayNew', JSON.stringify(result))
    location.reload();
    updateCartTotal()
    
    
}


function quantityChanged(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
      input.value = 1
  }
  updateCartTotal()
}


function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('contenedorGrande')[0]
  var cartRows = cartItemContainer.getElementsByClassName('basket-product')
  var total = 0
  for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i]
      var priceElement = cartRow.getElementsByClassName('price')[0]
      var quantityElement = cartRow.getElementsByClassName('quantity-field')[0]
      var price = parseFloat(priceElement.innerText.replace('$', ''))
      var quantity = quantityElement.value
      // subtotal = price * quantity
      // subtotal = Math.round(total * 100) / 100
      total = total + (price * quantity)
  }
  
  total = Math.round(total * 100) / 100
  document.getElementsByClassName('final-value')[0].innerText = '$' + total
}




  confirmarPago.addEventListener("click", 
  async () => {
    
    Date.prototype.yyyymmdd = function() {
      var mm = this.getMonth() + 1; // getMonth() is zero-based
      var dd = this.getDate();
    
      return [this.getFullYear(),
              (mm>9 ? '' : '0') + mm,
              (dd>9 ? '' : '0') + dd
             ].join('-');
    };
    
    var date = new Date();
    
    let cartItemContainer = document.getElementsByClassName('contenedorGrande')[0]
      let cartRows = cartItemContainer.getElementsByClassName('basket-product')
      let arrayCompra = []
      for (let i = 0; i < cartRows.length; i++) {
        let quantityElement = cartRow.getElementsByClassName('quantity-field')[0]
        let nombreProd = cartRow.getElementsByClassName('nombreProducto')[0]
        arrayCompra.push(quantityElement[i].value,nombreProd[i].value)
      }
    
    const rawResponse = await fetch('http://localhost:3003/user/comprar', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // id	fecha_venta	total	nombre	email	direccion	detalle	
        
        fecha_venta: date.yyyymmdd(),
        total: document.getElementsByClassName('final-value')[0].value,
        nombre:document.getElementsByClassName('nombreCompra')[0].value,
        email:document.getElementsByClassName('emailCompra')[0].value,
        direccion: document.getElementsByClassName('direccionCompra')[0].value,
        
        
        
        

      })
    });
    const content = await rawResponse.json();
  
    console.log(content);
  
})




})
})
