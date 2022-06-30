import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createNote, getNotes } from "../../store/note";
import { getNotebooks } from "../../store/notebook";

// ToDo: Render a user Home page
const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user)
  const defaultNotebook = useSelector(state => Object.values(state.notebooks).find(notebook => notebook.isDefault));
  console.log(defaultNotebook);
  const defaultNotes = defaultNotebook.notes;
  const [showForm, setShowForm] = useState(false);
  const [toggleButton, setToggleButton] = useState('+');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    dispatch(getNotebooks(user.id))
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(getNotes(user.id))
  }, [dispatch, user]);

  const handleClick = (e) => {
    e.preventDefault();
    if (toggleButton === '+') {
      setShowForm(true);
      setToggleButton('-');
    } else {
      setShowForm(false);
      setToggleButton('+');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      userId: user.id,
      notebookId: defaultNotebook.id,
      title,
      content
    }
    const res = await dispatch(createNote(payload));
    if (res) {
      history.push(`/`);
      setTitle('');
      setContent('');
      setToggleButton('+');
      setShowForm(false);
    }
  }


  return (
    <main>
      {user ? (
        <div>
          <div>
            <h1>Welcome, {user.username}!</h1>
            <div className="default-notes">
              <div className="note-card">
                <p>Example Note</p>
                <p>Click the plus to make a note!</p>
              </div>
              {defaultNotes.map(note => {
                <div className="note-card">
                  <p>{note.title}</p>
                  <p>{note.content}</p>
                </div>
              })}
              <button onClick={handleClick}>{toggleButton}</button>
            </div>
          </div>
          {showForm && (
            <form className="new-note-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Note Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Your notes..."
                value={content}
                onChange={e => setContent(e.target.value)}
              />
              <button type="submit">Create Note</button>
            </form>
          )}
        </div>
      ) : (
        <>
          <h1>Please Log In</h1>
        </>
      )}
    </main>
  )
}


export default Home;
