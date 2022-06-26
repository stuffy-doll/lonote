import { getNotebooks } from "../../store/notebook";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Notebooks = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.notebooks);
  useEffect(() => {
    dispatch(getNotebooks(1))
  }, [dispatch]);

  const notebooks = Object.values(data);

  if (!notebooks) {
    return null;
  }

  return (
    <div>
      {notebooks.map(notebook => (
        <div key={notebook.id} className="notebook-card">
          {notebook.name}
        </div>
      ))}
    </div>
  )
}

export default Notebooks;
