import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { getNotebooks } from "../../store/notebook";
import NotebooksList from "./NotebooksList";
import NotebookView from "./NotebookView";

const NotebookSplash = () => {
  const dispatch = useDispatch();

  const userId = useSelector(state => state.session.user.id);
  const notebooks = useSelector(state => Object.values(state.notebooks));

  useEffect(() => {
    dispatch(getNotebooks(userId));
  }, [dispatch, userId]);

  return (
    <div className="notebooks-splash">
      <NotebooksList notebooks={notebooks} />
      <Route path='/my-notebooks/:notebookId' exact={true}>
        <NotebookView notebooks={notebooks} />
      </Route>
    </div>
  )
}

export default NotebookSplash;
