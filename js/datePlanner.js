// ============================================
// DATEPLANNER.JS - Interactive Date Planner
// With Working Calendar Navigation
// ============================================

// 🔗 Your server URL
const API_URL = 'https://admin-peter-server.onrender.com/api/love';

let selectedDate = null;
let selectedDateType = null;
let currentCalendarMonth = new Date().getMonth();
let currentCalendarYear = new Date().getFullYear();

// --- Date Type Options (keep as before) ---
const dateTypes = [
    {
        id: 'Take a walk  ',
        icon: '🧺',
        title: 'ice cream  Date maybe ',
        description: 'lets take a walk  and talk  i  will  buy  you  ice cream ',
        color: '#8BC34A'
    },
    {
        id: 'movie',
        icon: '🎬',
        title: 'Movie Night',
        description: ' cinema ',
        color: '#9C27B0'
    },
    {
        id: 'dinner',
        icon: '🍝',
        title: 'Lets have  Dinner',
        description: '  good food ',
        color: '#E91E63'
    },
    
    {
        id: 'coffee',
        icon: '☕',
        title: 'Coffee & Chill',
        description: 'Warm drinks nyana at  a cafe  ',
        color: '#795548'
    },
    {
        id: 'adventure',
        icon: '🗺️',
        title: 'Adventure Day',
        description: 'Let\'s explore somewhere new together ',
        color: '#FF9800'
    },
    {
        id: 'cooking',
        icon: '👩‍🍳',
        title: 'Cook Together',
        description: 'Making something delicious — together',
        color: '#F44336'
    },
   
    {
        id: 'surprise',
        icon: '🎁',
        title: 'Surprise Me',
        description: 'You plan it — I trust you completely',
        color: '#9E9E9E'
    }
];

// ============================================
// INITIALIZATION
// ============================================
function loadDatePlanner() {
    const container = document.getElementById('plannerContainer');
    
    container.innerHTML = `
        <!-- Calendar Section -->
        <div class="date-section">
            <div class="section-label">
                <i class="fas fa-calendar-alt"></i>
                <span>Pick a Date</span>
            </div>
            <div class="calendar-wrapper" id="calendarWrapper">
                <!-- Calendar renders here -->
            </div>
        </div>
        
        <!-- Selected Date Display -->
        <div class="selected-date-display" id="selectedDateDisplay">
            <span class="select-prompt">👆 Tap a date on the calendar above</span>
        </div>
        
        <!-- Date Type Section -->
        <div class="date-section" id="dateTypeSection">
            <div class="section-label">
                <i class="fas fa-heart"></i>
                <span>What would you like us to do?</span>
            </div>
            <div class="date-types-grid" id="dateTypesGrid">
                <!-- Date type cards render here -->
            </div>
        </div>
        
        <!-- Custom Idea Input -->
        <div class="date-section">
            <div class="section-label">
                <i class="fas fa-lightbulb"></i>
                <span>Or... tell me your own idea</span>
            </div>
            <div class="custom-idea-wrapper">
                <textarea 
                    id="customIdea" 
                    placeholder="Write your  date idea here, if you  have one ... 💕"
                    maxlength="200"
                    rows="3"
                ></textarea>
                <div class="char-counter">
                    <span id="charCount">0</span>/200
                </div>
            </div>
        </div>
        
        <!-- Save Button -->
        <div class="save-section">
            <button class="btn-save-date" id="btnSaveDate" disabled>
                <i class="fas fa-heart"></i>
                <span>Save Our Date</span>
                <i class="fas fa-heart"></i>
            </button>
            <p class="save-hint" id="saveHint">Pick a date and choose an activity to save 💕</p>
        </div>
        
        <!-- Saved Date Display -->
        <div class="saved-date-card" id="savedDateCard" style="display: none;">
            <!-- Shows when a date is saved -->
        </div>
    `;
    
    // Initialize components
    renderCalendar();
    renderDateTypes();
    setupEventListeners();
    loadSavedDate();
}

