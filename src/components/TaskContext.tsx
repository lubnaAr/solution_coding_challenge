import React, { createContext, useState } from 'react';
import { Task } from '../types';


const TaskContext = createContext({
  tasks: [],
  addTask: (task: Task) => {},
  removeTask: (id: number) => {},
  updateTask: (task: Task) => {}
});


export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  console.log("TaskProvider rendered"); 

  const addTask = (task: Task) => {
    console.log(" Task added",task);
    setTasks([...tasks, task]);
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;