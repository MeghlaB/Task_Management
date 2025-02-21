import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

// const API_URL = "http://localhost:5000/tasks";
const API_URL = "https://task-manager-backend-alpha-mocha.vercel.app/tasks";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "To-Do",
  });
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  
  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res?.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to load tasks!");
    }
  };

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return toast.error("Title is required!");
    if (newTask.title.length > 50) return toast.error("Title too long!");

    try {
      const addedTask = { ...newTask, _id: Date.now() };
      setTasks([...tasks, addedTask]);

      await axios.post(API_URL, newTask);

      fetchTasks();
      setShowForm(false);
      setNewTask({ title: "", description: "", category: "To-Do" });
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task!");
      fetchTasks();
    }
  };

  const deleteTask = async (id) => {
    const updatedTasks = tasks.filter((task) => task._id !== id);
    setTasks(updatedTasks);

    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success("Task deleted!");

      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task!");
      fetchTasks();
    }
  };

  const updateTask = async (id, updatedData) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedData);

      fetchTasks();
      toast.success("Task updated!");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task!");
    }
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

  const handleEditClick = (task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      description: task.description,
      category: task.category,
    });
    setShowForm(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return toast.error("Title is required!");
    if (newTask.title.length > 50) return toast.error("Title too long!");

    try {
      await updateTask(editingTask._id, newTask);
      setEditingTask(null);
      setNewTask({ title: "", description: "", category: "To-Do" });
      setShowForm(false);
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
      <Toaster />
      <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded my-4"
        onClick={() => setShowForm(true)}
      >
        Add Task
      </button>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className=" p-5 rounded shadow-lg w-96 bg-gray-600">
            <h2 className="text-xl mb-3">
              {editingTask ? "Edit Task" : "Add New Task"}
            </h2>
            <form
              onSubmit={editingTask ? handleUpdateSubmit : handleFormSubmit}
              className="flex flex-col gap-3"
            >
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
                  {editingTask ? "Update Task" : "Save Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4 w-full max-w-4xl text-black ">
          {["To-Do", "In Progress", "Done"].map((category) => (
            <Droppable key={category} droppableId={category}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-white p-4 border shadow rounded-lg min-h-[200px]"
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
                            <div className="flex flex-col gap-1">
                              <p className="font-semibold">{task.title}</p>
                              <p className="text-xs text-gray-500">
                                {new Date(task.createdAt).toLocaleString()}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditClick(task)}
                                className="text-blue-500"
                              >
                                ✏️
                              </button>
                              <button
                                onClick={() => deleteTask(task._id)}
                                className="text-red-500"
                              >
                                ✖
                              </button>
                            </div>
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
