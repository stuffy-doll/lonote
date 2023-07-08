import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateSticky } from "../../store/sticky";

const Sticky = ({ sticky }) => {
  const dispatch = useDispatch();

  const [writeSticky, setWriteSticky] = useState(false);
  const [content, setContent] = useState("")

  console.log(sticky);

  useEffect(() => {

  }, [sticky])

  const handleSticky = () => {
    setWriteSticky(true);
    setContent(sticky.content);
  }

  return (
    <div className="sticky-view">
      {!sticky && (
        <h1>Loading</h1>
      )}
      <p className="sticky-title">Sticky Note</p>
      {!writeSticky && !sticky.content && (
        <p onClick={handleSticky} className="sticky-contents">Write a sticky note...</p>
      )}
      {!writeSticky && sticky?.content && (
        <p onClick={handleSticky} className="sticky-contents">{sticky?.content}</p>
      )}
      {writeSticky && (
        <form className="write-sticky" onSubmit={async (e) => {
          e.preventDefault();
          const payload = {
            id: sticky.id,
            content: content
          };
          const res = await dispatch(updateSticky(payload))
          if (res) {
            setWriteSticky(false);
          }
        }}>
          <textarea placeholder="Write a sticky note..." value={content} onChange={(e) => setContent(e.target.value)} />
          <button type="Submit">Save</button>
        </form>
      )}
    </div>
  )
}

export default Sticky;
