document.addEventListener('DOMContentLoaded', (event) => {

    // Definisci il breakpoint per mobile (coerente con i media query nel tuo CSS)
    const MOBILE_BREAKPOINT = 768;


    // ===========================================
    // 1. LOGICA MENU MOBILE (Toggle Menu/X)
    // ===========================================
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', () => {
            // Togglie la classe per mostrare/nascondere il menu
            mobileNav.classList.toggle('mobile-nav-hidden');
            mobileNav.classList.toggle('mobile-nav-visible');

            // Cambia il testo del toggle da "Menu" a "X" (o viceversa)
            if (mobileNav.classList.contains('mobile-nav-visible')) {
                mobileMenuToggle.textContent = 'X'; 
            } else {
                mobileMenuToggle.textContent = 'Menu'; 
            }
        });
    }

    // =======================================
    // 2. LOGICA CREDITS TOGGLE (Show/Hide)
    // =======================================
    const toggleButton = document.getElementById('credits-toggle');
    const content = document.getElementById('credits-content');

    if (toggleButton && content) {
        toggleButton.addEventListener('click', () => {
            // Toggle della classe 'show' sul contenuto
            content.classList.toggle('show');
            // Toggle della classe 'active' sul titolo (per ruotare la freccia)
            toggleButton.classList.toggle('active');
        });
    }


    // =======================================
    // 3. LOGICA CURSORE PERSONALIZZATO (Disattivato su Mobile)
    // =======================================
    const customCursor = document.querySelector('.custom-cursor');

    // CONTROLLO MOBILE: Se siamo su mobile, rimuovi il cursore e salta il resto della logica
    if (window.innerWidth <= MOBILE_BREAKPOINT) {
        if (customCursor) {
            customCursor.remove();
        }
    } 
    // Altrimenti, esegui la logica del cursore solo su desktop
    else if (customCursor) {
        document.addEventListener('mousemove', (e) => {
            // Aggiorna la posizione del cursore personalizzato
            customCursor.style.left = `${e.clientX}px`;
            customCursor.style.top = `${e.clientY}px`;
        });

        // Interazione con elementi cliccabili (delegata, così funziona anche per elementi aggiunti dinamicamente)
        document.addEventListener('mouseover', (e) => {
            if (e.target && (e.target.closest('a') || e.target.closest('.project-item'))) {
                customCursor.classList.add('cursor-grow');
            }
        });
        document.addEventListener('mouseout', (e) => {
            if (e.target && (e.target.closest('a') || e.target.closest('.project-item'))) {
                customCursor.classList.remove('cursor-grow');
            }
        });
    }





    
    // =======================================
    // 4. LOGICA FOOTER SCROLL OVERLAP (Link Fisso)
    // =======================================
    const backToProjectsLink = document.querySelector('.back-to-projects-link');
    const footer = document.querySelector('footer');

    // Margine desiderato tra il link e il bordo superiore del footer
    const MARGIN_TOP_FOOTER = 15; 
    // Il margine fisso che il link ha dal fondo della viewport (dal CSS: bottom: 15px)
    const MARGIN_BOTTOM_FIXED = 15;

    if (backToProjectsLink && footer) {
        window.addEventListener('scroll', checkFooterOverlap);
        window.addEventListener('resize', checkFooterOverlap);
        
        function checkFooterOverlap() {
            // Se il link è nascosto tramite CSS (es. su mobile con display: none), resettiamo
            if (window.getComputedStyle(backToProjectsLink).display === 'none') {
                backToProjectsLink.style.transform = 'translateY(0)';
                return;
            }

            // 1. Posizione del bordo superiore del footer rispetto alla viewport (top)
            const footerTop = footer.getBoundingClientRect().top;
            
            // 2. Calcola dove si trova il fondo del link quando è fisso 
            const linkFixedLineY = window.innerHeight - MARGIN_BOTTOM_FIXED;
            
            // 3. Calcola dove DEVE fermarsi il fondo del link per mantenere il margine dal footer.
            const targetLineY = footerTop - MARGIN_TOP_FOOTER;
            
            // 4. Calcola l'invasione/overlap: quanto la posizione fissa è più in basso della linea target.
            const overlapDistance = linkFixedLineY - targetLineY;
            
            // Se overlapDistance > 0, c'è invasione e lo spostiamo in alto
            if (overlapDistance > 0) {
                backToProjectsLink.style.transform = `translateY(-${Math.max(0, overlapDistance)}px)`;
            } else {
                // Non c'è invasione, rimane nella sua posizione fissa
                backToProjectsLink.style.transform = 'translateY(0)';
            }
        }
        
        // Esegui il check iniziale al caricamento della pagina
        checkFooterOverlap();
    }






    // =======================================
    // 5. INCLUSIONE AUTOMATICA FAVICON
    // =======================================
    function loadFavicon() {
        // 1. Crea il nuovo elemento <link>
        var link = document.createElement('link');
        
        // 2. Imposta gli attributi
        link.rel = 'icon';
        link.type = 'image/jpg'; 
        link.href = 'assets/images/favicon/favicon.jpg'; 
        
        // 3. Trova l'elemento <head> del documento
        var head = document.getElementsByTagName('head')[0];
        
        // 4. Aggiungi il tag <link> all'intestazione
        if (head) {
            head.appendChild(link);
        }
    }

    loadFavicon();

    // =======================================
    // 6. AUTOLINK: @patrinitommaso ed email (nessuno stile aggiuntivo)
    // =======================================
    function autoLinkContent(rootElement) {
        const INSTAGRAM_HANDLE_REGEX = /@patrinitommaso\b/gi;
        const EMAIL_REGEX = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;

        const SKIP_TAGS = new Set(['A', 'SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'CODE', 'PRE']);

        function processTextNode(textNode) {
            const original = textNode.nodeValue;
            if (!original || (!INSTAGRAM_HANDLE_REGEX.test(original) && !EMAIL_REGEX.test(original))) {
                // Reset lastIndex for global regexes for next runs
                INSTAGRAM_HANDLE_REGEX.lastIndex = 0;
                EMAIL_REGEX.lastIndex = 0;
                return;
            }

            // Reset lastIndex before reuse
            INSTAGRAM_HANDLE_REGEX.lastIndex = 0;
            EMAIL_REGEX.lastIndex = 0;

            const fragment = document.createDocumentFragment();

            // Build a combined regex to process in reading order
            const COMBINED = new RegExp(`${INSTAGRAM_HANDLE_REGEX.source}|${EMAIL_REGEX.source}`, 'gi');
            let match;
            let lastIndex = 0;

            while ((match = COMBINED.exec(original)) !== null) {
                const start = match.index;
                const end = COMBINED.lastIndex;

                // Text before match
                if (start > lastIndex) {
                    fragment.appendChild(document.createTextNode(original.slice(lastIndex, start)));
                }

                const matchedText = original.slice(start, end);

                let anchor = null;
                if (/^@patrinitommaso$/i.test(matchedText)) {
                    anchor = document.createElement('a');
                    anchor.href = 'https://www.instagram.com/patrinitommaso/';
                    anchor.target = '_blank';
                    anchor.rel = 'noopener noreferrer';
                    anchor.textContent = matchedText;
                } else if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(matchedText)) {
                    anchor = document.createElement('a');
                    anchor.href = `mailto:${matchedText}`;
                    anchor.textContent = matchedText;
                }

                fragment.appendChild(anchor);
                lastIndex = end;
            }

            // Trailing text
            if (lastIndex < original.length) {
                fragment.appendChild(document.createTextNode(original.slice(lastIndex)));
            }

            textNode.parentNode.replaceChild(fragment, textNode);
        }

        function walk(node) {
            if (SKIP_TAGS.has(node.nodeName)) return;
            if (node.nodeType === Node.TEXT_NODE) {
                processTextNode(node);
                return;
            }
            let child = node.firstChild;
            while (child) {
                const next = child.nextSibling; // Cache next because child may be replaced
                walk(child);
                child = next;
            }
        }

        walk(rootElement);
    }

    autoLinkContent(document.body);
});
    
    // =======================================
    // 7. PROTEZIONE IMMAGINI
    // =======================================
    
    // Seleziona tutte le immagini del progetto e cover
    const protectedImages = document.querySelectorAll('.gallery-image, .project-cover, .trail-image');
    
    // Disabilita click destro su tutte le immagini protette
    protectedImages.forEach(img => {
        // Blocca il menu contestuale (click destro)
        img.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });
        
        // Blocca il doppio click
        img.addEventListener('dblclick', (e) => {
            e.preventDefault();
            return false;
        });
        
        // Blocca il drag
        img.addEventListener('dragstart', (e) => {
            e.preventDefault();
            return false;
        });
        
        // Attributi HTML per sicurezza aggiuntiva
        img.setAttribute('draggable', 'false');
        img.setAttribute('ondragstart', 'return false;');
    });
    
    // Protezione globale contro il salvataggio delle immagini
    document.addEventListener('contextmenu', (e) => {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    });
