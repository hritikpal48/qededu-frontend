export default function PortfolioTab() {
  return (
    <>
      <h2 className="text-[22px] font-semibold mb-4">My Portfolio</h2>

      {/* Summary box */}
      <div className="bg-[#f8fff7] text-sm text-gray-700 border border-[#f8fff7] rounded-lg mb-6 p-4 flex flex-col sm:flex-row gap-6 sm:justify-between">
        <div>
          <p className="text-gray-500">Total Investments</p>
          <p className="text-lg font-semibold">0.00</p>
        </div>
        <div>
          <p className="text-gray-500">Current Value</p>
          <p className="text-lg font-semibold">0.00</p>
        </div>
        <div>
          <p className="text-gray-500">Total P&L</p>
          <p className="text-lg font-semibold text-green-600">0.00 (0%)</p>
        </div>
      </div>

      {/* Current Investments */}
      <h3 className="text-lg font-medium mb-2">Current Investments</h3>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full text-sm text-left border-t border-gray-200">
          <thead className="bg-white text-gray-700 font-medium">
            <tr>
              <th className="px-4 py-2">Name of Share</th>
              <th className="px-4 py-2">Qty.</th>
              <th className="px-4 py-2">Avg. Price (₹)</th>
              <th className="px-4 py-2">Cur. Price (₹)</th>
              <th className="px-4 py-2">Total Investment (₹)</th>
              <th className="px-4 py-2">Cur. Value (₹)</th>
              <th className="px-4 py-2">P&L</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Empty state row */}
            <tr className="text-gray-400">
              <td className="px-4 py-3" colSpan={8}>
                No investments found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* External Investments */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium">External Investments</h3>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium">
          + Add External Share
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-t border-gray-200">
          <thead className="bg-white text-gray-700 font-medium">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Qty.</th>
              <th className="px-4 py-2">Avg. Price (₹)</th>
              <th className="px-4 py-2">Current Price (₹)</th>
              <th className="px-4 py-2">Investment (₹)</th>
              <th className="px-4 py-2">Current Value (₹)</th>
              <th className="px-4 py-2">P&L</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Empty state row */}
            <tr className="text-gray-400">
              <td className="px-4 py-3" colSpan={8}>
                No external investments found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
