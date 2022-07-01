import './NoteForm.css'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createNote } from "../../store/note";

const NoteForm = ({ notebook }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUserId = useSelector(state => state.session.user.id);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const updateTitle = (e) => setTitle(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    }
  }

  return (
    <>
      <h3>Make a Note</h3>
      <div className="note-form">
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
    </>
  );
};

export default NoteForm;
