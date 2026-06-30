interface Props {
  summary: any;
}

export default function SLACards({
  summary,
}: Props) {
  return (
    <div className="grid grid-cols-4 gap-4">

      <div className="rounded-lg bg-white p-5 shadow">
        <p className="text-gray-500">Total</p>
        <h2 className="text-3xl font-bold">
          {summary?.total ?? 0}
        </h2>
      </div>

      <div className="rounded-lg bg-green-50 p-5 shadow">
        <p>Within SLA</p>
        <h2 className="text-3xl font-bold text-green-600">
          {summary?.withinSLA ?? 0}
        </h2>
      </div>

      <div className="rounded-lg bg-yellow-50 p-5 shadow">
        <p>Near Breach</p>
        <h2 className="text-3xl font-bold text-yellow-600">
          {summary?.nearBreach ?? 0}
        </h2>
      </div>

      <div className="rounded-lg bg-red-50 p-5 shadow">
        <p>Breached</p>
        <h2 className="text-3xl font-bold text-red-600">
          {summary?.breached ?? 0}
        </h2>
      </div>

    </div>
  );
}