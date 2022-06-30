import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateNote } from "../../store/note";

const EditNote = ({ note }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [showForm, setShowForm] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    if (!showForm) {
      setShowForm(true);
    } else {
      setShowForm(false);
    };
  };

  const handleClear = (e) => {
    e.preventDefault();
    setContent('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      id: note.id,
      userId: note.userId,
      notebookId: note.notebookId,
      title,
      content
    };
    const res = await dispatch(updateNote(payload));
    if (res) {
      setShowForm(false);
    }
  };

  return (
    <div className="edit-form-container">
      <button onClick={handleClick}>Edit Note</button>
      {showForm && (
        <form className="edit-note-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <button onClick={handleClear}>Clear Note</button>
          <button>Save Changes</button>
        </form>
      )}
    </div>
  )
};

export default EditNote;
