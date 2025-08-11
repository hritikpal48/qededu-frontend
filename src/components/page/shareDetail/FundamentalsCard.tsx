

import { StockFundamental } from "@/types/stock";
export const FundamentalsCard = ({ data, name, sharePrice }: { data?: StockFundamental, name: string, sharePrice: number }) => {
  const fundamentalsLeft = [
    { label: `${name} Unlisted Shares Price`, value: '₹' + (sharePrice ?? '') },
    { label: 'Lot Size', value: data?.lot_size },
    { label: '52 Week High', value: '₹' + (data?.high_52_week ?? '') },
    { label: '52 Week Low', value: '₹' + (data?.low_52_week ?? '') },
    { label: 'Depository', value: data?.depository ?? '' },
    { label: 'PAN Number', value: data?.pan_number ?? '' },
    { label: 'ISIN Number', value: data?.isin_number ?? '' },
    { label: 'CIN', value: data?.cin },
    { label: 'RTA', value: data?.rta },
  ];

  const fundamentalsRight = [
    { label: 'Market Cap (in cr.)', value: '₹' + (data?.market_cap ?? '') },
    { label: 'P/E Ratio', value: data?.p_e_ration ?? '' },
    { label: 'P/B Ratio', value: data?.p_b_ration ?? '' },
    { label: 'Debt to Equity', value: data?.debt_to_equity ?? '' },
    { label: 'ROE (%)', value: data?.roe ?? '' },
    { label: 'Book Value', value: data?.book_value ?? '' },
    { label: 'Face Value', value: data?.face_value ?? '' },
    { label: 'Total Shares', value: data?.total_share ?? '' },
  ];
  return (
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
  )
}