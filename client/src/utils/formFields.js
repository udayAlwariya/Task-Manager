  export const fields = [
    { label: "Title", name: "title", type: "text", required: true },
    { label: "Description", name: "description", type: "textarea" },
    {
      label: "Status",
      name: "status",
      type: "select",
      options: ["todo", "in-progress", "done"],
    },
    {
      label: "Priority",
      name: "priority",
      type: "select",
      options: ["low", "medium", "high"],
    },
    { label: "Due Date", name: "dueDate", type: "date" },
    { label: "Tags (comma separated)", name: "tags", type: "text" },
  ];