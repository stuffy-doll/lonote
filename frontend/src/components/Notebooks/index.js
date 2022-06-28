import { getNotebooks } from "../../store/notebook";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotebookForm from "./NotebookForm";
import { Redirect, Link } from "react-router-dom";
import NoteList from "../Note";

const Notebooks = () => {
  const dispatch = useDispatch();
  const sessionUserId = useSelector(state => state.session.user.id)
  const data = useSelector(state => state.notebooks);
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
              <NoteList />
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Notebooks;
