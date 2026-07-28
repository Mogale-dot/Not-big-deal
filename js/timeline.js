// ============================================
// TIMELINE.JS — Our Photo & Video Gallery
// Images + Videos loaded from assets folder
// Videos auto-play muted on scroll
// Click to open full-screen with sound
// ============================================

// ============================================
// 📸🎬 ADD YOUR IMAGES & VIDEOS HERE, BROTHER!
// ============================================
const galleryItems = [
    // --- Videos (auto-play muted on scroll) ---
     {
        type: 'video',
        url: 'assets/videos/video6.mp4',
        poster: 'assets/images/photo9.jpeg',
        caption: '😭💕💕',
        date: 'July 26, 2026'
    },  
     {
        type: 'image',
        url: 'assets/images/photo20.jpeg',
        caption: ' 💕💕💕',
        date: 'July 26, 2026'
    },

     {
        type: 'image',
        url: 'assets/images/photo19.jpeg',
        caption: ' 💕💕💕',
        date: 'July 26, 2026'
    },
     {
        type: 'image',
        url: 'assets/images/photo18.jpeg',
        caption: ' Cute 💕💕',
        date: 'July 25, 2026'
    },
     {
        type: 'image',
        url: 'assets/images/photo17.jpeg',
        caption: ' 💕💕💕',
        date: 'July 25, 2026'
    },
     {
        type: 'image',
        url: 'assets/images/photo16.jpeg',
        caption: ' 💕💕💕',
        date: 'July 25, 2026'
    },
      {
        type: 'video',
        url: 'assets/videos/video5.mp4',
        poster: 'assets/images/photo9.jpeg',
        caption: 'Looking amazing 😭😭😭😭💕',
        date: 'July 19, 2026'
    },
    {
        type: 'video',
        url: 'assets/videos/video4.mp4',
        poster: 'assets/images/photo9.jpeg',
        caption: 'Looking amazing 😭😭😭😭💕',
        date: 'July 19, 2026'
    }, 
    
    {
        type: 'video',
        url: 'assets/videos/video3.mp4',
        poster: 'assets/images/photo9.jpeg',
        caption: ' I love you so much 😂💕',
        date: 'July 22, 2026'
    },
     {
        type: 'image',
        url: 'assets/images/photo15.jpeg',
        caption: ' 💕💕💕',
        date: 'July 19, 2026'
    },
     {
        type: 'image',
        url: 'assets/images/photo14.jpeg',
        caption: ' 💕💕💕',
        date: 'July 23, 2026'
    },
    // --- Images ---
     {
        type: 'image',
        url: 'assets/images/photo10.jpeg',
        caption: ' 💕💕💕',
        date: 'July 16, 2026'
    }, 
     {
        type: 'image',
        url: 'assets/images/photo11.jpeg',
        caption: ' 💕💕💕',
        date: 'July 16, 2026'
    },
     {
        type: 'image',
        url: 'assets/images/photo12.jpeg',
        caption: ' 💕💕💕',
        date: 'July 16, 2026'
    },
     {
        type: 'image',
        url: 'assets/images/photo13.jpeg',
        caption: ' 💕💕💕',
        date: 'July 16, 2026'
    },  
     {
        type: 'video',
        url: 'assets/videos/video2.mp4',
        poster: 'assets/images/photo9.jpeg',
        caption: 'A beautiful night 💕💕💕',
        date: 'July 13 2026'
    },
    
    {
        type: 'image',
        url: 'assets/images/photo9.jpeg',
        caption: 'A beautiful night 💕💕💕',
        date: 'July 13, 2026'
    },
    {
        type: 'image',
        url: 'assets/images/photo8.jpeg',
        caption: 'A beautiful night 💕💕💕',
        date: 'July 13, 2026'
    },
    {
        type: 'image',
        url: 'assets/images/photo7.jpeg',
        caption: 'Pretty face! 💕💕💕😭',
        date: 'July 13, 2026'
    },
     {
        type: 'video',
        url: 'assets/videos/video1.mp4',
        poster: 'assets/images/photo9.jpeg',
        caption: 'Her cute video message 🎬💕',
        date: 'July 9, 2026'
    },
    {
        type: 'image',
        url: 'assets/images/photo6.jpeg',
        caption: 'My lady I missed you 😭😭😭 wa kgonega mara',
        date: 'June 30, 2026'
    },
    {
        type: 'image',
        url: 'assets/images/photo5.jpeg',
        caption: 'My GirlFriend 💕💕💕💕💕💕',
        date: 'June 29, 2026'
    },
    {
        type: 'image',
        url: 'assets/images/photo1.jpeg',
        caption: 'Looking like amazing 💕',
        date: 'June 21, 2026'
    },
    {
        type: 'image',
        url: 'assets/images/photo2.jpeg',
        caption: 'My favorite 🌅',
        date: 'June 21, 2026'
    },
    {
        type: 'image',
        url: 'assets/images/photo3.jpeg',
        caption: 'Wish I met you here 😂',
        date: 'June 21, 2026'
    },
      {
        type: 'video',
        url: 'assets/videos/video.mp4',
        poster: 'assets/images/photo9.jpeg',
        caption: 'Her cute video message 🎬💕',
        date: 'June 21 2026'
    },

    {
        type: 'image',
        url: 'assets/images/photo4.jpeg',
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
            <p>Every picture & video tells your story 💕</p>
            <div class="intro-sparkles">
                <span>✨</span><span>💕</span><span>✨</span>
            </div>
        </div>
        
        <!-- Gallery Grid -->
        <div class="gallery-grid" id="galleryGrid"></div>
        
        <!-- Empty State -->
        <div class="gallery-empty" id="galleryEmpty" style="display:none;">
            <div class="empty-icon">🖼️</div>
            <h4>No pictures yet...</h4>
            <p>But soon this space will be filled with beautiful memories</p>
            <div class="empty-hearts">
                <span>💕</span><span>💖</span><span>💗</span>
            </div>
        </div>
        
        <!-- Full Screen Viewer (Images + Videos) -->
        <div class="lightbox" id="lightbox" style="display:none;">
            <button class="lightbox-close" id="lightboxClose">
                <i class="fas fa-times"></i>
            </button>
            <button class="lightbox-prev" id="lightboxPrev">
                <i class="fas fa-chevron-left"></i>
            </button>
            <div class="lightbox-media-container" id="lightboxMediaContainer">
                <img src="" alt="" id="lightboxImage" style="display:none;">
                <video id="lightboxVideo" controls style="display:none;" playsinline></video>
            </div>
            <div class="lightbox-caption" id="lightboxCaption"></div>
            <button class="lightbox-next" id="lightboxNext">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    `;
    
    if (galleryItems.length > 0) {
        renderGallery();
        document.getElementById('galleryEmpty').style.display = 'none';
        // Initialize video observer after DOM is ready
        setTimeout(() => {
            initVideoObserver();
        }, 300);
    } else {
        document.getElementById('galleryGrid').innerHTML = '';
        document.getElementById('galleryEmpty').style.display = 'block';
    }
    
    setupLightboxListeners();
}

// ============================================
// RENDER GALLERY (Images + Videos)
// ============================================
function renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    
    // Store all items for lightbox navigation
    window.allGalleryItems = galleryItems;
    
    galleryGrid.innerHTML = galleryItems.map((item, index) => {
        if (item.type === 'video') {
            // Video Card
            return `
                <div class="gallery-card video-card" onclick="openLightbox(${index})" data-index="${index}">
                    <div class="gallery-card-inner">
                        <div class="gallery-image-wrapper video-wrapper">
                            <video 
                                class="lazy-video"
                                src="${item.url}"
                                poster="${item.poster || ''}"
                                muted
                                loop
                                playsinline
                                webkit-playsinline
                                preload="auto"
                                disableRemotePlayback
                            ></video>
                            <div class="video-overlay">
                                <div class="video-play-icon">
                                    <i class="fas fa-play"></i>
                                </div>
                                <span class="video-badge">🎬 Video</span>
                            </div>
                            <div class="video-sound-icon">
                                <i class="fas fa-volume-mute"></i>
                            </div>
                        </div>
                        <div class="gallery-card-info">
                            <p class="gallery-caption">${escapeHtml(item.caption)}</p>
                            ${item.date ? `<span class="gallery-date">${item.date}</span>` : ''}
                            <div class="gallery-heart-icon">💕</div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Image Card
            return `
                <div class="gallery-card" onclick="openLightbox(${index})" data-index="${index}">
                    <div class="gallery-card-inner">
                        <div class="gallery-image-wrapper">
                            <img 
                                src="${item.url}" 
                                alt="${escapeHtml(item.caption)}" 
                                loading="lazy"
                                onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22><rect fill=%22%23ffe4ec%22 width=%22300%22 height=%22300%22/><text x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2250%22>💕</text></svg>'"
                            >
                            <div class="gallery-overlay">
                                <i class="fas fa-heart"></i>
                                <span>View</span>
                            </div>
                        </div>
                        <div class="gallery-card-info">
                            <p class="gallery-caption">${escapeHtml(item.caption)}</p>
                            ${item.date ? `<span class="gallery-date">${item.date}</span>` : ''}
                            <div class="gallery-heart-icon">💕</div>
                        </div>
                    </div>
                </div>
            `;
        }
    }).join('');
}

