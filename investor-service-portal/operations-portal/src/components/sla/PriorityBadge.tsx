interface Props {
  value: string;
}

export default function PriorityBadge({
  value,
}: Props) {

  const color =
    value === "HIGH"
      ? "bg-red-100 text-red-700"
      : value === "MEDIUM"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-semibold ${color}`}
    >
      {value}
    </span>
  );
}