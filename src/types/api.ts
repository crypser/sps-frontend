export interface ApiError {
  error: string;
}

export interface AuthChallengeRequest {
  wallet: string;
}

export interface AuthChallengeResponse {
  message: string;
  nonce: string;
}

export interface AuthVerifyRequest {
  wallet: string;
  message: string;
  signature: string;
}

export interface AuthVerifyResponse {
  token: string;
}

export type PaymentStatus = 'pending' | 'detected' | 'confirmed' | 'swept' | 'expired';

export interface Payment {
  id: string;
  payment_address: string;
  amount_sol: number;
  status: PaymentStatus;
  tx_hash: string | null;
  sweep_tx_hash: string | null;
  fee_sol: number | null;
  net_amount_sol: number | null;
  order_id: string | null;
  description: string | null;
  created_at: string;
  expires_at: string;
}

export interface CreatePaymentRequest {
  amount_sol: number;
  order_id?: string;
  description?: string;
}

export interface CreatePaymentResponse {
  payment_id: string;
  payment_address: string;
  amount_sol: number;
  expires_at: string;
  checkout_url: string;
}

export interface Project {
  id: string;
  api_key: string;
  webhook_url: string | null;
  created_at: string;
}

export interface UpdateWebhookRequest {
  webhook_url: string;
}

export interface UpdateWebhookResponse {
  success: boolean;
  webhook_url: string;
}

export interface RotateApiKeyResponse {
  api_key: string;
}

export interface CheckoutPayment {
  payment_address: string;
  amount_sol: number;
  status: PaymentStatus;
}

export interface Balance {
  available_balance: number;
  pending_balance: number;
  total_earned: number;
  total_fees: number;
  updated_at: string;
}

export type WithdrawalStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface Withdrawal {
  id: string;
  amount: number;
  fee: number;
  net_amount: number;
  status: WithdrawalStatus;
  tx_hash: string | null;
  destination_address: string;
  failure_reason: string | null;
  created_at: string;
}

export interface CreateWithdrawalRequest {
  amount: number;
  destination_address: string;
}

export interface CreateWithdrawalResponse {
  id: string;
  amount: number;
  fee: number;
  net_amount: number;
  status: 'pending';
}
