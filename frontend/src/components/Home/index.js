import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createNote, destroyNote, getNotes } from "../../store/note";
import { getNotebooks } from "../../store/notebook";
import { login } from "../../store/session";
import EditNote from "../Note/EditNoteForm";
import './Home.css'

// ToDo: Render a user Home page
const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user)
  const defaultNotebook = useSelector(state => Object.values(state.notebooks).find(notebook => notebook.isDefault));
  const defaultNotes = useSelector(state => Object.values(state.notes).filter(note => note.notebookId === defaultNotebook?.id));
  console.log(defaultNotes);
  const [showForm, setShowForm] = useState(false);
  const [toggleButton, setToggleButton] = useState('+');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [valErrors, setValErrors] = useState([]);
  const [submitted, isSubmitted] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(getNotebooks(user?.id));
    };
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      dispatch(getNotes(user?.id));
    };
  }, [dispatch, user]);

  useEffect(() => {
    const errors = [];
    if (!title.length) errors.push('Note must have a title.');
    if (title.length > 50) errors.push('Title too long! (50 characters max)');
    setValErrors(errors);
  }, [title]);

  const handleClick = (e) => {
    e.preventDefault();
    if (toggleButton === '+') {
      setShowForm(true);
      setToggleButton('-');
    } else {
      setShowForm(false);
      setToggleButton('+');
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    isSubmitted(true);
    const payload = {
      userId: user.id,
      notebookId: defaultNotebook?.id,
      title,
      content
    };
    const res = await dispatch(createNote(payload));
    if (res) {
      history.push(`/`);
      setTitle('');
      setContent('');
      setToggleButton('+');
      setShowForm(false);
      isSubmitted(false);
    };
  };

  if (!user) {
    return (
      <div className="lo-note-splash">
        <h1>Welcome to Lo/Note!</h1>
        <h3>Great notes...Lo effort!</h3>
        <button onClick={async (e) => {
          e.preventDefault();
          return await dispatch(login({
            credential: 'notey',
            password: 'password'
          }))
        }}>Take a tour!</button>
      </div>
    )
  } else return (
    <main>
      <div>
        <div>
          <h1 className="welcome">Welcome, {user.username}!</h1>
          {submitted && valErrors.length > 0 && (
            <ul className="errors">
              {valErrors.map(error => (
                <li className="val-error" key={error}>{error}</li>
              ))}
            </ul>
          )}
          <div className="default-notes">
            <div className="note-card">
              <p>Getting Started</p>
              <p>Welcome to Lo/Note!</p>
            </div>
            {defaultNotes?.map(note => (
              <div key={note.id} className="note-card">
                <p className="note-title">{note.title}</p>
                <p>{note.content}</p>
                <EditNote note={note} />
                <button onClick={async (e) => {
                  e.preventDefault();
                  const res = await dispatch(destroyNote(note.id))
                  if (res) {

                  }
                }}>Delete Note</button>
              </div>
            ))}
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
            <button className='toggle-button' onClick={handleClick}>{toggleButton}</button>
          </div>
        </div>
      </div>
    </main>
  )
}


export default Home;
