export default function InputField({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
  placeholder = "",
}) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-gray-700 mb-2 font-medium">
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-400"
            : "border-gray-300 focus:ring-blue-400"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
