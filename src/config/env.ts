const requiredEnvs = ["NEXT_PUBLIC_API_URL"] as const;

requiredEnvs.forEach((env) => {
  if (!process.env[env]) {
    throw new Error(`Missing required environment variable: ${env}`);
  }
});

export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL!,
} as const;
