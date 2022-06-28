const { useEffect, useState } = require("react");
const { useDispatch, useSelector } = require("react-redux");
const { useHistory } = require("react-router-dom");
const { createNotebook } = require("../../store/notebook");

const NotebookForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState('');

  const sessionUserId = useSelector(state => state.session.user.id)
  useEffect(() => {
    // Todo
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name,
      userId: sessionUserId,
    }
    const res = await dispatch(createNotebook(payload));
    if (res) {
      history.push(`/notebooks`);
      setName('');
    };
  };
  return (
    <div>
      <form className="notebook-form" onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Create a New Notebook'
          required
          value={name}
          onChange={e => setName(e.target.value)} />
        <button type="submit">+</button>
      </form>
    </div>
  )
}

export default NotebookForm;
