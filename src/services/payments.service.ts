import { delay } from './mock';

export const paymentsService = {
  /** Fake Stripe Connect handshake; resolves to the connected account email. */
  async connectStripe(): Promise<{ ok: boolean; email: string }> {
    await delay(1400);
    return { ok: true, email: 'your.name@gmail.com' };
  },
};
