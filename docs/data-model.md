# QuickNotes Data Model

## 1. Entities
The application relies on four primary entities to organize and manage user data:
1. **Users**: Stores account information for individuals using the app.
2. **Notes**: Stores the text content and metadata of the notes created by users.
3. **Tags**: Stores reusable organizational labels.
4. **Note_Tags**: A join table that maps the relationships between notes and tags.

## 2. Relationships
* **Users to Notes (One-to-Many):** A single user can create many notes, but each note belongs to exactly one user.
* **Notes to Tags (Many-to-Many):** A single note can have multiple tags, and a single tag can be applied to many different notes. Because relational databases cannot natively store many-to-many relationships, we use the `note_tags` join table to break this down into two manageable one-to-many relationships.

## 3. CREATE TABLE Statements

```sql
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notes (
    note_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE tags (
    tag_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE note_tags (
    note_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (note_id, tag_id),
    FOREIGN KEY (note_id) REFERENCES notes(note_id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE
);