// ============================================
// CALENDAR - WITH WORKING NAVIGATION
// ============================================
function renderCalendar() {
    const wrapper = document.getElementById('calendarWrapper');
    
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const today = new Date();
    const daysInMonth = new Date(currentCalendarYear, currentCalendarMonth + 1, 0).getDate();
    const firstDayOfWeek = new Date(currentCalendarYear, currentCalendarMonth, 1).getDay();
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Check if we can go to previous month (not before current month)
    const canGoPrev = !(currentCalendarYear === today.getFullYear() && currentCalendarMonth <= today.getMonth());
    
    // Check if we can go to next month (limit to 12 months ahead)
    const maxMonth = today.getMonth() + 12;
    const maxYear = today.getFullYear() + Math.floor(maxMonth / 12);
    const maxMonthAdjusted = maxMonth % 12;
    const canGoNext = !(currentCalendarYear >= maxYear && currentCalendarMonth >= maxMonthAdjusted);
    
    let calendarHTML = `
        <div class="calendar-card">
            <div class="calendar-header">
                <button class="cal-nav-btn" id="prevMonth" ${!canGoPrev ? 'disabled style="opacity:0.3;cursor:not-allowed;"' : ''}>
                    <i class="fas fa-chevron-left"></i>
                </button>
                <h3 class="calendar-month">
                    ${monthNames[currentCalendarMonth]} ${currentCalendarYear}
                </h3>
                <button class="cal-nav-btn" id="nextMonth" ${!canGoNext ? 'disabled style="opacity:0.3;cursor:not-allowed;"' : ''}>
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
            <div class="calendar-grid">
    `;
    
    // Day names
    dayNames.forEach(day => {
        calendarHTML += `<div class="cal-day-name">${day}</div>`;
    });
    
    // Empty cells before first day
    for (let i = 0; i < firstDayOfWeek; i++) {
        calendarHTML += `<div class="cal-day empty"></div>`;
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentCalendarYear, currentCalendarMonth, day);
        const dateString = formatDate(date);
        const isToday = isSameDay(date, today);
        const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const isSelected = selectedDate === dateString;
        
        let classes = 'cal-day';
        if (isToday) classes += ' today';
        if (isPast) classes += ' past';
        if (isSelected) classes += ' selected';
        
        calendarHTML += `
            <div class="${classes}" 
                 data-date="${dateString}" 
                 ${isPast ? '' : `onclick="selectDate('${dateString}', this)"`}>
                <span class="day-number">${day}</span>
                ${isToday ? '<span class="today-dot">💕</span>' : ''}
                ${isSelected ? '<span class="selected-heart">💖</span>' : ''}
            </div>
        `;
    }
    
    calendarHTML += `
            </div>
        </div>
    `;
    
    wrapper.innerHTML = calendarHTML;
    
    // --- Navigation Buttons with Real Month Switching ---
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (canGoPrev) {
                // Go to previous month
                if (currentCalendarMonth === 0) {
                    currentCalendarMonth = 11;
                    currentCalendarYear--;
                } else {
                    currentCalendarMonth--;
                }
                renderCalendar();
                // Re-attach date type listeners
                renderDateTypes();
                setupEventListeners();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (canGoNext) {
                // Go to next month
                if (currentCalendarMonth === 11) {
                    currentCalendarMonth = 0;
                    currentCalendarYear++;
                } else {
                    currentCalendarMonth++;
                }
                renderCalendar();
                // Re-attach date type listeners
                renderDateTypes();
                setupEventListeners();
            }
        });
    }
}

// ============================================
// DATE TYPE CARDS
// ============================================
function renderDateTypes() {
    const grid = document.getElementById('dateTypesGrid');
    
    if (!grid) return;
    
    grid.innerHTML = dateTypes.map(type => `
        <div class="date-type-card ${selectedDateType === type.id ? 'selected' : ''}"
             data-type="${type.id}"
             onclick="selectDateType('${type.id}', this)"
             style="--card-color: ${type.color}">
            <div class="type-icon">${type.icon}</div>
            <div class="type-info">
                <h4>${type.title}</h4>
                <p>${type.description}</p>
            </div>
            <div class="type-check">
                <i class="fas fa-heart"></i>
            </div>
        </div>
    `).join('');
}

// ============================================
// SELECTIONS
// ============================================
function selectDate(dateString, element) {
    selectedDate = dateString;
    
    // Update calendar UI
    document.querySelectorAll('.cal-day.selected').forEach(el => {
        el.classList.remove('selected');
        const heart = el.querySelector('.selected-heart');
        if (heart) heart.remove();
    });
    
    element.classList.add('selected');
    if (!element.querySelector('.selected-heart')) {
        const heart = document.createElement('span');
        heart.classList.add('selected-heart');
        heart.textContent = '💖';
        element.appendChild(heart);
    }
    
    // Update display
    updateSelectedDateDisplay();
    checkSaveReady();
}

