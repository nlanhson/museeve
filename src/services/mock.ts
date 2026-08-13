/** Shared helpers for the mock data layer. Swap each service for the real API later. */
export const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

/** Any 6 digits pass except this one, so error states are demoable. */
export const FAILING_OTP = '000000';
