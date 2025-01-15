import React, {useContext, useState } from 'react';
import { Task } from '../types';
import { Button, List, ListItem, ListItemText, Box, Typography } from '@mui/material';
import TaskContext from './TaskContext';
import DeleteTask from './DeleteTask';
import EditTask from './EditTask';


const TaskList = () => {
  const { tasks, updateTask, removeTask } = useContext(TaskContext);
  const [deleteTask, setDeleteTask] = useState<{ id: number; name: string } | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [editTask, setEditTask] = useState<{ id: number; name: string; priority: 'High' | 'Medium' | 'Low' } | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const getNextState = (currentState: Task['state']): Task['state'] => {
    if (currentState === 'To Do') return 'In Progress';
    if (currentState === 'In Progress') return 'Done';
    return 'To Do';
  };

  const handleStateChange = (task: Task) => {
    const nextState = getNextState(task.state);
    if (nextState === 'Done') {
      removeTask(task.id);
    } else {
      updateTask({ ...task, state: nextState });
    }
  };

  const handleOpenEditModal = (task: Task) => {
    setEditTask(task);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditTask(null);
    setEditModalOpen(false);
  };

  const handleOpenDeleteModal = (taskId: number, taskName: string) => {
    setDeleteTask({ id: taskId, name: taskName });
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteTask(null);
    setDeleteModalOpen(false);
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { High: 3, Medium: 2, Low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  if (sortedTasks.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <Typography variant="h6"> All Done !</Typography>
      </Box>
    );
  }

  return (
    <Box>
    <List>
      {sortedTasks.map((task) => (
        <ListItem 
          key={task.id}
          sx={{
            gap: '16px',
          }}
        >
          <ListItemText primary={task.name} secondary={`Priority: ${task.priority}, State: ${task.state}`} />
          <Box sx={{ display: 'flex', gap: '8px' }}>
          <Button
                variant="contained"
                color="info"
                onClick={() => handleStateChange(task)}
              >
                Move to {getNextState(task.state)}
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpenEditModal(task)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleOpenDeleteModal(task.id, task.name)}
              >
                Delete
              </Button>
            </Box>
        </ListItem>
      ))}
    </List>
    {editTask && (
        <EditTask
          taskId={editTask.id}
          taskName={editTask.name}
          taskPriority={editTask.priority}
          open={editModalOpen}
          onClose={handleCloseEditModal}
        />
      )}
      {deleteTask && (
        <DeleteTask
          taskId={deleteTask.id}
          taskName={deleteTask.name}
          open={deleteModalOpen}
          onClose={handleCloseDeleteModal}
        />
      )}
    </Box>
  );
}

export default TaskList;