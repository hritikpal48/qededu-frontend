"use client";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useFetchMyshareDetails } from "@/services/myshare.service";
import { getOrderStatusInfo } from "@/utils";
import TextInput from "@/components/ui/input/TextInput";
import SelectInput from "@/components/ui/input/SelectInput";
import Skeleton from "@/components/ui/SkeletonLoader";

type FilterFormValues = {
  keyword: string;
  orderStatus?: string;
  paymentStatus?: string;
};

export default function MyShareTab() {
  const [activeSubTab, setActiveSubTab] = useState<"buy" | "sell">("buy");
  const [page, setPage] = useState(1);
  const limit = 10;

  const orderType = activeSubTab === "buy" ? 1 : 2;

  const { control, watch } = useForm<FilterFormValues>({
    defaultValues: {
      keyword: "",
      orderStatus: "",
      paymentStatus: "",
    },
  });

  const filters = watch();

  const { data, isLoading, refetch } = useFetchMyshareDetails({
    orderType,
    keyword: filters.keyword,
    orderStatus: filters.orderStatus ? Number(filters.orderStatus) : undefined,
    paymentStatus: filters.paymentStatus
      ? Number(filters.paymentStatus)
      : undefined,
    page,
    limit,
  });

  useEffect(() => {
    refetch();
  }, [activeSubTab, filters, page]);

  const renderTableRows = (orders: any[]) =>
    orders.map((order) => (
      <tr key={order._id} className="hover:bg-gray-50">
        <td className="px-4 py-3 text-sm">{order.stock?.name || "N/A"}</td>
        <td className="px-4 py-3 text-sm">{order.stockPrice || "N/A"}</td>
        <td className="px-4 py-3 text-sm">{order.quantity || "N/A"}</td>
        <td className="px-4 py-3 text-sm">{order.totalPrice || "N/A"}</td>
        <td className="px-4 py-3 text-sm">
          <span
            className={`px-2 py-1 rounded ${
              getOrderStatusInfo(order.orderStatus).color
            }`}
          >
            {getOrderStatusInfo(order.orderStatus).label}
          </span>
        </td>
        <td className="px-4 py-3 text-sm">
          <span
            className={`px-2 py-1 rounded ${
              getOrderStatusInfo(order.paymentStatus).color
            }`}
          >
            {getOrderStatusInfo(order.paymentStatus).label}
          </span>
        </td>
      </tr>
    ));

  return (
    <div>
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          className={`px-4 py-2 font-medium w-[50%] cursor-pointer ${
            activeSubTab === "buy"
              ? "border-b-2 bg-[#E9F7E8] text-green-500"
              : "text-gray-600 hover:text-green-500"
          }`}
          onClick={() => setActiveSubTab("buy")}
        >
          Buy
        </button>
        <button
          className={`px-4 py-2 font-medium w-[50%] cursor-pointer ${
            activeSubTab === "sell"
              ? "border-b-2 bg-[#FFF6E0] text-yellow-600"
              : "text-gray-600 hover:text-yellow-600"
          }`}
          onClick={() => setActiveSubTab("sell")}
        >
          Sell
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-4 flex-wrap">
        {/* Keyword */}
        <Controller
          name="keyword"
          control={control}
          render={({ field }) => (
            <TextInput
              label="Search"
              name={field.name}
              register={() => field}
            />
          )}
        />

        {/* Order Status */}
        <Controller
          name="orderStatus"
          control={control}
          render={({ field }) => (
            <SelectInput
              label="Order Status"
              name={field.name}
              value={field.value ?? ""}
              onChange={field.onChange}
              options={["Pending", "Success", "Failed"]}
              valueMap={{
                Pending: "1",
                Success: "2",
                Failed: "3",
              }}
            />
          )}
        />

        {/* Payment Status */}
        <Controller
          name="paymentStatus"
          control={control}
          render={({ field }) => (
            <SelectInput
              label="Payment Status"
              name={field.name}
              value={field.value ?? ""}
              onChange={field.onChange}
              options={["Pending", "Success", "Failed"]}
              valueMap={{
                Pending: "1",
                Success: "2",
                Failed: "3",
              }}
            />
          )}
        />
      </div>

      {/* Table */}
      {isLoading ? (
        <Skeleton className="h-8 w-24" />
      ) : (
        <div className="overflow-x-auto border-t border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-3 font-bold text-sm text-gray-700">
                  Company Name
                </th>
                <th className="px-4 py-3 font-bold text-sm text-gray-700">
                  Share Price
                </th>
                <th className="px-4 py-3 font-bold text-sm text-gray-700">
                  Qty
                </th>
                <th className="px-4 py-3 font-bold text-sm text-gray-700">
                  Price
                </th>
                <th className="px-4 py-3 font-bold text-sm text-gray-700">
                  Order Status
                </th>
                <th className="px-4 py-3 font-bold text-sm text-gray-700">
                  Payment Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data?.data && data.data.length > 0 ? (
                renderTableRows(data.data)
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-5 text-gray-500">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-end items-center gap-3 mt-4">
            <button
              disabled={page === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={() => setPage((prev) => prev - 1)}
            >
              Previous
            </button>
            <span>
              Page {page} of {data?.totalPages || 1}
            </span>
            <button
              disabled={page === data?.totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