// ============================================
// VIDEO AUTO-PLAY ON SCROLL (Muted, no sound)
// ============================================
function initVideoObserver() {
    const videos = document.querySelectorAll('.lazy-video');
    
    if (!videos.length) return;
    
    // Force load all videos
    videos.forEach(video => {
        video.load();
    });
    
    const observerOptions = {
        root: null,
        rootMargin: '100px 0px',
        threshold: 0.4
    };
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            const card = video.closest('.video-card');
            const overlay = card ? card.querySelector('.video-overlay') : null;
            
            if (entry.isIntersecting) {
                // Play muted
                video.muted = true;
                video.play().then(() => {
                    if (overlay) {
                        overlay.style.opacity = '0';
                    }
                    if (card) {
                        card.classList.add('playing');
                    }
                }).catch(() => {
                    // Silently fail - she can click to open full screen
                });
            } else {
                // Pause when out of view
                video.pause();
                if (overlay) {
                    overlay.style.opacity = '1';
                }
                if (card) {
                    card.classList.remove('playing');
                }
            }
        });
    }, observerOptions);
    
    videos.forEach(video => {
        videoObserver.observe(video);
    });
}

// ============================================
// LIGHTBOX (Full Screen Viewer - Images & Videos)
// ============================================
let currentLightboxIndex = 0;

