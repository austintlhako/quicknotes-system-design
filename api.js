const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const loadBtn = document.getElementById('load-btn');
const submitBtn = document.getElementById('submit-btn');
const statusMsg = document.getElementById('status');
const notesList = document.getElementById('notes-list');
const noteForm = document.getElementById('note-form');
const titleInput = document.getElementById('title-input');
const bodyInput = document.getElementById('body-input');

// Reusable fetch wrapper
async function request(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }
  // JSONPlaceholder returns empty body on DELETE
  if (options.method === 'DELETE') return null; 
  return response.json();
}

function setStatus(message, type) {
  statusMsg.textContent = message;
  statusMsg.className = type; // 'loading', 'success', or 'error'
}

// GET: Load Notes
async function loadNotes() {
  loadBtn.disabled = true;
  setStatus('Loading notes...', 'loading');
  notesList.textContent = ''; 

  try {
    const notes = await request(`${API_URL}?_limit=10`);
    
    if (notes.length === 0) {
      setStatus('No notes found.', 'success');
      return;
    }

    setStatus(`Loaded ${notes.length} notes.`, 'success');
    
    notes.forEach(note => {
      renderNote(note);
    });
  } catch (error) {
    setStatus(`Failed to load notes: ${error.message}`, 'error');
  } finally {
    loadBtn.disabled = false;
  }
}

// POST: Create Note
async function createNote(event) {
  event.preventDefault();
  
  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();

  // Validation
  if (!title || title.length > 100) {
    setStatus('Title is required and must be under 100 characters.', 'error');
    return;
  }

  submitBtn.disabled = true;
  setStatus('Saving note...', 'loading');

  try {
    const newNote = await request(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, userId: 1 })
    });

    setStatus('Note created successfully!', 'success');
    renderNote(newNote, true);
    noteForm.reset();
  } catch (error) {
    setStatus(`Failed to create note: ${error.message}`, 'error');
  } finally {
    submitBtn.disabled = false;
  }
}

// DELETE: Remove Note
async function deleteNote(id, listItem) {
  const deleteBtn = listItem.querySelector('.delete-btn');
  deleteBtn.disabled = true;
  setStatus('Deleting note...', 'loading');

  try {
    await request(`${API_URL}/${id}`, { method: 'DELETE' });
    listItem.remove();
    setStatus('Note deleted.', 'success');
    
    if (notesList.children.length === 0) {
      setStatus('No notes found.', 'success');
    }
  } catch (error) {
    setStatus(`Failed to delete note: ${error.message}`, 'error');
    deleteBtn.disabled = false;
  }
}

// Helper to safely render a note card
function renderNote(note, prepend = false) {
  const li = document.createElement('li');
  li.className = 'note-card';
  
  const titleEl = document.createElement('h3');
  titleEl.textContent = note.title;
  
  const bodyEl = document.createElement('p');
  bodyEl.textContent = note.body;
  
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';
  deleteBtn.addEventListener('click', () => deleteNote(note.id, li));
  
  li.appendChild(titleEl);
  li.appendChild(bodyEl);
  li.appendChild(deleteBtn);
  
  if (prepend) {
    notesList.prepend(li);
  } else {
    notesList.appendChild(li);
  }
}

// Listeners
loadBtn.addEventListener('click', loadNotes);
noteForm.addEventListener('submit', createNote);