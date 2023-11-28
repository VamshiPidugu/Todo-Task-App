import React, { useState } from 'react';
import './style.css';
import deleteIcon from '../../public/assets/delete.svg';
import editIcon from '../../public/assets/edit.svg';
import MyModal from '../Modal/Modal';
// Importing toastify module
import { ToastContainer, toast } from 'react-toastify';
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

interface Task {
  id: number;
  name: string;
  priority: string;
  status: string;
  startDate?: string;
  endDate?: string;
}

export const ShowTodos = ({ tasks, RemoveTask, handleEditTask }) => {
  const [showModal, setShowModal] = useState(false);
  const [showEdModal, setEdShowModal] = useState(false);
  const [item, setItem] = useState([]);
  const [editedtask, setEditedTask] = useState<Task[]>([]);
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('');
  const [highPriority, setHighPriority] = useState(false);
  const [mediumPriority, setMediumPriority] = useState(false);
  const [lowPriority, setLowPriority] = useState(false);
  const [startDate, setstartDate] = useState('');
  const [endDate, setendDate] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const handleOpenModal = (item) => {
    setItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setItem([]);
    setShowModal(false); //make false of delete modal
    setEdShowModal(false); //make false of edit modal
  };

  //Remove Task
  const handleSaveChanges = () => {
    RemoveTask(item);
    handleCloseModal();
    toast('Task Deleted Sucessfully');
  };

  //Edit

  const editOpenModel = (item) => {
    setItem(item);
    setEdShowModal(true);
    setTaskStatus(item.status);
    setTask(item.name);
    setstartDate(item.startDate);
    setendDate(item.endDate);
    AssignPriority(item.priority);
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
  const handleEditChnages = () => {
    // console.log(item);
    const newTask: Task = {
      id: item['id'],
      name: task,
      priority: priority,
      status: taskStatus,
      startDate: startDate,
      endDate: endDate,
    };
    setEditedTask([newTask]);
    handleEditTask(newTask);
    // setEditedTask([
    //   {
    //     id: item['id'],
    //     name: task,
    //     priority: priority,
    //     status: 'To do',
    //   },
    // ]);
    handleCloseModal();
    toast('Task Updated Sucessfully');
  };

  const EditBody = (
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
      <div className="taskStatus mt-3 mb-1">
        <label htmlFor="inputPassword5" className="form-label">
          Task Status
        </label>
        <div className="dropdown-center">
          <button
            className="btn btn-info dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {taskStatus}
          </button>
          <ul className="dropdown-menu">
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => setTaskStatus('To do')}
              >
                To do
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => setTaskStatus('In Progress')}
              >
                In Progress
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => setTaskStatus('Completed')}
              >
                Completed
              </a>
            </li>
          </ul>
        </div>
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
    <>
      <ToastContainer />
      <div className="todos-box">
        {tasks.map((item, index) => {
          return (
            <div key={index} className="todo-container ">
              <div className="taskname">
                <h5 className="taskheader">Task</h5>
                <span className="value">{item.name}</span>
              </div>
              <div className="priorityText">
                <h5 className="taskheader">Priority</h5>
                <span className={`${item.priority}`}>{item.priority}</span>
              </div>
              <div className="taskStatus">
                <h5 className="taskheader">Status</h5>
                <span className="taskstatusIndictor">{item.status}</span>
              </div>
              <div className="dateDisplay">
                <h5 className="taskheader">StartDate</h5>
                <span className="">{item.startDate}</span>
              </div>
              <div className="dateDisplay">
                <h5 className="taskheader">EndDate</h5>
                <span className="">{item.endDate}</span>
              </div>
              <div className="editTodo">
                <button className="edtbtn">
                  <img
                    className="editicon"
                    src={editIcon}
                    onClick={() => editOpenModel(item)}
                  />
                </button>
              </div>
              <div className="deleteTodo">
                <button className="dltbtn">
                  <img
                    className="deleteicon"
                    src={deleteIcon}
                    onClick={() => handleOpenModal(item)}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <MyModal
        show={showModal}
        onHide={handleCloseModal}
        title="Delete Task"
        body="Are you sure you Want to Delete The Task"
        onClose={handleCloseModal}
        onSave={handleSaveChanges}
      />
      <MyModal
        show={showEdModal}
        onHide={handleCloseModal}
        title="Edit Task"
        body={EditBody}
        onClose={handleCloseModal}
        onSave={handleEditChnages}
      />
    </>
  );
};
