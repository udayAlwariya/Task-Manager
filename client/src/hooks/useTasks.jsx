import { useState, useEffect} from "react";
import { getAllTasks, getTasks } from "../api/taskApi";
import { useLocation } from "react-router";

export const useTasks = (query={}) => {
  const { search, status, priority, sort, page } = query; // destructuring of keys for the useEffect since we cant directly pass the whole object
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {pathname} = useLocation()

  async function fetchTasks(query = {}) {
    setLoading(true);
    setError("");
    try {
        let data = null
      const queryString = new URLSearchParams(query).toString();
      if(pathname=="/dashboard"){
        data  = await getAllTasks();
      }else{
        data  = await getTasks(queryString);
      }
      setTasks(data.tasks || data);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchTasks(query);
  },[search, status, priority, sort, page, pathname]);

  return { tasks, loading, error };
};


