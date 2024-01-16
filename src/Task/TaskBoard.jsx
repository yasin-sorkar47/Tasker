import { useState } from "react";
import NoDataFound from "./NoDataFound";
import Search from "./Search";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";
import TaskModel from "./TaskModel";

export default function TaskBoard() {
  let [tasks, setTasks] = useState([]);
  let [showTaskModel, setTaskModel] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  function handleAddEditTask(newTask, isAdd) {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          } else {
            return task;
          }
        })
      );
    }
    setTaskModel(false);
  }

  function handleEdit(task) {
    setTaskToUpdate(task);
    setTaskModel(true);
  }

  function handleCloseClick() {
    setTaskModel(false);
    setTaskToUpdate(null);
  }

  function handleDeleteListItem(taskId) {
    let afterDeleteArray = tasks.filter((task) => task.id !== taskId);
    setTasks(afterDeleteArray);
  }

  function handleDeleAllListItem() {
    tasks.length = 0;
    setTasks([...tasks]);
  }

  function handleFav(taskId) {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    const newTask = [...tasks];
    newTask[taskIndex].isFavorite = !newTask[taskIndex].isFavorite;

    setTasks(newTask);
  }

  function handleSearch(searchTram) {
    let filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTram.toLowerCase())
    );
    setTasks([...filtered]);
  }

  return (
    <>
      {showTaskModel && (
        <TaskModel
          onSave={handleAddEditTask}
          taskToUpdate={taskToUpdate}
          handleCloseClick={handleCloseClick}
        />
      )}
      <section className="mb-20" id="tasks">
        <div className="container">
          <div className="p-2 flex justify-end">
            <Search onSearch={handleSearch} />
          </div>
          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <TaskAction
              onAddClick={() => setTaskModel(true)}
              onDeleAllListItem={handleDeleAllListItem}
            />
            {tasks.length > 0 ? (
              <TaskList
                tasks={tasks}
                onEdit={handleEdit}
                onDeleteListItem={handleDeleteListItem}
                onFav={handleFav}
              />
            ) : (
              <NoDataFound />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
