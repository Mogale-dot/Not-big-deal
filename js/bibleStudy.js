// ============================================
// BIBLE-STUDY.JS — Our Bible Study Together
// ============================================

(function() {
    
    const API_URL = 'https://admin-peter-server.onrender.com/api/love';
    
    // Bible books for dropdown
    const bibleBooks = [
        'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
        'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
        '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles',
        'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs',
        'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah',
        'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos',
        'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah',
        'Haggai', 'Zechariah', 'Malachi',
        'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans',
        '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians',
        'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians',
        '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews',
        'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John',
        'Jude', 'Revelation'
    ];

    // ============================================
    // LOAD STUDY NOTES
    // ============================================
    async function loadStudyNotes() {
        const notesList = document.getElementById('studyNotesList');
        const emptyState = document.getElementById('studyEmpty');
        
        try {
            const token = localStorage.getItem('love_token');
            const response = await fetch(`${API_URL}/bible-study`, {
                headers: { 'x-love-token': token }
            });
            
            if (!response.ok) throw new Error('Failed to load');
            
            const data = await response.json();
            
            if (data.success && data.notes && data.notes.length > 0) {
                renderNotes(data.notes);
                emptyState.style.display = 'none';
            } else {
                notesList.innerHTML = '';
                emptyState.style.display = 'block';
            }
        } catch (err) {
            console.error('Load notes error:', err);
            notesList.innerHTML = '';
            emptyState.style.display = 'block';
        }
    }

    // ============================================
    // RENDER NOTES
    // ============================================
    function renderNotes(notes) {
        const notesList = document.getElementById('studyNotesList');
        
        notesList.innerHTML = notes.map((note, index) => {
            const date = new Date(note.study_date);
            const formattedDate = date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            
            const bookChapter = `${note.book} ${note.chapter}${note.verses ? ':' + note.verses : ''}`;
            
            return `
                <div class="study-card" style="animation-delay: ${index * 0.1}s;">
                    <div class="study-card-header">
                        <div class="study-scripture">
                            <span class="scripture-icon">📖</span>
                            <span class="scripture-ref">${bookChapter}</span>
                            ${note.topic ? `<span class="study-topic-badge">${note.topic}</span>` : ''}
                        </div>
                        <span class="study-date">${formattedDate}</span>
                    </div>
                    
                    ${note.notes ? `
                    <div class="study-section">
                        <h5><i class="fas fa-pen"></i> Notes</h5>
                        <p>${escapeHtml(note.notes)}</p>
                    </div>
                    ` : ''}
                    
                    ${note.reflection ? `
                    <div class="study-section reflection">
                        <h5><i class="fas fa-heart"></i> Reflection</h5>
                        <p>${escapeHtml(note.reflection)}</p>
                    </div>
                    ` : ''}
                    
                    ${note.prayer_points ? `
                    <div class="study-section prayer">
                        <h5><i class="fas fa-praying-hands"></i> Prayer Points</h5>
                        <p>${escapeHtml(note.prayer_points)}</p>
                    </div>
                    ` : ''}
                    
                    <div class="study-card-footer">
                        <span class="study-heart">✝️</span>
                        <button class="btn-delete-note" onclick="window.deleteStudyNote(${note.id})">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    // ============================================
    // SAVE NOTE
    // ============================================
    async function saveStudyNote() {
        const studyDate = document.getElementById('studyDate').value;
        const book = document.getElementById('studyBook').value;
        const chapter = document.getElementById('studyChapter').value;
        const verses = document.getElementById('studyVerses').value;
        const topic = document.getElementById('studyTopic').value;
        const notes = document.getElementById('studyNotes').value;
        const reflection = document.getElementById('studyReflection').value;
        const prayer = document.getElementById('studyPrayer').value;
        const btnSave = document.getElementById('btnSaveStudy');
        
        if (!studyDate || !book || !chapter) {
            alert('Please fill in the date, book, and chapter 📖');
            return;
        }
        
        btnSave.disabled = true;
        btnSave.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        
        try {
            const token = localStorage.getItem('love_token');
            const response = await fetch(`${API_URL}/bible-study`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-love-token': token
                },
                body: JSON.stringify({
                    study_date: studyDate,
                    book: book,
                    chapter: chapter,
                    verses: verses,
                    topic: topic,
                    notes: notes,
                    reflection: reflection,
                    prayer_points: prayer
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                closeModal();
                clearForm();
                loadStudyNotes();
            } else {
                alert(data.message || 'Could not save. Try again 🙏');
            }
        } catch (err) {
            console.error('Save error:', err);
            alert('Could not save notes. Check your connection 🙏');
        } finally {
            btnSave.disabled = false;
            btnSave.innerHTML = '<i class="fas fa-heart"></i> Save Notes';
        }
    }

    // ============================================
    // DELETE NOTE
    // ============================================
    window.deleteStudyNote = async function(id) {
        if (!confirm('Remove this study note? 📖')) return;
        
        try {
            const token = localStorage.getItem('love_token');
            const response = await fetch(`${API_URL}/bible-study/${id}`, {
                method: 'DELETE',
                headers: { 'x-love-token': token }
            });
            
            if (response.ok) {
                loadStudyNotes();
            }
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    // ============================================
    // MODAL HELPERS
    // ============================================
    function openModal() {
        document.getElementById('studyModal').style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        document.getElementById('studyModal').style.display = 'none';
        document.body.style.overflow = '';
    }

    function clearForm() {
        document.getElementById('studyDate').value = new Date().toISOString().split('T')[0];
        document.getElementById('studyBook').value = '';
        document.getElementById('studyChapter').value = '';
        document.getElementById('studyVerses').value = '';
        document.getElementById('studyTopic').value = '';
        document.getElementById('studyNotes').value = '';
        document.getElementById('studyReflection').value = '';
        document.getElementById('studyPrayer').value = '';
    }

    function setupBibleStudyListeners() {
        document.getElementById('btnAddStudy').addEventListener('click', openModal);
        document.getElementById('modalClose').addEventListener('click', closeModal);
        document.getElementById('btnCancelModal').addEventListener('click', closeModal);
        document.getElementById('btnSaveStudy').addEventListener('click', saveStudyNote);
        
        document.getElementById('studyModal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('studyModal')) {
                closeModal();
            }
        });
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ============================================
    // MAIN INIT (Exposed to global scope)
    // ============================================
    window.loadBibleStudy = function() {
        const container = document.getElementById('bibleStudyContainer');
        
        container.innerHTML = `
            <div class="bible-header">
                <div class="bible-icon">📖</div>
                <h3>Our Bible Study</h3>
                <p>Growing in faith together 🙏</p>
                <div class="verse-of-day">
                    <span class="verse-icon">✝️</span>
                    <p>"For where two or three gather in my name, there am I with them."</p>
                    <span class="verse-ref">— Matthew 18:20</span>
                </div>
            </div>
            
            <button class="btn-add-study" id="btnAddStudy">
                <i class="fas fa-plus-circle"></i>
                <span>Add Study Notes</span>
            </button>
            
            <div class="study-notes-list" id="studyNotesList"></div>
            
            <div class="study-empty" id="studyEmpty" style="display:none;">
                <div class="empty-icon">📖</div>
                <h4>No study notes yet</h4>
                <p> Lets Start our spiritual journey together ✝️</p>
            </div>
            
            <div class="study-modal-overlay" id="studyModal" style="display:none;">
                <div class="study-modal">
                    <div class="modal-header">
                        <h4><i class="fas fa-bible"></i> Study Notes</h4>
                        <button class="modal-close" id="modalClose">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>Date of Study 📅</label>
                            <input type="date" id="studyDate">
                        </div>
                        <div class="form-row two-col">
                            <div class="form-group">
                                <label>Book 📖</label>
                                <select id="studyBook">
                                    <option value="">Select Book...</option>
                                    ${bibleBooks.map(book => `<option value="${book}">${book}</option>`).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Chapter</label>
                                <input type="text" id="studyChapter" placeholder="">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Verses</label>
                            <input type="text" id="studyVerses" placeholder=" 1-10 or 5, 12">
                        </div>
                        <div class="form-group">
                            <label>Topic / Title</label>
                            <input type="text" id="studyTopic" placeholder=" Faith, Love, Prayer...">
                        </div>
                        <div class="form-group">
                            <label>Study Notes 📝</label>
                            <textarea id="studyNotes" rows="4" placeholder="What did we learn today..."></textarea>
                        </div>
                        <div class="form-group">
                            <label>Personal Reflection 💭</label>
                            <textarea id="studyReflection" rows="3" placeholder="How does this speak to our hearts..."></textarea>
                        </div>
                        <div class="form-group">
                            <label>Prayer Points 🙏</label>
                            <textarea id="studyPrayer" rows="3" placeholder="What are we praying for..."></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-cancel-modal" id="btnCancelModal">Cancel</button>
                        <button class="btn-save-study" id="btnSaveStudy">
                            <i class="fas fa-heart"></i> Save Notes
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('studyDate').value = new Date().toISOString().split('T')[0];
        
        loadStudyNotes();
        setupBibleStudyListeners();
    };

})(); 