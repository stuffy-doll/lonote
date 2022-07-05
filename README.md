![lonote-logo](https://user-images.githubusercontent.com/97128550/176982778-61122a5d-3160-4a22-aa10-beebbcdc8403.png)

## Lo/Note is a clone of Evernote that lets users take short and sweet notes they can keep right on their home page or organized in custom notebooks.

## Technologies Used

- React.js
- Redux
- Express
- PostgreSQL
- Heroku

### [Lo/Note Wiki](https://github.com/stuffy-doll/lonote/wiki)

You can find the feature list, API routes, database schema and more in the wiki!

### [Live Link](https://lonote.herokuapp.com/)

### Splash Page

![lonote-splash](https://user-images.githubusercontent.com/97128550/176983263-89dc752f-be54-4aa8-bf5b-0db700cae3f7.png)

### User Home Page

![lonote-user-home](https://user-images.githubusercontent.com/97128550/176983264-3a40834b-15af-49f2-92a9-5553aa6cbd83.png)

### User Notebooks Page
![lonote-notebooks](https://user-images.githubusercontent.com/97128550/176984506-d4b2deb5-8d17-40e1-95df-b7b17de99433.png)

## Current Features

- A default notebook will be given to each new user
- Users can create, update and delete notes
- Creation of custom notebooks that can also be deleted

## Technical Implementation

This is my first solo project and it was not short of it's challenges. I had to stop and think about a lot of different things, like how I would set up my backend routes, and what my database needed to make things run smoothly. And on the frontend I needed to work out what components I needed to make this small project come together into something that feels somewhat complete.

Redux was a particularly difficult aspect to overcome during this project. I ran into many difficulties hydrating my state, particularly on the Home page. My code was written in such a way that prevented my page from re-rendering when a change was made. The backend wasn't throwing any fits, eventually the problem became clear to me and I knew what I had to do to fix it. It was refreshing to have a better understanding of how all these pieces fit together and interact.

Another particularly difficult challenge was figuring out how to prevent users from visiting notebooks they've deleted and notebooks that they have no access to. I figured that if I were to filter the IDs of the notebooks a user currently posesses, and checked them against the current params id, I could conditionally
render a 404 page, effectively killing two birds with one stone.

```
const NoteList = ({ notebooks }) => {
  const notebookId = useParams().notebookId;
  const dispatch = useDispatch();
  const sessionUserId = useSelector(state => state.session.user.id);
  const notebookList = notebooks.map(notebook => notebook.id);
  const notes = useSelector(state => Object.values(state.notes).filter(note => note.notebookId === +notebookId));

  useEffect(() => {
    dispatch(getNotes(sessionUserId))
  }, [dispatch, sessionUserId]);

  if (!notebookList.includes(+notebookId)) {
    return (
      <NotFound />
    )
```

## Future Features

I hope to continue working on this project and add features that I really wanted, but had no time to implement them before the project deadline. These features include...

- Task lists
- Rich text editing on notes
- A "scratch pad" that keeps it's value until a user clears it or saves it as a simple note
- Note themes
- Editable names on Notebooks
- Tags

This list will always be changing in the future when I have time for the project between school and seeking work. But I will always be proud of the progress I've made that enabled me to create something like this.
