import { delay, FAILING_OTP } from './mock';

export type SocialProvider = 'google' | 'apple' | 'facebook';

export const authService = {
  async sendEmailOtp(_email: string): Promise<void> {
    await delay(600);
  },

  async verifyEmailOtp(code: string): Promise<{ ok: boolean }> {
    await delay(800);
    return { ok: code !== FAILING_OTP };
  },

  async socialLogin(_provider: SocialProvider): Promise<{ ok: boolean }> {
    await delay(900);
    return { ok: true };
  },

  async sendPhoneOtp(_phone: string): Promise<void> {
    await delay(600);
  },

  async verifyPhoneOtp(code: string): Promise<{ ok: boolean }> {
    await delay(800);
    return { ok: code !== FAILING_OTP };
  },
};
