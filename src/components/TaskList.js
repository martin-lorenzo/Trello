import React, { useState, useEffect } from 'react';
import NewTask from './NewTask';
import styles from './TaskList.module.css';
import Modal from './Modal';
import Task from './Task';
import { getTasks, createTask, updateTask } from '../services/api';

function TaskList(props) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }

    fetchTasks();
  }, []);

  async function addTask(taskData) {
    try {
      const createdTask = await createTask(taskData);
      setTasks((prevTasks) => [...prevTasks, createdTask]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }

  async function moveTask(taskId, updatedTask, sourceListType, targetListType) {
    try {
      await updateTask(taskId, updatedTask);
      setTasks(tasks.map(task => (task._id === taskId ? updatedTask : task)));
    } catch (error) {
      console.error('Error moving task:', error);
    }
  }

  const modalContent = props.posting ? (
    <Modal onClose={props.stopPosting}>
      <NewTask onSubmit={addTask} onCancel={props.stopPosting} />
    </Modal>
  ) : null;

  const todoTasks = tasks.filter(task => task.listType === 'todo');
  const inProgressTasks = tasks.filter(task => task.listType === 'inProgress');
  const doneTasks = tasks.filter(task => task.listType === 'done');

  return (
    <>
      {modalContent}

      <div className={styles.taskLists}>
        <div className={styles.list}>
          <h2>To Do</h2>
          <ul className={styles.tasks}>
            {todoTasks.map((task) => (
              <Task
                key={task._id}
                {...task}
                taskId={task._id}
                listType="todo"
                onMove={moveTask}
              />
            ))}
          </ul>
        </div>

        <div className={styles.list}>
          <h2>In Progress</h2>
          <ul className={styles.tasks}>
            {inProgressTasks.map((task) => (
              <Task
                key={task._id}
                {...task}
                taskId={task._id}
                listType="inProgress"
                onMove={moveTask}
              />
            ))}
          </ul>
        </div>

        <div className={styles.list}>
          <h2>Done</h2>
          <ul className={styles.tasks}>
            {doneTasks.map((task) => (
              <Task
                key={task._id}
                {...task}
                taskId={task._id}
                listType="done"
                onMove={moveTask}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default TaskList;
