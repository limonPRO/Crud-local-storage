import React, { useState, useEffect } from "react";

function Todo() {
  //   const data = [{ name: "test1" }, { name: "test2" }];

  const [title, setTitle] = useState();
  const [todos, setTodos] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title) {
      const newTodos = { id: new Date().getTime().toString(), title: title };
      setTodos([...todos, newTodos]);
      localStorage.setItem("localItems", JSON.stringify([...todos, newTodos]));
      setTitle("");
    }
  };
  const handleDelete = (title)=>{
    const deleted = todos.filter((t)=>t.id !== title);
    setTodos(deleted);
    localStorage.setItem("localItems", JSON.stringify(deleted))
}

//   useEffect(() => {
//     if (localStorage.getItem("localItems")) {
//       const localtodos = JSON.parse(localStorage.getItem("localItems"));
//       setTodos(localtodos);
//     }
//   }, []);

//   const listItems = todos.map((d) => (
//     <li key={d.id}>
//       {d.title} <button>edit</button>{" "}
//       <button onClick={()=>handleDelete(title)}>delete</button>
//     </li>
//   ));

  return (
    <div>
      <h2>Todo List</h2>
      <hr />
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit">add todo</button>
        </form>
      </div>
     {todos.map((d) => (
    <li key={d.id}>
      {d.title} <button>edit</button>
      <button  onClick ={()=> handleDelete(title)}>delete</button>
    </li>
  ))}
      {!todos.length ? null : (
        <div>
          <button>delete all</button>
        </div>
      )}
    </div>
  );
}

export default Todo;
