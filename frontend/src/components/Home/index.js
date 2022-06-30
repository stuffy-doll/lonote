import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createNote, getNotes } from "../../store/note";
import { getNotebooks } from "../../store/notebook";

// ToDo: Render a user Home page
const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let user = useSelector(state => state.session.user)
  let defaultNotebook = useSelector(state => Object.values(state.notebooks).find(notebook => notebook.isDefault));
  let defaultNotes = defaultNotebook?.notes;
  const [showForm, setShowForm] = useState(false);
  const [toggleButton, setToggleButton] = useState('+');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (user) {
      dispatch(getNotebooks(user?.id));
    }
    return () => {
      user = null;
      defaultNotebook = [];
      defaultNotes = [];
    }
  }, [dispatch, user]);

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
    const payload = {
      userId: user.id,
      notebookId: defaultNotebook.id,
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
    };
  };

  if (!user) {
    return (
      <div className="lo-note-splash">
        <h1>Welcome to Lo/Note!</h1>
        <h3>Great notes...Lo effort!</h3>
      </div>
    )
  } else return (
    <main>
      <div>
        <div>
          <h1>Welcome, {user.username}!</h1>
          <div className="default-notes">
            <div className="note-card">
              <p>Example Note</p>
              <p>Click the plus to make a note!</p>
            </div>
            {defaultNotes?.map(note => (
              <div key={note.id} className="note-card">
                <p>{note.title}</p>
                <p>{note.content}</p>
              </div>
            ))}
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
    </main>
  )
}


export default Home;
