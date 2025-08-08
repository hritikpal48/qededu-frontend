"use client"
import React, { useState, useEffect } from 'react'
import OtpInput from 'react-otp-input';
import { LoaderButton } from "@/components/ui/button";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useVerifyOtp, useResendOtp } from '@/services/auth.service';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function VerifyOtp() {
    const router = useRouter()
    const [otp, setOtp] = useState('');
    const [resendTimer, setResendTimer] = useState(30);
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        // Access search params in useEffect to avoid SSR issues
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            setEmail(params.get('email'));
        }
    }, []);

    const onResendOtpError = (err: any) => {
        const message = err?.response?.data?.message ?? 'Resend OTP failed';
        toast.error(message)
    };
    
    const onResendOtpSuccess = () => setResendTimer(30);

    const onVerifyOtpError = (err: any) => {
        const message = err?.response?.data?.message ?? 'Resend OTP failed';
        toast.error(message)
    };
    
    const onVerifyOtpSuccess = () => {
        toast.success('Email verified successfully');
        setTimeout(() => router.push('/auth/login'), 1000)
    };

    const { mutate: resendOtpMutate, isPending: resendOtpPending } = useResendOtp({ 
        onError: onResendOtpError, 
        onSuccess: onResendOtpSuccess 
    });
    
    const { mutate: verifyOtpMutate, isPending: verifyOtpPending } = useVerifyOtp({ 
        onError: onVerifyOtpError, 
        onSuccess: onVerifyOtpSuccess 
    });

    const handleVerifyOtp = () => {
        if (otp === '') {
            toast.error('Invalid OTP');
            return;
        }
        if (email) verifyOtpMutate({ email, otp })
        else toast.error('Email not found')
    };

    useEffect(() => {
        let timer: any;
        if (resendTimer > 0) {
            timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [resendTimer]);

    const handleResend = () => {
        if (email) {
            resendOtpMutate({ email, type: 1, resend: true })
        }
        else toast.error('Email not found')
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F7F7F7] px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-2">
                    Verification
                </h2>
                <p className="text-sm text-center text-gray-500">
                    We have sent an OTP to your email
                </p>

                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={5}
                    renderSeparator={<span></span>}
                    renderInput={(props) => (
                        <input
                            {...props}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                            placeholder="0"
                        />
                    )}
                    containerStyle={{ width: "100%", display: "flex", gap: 3 }}
                    inputStyle={{ width: "80%" }}
                />

                <LoaderButton
                    text="Verify"
                    type="button"
                    className="w-full bg-green-600 text-white hover:bg-green-700 transition duration-300"
                    loading={verifyOtpPending}
                    onClick={handleVerifyOtp}
                />

                <div className="text-sm text-center text-gray-500">
                    Didn't receive the code?{" "}
                    <button
                        onClick={handleResend}
                        disabled={resendTimer > 0 || resendOtpPending}
                        className={`font-medium ${resendTimer > 0 || resendOtpPending
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-green-600 hover:underline"
                            }`}
                    >
                        {resendOtpPending ? "Resending..." : resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
                    </button>
                </div>

                <p className="text-sm text-center text-gray-500">
                    Back to signup {" "}
                    <Link href="/auth/signup" className="text-green-600 hover:underline font-medium">
                        Back
                    </Link>
                </p>
            </div>
        </div>
    );
}