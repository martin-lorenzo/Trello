import React, { useState } from 'react';
import styles from './Task.module.css';

function Task(props) {

  const [originalListType, setOriginalListType] = useState(props.listType);

  function getPriorityClass(priority) {
    switch (priority) {
      case 'low':
        return styles.lowPriority;
      case 'normal':
        return styles.normalPriority;
      case 'high':
        return styles.highPriority;
      default:
        return '';
    }
  }

  const priorityClass = getPriorityClass(props.priority);

  function handleMoveSelect(event) {
    const selectedListType = event.target.value;
    const updatedTask = {
      ...props,
      listType: selectedListType,
    };
    props.onMove(props.taskId, updatedTask, originalListType, selectedListType); // Pass originalListType as source list
    setOriginalListType(selectedListType); // Update the original list type to the new value
  }
  

  return (
    <div className={`${styles.task} ${priorityClass}`}>
      <p className={styles.author}>{props.author}</p>
      <p className={styles.text}>{props.body}</p>
      <p className={styles.priority}>{props.priority}</p>
      <div className={styles.dropdown}>
        <select value={props.listType} onChange={handleMoveSelect}>
          <option value="todo">To Do</option>
          <option value="inProgress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  );
}

export default Task;
