import { useSelector } from "react-redux";

// ToDo: Render a user Home page
const Home = () => {
  const user = useSelector(state => state.session.user)

  if (user) {
    return (
      <main>
        <h1>Welcome, {user.username}!</h1>
        <div className="get-started">
          <p>Let's get started...</p>
          <button>Make a note!</button>
        </div>
      </main>
    )
  } else {
    return (
      <h1>Welcome to Lo/Note</h1>
    )
  }
}

export default Home;
