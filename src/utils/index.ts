import { KYC_STATUS } from "@/types/kycType";
import moment from "moment";
import { ORDER_STATUS } from "./constant";

export function dateFormat(value: string): string {
  return moment(value).format("DD MMMM YYYY");
}

// Check if user can edit KYC based on status
export const canEditKYC = (status?: number): boolean => {
  if (!status) return true; // No status means KYC not submitted yet

  return [KYC_STATUS.REJECTED, KYC_STATUS.SUBMITTED].includes(status);
};

// Get status text for display
export const getKYCStatusText = (status?: number): string => {
  if (!status) return "Not Submitted";

  switch (status) {
    case KYC_STATUS.APPROVED:
      return "Approved";
    case KYC_STATUS.PENDING:
      return "Pending";
    case KYC_STATUS.REJECTED:
      return "Rejected";
    case KYC_STATUS.SUBMITTED:
      return "Submitted";
    case KYC_STATUS.INPROGRESS:
      return "In Progress";
    default:
      return "Unknown Status";
  }
};

// export const getKYCStatusClasses = (status?: number): string => {
//   if (!status) return "bg-gray-100 text-gray-800";

//   switch (status) {
//     case KYC_STATUS.APPROVED:
//       return "bg-green-100 text-green-800";
//     case KYC_STATUS.PENDING:
//       return "bg-yellow-100 text-yellow-600";
//     case KYC_STATUS.REJECTED:
//       return "bg-red-100 text-red-800";
//     case KYC_STATUS.SUBMITTED:
//       return "bg-blue-100 text-blue-800";
//     case KYC_STATUS.INPROGRESS:
//       return "bg-purple-100 text-purple-800";
//     default:
//       return "bg-gray-100 text-gray-800";
//   }
// };

export const getKYCStatusIconColor = (status?: number): string => {
  switch (status) {
    case KYC_STATUS.APPROVED:
      return "text-green-600";
    case KYC_STATUS.PENDING:
      return "text-yellow-600";
    case KYC_STATUS.REJECTED:
      return "text-red-600";
    case KYC_STATUS.SUBMITTED:
      return "text-blue-600";
    case KYC_STATUS.INPROGRESS:
      return "text-purple-600";
    default:
      return "text-gray-600";
  }
};



type StatusInfo = {
  label: string;
  color: string;
};

export const getOrderStatusInfo = (status?: number): StatusInfo => {
  switch (status) {
    case ORDER_STATUS.SUCCESS:
      return { label: "Success", color: "bg-green-600 text-white" };
    case ORDER_STATUS.FAILED:
      return { label: "Failed", color: "bg-red-600 text-white" };
    case ORDER_STATUS.PENDING:
      return { label: "Pending", color: "bg-yellow-600 text-black" };
    default:
      return { label: "N/A", color: "bg-gray-500 text-white" };
  }
};


export const getClientIp = async (): Promise<string> => {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip || "0.0.0.0";
  } catch (error) {
    console.error("Error fetching IP:", error);
    return "0.0.0.0";
  }
};
