export const ProductPriceSection = ({ name, price, change }: { name: string; price: number; change: string }) => (
    <div className="mb-4">
      <h1 className="text-xl font-semibold mb-1">{name}</h1>
      <p className="text-2xl font-bold text-green-700">
        ₹{price} <span className="text-sm text-gray-500">{change}</span>
      </p>
    </div>
  );