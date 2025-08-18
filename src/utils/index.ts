import { KYC_STATUS } from '@/types/kycType';
import moment from 'moment';

export function dateFormat(value: string): string {
  return moment(value).format('DD MMMM YYYY');
}

// Check if user can edit KYC based on status
export const canEditKYC = (status?: number): boolean => {
  if (!status) return true; // No status means KYC not submitted yet
  
  return [KYC_STATUS.REJECTED, KYC_STATUS.SUBMITTED].includes(status);
};

// Get status text for display
export const getKYCStatusText = (status?: number): string => {
  if (!status) return "Not Submitted";
  
  switch(status) {
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