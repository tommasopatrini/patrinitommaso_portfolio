// file: image-trail.js

document.addEventListener('DOMContentLoaded', (event) => {
    
    // ===========================================
    // LOGICA IMAGE TRAIL (Sulle coordinate del mouse)
    // ===========================================
    
    const images = [
    '/assets/images/cover/cover-ageusia.webp',
    '/assets/images/cover/cover-beazley.webp',
    '/assets/images/cover/cover-beyondthelens.webp',
    '/assets/images/cover/cover-brutalism.webp',
    '/assets/images/cover/cover-cometa.webp',
    '/assets/images/cover/cover-exnova.webp',
    '/assets/images/cover/cover-intercept.webp',
    '/assets/images/cover/cover-lanzarote.webp',
    '/assets/images/cover/cover-letmein.webp',
    '/assets/images/cover/cover-mtp.webp',
    '/assets/images/cover/cover-streetframes.webp',
    '/assets/images/cover/cover-next.webp',
    '/assets/images/cover/cover-oppureno.webp',
    '/assets/images/cover/cover-pagani.webp',
    '/assets/images/cover/cover-designweek.webp',
    '/assets/images/cover/cover-pixar.webp',
    '/assets/images/cover/cover-rewind.webp',
    '/assets/images/cover/cover-sexting.webp',
    '/assets/images/cover/cover-urban.webp',
    '/assets/images/cover/cover-views.webp',
];

    const trailContainer = document.getElementById('image-trail-container');
    if (!trailContainer) {
        return; 
    } 

    let imageIndex = 0;
    let lastX = 0;
    let lastY = 0;
    const threshold = 100; // Distanza minima per attivare la prossima immagine
    const durationVisible = 800; // Durata di visibilità prima di scomparire (in ms)
    const navbarHeightThreshold = 140; // SOGLIA: L'effetto si attiva solo sotto i 140px dall'alto

    // 1. Crea le immagini e le aggiunge al DOM
    const trailImages = images.map(url => {
        const img = document.createElement('img');
        img.src = url;
        img.classList.add('trail-image');
        img.style.opacity = 0; 
        trailContainer.appendChild(img);
        return img;
    });

    // 2. Listener per il movimento del mouse
    document.addEventListener('mousemove', (e) => {
        
        // CONTROLLO DI SOGLIA CRUCIALE: se il mouse è sopra la navbar, non fare nulla.
        if (e.clientY < navbarHeightThreshold) {
            lastX = e.clientX;
            lastY = e.clientY;
            return; 
        }
        
        // Calcola la distanza solo se il mouse è sotto la navbar
        const deltaX = e.clientX - lastX;
        const deltaY = e.clientY - lastY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance > threshold) {
            
            lastX = e.clientX;
            lastY = e.clientY;

            const currentImage = trailImages[imageIndex];
            
            if (!currentImage) return;

            currentImage.style.left = `${e.clientX - currentImage.offsetWidth / 2}px`;
            currentImage.style.top = `${e.clientY - currentImage.offsetHeight / 2}px`;
            
            currentImage.style.opacity = 1;
            currentImage.style.transform = 'scale(1)';

            setTimeout(() => {
                currentImage.style.opacity = 0;
                currentImage.style.transform = 'scale(0.8)'; 
            }, durationVisible);

            imageIndex = (imageIndex + 1) % trailImages.length;
        }
    });
});