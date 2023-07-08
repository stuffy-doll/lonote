import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getNotes } from "../../store/note";
import NoteView from "../NotesV2/NoteView";
import Sticky from "../NotesV2/Sticky";

const NotebookView = ({ notebooks }) => {
  const dispatch = useDispatch();
  const notebookId = +useParams().notebookId;

  const notebook = notebooks.find(notebook => notebook.id = notebookId)
  const notes = useSelector(state => Object.values(state.notes));

  useEffect(() => {
    dispatch(getNotes(notebookId))
  }, [dispatch, notebookId])

  return (
    <main className="notebook-view">
      <h2 className="notebook-title">{notebook?.name}</h2>
      <div className="note-view">
        <NoteView notebookId={notebookId} notes={notes} sticky={notebook?.sticky} />
        <Sticky notebookId={notebookId} sticky={notebook?.sticky} />
      </div>
    </main>
  )
};

export default NotebookView
