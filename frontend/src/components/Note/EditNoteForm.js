import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateNote } from "../../store/note";

const EditNote = ({ note }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [showForm, setShowForm] = useState(false);
  const [validationErrors, setValidationErrors] = useState([])
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = [];
    if (!title.length) errors.push('Note must have a title!');
    if (title.length > 50) errors.push('That title is too long! (50 character max)');
    setValidationErrors(errors);
  }, [title]);

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
    setHasSubmitted(true);
    if (validationErrors.length) return alert("Something went wrong.")
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
      {hasSubmitted && validationErrors.length > 0 && (
        <div>
          <ul>
            {validationErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
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
