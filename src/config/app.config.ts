import { EnvironmentVariables } from "@/types/app";
const env = process?.env ?? {};

export const environmentVariables: EnvironmentVariables = {
    NEXT_PUBLIC_API_HOST:env?.NEXT_PUBLIC_API_HOST ?? '',
    NEXT_PUBLIC_API_RUN_MODE:env?.NEXT_PUBLIC_API_RUN_MODE ?? 'DEV',
    NEXT_PUBLIC_APP_URL:env?.NEXT_PUBLIC_APP_URL ?? ''
}
