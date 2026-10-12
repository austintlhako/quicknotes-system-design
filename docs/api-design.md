# QuickNotes API Design

## Endpoints

* **List Notes**
  * **Method:** `GET`
  * **Path:** `/api/notes`
  * **Description:** Retrieves a list of all notes.
  * **Success Status:** `200 OK`

* **Get a Single Note**
  * **Method:** `GET`
  * **Path:** `/api/notes/:id`
  * **Description:** Retrieves the details of a specific note by ID.
  * **Success Status:** `200 OK`

* **Create Note**
  * **Method:** `POST`
  * **Path:** `/api/notes`
  * **Description:** Creates a new note.
  * **Success Status:** `201 Created`

* **Update Note Completely**
  * **Method:** `PUT`
  * **Path:** `/api/notes/:id`
  * **Description:** Replaces an entire existing note.
  * **Success Status:** `200 OK`

* **Update Note Partially**
  * **Method:** `PATCH`
  * **Path:** `/api/notes/:id`
  * **Description:** Updates specific fields (e.g., changing only the category).
  * **Success Status:** `200 OK`

* **Delete Note**
  * **Method:** `DELETE`
  * **Path:** `/api/notes/:id`
  * **Description:** Removes a note permanently.
  * **Success Status:** `204 No Content`

## JSON Examples

### Listing Notes (Response)
```json
[
  {
    "id": 1,
    "title": "Meeting Prep",
    "body": "Prepare slides for the API design review.",
    "createdAt": "2026-10-12T10:00:00Z"
  }
]