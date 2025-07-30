'use client'
import { useState } from 'react';

const incomeStatement = [
  ['P&L Statement', '2021', '2022', '2023', '2024'],
  ['Revenue', '94604.77', '99241.07', '102157.91', '107913'],
  ['Cost of Material Consumed', '62392.08', '60444.83', '65369', '85231'],
  ['Gross Margins', '34.05', '39.09', '36.01', '21.02'],
  ['Change in Inventory', '1329.76', '-415.24', '78.36', '-639'],
  ['Employee Benefit Expenses', '4152.61', '4370.39', '4215.09', '4507'],
  ['Other Expenses', '19183.01', '28469.96', '25380.14', '10578'],
  ['EBITDA', '7547.31', '6371.13', '7119.82', '8236'],
  ['OPM', '7.98', '6.42', '6.97', '7.63'],
  ['Other Income', '508.75', '584.03', '797.41', '1465'],
  ['Finance Cost', '304.17', '216.77', '211.7', '154'],
  ['D&A', '608.7', '660.39', '837.74', '932'],
  ['EBIT', '6938.61', '5710.74', '6282.08', '7304'],
  ['EBIT Margins', '7.33', '5.75', '6.15', '6.77'],
  ['PBT', '5286.19', '6078', '6383.95', '8616'],
  ['PBT Margins', '5.59', '6.12', '6.69', '7.98'],
  ['Tax', '1377.89', '1607.6', '1801.48', '2240'],
  ['PAT', '3908.3', '4470.4', '5037.47', '6376'],
  ['NPM', '4.13', '4.5', '4.93', '5.91'],
  ['EPS', '831.2', '950.74', '1097.01', '1396.71']
];

const financialRatios = [
  ['Financial Ratios', '2021', '2022', '2023', '2024'],
  ['Operating Profit Margin', '7.98', '6.42', '6.97', '7.63'],
  ['Net Profit Margin', '4.13', '4.5', '4.93', '5.91'],
  ['Earning Per Share (Diluted)', '831.2', '950.74', '1097.01', '1396.71']
];

const balanceSheetAssets = [
  ['Assets', '2021', '2022', '2023', '2024'],
  ['Fixed Assets', '4018.49', '3924.98', '3775.67', '3819'],
  ['CWIP', '42.01', '0', '50.2', '50'],
  ['Investments', '9582.01', '12313.83', '12993.21', '14400'],
  ['Trade Receivables', '3683.05', '3798.49', '3148.16', '3402'],
  ['Inventory', '16619.76', '12897.46', '13582.92', '13997'],
  ['Other Assets', '3176.5', '4737.38', '5322.34', '6999'],
  ['Total Assets', '37121.82', '37672.14', '38872.5', '42667']
];

const balanceSheetLiabilities = [
  ['Liabilities', '2021', '2022', '2023', '2024'],
  ['Share Capital', '47.02', '47.02', '45.92', '45.65'],
  ['FV', '10', '10', '10', '10'],
  ['Reserves', '27196.4', '30521.6', '32396.03', '36006'],
  ['Borrowings', '4194.03', '585', '390', '0'],
  ['Trade Payables', '3609.67', '3405.94', '2706.5', '3446'],
  ['Other Liabilities', '2074.7', '3112.58', '3334.05', '3169.35'],
  ['Total Liabilities', '37121.82', '37672.14', '38872.5', '42667']
];

const cashFlowStatement = [
  ['Cash-Flow Statement', '2021', '2022', '2023', '2024'],
  ['PBT', '5286.19', '6117.65', '6838.95', '8701'],
  ['OPBWC', '5963.51', '6668.39', '7100.81', '8170'],
  ['Change in Receivables', '-628.64', '-129.9', '650.33', '-246'],
  ['Change in Inventories', '-4726.75', '3563.74', '-686.74', '-447'],
  ['Change in Payables', '391.41', '-203.73', '-699.44', '740'],
  ['Other Changes', '382.56', '910.85', '-679.49', '1005'],
  ['Working Capital Change', '-4581.42', '4140.96', '-1415.34', '1052'],
  ['Cash Generated From Operations', '1382.09', '10809.35', '5685.47', '9222'],
  ['Tax', '-1325.35', '-1530.23', '-1756.95', '-2263'],
  ['Cash Flow From Operations', '56.74', '9279.12', '3928.52', '6959'],
  ['Purchase of PPE', '-730.26', '-425.75', '-458.95', '-570'],
  ['Sale of PPE', '6.19', '5.55', '68.02', '154'],
  ['Cash Flow From Investment', '-1072.77', '-2922.86', '-575.89', '-4291'],
  ['Borrowing', '2335.15', '-3414.03', '-195', '-390'],
  ['Dividend', '-1545.6', '-940.34', '-1474.51', '-1381'],
  ['Equity', '0', '0', '0', '-729'],
  ['Others From Financing', '-492.19', '-411.77', '-2007.23', '-0.35'],
  ['Cash Flow from Financing', '297.36', '-4766.14', '-3676.74', '-2500'],
  ['Net Cash Generated', '-718.67', '1590.12', '-324.11', '168'],
  ['Cash at the Start', '812.64', '133.88', '1723.99', '1429'],
  ['Cash at the End', '93.97', '1724', '1399.88', '1597']
];

const FinancialTable = ({ data }: { data: string[][] }) => (
  <div className="overflow-x-auto mt-4">
    <table className="min-w-full text-left text-sm">
      <thead className="bg-[#d5d5d5] font-medium">
        <tr>
          {data[0].map((heading, idx) => (
            <th key={idx} className="px-3 py-2 text-gray-600">
              {heading}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y">
        {data.slice(1).map((row, idx) => (
          <tr key={idx}>
            {row.map((cell, cellIdx) => (
              <td
                key={cellIdx}
                className={`px-3 py-2 ${cellIdx === 0 ? 'font-medium text-gray-700' : 'text-gray-600'}`}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const FinancialTabs = () => {
  const [activeTab, setActiveTab] = useState('Income Statement');
  const tabs = ['Income Statement', 'Balance Sheet', 'Cash Flow'];

  return (
    <div className="mt-10">
      <h2 className="text-[20px] font-semibold mb-4">
        Financials <span className="text-sm text-gray-400">(Figures in ₹k)</span>
      </h2>
      <div className="flex space-x-6 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`pb-2 border-b-2 transition cursor-pointer text-[16px] font-[500] ${
              activeTab === tab ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="bg-[#F7F7F7] border border-[#e8e8e8] rounded-[15px] p-6 text-gray-700">
        {activeTab === 'Income Statement' && (
          <>
            <h3 className="text-base font-semibold text-gray-800 mb-2">P&amp;L Statement</h3>
            <FinancialTable data={incomeStatement} />
            <h3 className="text-base font-semibold text-gray-800 mt-8 mb-2">Financial Ratios</h3>
            <FinancialTable data={financialRatios} />
          </>
        )}
        {activeTab === 'Balance Sheet' && (
          <>
            <h3 className="text-base font-semibold text-gray-800 mb-2">Assets</h3>
            <FinancialTable data={balanceSheetAssets} />
            <h3 className="text-base font-semibold text-gray-800 mt-8 mb-2">Liabilities</h3>
            <FinancialTable data={balanceSheetLiabilities} />
          </>
        )}
        {activeTab === 'Cash Flow' && (
          <>
            <h3 className="text-base font-semibold text-gray-800 mb-2">Cash-Flow Statement</h3>
            <FinancialTable data={cashFlowStatement} />
          </>
        )}
      </div>
    </div>
  );
};
