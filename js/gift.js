// ============================================
// GIFT.JS — Progress Bar for Locked Present
// Letter and Present have DIFFERENT unlock dates!
// ============================================

(function() {
    
    // ============================================
    // 🎁 SET YOUR SPECIAL DATES HERE, BROTHER!
    // ============================================
    
    // 📝 LETTER unlocks on September 1, 2026
    const LETTER_DATE = new Date('2026-09-20T00:00:00').getTime();
    const LETTER_START_DATE = new Date('2026-08-01T00:00:00').getTime();
    
    // 🎁 PRESENT unlocks on September 15, 2026
    const GIFT_DATE = new Date('2026-09-31T00:00:00').getTime();
    const GIFT_START_DATE = new Date('2026-08-01T00:00:00').getTime();
    
    // ============================================
    // INITIALIZATION
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        createFloatingParticles();
        updateProgress();
        
        // Update every minute
        setInterval(updateProgress, 60000);
    });
    
    // ============================================
    // PROGRESS CALCULATION
    // ============================================
    function updateProgress() {
        const now = new Date().getTime();
        
        // === LETTER PROGRESS ===
        const letterTotalTime = LETTER_DATE - LETTER_START_DATE;
        const letterElapsedTime = now - LETTER_START_DATE;
        let letterPercentage = Math.floor((letterElapsedTime / letterTotalTime) * 100);
        letterPercentage = Math.max(0, Math.min(100, letterPercentage));
        
        // Update letter progress bar
        updateProgressBar('letter', letterPercentage);
        
        // === GIFT PROGRESS ===
        const giftTotalTime = GIFT_DATE - GIFT_START_DATE;
        const giftElapsedTime = now - GIFT_START_DATE;
        let giftPercentage = Math.floor((giftElapsedTime / giftTotalTime) * 100);
        giftPercentage = Math.max(0, Math.min(100, giftPercentage));
        
        // Update gift progress bar
        updateProgressBar('gift', giftPercentage);
        
        // === CHECK UNLOCKS ===
        // Check if letter should unlock
        if (now >= LETTER_DATE || letterPercentage >= 100) {
            unlockLetter();
        } else {
            updateLetterHints(letterPercentage);
        }
        
        // Check if present should unlock
        if (now >= GIFT_DATE || giftPercentage >= 100) {
            unlockPresent();
        } else {
            updateGiftHints(giftPercentage);
        }
    }
    
    function updateProgressBar(prefix, percentage) {
        const progressFill = document.getElementById(`${prefix}ProgressFill`);
        const progressPercentage = document.getElementById(`${prefix}Percentage`);
        
        if (progressFill) {
            progressFill.style.width = percentage + '%';
            
            // Add gradient color based on progress
            if (percentage < 25) {
                progressFill.style.background = 'linear-gradient(90deg, #e80505, #d64646)';
            } else if (percentage < 50) {
                progressFill.style.background = 'linear-gradient(90deg, #e30707, #e73333)';
            } else if (percentage < 75) {
                progressFill.style.background = 'linear-gradient(90deg, #ec2902, #e71515)';
            } else if (percentage < 95) {
                progressFill.style.background = 'linear-gradient(90deg, #ec2902, #e71515)';
            } else {
                progressFill.style.background ='linear-gradient(90deg, #ec2902, #e71515)';
                progressFill.style.animation = 'progressGlow 7s ease-in-out infinite';
            }
        }
        
        if (progressPercentage) {
            progressPercentage.textContent = percentage + '%';
        }
    }
    
    // ============================================
    // LETTER HINTS (Based on letter progress)
    // ============================================
    function updateLetterHints(percentage) {
        const letterHint = document.getElementById('letterProgressHint');
        
        let hintText = '';
        
        if (percentage < 5) {
            hintText = 'Just getting started... 💕';
        } else if (percentage < 15) {
            hintText = 'Slowly but surely... 🌸';
        } else if (percentage < 25) {
            hintText = 'Getting closer, my love... ✨';
        } else if (percentage < 35) {
            hintText = 'A little more each day... 💖';
        } else if (percentage < 50) {
            hintText = 'Halfway there!  💕';
        } else if (percentage < 60) {
            hintText = 'More than halfway!  🎀';
        } else if (percentage < 70) {
            hintText = 'Almost ready... you can barely wait! 💖';
        } else if (percentage < 80) {
            hintText = 'So close now! Just a little more... ✨';
        } else if (percentage < 90) {
            hintText = 'Any moment now, beautiful! 😍';
        } else if (percentage < 95) {
            hintText = "It's almost time! 💌";
        } else if (percentage < 100) {
            hintText = 'FINAL MOMENTS! Get ready to read! 🎉';
        } else {
            hintText = "IT'S TIME! Read your letter! 💌";
        }
        
        if (letterHint) letterHint.textContent = hintText;
    }
    
    // ============================================
    // GIFT HINTS (Based on gift progress)
    // ============================================
    function updateGiftHints(percentage) {
        const giftHint = document.getElementById('giftProgressHint');
        
        let hintText = '';
        
        if (percentage < 5) {
            hintText = 'Just getting started... 🎁';
        } else if (percentage < 15) {
            hintText = 'Slowly but surely... 🌸';
        } else if (percentage < 25) {
            hintText = 'Getting closer, my love... ✨';
        } else if (percentage < 35) {
            hintText = 'A little more each day... 💖';
        } else if (percentage < 50) {
            hintText = 'Halfway there! 💕';
        } else if (percentage < 60) {
            hintText = 'More than halfway!  🎀';
        } else if (percentage < 70) {
            hintText = 'Almost ready... You can barely wait! 💖';
        } else if (percentage < 80) {
            hintText = 'So close now! Just a little more... ✨';
        } else if (percentage < 90) {
            hintText = 'Any moment now, beautiful! 😍';
        } else if (percentage < 95) {
            hintText = "It's almost time! 🎁";
        } else if (percentage < 100) {
            hintText = 'FINAL MOMENTS! Get ready to open! 🎉';
        } else {
            hintText = "IT'S TIME! Open your present! 🎉🎊";
        }
        
        if (giftHint) giftHint.textContent = hintText;
    }
    
    // ============================================
    // UNLOCK FUNCTIONS
    // ============================================
    function unlockLetter() {
        const lockedLetter = document.getElementById('lockedLetter');
        const unlockedLetter = document.getElementById('unlockedLetter');
        const letterSection = document.getElementById('letterSection');
        
        if (lockedLetter && unlockedLetter) {
            lockedLetter.style.display = 'none';
            unlockedLetter.style.display = 'block';
            unlockedLetter.style.animation = 'fadeSlideUp 0.8s ease';
        }
    }
    
    function unlockPresent() {
        const lockedPresent = document.getElementById('lockedPresent');
        const unlockedPresent = document.getElementById('unlockedPresent');
        
        if (lockedPresent && unlockedPresent) {
            lockedPresent.style.display = 'none';
            unlockedPresent.style.display = 'block';
            unlockedPresent.style.animation = 'fadeSlideUp 0.8s ease';
            burstCelebration();
        }
    }
    
    // ============================================
    // FLOATING PARTICLES
    // ============================================
    function createFloatingParticles() {
        const container = document.getElementById('giftParticles');
        const emojis = ['💕', '✨', '🎁', '💖', '🎀', '🌸', '💝', '⭐'];
        
        function createParticle() {
            const particle = document.createElement('span');
            particle.classList.add('gift-particle');
            particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            particle.style.left = Math.random() * 100 + '%';
            particle.style.fontSize = (Math.random() * 16 + 10) + 'px';
            particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
            particle.style.animationDelay = Math.random() * 5 + 's';
            particle.style.opacity = Math.random() * 0.3 + 0.1;
            
            container.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 18000);
        }
        
        setInterval(createParticle, 1000);
        
        for (let i = 0; i < 10; i++) {
            setTimeout(createParticle, i * 500);
        }
    }
    
    // ============================================
    // CELEBRATION BURST
    // ============================================
    function burstCelebration() {
        const emojis = ['🎉', '🎊', '💕', '✨', '🎁', '💖', '🎀', '💝', '⭐', '🌸'];
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const burst = document.createElement('span');
                burst.classList.add('gift-particle');
                burst.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                burst.style.left = (Math.random() * 80 + 10) + '%';
                burst.style.top = (Math.random() * 80 + 10) + '%';
                burst.style.fontSize = (Math.random() * 25 + 15) + 'px';
                burst.style.animationDuration = (Math.random() * 3 + 2) + 's';
                burst.style.animationDelay = '0s';
                burst.style.opacity = '1';
                burst.style.position = 'fixed';
                
                document.body.appendChild(burst);
                
                setTimeout(() => {
                    burst.remove();
                }, 5000);
            }, i * 100);
        }
    }
    
})();