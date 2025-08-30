import { useState, useMemo } from "react";
import { useTasks } from "../../hooks/useTasks";
import Filters from "../../components/dashboard/Filters";
import SummaryCard from "../../components/dashboard/SummaryCard";
import PieComp from "../../components/dashboard/PieComp";
import BarComp from "../../components/dashboard/BarComp";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function Dashboard() {
  const { tasks, loading, error } = useTasks();
  const [filter, setFilter] = useState({ status: "", priority: "" });

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      return (
        (!filter.status || t.status === filter.status) &&
        (!filter.priority || t.priority === filter.priority)
      );
    });
  }, [tasks, filter]);
 
  const statusData = ["todo", "in-progress", "done"].map((status) => ({
    name: status,
    value: filteredTasks.filter((t) => t.status === status).length,
  }));
  
  const priorityData = ["low", "medium", "high"].map((priority) => ({
    name: priority,
    value: filteredTasks.filter((t) => t.priority === priority).length,
  }));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      {/* Filters */}
      <Filters filter={filter} setFilter={setFilter} />
      {/* Summary Cards */}
     <SummaryCard filteredTasks={filteredTasks} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Charts */}
        <PieComp statusData={statusData} COLORS={COLORS} />
        <BarComp priorityData={priorityData} />
      </div>
    </div>
  );
}

export default Dashboard;
