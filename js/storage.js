class Storage {
    static getNotesKey() {
        return 'user-notes';
    }
    
    static getAllNotes() {
        const notesJSON = localStorage.getItem(this.getNotesKey());
        return notesJSON ? JSON.parse(notesJSON) : [];
    }
    
    static getNoteById(id) {
        const notes = this.getAllNotes();
        return notes.find(note => note.id === id);
    }
    
    static addNote(note) {
        const notes = this.getAllNotes();
        notes.push(note);
        localStorage.setItem(this.getNotesKey(), JSON.stringify(notes));
    }
    
    static updateNote(updatedNote) {
        const notes = this.getAllNotes();
        const index = notes.findIndex(note => note.id === updatedNote.id);
        
        if (index !== -1) {
            notes[index] = updatedNote;
            localStorage.setItem(this.getNotesKey(), JSON.stringify(notes));
        }
    }
    
    static deleteNote(id) {
        const notes = this.getAllNotes();
        const filteredNotes = notes.filter(note => note.id !== id);
        localStorage.setItem(this.getNotesKey(), JSON.stringify(filteredNotes));
    }
}