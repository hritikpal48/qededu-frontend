
const fundamentalsLeft = [
  { label: 'A V Thomas & Co. Limited Unlisted Shares Price', value: '₹ 12500' },
  { label: 'Lot Size', value: '10 Shares' },
  { label: '52 Week High', value: '₹ **' },
  { label: '52 Week Low', value: '₹ **' },
  { label: 'Depository', value: 'NSDL & CDSL' },
  { label: 'PAN Number', value: 'AABCA8810G' },
  { label: 'ISIN Number', value: 'INE944K01010' },
  { label: 'CIN', value: 'U51109KL1935PLC000024' },
  { label: 'RTA', value: 'Cameo Corporate Services' },
];

const fundamentalsRight = [
  { label: 'Market Cap (in cr.)', value: '₹ 570' },
  { label: 'P/E Ratio', value: '8.94' },
  { label: 'P/B Ratio', value: '1.58' },
  { label: 'Debt to Equity', value: '0' },
  { label: 'ROE (%)', value: '17.69' },
  { label: 'Book Value', value: '7908.26' },
  { label: 'Face Value', value: '10' },
  { label: 'Total Shares', value: '456000' },
];

export const FundamentalsCard = () => (
  <>
  <h4 className="font-bold text-[20px] mt-5">Fundamentals</h4>
  <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-900">
    <div className="space-y-3">
      {fundamentalsLeft.map((item, i) => (
        <div key={i} className="flex justify-between text-[16px]">
          <span className="font-medium">{item.label}</span>
          <span className="text-right font-bold">
            {item.value}
          </span>
        </div>
      ))}
    </div>
    <div className="space-y-3">
      {fundamentalsRight.map((item, i) => (
        <div key={i} className="flex justify-between text-[16px]">
          <span className="font-medium">{item.label}</span>
          <span className="font-bold">{item.value}</span>
        </div>
      ))}
    </div>
  </div>
  </>
);