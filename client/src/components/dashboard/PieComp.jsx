import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

function PieComp({ statusData, COLORS }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Tasks by Status</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={statusData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
            onClick={(data) => alert(`Clicked status: ${data.name}`)}
          >
            {statusData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieComp;
