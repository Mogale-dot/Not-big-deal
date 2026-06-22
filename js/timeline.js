// ============================================
// TIMELINE.JS — Our Photo Gallery (Static)
// Images loaded from assets folder
// ============================================

// ============================================
// 📸 ADD YOUR IMAGES HERE, BROTHER!
// Just add image paths and captions below
// ============================================
const galleryImages = [
    {
        image_url: 'assets/images/photo1.jpeg',
        caption: 'looking like amazing 💕',
        date: 'June 21, 2026'
    },
    {
        image_url: 'assets/images/photo2.jpeg',
        caption: 'My favorite 🌅',
        date: 'June 21, 2026'
    },
    {
        image_url: 'assets/images/photo3.jpeg',
        caption: 'wish i met you here 😂',
        date: 'June 21, 2026'
    },
    {
        image_url: 'assets/images/photo4.jpeg',
        caption: 'Her beautiful smile 💕',
        date: 'July 21, 2026'
    }
   
];

// ============================================
// INITIALIZATION
// ============================================
function loadTimeline() {
    const container = document.getElementById('timelineContainer');
    
    container.innerHTML = `
        <!-- Gallery Intro -->
        <div class="gallery-intro">
            <div class="intro-icon">📸</div>
            <h3>Your Beautiful Gallery</h3>
            <p>Every picture tells me a  story — your  story 💕</p>
            <div class="intro-sparkles">
                <span>✨</span><span>💕</span><span>✨</span>
            </div>
        </div>
        
        <!-- Gallery Grid -->
        <div class="gallery-grid" id="galleryGrid">
            <!-- Images load here -->
        </div>
        
        <!-- Empty State (if no images added) -->
        <div class="gallery-empty" id="galleryEmpty" style="display:none;">
            <div class="empty-icon">🖼️</div>
            <h4>No pictures yet...</h4>
            <p>But soon this space will be filled with beautiful memories</p>
            <div class="empty-hearts">
                <span>💕</span><span>💖</span><span>💗</span>
            </div>
        </div>
        
        <!-- Lightbox (Full screen image viewer) -->
        <div class="lightbox" id="lightbox" style="display:none;">
            <button class="lightbox-close" id="lightboxClose">
                <i class="fas fa-times"></i>
            </button>
            <button class="lightbox-prev" id="lightboxPrev">
                <i class="fas fa-chevron-left"></i>
            </button>
            <img src="" alt="" id="lightboxImage">
            <div class="lightbox-caption" id="lightboxCaption"></div>
            <button class="lightbox-next" id="lightboxNext">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    `;
    
    // Load gallery
    if (galleryImages.length > 0) {
        renderGallery();
        document.getElementById('galleryEmpty').style.display = 'none';
    } else {
        document.getElementById('galleryGrid').innerHTML = '';
        document.getElementById('galleryEmpty').style.display = 'block';
    }
    
    setupLightboxListeners();
}

// ============================================
// RENDER GALLERY
// ============================================
function renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    
    galleryGrid.innerHTML = galleryImages.map((image, index) => {
        return `
            <div class="gallery-card" onclick="openLightbox(${index})" data-index="${index}">
                <div class="gallery-card-inner">
                    <div class="gallery-image-wrapper">
                        <img 
                            src="${image.image_url}" 
                            alt="${escapeHtml(image.caption)}" 
                            loading="lazy"
                            onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22><rect fill=%22%23ffe4ec%22 width=%22300%22 height=%22300%22/><text x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2250%22>💕</text></svg>'"
                        >
                        <div class="gallery-overlay">
                            <i class="fas fa-heart"></i>
                            <span>View</span>
                        </div>
                    </div>
                    <div class="gallery-card-info">
                        <p class="gallery-caption">${escapeHtml(image.caption)}</p>
                        ${image.date ? `<span class="gallery-date">${image.date}</span>` : ''}
                        <div class="gallery-heart-icon">💕</div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ============================================
// LIGHTBOX (Full Screen Image Viewer)
// ============================================
let currentLightboxIndex = 0;

function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    currentLightboxIndex = index;
    const image = galleryImages[index];
    
    lightboxImage.src = image.image_url;
    lightboxCaption.textContent = image.caption || 'A beautiful moment 💕';
    
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    updateLightboxNav();
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
}

function nextImage() {
    if (currentLightboxIndex < galleryImages.length - 1) {
        currentLightboxIndex++;
        updateLightboxImage();
    }
}

function prevImage() {
    if (currentLightboxIndex > 0) {
        currentLightboxIndex--;
        updateLightboxImage();
    }
}

function updateLightboxImage() {
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const image = galleryImages[currentLightboxIndex];
    
    // Add zoom animation
    lightboxImage.style.transform = 'scale(0.9)';
    lightboxImage.style.opacity = '0';
    
    setTimeout(() => {
        lightboxImage.src = image.image_url;
        lightboxCaption.textContent = image.caption || 'A beautiful moment 💕';
        lightboxImage.style.transform = 'scale(1)';
        lightboxImage.style.opacity = '1';
    }, 150);
    
    updateLightboxNav();
}

function updateLightboxNav() {
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    
    if (prevBtn) prevBtn.style.opacity = currentLightboxIndex === 0 ? '0.3' : '1';
    if (nextBtn) nextBtn.style.opacity = currentLightboxIndex === galleryImages.length - 1 ? '0.3' : '1';
}

function setupLightboxListeners() {
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightbox = document.getElementById('lightbox');
    
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);
    if (lightboxNext) lightboxNext.addEventListener('click', nextImage);
    
    // Close on background click
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (document.getElementById('lightbox')?.style.display === 'flex') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        }
    });
}

// ============================================
// HELPERS
// ============================================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}