// import fetch from 'fetch';

// const body = {a: 1};

// const response = await fetch('http://localhost:3003/api', {
// 	method: 'post',
// 	body: JSON.stringify(body),
// 	headers: {'Content-Type': 'application/json'}
// });
// const data = await response.json();

// console.log(data);
// //o 

window.addEventListener('load', function() {
  let nombre = document.querySelector('.nombre');
  let imagen = document.querySelector('.imagen');
  let precio = document.querySelector('.precio');
  let cantidad = document.querySelector('.cantidad');
  let subtotal = document.querySelector('.subtotal');
  let id = document.querySelector('.esconderId');
  let contenedorProducto = document.querySelector('.contenedorProducto');
  let contenedorGrande = document.querySelector('.contenedorGrande')
  let botonVaciar = document.querySelector('.botonVaciar')


  let arrayProdSelec = JSON.parse(localStorage.getItem('arrayNew'))
  console.log(arrayProdSelec);

  botonVaciar.addEventListener('click',function(){
    localStorage.removeItem('arrayNew');
    location.reload();
  })

  fetch ('http://localhost:3003/api')
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
            nombre.innerHTML = a.nombre
            precio.innerHTML = a.precio
            imagen.setAttribute("src", `/img/`+ a.img );
            contenedorGrande.appendChild(contenedorProducto.cloneNode(true))
        }
  
      //   window.addEventListener('load', function() {
      //     let array = [1,2,3]
      //     let cajaGrande = document.querySelector(".cajaGrande")
      //     let cajaChica = document.querySelector(".cajaChica")
      //     let boton = document.querySelector(".clonar")
      //     let parrafo = document.querySelector(".parrafo")
      //     console.log("toy copiando");
      
      //     for (i=0; i < array.length; i++){
      //         parrafo.innerHTML = "soy el numero"+ i
      //         cajaGrande.append(cajaChica.cloneNode(true))
              
      //     }
      
          
      
      // })

  
})
})
//   module.exports = {
//   read: (req, res) => {
//  fetch('http://localhost:3003/api')}
//   }
// })
//  .then(response => {
//   //  for(i=0; i<arrayProdSelec.length;i++)
//   //  let idProductoSeleccionado = arrayProdSelec[i];
//   //       for (let p of productos.data){

//   //           if(p.id==idProductoSeleccionado){
//   //               productoSeleccionado=p;

//   //           }
//   //       }

//  })
//  }
// } 



// /* Set values + misc */
// var promoCode;
// var promoPrice;
// var fadeTime = 300;

// /* Assign actions */
// $('.quantity input').change(function() {
//   updateQuantity(this);
// });

// $('.remove button').click(function() {
//   removeItem(this);
// });

// $(document).ready(function() {
//   updateSumItems();
// });

// $('.promo-code-cta').click(function() {

//   promoCode = $('#promo-code').val();

//   if (promoCode == '10off' || promoCode == '10OFF') {
//     //If promoPrice has no value, set it as 10 for the 10OFF promocode
//     if (!promoPrice) {
//       promoPrice = 10;
//     } else if (promoCode) {
//       promoPrice = promoPrice * 1;
//     }
//   } else if (promoCode != '') {
//     alert("Invalid Promo Code");
//     promoPrice = 0;
//   }
//   //If there is a promoPrice that has been set (it means there is a valid promoCode input) show promo
//   if (promoPrice) {
//     $('.summary-promo').removeClass('hide');
//     $('.promo-value').text(promoPrice.toFixed(2));
//     recalculateCart(true);
//   }
// });

// /* Recalculate cart */
// function recalculateCart(onlyTotal) {
//   var subtotal = 0;

//   /* Sum up row totals */
//   $('.basket-product').each(function() {
//     subtotal += parseFloat($(this).children('.subtotal').text());
//   });

//   /* Calculate totals */
//   var total = subtotal;

//   //If there is a valid promoCode, and subtotal < 10 subtract from total
//   var promoPrice = parseFloat($('.promo-value').text());
//   if (promoPrice) {
//     if (subtotal >= 10) {
//       total -= promoPrice;
//     } else {
//       alert('Order must be more than £10 for Promo code to apply.');
//       $('.summary-promo').addClass('hide');
//     }
//   }

//   /*If switch for update only total, update only total display*/
//   if (onlyTotal) {
//     /* Update total display */
//     $('.total-value').fadeOut(fadeTime, function() {
//       $('#basket-total').html(total.toFixed(2));
//       $('.total-value').fadeIn(fadeTime);
//     });
//   } else {
//     /* Update summary display. */
//     $('.final-value').fadeOut(fadeTime, function() {
//       $('#basket-subtotal').html(subtotal.toFixed(2));
//       $('#basket-total').html(total.toFixed(2));
//       if (total == 0) {
//         $('.checkout-cta').fadeOut(fadeTime);
//       } else {
//         $('.checkout-cta').fadeIn(fadeTime);
//       }
//       $('.final-value').fadeIn(fadeTime);
//     });
//   }
// }

// /* Update quantity */
// function updateQuantity(quantityInput) {
//   /* Calculate line price */
//   var productRow = $(quantityInput).parent().parent();
//   var price = parseFloat(productRow.children('.price').text());
//   var quantity = $(quantityInput).val();
//   var linePrice = price * quantity;

//   /* Update line price display and recalc cart totals */
//   productRow.children('.subtotal').each(function() {
//     $(this).fadeOut(fadeTime, function() {
//       $(this).text(linePrice.toFixed(2));
//       recalculateCart();
//       $(this).fadeIn(fadeTime);
//     });
//   });

//   productRow.find('.item-quantity').text(quantity);
//   updateSumItems();
// }

// function updateSumItems() {
//   var sumItems = 0;
//   $('.quantity input').each(function() {
//     sumItems += parseInt($(this).val());
//   });
//   $('.total-items').text(sumItems);
// }

// /* Remove item from cart */
// function removeItem(removeButton) {
//   /* Remove row from DOM and recalc cart total */
//   var productRow = $(removeButton).parent().parent();
//   productRow.slideUp(fadeTime, function() {
//     productRow.remove();
//     recalculateCart();
//     updateSumItems();
//   });
// }
