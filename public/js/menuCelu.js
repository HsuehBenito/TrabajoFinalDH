window.addEventListener('load', () => {

 

    let body = document.querySelector('body');
    let hamburger = document.querySelector('.iconotlf');
    let menu = document.querySelector('.ctn-menu');
    let overlay = document.querySelector('#overlay');



    hamburger.addEventListener('click', () => {
        overlay.classList.add('active');
        menu.classList.add('active');
        body.style.position = 'fixed'
    });

    overlay.addEventListener('click', () => {
        menu.classList.remove('active');
        overlay.classList.remove('active');
        body.style.position = 'relative'
    });
})