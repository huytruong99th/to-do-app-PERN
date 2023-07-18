import { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem"
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const userEmail = cookies.Email
  const authToken = cookies.AuthToken
  const [ tasks, setTasks ] = useState(null)

  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
      const jsonData = await response.json()
      setTasks(jsonData)
    } catch(err) {
      console.error(err)
    }
  };

  useEffect( () => {
    if (authToken) {
      getData()
    }
  }, [authToken]);

  console.log(tasks)

  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="app">
      { !authToken && <Auth />}
      { authToken &&
        <>
        <ListHeader listName={'💻 Coding To Do List'} getData={getData} />
        {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData}/>)}
        </>
      }
    
    </div>
  );
}

export default App;
