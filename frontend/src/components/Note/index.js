import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { getNotes } from "../../store/note";
const { useSelector, useDispatch } = require("react-redux")

// ToDo: Render a Note Page
const NoteList = () => {
  const notebookId = useParams().notebookId;
  const dispatch = useDispatch();
  const sessionUserId = useSelector(state => state.session.user.id);
  const notes = useSelector(state => Object.values(state.notes).filter(note => note.notebookId === +notebookId));
  useEffect(() => {
    dispatch(getNotes(sessionUserId))
  }, [dispatch]);

  if (!notes) {
    return (
      <>
        <h2>No Notes Yet!</h2>
        <button>Make a note!</button>
      </>
    )
  }

  return (
    <div className="note-list">
      {sessionUserId && (
        <ul>
          {notes.map(note => (
            <li key={note.id} className="note-card">{note.title}</li>
          ))}
        </ul>
      )}
    </div>

  )
}

export default NoteList;
