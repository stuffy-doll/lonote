import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { getNotes } from "../../store/note";
const { useSelector, useDispatch } = require("react-redux")

// ToDo: Render a Note Page
const NoteList = () => {
  const notebookId = useParams();
  const dispatch = useDispatch();
  const sessionUserId = useSelector(state => state.session.user.id);
  const notes = useSelector(state => state.notebooks);

  useEffect(() => {
    dispatch(getNotes(sessionUserId))
  })

  return (
    <div className="note-list">
      {/* {sessionUserId && (
        <ul>
          {notes.map(note => (
            <li key={note.id} className="note-card">{note.name}</li>
          ))}
        </ul>
      )} */}
    </div>

  )
}

export default NoteList;
