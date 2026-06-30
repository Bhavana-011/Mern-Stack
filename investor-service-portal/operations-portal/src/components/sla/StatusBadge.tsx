interface Props {
  value: string;
}

export default function StatusBadge({
  value,
}: Props) {

  const color =
    value === "OPEN"
      ? "bg-yellow-100 text-yellow-700"
      : value === "IN_PROGRESS"
      ? "bg-blue-100 text-blue-700"
      : value === "RESOLVED"
      ? "bg-green-100 text-green-700"
      : "bg-gray-100 text-gray-700";

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-semibold ${color}`}
    >
      {value}
    </span>
  );
}