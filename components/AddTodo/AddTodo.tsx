import React, { useState } from 'react';
import './style.css';
import addIcon from '../../public/assets/add';
import 'bootstrap/dist/css/bootstrap.css';
import MyModal from '../Modal/Modal';
import { Button, Modal } from 'react-bootstrap';
// Importing toastify module
import { ToastContainer, toast } from 'react-toastify';
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
export const AddTodo = ({ addTask }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('');
  const [highPriority, setHighPriority] = useState(false);
  const [mediumPriority, setMediumPriority] = useState(false);
  const [lowPriority, setLowPriority] = useState(false);
  const [startDate, setstartDate] = useState('');
  const [endDate, setendDate] = useState('');
  const handleClick = () => {
    setShowPopup(true);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTask('');
    setPriority('');
    setHighPriority(false);
    setMediumPriority(false);
    setLowPriority(false);
    setstartDate('');
    setendDate('');
  };

  const handleSaveChanges = () => {
    console.log(task, priority);
    if (
      task.length > 0 &&
      priority.length > 0 &&
      startDate.length > 0 &&
      endDate.length > 0
    ) {
      addTask(task, priority, startDate, endDate);
      toast('Task Added Succesfully');
      handleCloseModal();
    } else {
      toast('Please Fill the Task Feilds');
    }
  };

  const AssignPriority = (priority) => {
    setPriority(priority);
    if (priority === 'High') {
      setHighPriority(true);
      setMediumPriority(false);
      setLowPriority(false);
    } else if (priority === 'Medium') {
      setHighPriority(false);
      setMediumPriority(true);
      setLowPriority(false);
    } else if (priority === 'Low') {
      setHighPriority(false);
      setMediumPriority(false);
      setLowPriority(true);
    }
  };

  const AddTaskBody = (
    <div className="addTask">
      <div className="task">
        <label htmlFor="inputPassword5" className="form-label">
          Task
        </label>
        <div className="input-group input-group-sm mb-3 ">
          <input
            type="text"
            className="form-control"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            required
          />
        </div>
      </div>
      <label htmlFor="inputPassword5" className="form-label">
        Priority
      </label>
      <div className="priority">
        <button
          type="button"
          onClick={() => AssignPriority('High')}
          className={`btn ${
            highPriority ? ' btn-danger' : 'btn-outline-danger'
          }`}
        >
          High
        </button>
        <button
          type="button"
          onClick={() => AssignPriority('Medium')}
          className={`btn  ${
            mediumPriority ? 'btn-warning' : 'btn-outline-warning'
          }`}
        >
          Medium
        </button>
        <button
          type="button"
          onClick={() => AssignPriority('Low')}
          className={`btn  ${
            lowPriority ? 'btn-success' : 'btn-outline-success'
          }`}
        >
          Low
        </button>
      </div>
      <div className="custom-datepicker gap-1 mt-3">
        <label>Start Date</label>
        <input
          id="startDate"
          value={startDate}
          onChange={(e) => setstartDate(e.target.value)}
          className="form-control"
          type="date"
        />
        <label>End Date</label>
        <input
          id="startDate"
          value={endDate}
          onChange={(e) => setendDate(e.target.value)}
          className="form-control"
          type="date"
        />
      </div>
    </div>
  );

  return (
    <div>
      <ToastContainer />
      <div className="addTodos">
        {/* <h1>Add Todo</h1> */}
        <div className="addTodoBtn">
          <button className="addBtn" onClick={handleOpenModal} type="button">
            <img className="addIcon" src={addIcon} /> Add Task
            {/* <span className="btntext"></span> */}
          </button>
        </div>
      </div>
      {showPopup && <h1>s</h1>}
      <MyModal
        show={showModal}
        onHide={handleCloseModal}
        title="Add Task"
        body={AddTaskBody}
        onClose={handleCloseModal}
        onSave={handleSaveChanges}
      />
    </div>
  );
};
