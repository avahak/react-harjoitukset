import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddTodo from './AddTodo';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function Todo() {
  const [todos, setTodos] = useState([]);

  const columnDefs: ColDef[] = [
    { field: 'description', sortable: true, filter: true},
    { field: 'date', sortable: true, filter: true},
    { field: 'priority', sortable: true, filter: true},
    { 
      headerName: '',
      field: 'id',
      width: 90,
      cellRenderer: (params: any) => 
      <IconButton onClick={() => deleteTodo(params.value)} size="small" color="error">
        <DeleteIcon />
      </IconButton> 
    }
  ]

  useEffect(() => {
    fetchItems();
  }, [])

  const fetchItems = () => {
    fetch('https://todolist-3d03b-default-rtdb.europe-west1.firebasedatabase.app/items/.json')
    .then((response: any) => response.json())
    .then((data: any) => addKeys(data))
    .catch((err: any) => console.error(err))
  }

  // Add keys to the todo objects
  const addKeys = (data: any) => {
    const keys = Object.keys(data);
    const valueKeys = Object.values(data).map((item, index) => 
    Object.defineProperty(item, 'id', {value: keys[index]}));
    setTodos(valueKeys as any);
  }
   
  const addTodo = (newTodo: any) => {
    fetch('https://todolist-3d03b-default-rtdb.europe-west1.firebasedatabase.app/items/.json',
    {
      method: 'POST',
      body: JSON.stringify(newTodo)
    })
    .then(_response => fetchItems())
    .catch(err => console.error(err))
  }

  const deleteTodo = (id: number) => {
    fetch(`https://todolist-3d03b-default-rtdb.europe-west1.firebasedatabase.app/items/${id}.json`,
    {
      method: 'DELETE',
    })
    .then(_response => fetchItems())
    .catch(err => console.error(err))
  }

  return (
    <div style={{ display: "block" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">
            TodoList
          </Typography>
        </Toolbar>
      </AppBar> 
      <AddTodo addTodo={addTodo} />
      <div className="ag-theme-material" style={{ height: 400, width: 700 }}>
        <AgGridReact 
          rowData={todos}
          columnDefs={columnDefs}
        />
      </div>
    </div>
  );
}

export default Todo;