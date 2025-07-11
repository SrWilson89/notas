class UI {
    static isEditing = false;
    static currentNoteId = null;
    
    static displayNotes(notes = null) {
        const notesContainer = document.querySelector('#notes-container');
        notesContainer.innerHTML = '';
        
        const notesToDisplay = notes || Storage.getAllNotes();
        
        if (notesToDisplay.length === 0) {
            notesContainer.innerHTML = '<p class="empty-message">No hay notas disponibles. Crea una nueva nota para comenzar.</p>';
            return;
        }
        
        notesToDisplay.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note-card');
            
            const formattedDate = new Date(note.date).toLocaleDateString();
            
            noteElement.innerHTML = `
                <div class="note-header">
                    <h3 class="note-title">${note.title}</h3>
                    <span class="note-date">${formattedDate}</span>
                </div>
                <div class="note-content">
                    <p>${note.content}</p>
                </div>
                <div class="note-actions">
                    <button class="btn primary edit-btn" data-id="${note.id}">Editar</button>
                    <button class="btn copy-btn" data-id="${note.id}">Copiar</button>
                    <button class="btn danger delete-btn" data-id="${note.id}">Borrar</button>
                </div>
            `;
            
            notesContainer.appendChild(noteElement);
        });
        
        // Agregar event listeners a los botones
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const noteId = e.target.getAttribute('data-id');
                this.editNote(noteId);
            });
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const noteId = e.target.getAttribute('data-id');
                this.deleteNote(noteId);
            });
        });
        
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const noteId = e.target.getAttribute('data-id');
                this.copyNoteContent(noteId);
            });
        });
    }
    
    static openModal(note = null) {
        const modal = document.querySelector('#note-modal');
        const form = document.querySelector('#note-form');
        const modalTitle = document.querySelector('#modal-title');
        
        if (note) {
            // Modo edición
            this.isEditing = true;
            this.currentNoteId = note.id;
            modalTitle.textContent = 'Editar Nota';
            document.querySelector('#note-title').value = note.title;
            document.querySelector('#note-content').value = note.content;
        } else {
            // Modo creación
            this.isEditing = false;
            this.currentNoteId = null;
            modalTitle.textContent = 'Nueva Nota';
            form.reset();
        }
        
        modal.style.display = 'block';
    }
    
    static closeModal() {
        document.querySelector('#note-modal').style.display = 'none';
        this.isEditing = false;
        this.currentNoteId = null;
        document.querySelector('#note-form').reset();
    }
    
    static editNote(noteId) {
        const note = Storage.getNoteById(noteId);
        if (note) {
            this.openModal(note);
        }
    }
    
    static deleteNote(noteId) {
        if (confirm('¿Estás seguro de que quieres borrar esta nota?')) {
            Storage.deleteNote(noteId);
            this.displayNotes();
        }
    }
    
static copyNoteContent(noteId) {
    const note = Storage.getNoteById(noteId);
    if (note) {
        // Modificado: Solo copiamos note.content
        const textToCopy = note.content; 
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                alert('Contenido de la nota copiado al portapapeles');
            })
            .catch(err => {
                console.error('Error al copiar: ', err);
                alert('No se pudo copiar el contenido');
            });
    }
}
    
    static searchNotes(searchTerm) {
        const allNotes = Storage.getAllNotes();
        const filteredNotes = allNotes.filter(note => 
            note.title.toLowerCase().includes(searchTerm) || 
            note.content.toLowerCase().includes(searchTerm)
        );
        this.displayNotes(filteredNotes);
    }
}