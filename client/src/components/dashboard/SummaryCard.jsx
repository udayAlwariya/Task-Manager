import React from 'react'

function SummaryCard({filteredTasks}) {
  return (
     <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-100 p-4 rounded text-center">
              Total Tasks: {filteredTasks.length}
            </div>
            <div className="bg-pink-100 p-4 rounded text-center">
              Pending Tasks:{" "}
              {filteredTasks.filter((t) => t.status === "todo").length}
            </div>
            <div className="bg-yellow-100 p-4 rounded text-center">
              In progress:{" "}
              {filteredTasks.filter((t) => t.status === "in-progress").length}
            </div>
            <div className="bg-green-100 p-4 rounded text-center">
              Completed Tasks:{" "}
              {filteredTasks.filter((t) => t.status === "done").length}
            </div>
          </div>
  )
}

export default SummaryCard
