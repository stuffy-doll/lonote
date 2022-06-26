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
      <ul>
        {notebooks.map(notebook => (
          <li key={notebook.id}>{notebook.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Notebooks;
