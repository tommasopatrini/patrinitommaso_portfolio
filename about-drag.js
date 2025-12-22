// Draggable and interactive image for about page
document.addEventListener('DOMContentLoaded', function() {
    const image = document.querySelector('.about-sidebar-image');
    
    if (!image) return;
    
    // Check if mobile (disable interactivity on mobile)
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Only enable interactivity on desktop
    if (isMobile()) return;
    
    // Make image draggable
    image.style.cursor = 'grab';
    image.style.userSelect = 'none';
    image.style.WebkitUserSelect = 'none';
    image.style.touchAction = 'none';
    image.style.transition = 'none';
    
    let isDragging = false;
    let startX, startY;
    let offsetX = 0, offsetY = 0;
    let rotation = 0;
    let scale = 1;
    
    image.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);
    
    // Wheel event for rotation and scale
    image.addEventListener('wheel', handleWheel);
    
    function startDrag(e) {
        e.preventDefault();
        isDragging = true;
        image.style.cursor = 'grabbing';
        
        startX = e.clientX - offsetX;
        startY = e.clientY - offsetY;
    }
    
    function drag(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        
        offsetX = e.clientX - startX;
        offsetY = e.clientY - startY;
        
        updateTransform();
    }
    
    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        image.style.cursor = 'grab';
    }
    
    function handleWheel(e) {
        e.preventDefault();
        
        if (e.ctrlKey || e.metaKey) {
            // Scale with Ctrl/Cmd + wheel
            scale += e.deltaY * -0.001;
            scale = Math.min(Math.max(0.3, scale), 3);
        } else {
            // Rotate with wheel
            rotation += e.deltaY * 0.3;
        }
        
        updateTransform();
    }
    
    function updateTransform() {
        image.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${rotation}deg) scale(${scale})`;
    }
    
    // Disable on window resize to mobile
    window.addEventListener('resize', function() {
        if (isMobile()) {
            image.style.transform = '';
            image.style.cursor = '';
        }
    });
});
