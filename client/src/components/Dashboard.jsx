import { Pencil, Trash2, Plus } from "lucide-react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { userContext } from "../context/UserContext";
import { toast } from "react-fox-toast";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const {  setLoggedIn, userData, fetchData2 } =useContext(userContext);
  const navigate = useNavigate();

  async function fetchUserTasks() {
    try {
      const task = await axios.get("http://localhost:3000/tasks");

      // console.log(task.data);

      if (task.data.success) {
        setLoggedIn(true);
        setTasks(task.data.tasks);
      } else {
        navigate("/register");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    
      fetchUserTasks();
      fetchData2();
     
    
  }, []);

  async function handleDelete(id) {
    try {
      const { data } = await axios.delete(`http://localhost:3000/tasks/${id}`);

      if (data.success) {
        setTasks((prevItems) => prevItems.filter((task) => task._id !== id));
        toast.success(data.message, {
          position: "top-center",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const getPriorityColor = (priority) => {
    if (priority === "High") return "bg-red-500";
    if (priority === "Medium") return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold my-5 mb-7 text-center ">
          Welcome {userData.username}
        </h1>
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Stay Focused, Stay Productive 💪
        </h2>
        {tasks.length === 0 ? (
          <div className="text-center bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-700">
              No tasks available
            </h2>
            <p className="text-gray-500 mt-2">Start by adding a task.</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => navigate("/addTask")}
            >
              Add Task
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white p-6 rounded-xl shadow-lg flex flex-col justify-between w-full aspect-square"
              >
                {/* Task Content */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {task.title}
                  </h3>
                  <p className="text-gray-600 mt-2 text-sm">
                    {task.description}
                  </p>
                </div>

                {/* Bottom Section */}
                <div className="mt-4 flex flex-col gap-3">
                  <span
                    className={`px-3 py-1 text-white rounded-full text-sm font-semibold self-start ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>

                  <div className="flex justify-between items-center">
                    <p className="text-gray-500 text-sm">
                      Due: {task.dueDate.split("T")[0]}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => navigate(`/update/${task._id}`)}
                      >
                        <Pencil size={20} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(task._id)}
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        className="absolute top-0 right-0 mt-24 mr-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition flex items-center group"
        onClick={() => navigate("/addTask")}
      >
        <Plus size={28} />
        <span className="absolute bg-gray-900 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 -left-20">
          Add Task
        </span>
      </button>
    </div>
  );
}
