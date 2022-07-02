import './NoteForm.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createNote } from "../../store/note";

const NoteForm = ({ notebook }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUserId = useSelector(state => state.session.user.id);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [valErrors, setValErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const updateTitle = (e) => setTitle(e.target.value);

  useEffect(() => {
    const errors = [];
    if (!title.length) errors.push('Note must have a title.');
    if (title.length > 50) errors.push('Title too long (Character max 50).')
    setValErrors(errors);
  }, [title])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const payload = {
      userId: sessionUserId,
      notebookId: notebook,
      title,
      content
    }
    const res = await dispatch(createNote(payload));
    if (res) {
      history.push(`/notebooks/${notebook}`);
      setTitle('');
      setContent('');
      setSubmitted(false);
    }
  }

  return (
    <div className="note-form">
      {submitted && valErrors.length > 0 && (
        <ul className='errors'>
          {valErrors.map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          required
          placeholder='Title'
          onChange={updateTitle}
          value={title}
        />
        <textarea
          placeholder='Your Notes Here'
          onChange={e => setContent(e.target.value)}
          value={content}
        />
        <button type='submit'>Make a note!</button>
      </form>
    </div>
  );
};

export default NoteForm;
