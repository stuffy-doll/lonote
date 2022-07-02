import './NoteList.css'
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { getNotes } from "../../store/note";
import { destroyNote } from "../../store/note";
import NotFound from "../NotFound";
import EditNote from "./EditNoteForm";
import NoteForm from "./NewNoteForm";
const { useSelector, useDispatch } = require("react-redux")

// ToDo: Render a Note Component
const NoteList = ({ notebooks }) => {
  const notebookId = useParams().notebookId;
  const dispatch = useDispatch();
  const sessionUserId = useSelector(state => state.session.user.id);
  const notebookList = notebooks.map(notebook => notebook.id);
  const notes = useSelector(state => Object.values(state.notes).filter(note => note.notebookId === +notebookId));

  useEffect(() => {
    dispatch(getNotes(sessionUserId))
  }, [dispatch, sessionUserId]);

  if (!notebookList.includes(+notebookId)) {
    return (
      <NotFound />
    )
  } else if (!notes.length) {
    return (
      <div className='notes-container'>
        <NoteForm notebook={notebookId} />
      </div>
    )
  } else return (
    <div className="note-list">
      {sessionUserId && (
        <div className="notes-container">
          <NoteForm notebook={notebookId} />
          {notes.map(note => (
            <div key={note.id} className="note-card">
              <p>{note.title}</p>
              <p>{note.content}</p>
              <EditNote note={note} />
              <button onClick={async (e) => {
                e.preventDefault();
                const res = await dispatch(destroyNote(note.id))
                if (res) {
                  // console.log(res);
                }
              }}>Delete Note</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default NoteList;
