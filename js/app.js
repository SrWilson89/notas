document.addEventListener('DOMContentLoaded', () => {
    // Inicializar la aplicación
    UI.displayNotes();
    
    // Event listeners
    document.querySelector('#add-note-btn').addEventListener('click', () => {
        UI.openModal();
    });
    
    document.querySelector('#search-input').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        UI.searchNotes(searchTerm);
    });
    
    document.querySelector('.close').addEventListener('click', () => {
        UI.closeModal();
    });
    
    document.querySelector('#cancel-btn').addEventListener('click', () => {
        UI.closeModal();
    });
    
    document.querySelector('#note-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.querySelector('#note-title').value;
        const content = document.querySelector('#note-content').value;
        
        if (UI.isEditing) {
            // Actualizar nota existente
            const updatedNote = {
                id: UI.currentNoteId,
                title,
                content,
                date: new Date().toISOString()
            };
            Storage.updateNote(updatedNote);
        } else {
            // Crear nueva nota
            const newNote = {
                id: Date.now().toString(),
                title,
                content,
                date: new Date().toISOString()
            };
            Storage.addNote(newNote);
        }
        
        UI.closeModal();
        UI.displayNotes();
    });
});