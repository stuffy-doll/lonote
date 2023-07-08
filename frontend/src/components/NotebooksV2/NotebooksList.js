import { Link } from "react-router-dom";

const NotebooksList = ({ notebooks }) => {
  return (
    <div className="notebooks-list-view">
      {notebooks.map((notebook, idx) => (
        <div className="notebook-picker" key={idx}>
          <Link className="notebook-list-link" to={`/my-notebooks/${notebook.id}`}>{notebook.name}</Link>
        </div>
      ))}
    </div>
  )
}

export default NotebooksList;
