// Asegurarnos de que el DOM esté listo antes de ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
    // Obtener elementos del DOM
    let nextDom = document.getElementById('next');
    let prevDom = document.getElementById('prev');

    let carouselDom = document.querySelector('.carousel');
    console.log('carouselDom:', carouselDom); // Verificar si .carousel existe

    if (!carouselDom) {
        console.error("El elemento '.carousel' no se encontró en el DOM. Verifica tu HTML.");
        return;
    }

    let SliderDom = carouselDom.querySelector('.list');
    console.log('SliderDom:', SliderDom); // Verificar si .list existe dentro de .carousel

    if (!SliderDom) {
        console.error("El elemento '.list' no se encontró dentro de '.carousel'. Verifica tu HTML.");
        return;
    }

    let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
    console.log('thumbnailBorderDom:', thumbnailBorderDom); // Verificar si .thumbnail existe

    if (!thumbnailBorderDom) {
        console.error("El elemento '.thumbnail' no se encontró dentro de '.carousel'. Verifica tu HTML.");
        return;
    }

    let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
    console.log('thumbnailItemsDom:', thumbnailItemsDom); // Verificar si hay elementos con la clase .item

    let timeDom = document.querySelector('.carousel .time');
    console.log('timeDom:', timeDom); // Verificar si .time existe

    // Configuración inicial
    if (thumbnailItemsDom.length > 0) {
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
    }

    let timeRunning = 3000;
    let timeAutoNext = 7000;

    // Configurar eventos de clic
    nextDom?.addEventListener('click', () => {
        showSlider('next');
    });

    prevDom?.addEventListener('click', () => {
        showSlider('prev');
    });

    let runTimeOut;
    let runNextAuto = setTimeout(() => {
        nextDom?.click();
    }, timeAutoNext);

    function showSlider(type) {
        let SliderItemsDom = SliderDom.querySelectorAll('.item');
        let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');

        if (type === 'next') {
            SliderDom.appendChild(SliderItemsDom[0]);
            thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
            carouselDom.classList.add('next');
        } else {
            SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
            thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
            carouselDom.classList.add('prev');
        }

        // Limpiar clases después de un tiempo
        clearTimeout(runTimeOut);
        runTimeOut = setTimeout(() => {
            carouselDom.classList.remove('next');
            carouselDom.classList.remove('prev');
        }, timeRunning);

        // Reiniciar el temporizador automático
        clearTimeout(runNextAuto);
        runNextAuto = setTimeout(() => {
            nextDom?.click();
        }, timeAutoNext);
    }
});
