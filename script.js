document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on load
    const animatedElements = document.querySelectorAll('.fade-in-up');
    setTimeout(() => {
        animatedElements.forEach(el => {
            el.classList.add('visible');
        });
    }, 150);

    // Pulse effect on map button
    const mapBtn = document.querySelector('.map-btn');
    setInterval(() => {
        mapBtn.style.transform = 'scale(1.03)';
        mapBtn.style.boxShadow = '0 8px 25px rgba(226, 192, 68, 0.6)';
        
        setTimeout(() => {
            mapBtn.style.transform = 'scale(1)';
            mapBtn.style.boxShadow = '0 6px 20px rgba(226, 192, 68, 0.3)';
        }, 300);
    }, 3000);

    // Lightbox Functionality
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("expanded-image");
    const closeBtn = document.querySelector(".close-modal");
    const galleryImages = document.querySelectorAll(".gallery-img");

    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = "flex";
            modalImg.src = this.src;
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target !== modalImg) {
            modal.style.display = "none";
        }
    });

    // Scratch to Reveal functionality
    const canvas = document.getElementById("scratch-canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        
        // Wait briefly for CSS to apply width/height before reading offsetWidth
        setTimeout(() => {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
            
            // Fill the canvas with a gold gradient
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#e2c044');
            gradient.addColorStop(1, '#b99320');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Add scratch pattern/text overlay
            ctx.fillStyle = "#333";
            ctx.font = "bold 18px Montserrat, sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("SCRATCH ME", canvas.width / 2, canvas.height / 2);
        }, 100);

        let isDragging = false;

        const scratch = (x, y) => {
            ctx.globalCompositeOperation = "destination-out";
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, 2 * Math.PI); // Radius of the scratch stroke
            ctx.fill();
        };

        const getCoordinates = (e) => {
            const rect = canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return {
                x: clientX - rect.left,
                y: clientY - rect.top
            };
        };

        const startScratch = (e) => {
            isDragging = true;
            const coords = getCoordinates(e);
            scratch(coords.x, coords.y);
        };

        const moveScratch = (e) => {
            if (!isDragging) return;
            e.preventDefault(); // Prevent scrolling on mobile while scratching
            const coords = getCoordinates(e);
            scratch(coords.x, coords.y);
        };

        const stopScratch = () => {
            isDragging = false;
        };

        canvas.addEventListener("mousedown", startScratch);
        canvas.addEventListener("mousemove", moveScratch);
        window.addEventListener("mouseup", stopScratch);

        canvas.addEventListener("touchstart", startScratch, { passive: false });
        canvas.addEventListener("touchmove", moveScratch, { passive: false });
        window.addEventListener("touchend", stopScratch);
    }
});
