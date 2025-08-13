interface EnvironmentVariables {
  UPLOAD_URL: string;
}

export const environmentVariables: EnvironmentVariables = {
  UPLOAD_URL: process.env.NEXT_PUBLIC_UPLOAD_URL!,
};
