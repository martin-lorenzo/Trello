import { useState } from 'react';
import React from 'react';
import classes from './NewTask.module.css';

function NewTask(props) {
  const [enteredBody, setEnteredBody] = useState('');
  const [enteredAuthor, setEnteredAuthor] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedList, setSelectedList] = useState('');

  function handlePriorityChange(event) {
    const priority = event.target.value;
    setSelectedPriority(priority);
  }

  function handleListChange(event) {
    const list = event.target.value;
    setSelectedList(list);
  }

  function bodyChangeHandler(event) {
    setEnteredBody(event.target.value);
  }

  function authorChangeHandler(event) {
    setEnteredAuthor(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const taskData = {
      body: enteredBody,
      author: enteredAuthor,
      priority: selectedPriority,
      listType: selectedList,
    };
    props.onSubmit(taskData);
    props.onCancel();
  }

  function handleCancel(event) {
    event.preventDefault();
    props.onCancel();
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <p>
        <label htmlFor="body">Text</label>
        <textarea id="body" required rows={3} onChange={bodyChangeHandler} />
      </p>
      <p>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" required onChange={authorChangeHandler} />
      </p>
      <label htmlFor="priority">Priority</label>
      <select id="priority" required onChange={handlePriorityChange}>
        <option value="">--Select Priority--</option>
        <option value="low">Low</option>
        <option value="normal">Normal</option>
        <option value="high">High</option>
      </select>
      <label htmlFor="list">List</label>
      <select id="list" required onChange={handleListChange}>
        <option value="">--Select List--</option>
        <option value="todo">To Do</option>
        <option value="inProgress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <div className={classes.actions}>
        <button type="button" onClick={handleCancel}>Cancel</button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default NewTask;
