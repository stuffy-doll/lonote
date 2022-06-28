import { getNotebooks } from "../../store/notebook";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotebookForm from "./NotebookForm";
import { Redirect, Link, Route } from "react-router-dom";
import NoteList from "../Note";
import EditNoteBook from "../EditNoteBookForm";

const Notebooks = () => {
  const dispatch = useDispatch();
  const sessionUserId = useSelector(state => state.session.user.id)
  const data = useSelector(state => state.notebooks);

  // const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(getNotebooks(sessionUserId))
  }, [dispatch]);
  // Redirect if there is no user
  // If you’re working with data that will be undefined when using the initial state; conditionally render it.
  const notebooks = Object.values(data);
  // console.log('sessionUserId:: ', sessionUserId)
  if (!sessionUserId) {
    <Redirect to='/login' />
  }

  if (!notebooks) {
    return null;
  }

  return (
    <>
      {sessionUserId && (
        <div>
          <NotebookForm />
          {notebooks.map(notebook => (
            <div key={notebook.id} className="notebook-card">
              <Link to={`/notebooks/${notebook.id}`}>{notebook.name}</Link>
            </div>
          ))}
          <Route path='/notebooks/:notebookId'>
            <NoteList />
          </Route>
        </div>
      )}
    </>
  )
}

export default Notebooks;
