export default function FilterBar({...props}) {
const {filters, handleChange} = props;
  return (
    <div className="flex gap-4 mb-4">
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Search..."
          className="border p-2 rounded"
        />
        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">All Status</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <select
          name="priority"
          value={filters.priority}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select
          name="sort"
          value={filters.sort}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Sort By</option>
          <option value="dueDate">Due Date Asc</option>
          <option value="-dueDate">Due Date Desc</option>
        </select>
      </div>
  )
}

