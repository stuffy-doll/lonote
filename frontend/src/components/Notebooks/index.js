import './Notebooks.css'
import { deleteNotebook, getNotebooks } from "../../store/notebook";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotebookForm from "./NotebookForm";
import { Redirect, Link, Route, useHistory } from "react-router-dom";
import NoteList from "../Note";

const Notebooks = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUserId = useSelector(state => state.session.user.id)
  const data = useSelector(state => state.notebooks);

  useEffect(() => {
    dispatch(getNotebooks(sessionUserId))
  }, [dispatch, sessionUserId]);
  // Redirect if there is no user
  // If you’re working with data that will be undefined when using the initial state; conditionally render it.
  const notebooks = Object.values(data);
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
          <div className="notebook-sidebar">
            <NotebookForm />
            {notebooks.map(notebook =>
              !notebook.isDefault && (notebook.userId === sessionUserId) && (
                <div key={notebook.id} className="notebook-card">
                  <Link className="notebook-link" to={`/notebooks/${notebook.id}`}>{notebook.name}</Link>
                  <button className="delete-notebook" onClick={async (e) => {
                    e.preventDefault();
                    const res = await dispatch(deleteNotebook(notebook.id));
                    if (res) {
                      history.push('/notebooks')
                    }
                  }}>Delete</button>
                </div>
              ))}
          </div>
          <Route exact path='/notebooks/:notebookId'>
            <NoteList notebooks={notebooks} />
          </Route>
        </div>
      )}
    </>
  )
}

export default Notebooks;
