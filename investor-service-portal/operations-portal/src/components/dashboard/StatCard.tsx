interface StatCardProps {
  title: string;
  value: number | string;
  color?: string;
}

function StatCard({
  title,
  value,
  color = "bg-blue-600",
}: StatCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <div
        className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full ${color}`}
      >
        <span className="text-lg font-bold text-white">
          {String(title).charAt(0)}
        </span>
      </div>

      <h3 className="text-sm font-medium text-gray-500">
        {title}
      </h3>

      <p className="mt-2 text-3xl font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
}

export default StatCard;