function selectDateType(typeId, element) {
    selectedDateType = typeId;
    
    // Update cards UI
    document.querySelectorAll('.date-type-card.selected').forEach(el => {
        el.classList.remove('selected');
    });
    element.classList.add('selected');
    
    // Update display
    updateSelectedDateDisplay();
    checkSaveReady();
}

function updateSelectedDateDisplay() {
    const display = document.getElementById('selectedDateDisplay');
    if (!display) return;
    
    if (!selectedDate) {
        display.innerHTML = '<span class="select-prompt">👆 Tap a date on the calendar above</span>';
        return;
    }
    
    const date = new Date(selectedDate);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    
    let html = `
        <div class="selected-info">
            <div class="selected-date-badge">
                <i class="fas fa-calendar-check"></i>
                <span>${formattedDate}</span>
            </div>
    `;
    
    if (selectedDateType) {
        const dateType = dateTypes.find(t => t.id === selectedDateType);
        if (dateType) {
            html += `
                <div class="selected-type-badge">
                    <span>${dateType.icon}</span>
                    <span>${dateType.title}</span>
                </div>
            `;
        }
    }
    
    html += `</div>`;
    display.innerHTML = html;
}

// ============================================
// SAVE LOGIC
// ============================================
function checkSaveReady() {
    const saveBtn = document.getElementById('btnSaveDate');
    const saveHint = document.getElementById('saveHint');
    const customIdea = document.getElementById('customIdea');
    const customIdeaValue = customIdea ? customIdea.value.trim() : '';
    
    if (!saveBtn || !saveHint) return;
    
    if (selectedDate && (selectedDateType || customIdeaValue)) {
        saveBtn.disabled = false;
        saveBtn.classList.add('ready');
        saveHint.textContent = 'Ready to save! Click the button above 💕';
        saveHint.style.color = 'var(--pink-deep)';
    } else if (selectedDate && !selectedDateType && !customIdeaValue) {
        saveBtn.disabled = true;
        saveBtn.classList.remove('ready');
        saveHint.textContent = 'Now pick an activity or write your own idea ✨';
        saveHint.style.color = 'var(--text-soft)';
    } else {
        saveBtn.disabled = true;
        saveBtn.classList.remove('ready');
        saveHint.textContent = 'Pick a date and choose an activity to save 💕';
        saveHint.style.color = 'var(--text-soft)';
    }
}

async function saveDate() {
    const saveBtn = document.getElementById('btnSaveDate');
    const customIdea = document.getElementById('customIdea');
    const customIdeaValue = customIdea ? customIdea.value.trim() : '';
    
    if (!saveBtn) return;
    
    saveBtn.classList.add('saving');
    saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Saving...</span>';
    
    const dateData = {
        selected_date: selectedDate,
        date_type: selectedDateType || 'custom',
        custom_idea: customIdeaValue || null,
        notes: customIdeaValue || (selectedDateType ? dateTypes.find(t => t.id === selectedDateType)?.title : '')
    };
    
    try {
        const token = localStorage.getItem('love_token');
        
        const response = await fetch(`${API_URL}/date-planner`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-love-token': token
            },
            body: JSON.stringify(dateData)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to save');
        }
        
        const data = await response.json();
        
        if (data.success) {
            saveBtn.classList.remove('saving');
            saveBtn.classList.add('saved');
            saveBtn.innerHTML = '<i class="fas fa-check-circle"></i><span>Saved!</span><i class="fas fa-heart"></i>';
            
            setTimeout(() => {
                loadSavedDate();
                resetSaveButton();
            }, 1500);
        }
    } catch (err) {
        console.error('Save error:', err);
        // Fallback to localStorage
        localStorage.setItem('savedDate', JSON.stringify(dateData));
        
        saveBtn.classList.remove('saving');
        saveBtn.classList.add('saved');
        saveBtn.innerHTML = '<i class="fas fa-check-circle"></i><span>Saved!</span>';
        
        setTimeout(() => {
            loadSavedDate();
            resetSaveButton();
        }, 1500);
    }
}

function resetSaveButton() {
    const saveBtn = document.getElementById('btnSaveDate');
    if (!saveBtn) return;
    
    saveBtn.classList.remove('saved');
    saveBtn.innerHTML = '<i class="fas fa-heart"></i><span>Save Our Date</span><i class="fas fa-heart"></i>';
    checkSaveReady();
}

