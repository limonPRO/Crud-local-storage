import React, { useState, useEffect } from "react";

export default function Tasks() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("localTasks")) {
      const storedList = JSON.parse(localStorage.getItem("localTasks"));
      setTasks(storedList);
    }
  }, []);

  const addTask = (e) => {
    if (task) {
      const newTask = { id: new Date().getTime().toString(), title: task };
      setTasks([...tasks, newTask]);
      localStorage.setItem("localTasks", JSON.stringify([...tasks, newTask]));
      setTask("");
    }
  };

  const handleDelete = (task) => {
    const deleted = tasks.filter((t) => t.id !== task.id);
    // console.log(deleted)
    setTasks(deleted);
    localStorage.setItem("localTasks", JSON.stringify(deleted));
  };
  // edit form
  const [editForm,setEditForm]=useState(false);

  // id state
  const [id, setId]=useState();
 
  const handleEdit=(task)=>{
    setEditForm(true);
    setId(task.id);
    // const selected = tasks.find((t)=>t.id===task.id)
    // console.log(selected)
     setTask(task.title)
  }

  const addEditTask=(e)=>{
    // console.log(id)
    const updated = {id:id, title:task}
    setTasks([...tasks, updated]);
    localStorage.setItem("localTasks", JSON.stringify([...tasks, updated]));
   
  }
  const handleClear = () => {
    setTasks([]);
    localStorage.removeItem("localTasks");
    
  };
  
  return (
    <div>
      <h1>To-Do App</h1>
      <div>
      {editForm===false&&(<div>
        <div>
        <input
          name="task"
          type="text"
          value={task}
          placeholder="Write your task..."
          onChange={(e) => setTask(e.target.value)}
        />
      </div>
      <div className="col-4">
        <button onClick={addTask}>add</button>
      </div>
      </div>)}
      {editForm===true&&(<div>
        <div>
        <input
          name="task"
          type="text"
          value={task}
          placeholder="Write your task..."
          onChange={(e) => setTask(e.target.value)}
        />
      </div>
      <div className="col-4">
        <button onClick={addEditTask}>update</button>
      </div>
      </div>)}
      
      
      </div>
      <div className="badge">
        You have
        {!tasks.length
          ? " no tasks"
          : tasks.length === 1
          ? " 1 task"
          : tasks.length > 1
          ? ` ${tasks.length} tasks`
          : null}
      </div>
      {tasks.map((task) => (
        <div key={task.id}>
          <div>
            <span>{task.title}</span>
          </div>
          <div>
            <button onClick={() => handleEdit(task)}>edit</button>
          </div>

          <div>
            <button onClick={() => handleDelete(task)}>delete</button>
          </div>
        </div>
      ))}
      {!tasks.length ? null : (
        <div>
          <button onClick={() => handleClear()}>Clear</button>
        </div>
      )}
    </div>
  );
}
