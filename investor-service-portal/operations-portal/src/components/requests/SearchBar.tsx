interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Search by Request ID..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
    />
  );
}

export default SearchBar;