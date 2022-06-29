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
  const notebooks = useSelector(state => Object.values(state.notebooks));
  const defaultNotebook = notebooks.find(notebook => notebook.isDefault);
  const allNotes = useSelector(state => Object.values(state.notes));
  const defaultNotes = allNotes.filter(note => note.notebookId === defaultNotebook.id);
  console.log('defaultNotes::', defaultNotes);
  const [showForm, setShowForm] = useState(false);
  const [toggleButton, setToggleButton] = useState('+');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    dispatch(getNotebooks(user.id))
  }, [dispatch, user.id])

  useEffect(() => {
    dispatch(getNotes(user.id))
  }, [dispatch, user.id])

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

  if (user) {
    return (
      <main>
        <div>
          <h1>Welcome, {user.username}!</h1>
          <div className="get-started">
            <p>Let's get started...</p>
          </div>
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
      </main>
    )
  } else {
    return (
      <h1>Welcome to Lo/Note</h1>
    )
  }
}

export default Home;
