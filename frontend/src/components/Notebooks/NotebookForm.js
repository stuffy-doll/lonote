const { useEffect, useState } = require("react");
const { useDispatch, useSelector } = require("react-redux");
const { useHistory } = require("react-router-dom");
const { createNotebook } = require("../../store/notebook");

const NotebookForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState('');
  // const [showForm, setShowForm] = useState(false);

  const sessionUserId = useSelector(state => state.session.user.id)
  // console.log('sessionUserID::', sessionUserId);
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
      history.push('/notebooks');
      // setShowForm(false);
    }
  }
  return (
    <div>
      <form className="notebook-form" onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Notebook Name'
          required
          value={name}
          onChange={e => setName(e.target.value)} />
      </form>
      <button type="submit">+</button>
    </div>
  )
}

export default NotebookForm;
