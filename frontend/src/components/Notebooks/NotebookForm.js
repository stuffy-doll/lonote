import './NotebookForm.css';
const { useState, useEffect } = require("react");
const { useDispatch, useSelector } = require("react-redux");
const { useHistory } = require("react-router-dom");
const { createNotebook } = require("../../store/notebook");

const NotebookForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const sessionUserId = useSelector(state => state.session.user.id)

  useEffect(() => {
    const errors = [];
    if (!name.length) errors.push('Notebook must have a name!');
    if (name.length > 50) errors.push('That name is too long! (50 character max)');
    setValidationErrors(errors);
  }, [name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (validationErrors.length) return alert('Something went wrong');
    const payload = {
      name,
      userId: sessionUserId,
    }
    const res = await dispatch(createNotebook(payload));
    console.log(res)
    if (res) {
      history.push(`/notebooks/${res.id}`);
      setName('');
      setSubmitted(false);
    };
  };
  return (
    <div>
      {submitted && validationErrors.length > 0 && (
        <div>
          <ul className="errors">
            {validationErrors.map(error => (
              <li className="val-error" key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <form className="notebook-form" onSubmit={handleSubmit}>
        <input className="form-name"
          type="text"
          placeholder="Create a New Notebook"
          required
          value={name}
          onChange={e => setName(e.target.value)} />
        <button className="notebook-add" type="submit">+</button>
      </form>
    </div>
  )
}

export default NotebookForm;
