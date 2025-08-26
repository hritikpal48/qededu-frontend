import { EnvironmentVariables } from "@/types/app";

export const environmentVariables: EnvironmentVariables = {
    NEXT_PUBLIC_API_RUN_MODE: process.env.NEXT_PUBLIC_API_RUN_MODE ?? 'DEV',
    NEXT_PUBLIC_API_HOST: process.env.NEXT_PUBLIC_API_HOST,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    UPLOAD_URL:process.env.NEXT_PUBLIC_UPLOAD_URL
}