import React from "react";

const TableSkeleton = ({ rows = 10 }) => {
    return (
        <div className="overflow-x-auto border border-gray-200 rounded-md animate-pulse">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unlisted Share Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IPO Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CMP</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gain or Loss</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {[...Array(rows)].map((_, i) => (
                        <tr key={i} className="h-[60px]">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="w-32 h-4 bg-gray-200 rounded"></div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="w-20 h-4 bg-gray-200 rounded"></div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="w-20 h-4 bg-gray-200 rounded"></div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="w-20 h-4 bg-gray-200 rounded"></div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="w-16 h-6 bg-green-200 rounded-full"></div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export const TableLoadingBody = ({ rows = 4 }) => {
    return (
        <tbody className="divide-y divide-gray-200 bg-white">
            {[...Array(rows)].map((_, i) => (
                <tr key={i} className="h-[60px]">
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-32 h-4 bg-gray-200 rounded"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-20 h-4 bg-gray-200 rounded"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-20 h-4 bg-gray-200 rounded"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-20 h-4 bg-gray-200 rounded"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-16 h-6 bg-green-200 rounded-full"></div>
                    </td>
                </tr>
            ))}
        </tbody>
    )
}
export default TableSkeleton;