// ============================================
// LOAD SAVED DATE
// ============================================
async function loadSavedDate() {
    try {
        const token = localStorage.getItem('love_token');
        const response = await fetch(`${API_URL}/date-planner`, {
            headers: {
                'x-love-token': token
            }
        });
        
        if (!response.ok) throw new Error('Failed to load');
        
        const data = await response.json();
        
        if (data.success && data.date) {
            displaySavedDate(data.date);
        }
    } catch (err) {
        console.error('Load error:', err);
        // Fallback to localStorage
        const savedData = localStorage.getItem('savedDate');
        if (savedData) {
            displaySavedDate(JSON.parse(savedData));
        }
    }
}

function displaySavedDate(dateData) {
    const savedCard = document.getElementById('savedDateCard');
    if (!savedCard) return;
    
    const date = new Date(dateData.selected_date);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    
    let typeInfo = '';
    if (dateData.date_type === 'custom' || dateData.custom_idea) {
        typeInfo = `
            <div class="saved-type">
                <span class="saved-icon">💡</span>
                <span>Your Idea: ${dateData.custom_idea || dateData.notes}</span>
            </div>
        `;
    } else {
        const dateType = dateTypes.find(t => t.id === dateData.date_type);
        if (dateType) {
            typeInfo = `
                <div class="saved-type">
                    <span class="saved-icon">${dateType.icon}</span>
                    <span>${dateType.title}</span>
                </div>
            `;
        }
    }
    
    savedCard.style.display = 'block';
    savedCard.innerHTML = `
        <div class="saved-card-inner">
            <div class="saved-card-header">
                <i class="fas fa-heart"></i>
                <h3>Our Planned Date</h3>
                <i class="fas fa-heart"></i>
            </div>
            <div class="saved-date-info">
                <div class="saved-date-big">
                    <i class="fas fa-calendar-heart"></i>
                    <span>${formattedDate}</span>
                </div>
                ${typeInfo}
            </div>
            <div class="saved-card-actions">
                <button class="btn-change" onclick="resetPlanner()">
                    <i class="fas fa-edit"></i> Change Plans
                </button>
            </div>
            <div class="saved-card-sparkle">
                <span>✨</span><span>💕</span><span>✨</span>
            </div>
        </div>
    `;
    
    // Hide planner sections
    document.querySelectorAll('.date-section').forEach(section => {
        section.style.display = 'none';
    });
    const saveSection = document.querySelector('.save-section');
    const selectedDisplay = document.getElementById('selectedDateDisplay');
    if (saveSection) saveSection.style.display = 'none';
    if (selectedDisplay) selectedDisplay.style.display = 'none';
}

function resetPlanner() {
    // Clear saved data
    localStorage.removeItem('savedDate');
    selectedDate = null;
    selectedDateType = null;
    
    const customIdea = document.getElementById('customIdea');
    const charCount = document.getElementById('charCount');
    if (customIdea) customIdea.value = '';
    if (charCount) charCount.textContent = '0';
    
    // Reset calendar to current month
    const today = new Date();
    currentCalendarMonth = today.getMonth();
    currentCalendarYear = today.getFullYear();
    
    // Show planner sections
    document.querySelectorAll('.date-section').forEach(section => {
        section.style.display = 'block';
    });
    const saveSection = document.querySelector('.save-section');
    const selectedDisplay = document.getElementById('selectedDateDisplay');
    const savedCard = document.getElementById('savedDateCard');
    
    if (saveSection) saveSection.style.display = 'block';
    if (selectedDisplay) selectedDisplay.style.display = 'flex';
    if (savedCard) savedCard.style.display = 'none';
    
    // Reset UI
    updateSelectedDateDisplay();
    renderCalendar();
    renderDateTypes();
    checkSaveReady();
    setupEventListeners();
}

// ============================================
// EVENT LISTENERS
// ============================================
function setupEventListeners() {
    // Custom idea textarea
    const customIdea = document.getElementById('customIdea');
    const charCount = document.getElementById('charCount');
    
    if (customIdea) {
        // Remove old listener by cloning
        const newCustomIdea = customIdea.cloneNode(true);
        customIdea.parentNode.replaceChild(newCustomIdea, customIdea);
        
        newCustomIdea.addEventListener('input', () => {
            if (charCount) charCount.textContent = newCustomIdea.value.length;
            checkSaveReady();
        });
    }
    
    // Save button
    const saveBtn = document.getElementById('btnSaveDate');
    if (saveBtn) {
        const newSaveBtn = saveBtn.cloneNode(true);
        saveBtn.parentNode.replaceChild(newSaveBtn, saveBtn);
        newSaveBtn.addEventListener('click', saveDate);
    }
}

// ============================================
// HELPERS
// ============================================
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
}