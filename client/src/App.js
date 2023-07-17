import { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem"

function App() {
  const [ tasks, setTasks ] = useState(null)
  const userEmail = 'huytruong99th@outlook.com'

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`)
      const jsonData = await response.json()
      setTasks(jsonData)
    } catch(err) {
      console.error(err)
    }
  };

  useEffect( () => getData, []);

  console.log(tasks)

  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="app">
      <ListHeader listName={'💻 Coding To Do List'} getData={getData} />
      {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData}/>)}
    </div>
  );
}

export default App;
