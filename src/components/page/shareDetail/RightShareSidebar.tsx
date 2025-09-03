"use client";
import Image from "next/image";
import Link from "next/link";
import { FaInfoCircle } from "react-icons/fa";
import appStore from "../../../../public/images/app-store-apple.png";
import playStore from "../../../../public/images/google-store.png";
import valuationImg from "../../../../public/images/valuations.png";
import needleImg from "../../../../public/images/needle.png";
import { useEffect, useState } from "react";
import TextInput from "@/components/ui/input/TextInput";
import TextAreaInput from "@/components/ui/input/TextAreaInput";
import { useCreateOrder } from "@/services/myshare.service";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
const orderSchema = z.object({
  quantity: z.string().nonempty("Quantity is required"),
  message: z
    .string()
    .min(3, "Message must be at least 3 characters")
    .max(200, "Message cannot exceed 200 characters"),
});
type OrderFormValues = z.infer<typeof orderSchema>;
export const BuySellBox = ({
  stockId,
  minQuantity,
  price,
  name,
}: {
  stockId?: string;
  minQuantity?: number;
  price?: number;
  name?: string;
}) => {
  // :white_check_mark: tab ko 1 (Buy) aur 2 (Sell) rakha
  const [tab, setTab] = useState<1 | 2>(1);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrderFormValues>({ resolver: zodResolver(orderSchema) });
  const onError = (err: any) => {
    console.log("err", err);
    if (err.status === 401) {
      return toast.error("Please login or register to place an order.");
    }
    const message = err?.response?.data?.message ?? "Failed to create order";
    toast.error(message);
  };
  const onSuccess = (data: any | undefined) => {
    toast.success(data?.message);
    reset();
  };
  const { mutate: orderMutate } = useCreateOrder({
    onError,
    onSuccess,
  });
  const onSubmit = (data: OrderFormValues) => {
    orderMutate({
      ...data,
      quantity: Number(data.quantity),
      stockId: stockId ?? "",
      orderType: tab, // :white_check_mark: orderType = 1 or 2
    });
  };
  // map text ke liye
  const tabLabels: Record<1 | 2, string> = { 1: "Buy", 2: "Sell" };
  return (
    <div className="border border-[#E8E8E8] rounded-md p-4 w-full bg-white mb-4">
      {/* Tabs */}
      <div className="flex mb-4">
        {(Object.keys(tabLabels) as Array<"1" | "2">).map((key) => {
          const numKey = Number(key) as 1 | 2;
          const isDisabled = false; // <--- disable nothing
          return (
            <button
              key={numKey}
              onClick={() => setTab(numKey)}
              type="button"
              disabled={isDisabled}
              className={`w-1/2 py-2 text-sm font-medium border-b-2 transition cursor-pointer
          ${
            tab === numKey
              ? "border-green-600 text-green-600"
              : "border-gray-200 text-gray-500"
          }
        `}
            >
              {tabLabels[numKey]}
            </button>
          );
        })}
      </div>
      {/* Share Info */}
      <h3 className="font-semibold text-gray-800 text-sm mb-1">{name}</h3>
      <p className="text-sm text-gray-700 mb-3">{price || 0}</p>
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {tab === 1 ? (
          <TextInput
            label="Quantity"
            placeholder={`Buy Min (${minQuantity || 0}) Quantity `}
            name="quantity"
            error={errors?.quantity}
            register={register}
            className="w-full mb-3"
          />
        ) : (
          <TextInput
            label="Quantity"
            placeholder={`Sell Quantity `}
            name="quantity"
            error={errors?.quantity}
            register={register}
            className="w-full mb-3"
          />
        )}
        <TextAreaInput
          label="Message"
          placeholder="Message"
          name="message"
          error={errors?.message}
          register={register}
          className="w-full mb-3"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded text-sm cursor-pointer"
        >
          {tabLabels[tab]} {/* :white_check_mark: button text Buy/Sell */}
        </button>
      </form>
    </div>
  );
};
export const CreateAlert = () => {
  return (
    <div className="border border-[#E8E8E8] rounded-md p-4 w-full bg-white mb-4">
      <h4 className="font-semibold text-gray-800 text-sm mb-3">Create Alert</h4>
      <label className="text-xs text-gray-600 flex items-center mb-1">
        Target Price <FaInfoCircle className="ml-1 text-gray-400 text-xs" />
      </label>
      <input
        type="text"
        placeholder="Target Price"
        className="w-full border px-3 py-2 text-sm rounded mb-3 border-[#D7D7D7]"
      />
      <label className="text-xs text-gray-600 mb-1">Your Email</label>
      <input
        type="email"
        placeholder="Your Email"
        className="w-full border px-3 py-2 text-sm rounded mb-3 border-[#D7D7D7]"
      />
      <button className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded text-sm">
        Create Alert
      </button>
    </div>
  );
};
export const ValuationMeter = () => {
  const [position, setPosition] = useState("MED");
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        if (prev === "LOW") return "MED";
        if (prev === "MED") return "HIGH";
        return "LOW";
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  const getRotation = () => {
    switch (position) {
      case "LOW":
        return "-90deg";
      case "MED":
        return "0deg";
      case "HIGH":
        return "90deg";
      default:
        return "0deg";
    }
  };
  return (
    <div className="border border-[#E8E8E8] rounded-md p-4 bg-white mb-4 text-center">
      <div className="relative">
        <Image src={valuationImg} alt="valuation" />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div
            className="relative w-8 h-24 origin-bottom transition-transform duration-1000"
            style={{ transform: `rotate(${getRotation()})` }}
          >
            <Image src={needleImg} alt="Needle" className="object-contain" />
          </div>{" "}
        </div>
      </div>
    </div>
  );
};
export const DownloadApp = () => {
  return (
    <div className="bg-[#F7F7F7] border border-[#E8E8E8] rounded-md p-4 text-center">
      <h4 className="text-sm font-semibold text-green-600 mb-1">
        Download App
      </h4>
      <p className="text-xs text-gray-500 mb-3">
        Available on Android and iOS devices
      </p>
      <div className="flex justify-center space-x-2">
        <Link href="/">
          <Image
            src={appStore}
            alt="Google Play"
            className="h-8"
            width={160}
            height={80}
          />
        </Link>
        <Link href="/">
          <Image
            src={playStore}
            alt="App Store"
            className="h-8"
            width={160}
            height={80}
          />
        </Link>
      </div>
    </div>
  );
};