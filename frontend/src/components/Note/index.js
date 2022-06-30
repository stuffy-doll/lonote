import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { getNotes } from "../../store/note";
import { destroyNote } from "../../store/note";
import EditNote from "./EditNoteForm";
import NoteForm from "./NewNoteForm";
const { useSelector, useDispatch } = require("react-redux")

// ToDo: Render a Note Component
const NoteList = () => {
  const notebookId = useParams().notebookId;
  const dispatch = useDispatch();
  const sessionUserId = useSelector(state => state.session.user.id);
  const notes = useSelector(state => Object.values(state.notes).filter(note => note.notebookId === +notebookId));

  useEffect(() => {
    dispatch(getNotes(sessionUserId))
  }, [dispatch, sessionUserId]);

  if (!notes.length) {
    return (
      <>
        <h3 className="no-notes">No Notes Yet!</h3>
        <NoteForm notebook={notebookId} />
      </>
    )
  } else return (
    <div className="note-list">
      <NoteForm notebook={notebookId} />
      {sessionUserId && (
        <main>
          {
            notes.map(note => (
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
            ))
          }
        </main>
      )}
    </div>

  )
}

export default NoteList;
