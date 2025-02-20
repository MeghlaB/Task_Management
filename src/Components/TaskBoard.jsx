import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const API_URL = "http://localhost:5000/tasks";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "To-Do",
  });

  useEffect(() => {
    axios.get(API_URL).then((res) => setTasks(res?.data));
  }, []);

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return toast.error("Title is required!");
    if (newTask.title.length > 50) return toast.error("Title too long!");

    try {
      await axios.post(API_URL, newTask);
      const res = await axios.get(API_URL); ``
      setTasks(res.data);
      setShowForm(false);
      setNewTask({ title: "", description: "", category: "To-Do" });
    } catch (error) {
      console.error("Error submitting task:", error);
      toast.error("Failed to add task!");
    }
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTasks(tasks.filter((task) => task._id !== id));
    toast.success("Task deleted!");
  };

  const updateTask = async (id, updatedData) => {
    const res = await axios.put(`${API_URL}/${id}`, updatedData);
    setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const task = tasks.find((t) => t._id === result.draggableId);
      updateTask(task._id, { ...task, category: destination.droppableId });
    } else {
      const updatedTasks = [...tasks];
      const [movedTask] = updatedTasks.splice(source.index, 1);
      updatedTasks.splice(destination.index, 0, movedTask);
      setTasks(updatedTasks);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
      <Toaster />
      <h1 className="text-3xl font-bold">Task Manager</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded my-4"
        onClick={() => setShowForm(true)}
      >
        Add Task
      </button>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className=" p-5 rounded shadow-lg w-96 bg-gray-600">
            <h2 className="text-xl mb-3">Add New Task</h2>
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="title"
                value={newTask.title}
                onChange={handleInputChange}
                placeholder="Task Title"
                required
                className="border-2 p-2 rounded w-full"
              />
              <textarea
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
                placeholder="Task Description"
                className="border-2  p-2 rounded w-full "
              />
              <select
                name="category"
                value={newTask.category}
                onChange={handleInputChange}
                className="border p-2 rounded bg-sky-100 text-black"
              >
                <option value="To-Do">To-Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-3 gap-4 w-full max-w-4xl text-black">
          {["To-Do", "In Progress", "Done"].map((category) => (
            <Droppable key={category} droppableId={category}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-white p-4 shadow rounded-lg min-h-[200px]"
                >
                  <h2 className="text-lg font-semibold mb-2">{category}</h2>
                  {tasks
                    .filter((task) => task.category === category)
                    .map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className="bg-green-300 p-3 rounded-md flex justify-between items-center my-2"
                          >
                            <p>{task.title}</p>
                            <div>
                              <p className="text-xs text-gray-500">
                                {new Date(task.createdAt).toLocaleString()}
                              </p>
                            </div>
                            <button
                              onClick={() => deleteTask(task._id)}
                              className="text-red-500"
                            >
                              ✖
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;
