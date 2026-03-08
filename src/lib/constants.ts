export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';
export const SOLANA_NETWORK = import.meta.env.VITE_SOLANA_NETWORK ?? 'devnet';
export const SOLANA_RPC_URL = import.meta.env.VITE_SOLANA_RPC_URL ?? 'https://api.devnet.solana.com';

export const AUTH_TOKEN_KEY = 'sps_auth_token';
export const PAYMENT_POLL_INTERVAL = 3000;

export const PAYMENT_STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  detected: 'Detected',
  confirmed: 'Confirmed',
  swept: 'Swept',
  expired: 'Expired',
};

export const PAYMENT_STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  detected: 'bg-sky-500/10 text-sky-400 border border-sky-500/20',
  confirmed: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  swept: 'bg-violet-500/10 text-violet-400 border border-violet-500/20',
  expired: 'bg-red-500/10 text-red-400 border border-red-500/20',
};

export const WITHDRAWAL_STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  processing: 'Processing',
  completed: 'Completed',
  failed: 'Failed',
};

export const WITHDRAWAL_STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  processing: 'bg-sky-500/10 text-sky-400 border border-sky-500/20',
  completed: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  failed: 'bg-red-500/10 text-red-400 border border-red-500/20',
};