function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxVideo = document.getElementById('lightboxVideo');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    currentLightboxIndex = index;
    const item = window.allGalleryItems[index];
    
    // Hide both media elements first
    lightboxImage.style.display = 'none';
    lightboxVideo.style.display = 'none';
    
    // Pause any playing video
    lightboxVideo.pause();
    
    if (item.type === 'video') {
        // Show video with controls and sound
        lightboxVideo.src = item.url;
        lightboxVideo.muted = false;
        lightboxVideo.controls = true;
        lightboxVideo.style.display = 'block';
        lightboxVideo.play().catch(() => {});
    } else {
        // Show image
        lightboxImage.src = item.url;
        lightboxImage.style.display = 'block';
    }
    
    lightboxCaption.textContent = item.caption || 'A beautiful moment 💕';
    
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    updateLightboxNav();
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxVideo = document.getElementById('lightboxVideo');
    
    // Pause video when closing
    lightboxVideo.pause();
    lightboxVideo.src = '';
    
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
}

function nextImage() {
    if (currentLightboxIndex < window.allGalleryItems.length - 1) {
        currentLightboxIndex++;
        updateLightboxMedia();
    }
}

function prevImage() {
    if (currentLightboxIndex > 0) {
        currentLightboxIndex--;
        updateLightboxMedia();
    }
}

function updateLightboxMedia() {
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxVideo = document.getElementById('lightboxVideo');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const item = window.allGalleryItems[currentLightboxIndex];
    
    // Hide both
    lightboxImage.style.display = 'none';
    lightboxVideo.style.display = 'none';
    lightboxVideo.pause();
    
    // Add zoom animation
    lightboxImage.style.transform = 'scale(0.9)';
    lightboxImage.style.opacity = '0';
    lightboxVideo.style.transform = 'scale(0.9)';
    lightboxVideo.style.opacity = '0';
    
    setTimeout(() => {
        if (item.type === 'video') {
            lightboxVideo.src = item.url;
            lightboxVideo.muted = false;
            lightboxVideo.controls = true;
            lightboxVideo.style.display = 'block';
            lightboxVideo.style.transform = 'scale(1)';
            lightboxVideo.style.opacity = '1';
            lightboxVideo.play().catch(() => {});
        } else {
            lightboxImage.src = item.url;
            lightboxImage.style.display = 'block';
            lightboxImage.style.transform = 'scale(1)';
            lightboxImage.style.opacity = '1';
        }
        
        lightboxCaption.textContent = item.caption || 'A beautiful moment 💕';
    }, 150);
    
    updateLightboxNav();
}

function updateLightboxNav() {
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    
    if (prevBtn) prevBtn.style.opacity = currentLightboxIndex === 0 ? '0.3' : '1';
    if (nextBtn) nextBtn.style.opacity = currentLightboxIndex === window.allGalleryItems.length - 1 ? '0.3' : '1';
}

function setupLightboxListeners() {
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightbox = document.getElementById('lightbox');
    
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);
    if (lightboxNext) lightboxNext.addEventListener('click', nextImage);
    
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }
    
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