import { useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import FilterBar from "../../components/tasklist/FilterBar";
import Tasklist from "../../components/tasklist/Tasklist";
import PagingBtns from "../../components/tasklist/PagingBtns";
import useAuth from "../../hooks/useAuth";

function TaskList() {
    const { user } = useAuth();
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    priority: "",
    sort: "",
    page: 1,
    limit: 10,
  });

  const { tasks, loading, error } = useTasks(filters);
  
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value, page: 1 });
  };

  const handlePageChange = (newPage) => {
    setFilters({ ...filters, page: newPage });
  };

  return (
    <div className="p-6">
        <div className="">
            <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold mb-4">Tasks</h1>
            <h1 className="text-xl">Welcome {user && user.name}</h1>
            </div>
            <div className="flex justify-between items-center">
            <FilterBar filters={filters} handleChange={handleChange} />
            <PagingBtns filters={filters} handlePageChange={handlePageChange} />
            </div>
            <Tasklist loading={loading} error={error} tasks={tasks} />
        </div>
    </div>
  );
}

export default TaskList;
