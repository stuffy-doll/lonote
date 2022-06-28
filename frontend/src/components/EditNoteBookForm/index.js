import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { updateNotebook } from "../../store/notebook";

const EditNoteBook = () => {
  const notebookId = useParams();
  const dispatch = useDispatch();
  const notebooks = useSelector(state => Object.values(state.notebooks));
  const notebook = notebooks.find(notebook => notebookId === notebook.id);
  console.log(notebook);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState(notebook.name);

  // useEffect(() => {

  // });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      notebookId: notebook.id,
      name
    }
    const res = await dispatch(updateNotebook(payload))
    setShowForm(false);
  };

  return (
    <div>
      <button onClick={setShowForm(true)}>Edit Name</button>
      {showForm && (
        <section className="edit-form-holder centered middled">
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              required
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <button type='submit'>Update</button>
          </form>
        </section>
      )}
    </div>
  )
};

export default EditNoteBook;
