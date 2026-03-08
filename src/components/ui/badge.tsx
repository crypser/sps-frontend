import {
  PAYMENT_STATUS_COLORS,
  PAYMENT_STATUS_LABELS,
  WITHDRAWAL_STATUS_COLORS,
  WITHDRAWAL_STATUS_LABELS,
} from '../../lib/constants';
import type { PaymentStatus, WithdrawalStatus } from '../../types';

interface StatusBadgeProps {
  status: PaymentStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold tracking-wide ${PAYMENT_STATUS_COLORS[status]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT_COLORS[status]}`} />
      {PAYMENT_STATUS_LABELS[status]}
    </span>
  );
}

interface WithdrawalBadgeProps {
  status: WithdrawalStatus;
}

export function WithdrawalBadge({ status }: WithdrawalBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold tracking-wide ${WITHDRAWAL_STATUS_COLORS[status]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${WITHDRAWAL_DOT_COLORS[status]}`} />
      {WITHDRAWAL_STATUS_LABELS[status]}
    </span>
  );
}

const STATUS_DOT_COLORS: Record<string, string> = {
  pending: 'bg-amber-500',
  detected: 'bg-sky-500',
  confirmed: 'bg-emerald-500',
  swept: 'bg-violet-500',
  expired: 'bg-red-400',
};

const WITHDRAWAL_DOT_COLORS: Record<string, string> = {
  pending: 'bg-amber-500',
  processing: 'bg-sky-500',
  completed: 'bg-emerald-500',
  failed: 'bg-red-400',
};
