// file: image-trail.js

document.addEventListener('DOMContentLoaded', (event) => {
    
    // ===========================================
    // LOGICA IMAGE TRAIL (Sulle coordinate del mouse)
    // ===========================================
    
    // Mappatura immagini -> progetti
    const projectLinks = {
        'cover-ageusia.webp': 'ageusia.html',
        'cover-beazley.webp': 'beazley.html',
        'cover-brutalism.webp': 'brutalism.html',
        'cover-cometa.webp': 'cometa.html',
        'cover-exnova.webp': 'exnova.html',
        'cover-intercept.webp': 'intercept.html',
        'cover-lanzarote.webp': 'lanzarote.html',
        'cover-letmein.webp': 'letmein.html',
        'cover-mtp.webp': 'mtp600.html',
        'cover-streetframes.webp': 'streetframes.html',
        'cover-next.webp': 'next.html',
        'cover-oppureno.webp': 'oppureno.html',
        'cover-pagani.webp': 'pagani.html',
        'cover-designweek.webp': 'designweek.html',
        'cover-pixar.webp': 'pixar.html',
        'cover-rewind.webp': 'rewind.html',
        'cover-sexting.webp': 'sextingcoercion.html',
        'cover-urban.webp': 'urbanvisions.html',
        'cover-views.webp': 'views.html'
    };
    
    const images = [
    '/assets/images/cover/cover-ageusia.webp',
    '/assets/images/cover/cover-beazley.webp',
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
    const threshold = 150; // Distanza minima per attivare la prossima immagine
    const durationVisible = 900; // Durata visibilità delle immagini
    const navbarHeightThreshold = 140; // SOGLIA: L'effetto si attiva solo sotto i 140px dall'alto

    // 1. Crea le immagini e le aggiunge al DOM
    const trailImages = images.map(url => {
        const img = document.createElement('img');
        img.src = url;
        img.classList.add('trail-image');
        img.style.opacity = 0;
        
        // Estrai il nome del file dalla URL
        const fileName = url.split('/').pop();
        const projectLink = projectLinks[fileName];
        
        // Aggiungi click handler per navigare al progetto
        if (projectLink) {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                window.location.href = projectLink;
            });
        }
        
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