
import React from 'react';
import shortid from 'shortid';


function App() {

  const [tarea, setTarea] = React.useState('');
  const [tareas, setTareas] = React.useState([]);
  const [modoEdicion, setModoEdicion] = React.useState(false);
  const [id, setId] = React.useState('');
  const [error, setError] = React.useState(null);

  const agregarTarea = e => {
    e.preventDefault()
    if(!tarea.trim()){
      console.log('Empty')
      setError("Write something...")
      return
    }
    console.log(tarea)

    setTareas([
      ...tareas,
      {id: shortid.generate(), nombreTarea:tarea}
    ])

    setTarea('')
    setError(null)
  }

  const eliminarTarea = (id) => {
    const arrayFiltro = tareas.filter(item => item.id !== id)
    setTareas(arrayFiltro);
  }

  const editar = (item) => {
    setModoEdicion(true);
    setTarea(item.nombreTarea)
    setId(item.id)
  }

  const editarTarea = (e) => {
    e.preventDefault()
    if(!tarea.trim()){
     console.log('Empty')
     setError("Write something...")
     return
    }

    const arrayEditado = tareas.map((item) => item.id === id ? {id , nombreTarea:tarea} : item )  

    setTareas(arrayEditado)
    setModoEdicion(false)
    setTarea('')
    setId('')
    setError(null)
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">Crud Sample</h1>
      <hr/>
      <div className = "row"> 
        <div className="col-8">
          <h4 className="text-center">Task List</h4>
            <ul className="list-group">
              {

                tareas.length === 0 ? (
                <li className="list-group-item">
                  No Taks Added
                </li>
                ) : (
              tareas.map(item =>(  
              <li className="list-group-item" key={item.id}>
                <span className="lead">{item.nombreTarea}</span>
                <button className="btn btn-danger bnt-sm float-right mx-2"
                onClick={()=> eliminarTarea(item.id)}
                >Delete</button>
                <button className="btn btn-warning bnt-sm float-right"
                onClick={()=> editar(item)}
                >Edit</button>
              </li>
              ))
              )
              }
            </ul>
        </div>
        <div className= "col4">
        <h4 className="text-center">
          {
          modoEdicion ? "Edit Task" : "Insert Task" 
          }
        </h4>
        <form onSubmit={ modoEdicion ?  editarTarea : agregarTarea}>
        
          {
            error ? <span className="text-danger">{error}</span> :
            null
          }  

          <input
          type="text"
          className="form-control mb-2"
          placeholder="Write task"
          //de esta forma relacionamos el input con el estado
          onChange={ e => setTarea(e.target.value) }
          value={tarea}
          />
          {
            modoEdicion ? (<button className="bnt bnt-warning btn-block" type="submit">
            Edit Task</button>) : (<button className="bnt bnt-dark btn-block" type="submit">
            Submit Task</button>)
          }

        </form>
        </div>
      </div>  
    </div>
  );
}

export default App;
