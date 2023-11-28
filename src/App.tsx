import { FC, useState } from 'react';
import { AddTodo } from '../components/AddTodo/AddTodo';
import { ShowTodos } from '../components/ShowTodo/ShowTodos';

import './style.css';

interface Task {
  id: number;
  name: string;
  priority: string;
  status: string;
  startDate?: string;
  endDate?: string;
}

export const App: FC<{}> = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      name: 'Dummy',
      priority: 'High',
      status: 'To do',
      startDate: '11/27/2023',
      endDate: '11/28/2023',
    },
  ]);
  // const storedTasks = localStorage.getItem('tasks');
  // if (storedTasks != null) {
  //   console.log(storedTasks);
  //   // setTasks(JSON.parse(storedTasks));
  // } else {
  //   setTasks([
  //     {
  //       id: 1,
  //       name: 'Dummy',
  //       priority: 'High',
  //       status: 'To do',
  //       startDate: '11/27/2023',
  //       endDate: '11/28/2023',
  //     },
  //   ]);
  // }

  const addTask = (
    name: string,
    priority: string,
    startDate: string,
    endDate: string
  ) => {
    const newTask: Task = {
      id: tasks.length + 1,
      name,
      priority,
      status: 'To do',
      startDate: startDate,
      endDate: endDate,
    };
    setTasks([...tasks, newTask]);
    // setTimeout(() => {
    //   localStorage.setItem('tasks', JSON.stringify(tasks));
    //   console.log(tasks);
    // }, 3000);
  };

  const RemoveTask = (item) => {
    const Newtasks = tasks.filter((t) => t.id != item.id);
    setTasks(Newtasks);
  };
  const handleEditTask = (item) => {
    const edtask = tasks.filter((t) => t.id === item.id);
    edtask[0].name = item.name;
    edtask[0].priority = item.priority;
    edtask[0].startDate = item.startDate;
    edtask[0].endDate = item.endDate;
    edtask[0].status = item.status;
    // edtask[0].name=item.name;
    // console.log(edtask)
  };

  return (
    <div>
      <span className="taskHeader">Task List</span>
      <AddTodo addTask={addTask} />
      <ShowTodos
        tasks={tasks}
        RemoveTask={RemoveTask}
        handleEditTask={handleEditTask}
      />
    </div>
  );
};
