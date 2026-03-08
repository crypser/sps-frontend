import { useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { Zap, Check, Clock, AlertCircle } from 'lucide-react';
import { useCheckoutPayment } from '../../hooks/use-payments';
import { StatusBadge } from '../../components/ui/badge';
import { Skeleton } from '../../components/ui/skeleton';
import { buildSolanaPayUri, formatSOL } from '../../utils/format';
import { copyToClipboard } from '../../utils/clipboard';

export function CheckoutPage() {
  const { paymentId } = useParams<{ paymentId: string }>();
  const { data: payment, isLoading, error } = useCheckoutPayment(paymentId!);

  if (isLoading) {
    return (
      <Shell>
        <div className="space-y-6">
          <Skeleton className="h-8 w-48 mx-auto" />
          <Skeleton className="h-[200px] w-[200px] mx-auto rounded-2xl" />
          <Skeleton className="h-6 w-32 mx-auto" />
        </div>
      </Shell>
    );
  }

  if (error || !payment) {
    return (
      <Shell>
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-7 h-7 text-red-400" />
          </div>
          <h1 className="text-lg font-bold text-text-primary tracking-[-0.02em] mb-1">Payment Not Found</h1>
          <p className="text-sm text-text-secondary">This payment link is invalid or has expired.</p>
        </div>
      </Shell>
    );
  }

  const isTerminal = payment.status === 'confirmed' || payment.status === 'expired';
  const payUri = buildSolanaPayUri(payment.payment_address, payment.amount_sol);

  return (
    <Shell>
      {/* Logo */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <span className="text-[15px] font-bold text-text-primary tracking-[-0.03em]">SolPay</span>
      </div>

      {/* Amount */}
      <div className="text-center mb-8">
        <p className="text-[13px] text-text-tertiary font-medium mb-1">Amount Due</p>
        <p className="text-4xl font-bold text-text-primary tracking-[-0.04em]">
          {formatSOL(payment.amount_sol)}
        </p>
      </div>

      {/* QR / Terminal state */}
      <div className="flex justify-center mb-8">
        {isTerminal ? (
          <div className="w-[200px] h-[200px] flex items-center justify-center rounded-2xl bg-surface-sunken">
            {payment.status === 'confirmed' ? (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-emerald-400" />
                </div>
                <p className="mt-3 text-sm font-semibold text-emerald-400">Paid</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto">
                  <Clock className="w-8 h-8 text-red-400" />
                </div>
                <p className="mt-3 text-sm font-semibold text-red-400">Expired</p>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 bg-white rounded-2xl">
            <QRCodeSVG value={payUri} size={180} level="M" />
          </div>
        )}
      </div>

      {/* Status */}
      <div className="flex justify-center mb-6">
        <StatusBadge status={payment.status} />
      </div>

      {/* Address + actions */}
      {!isTerminal && (
        <div className="space-y-4">
          <div className="bg-surface-sunken rounded-xl p-4 border border-border-subtle">
            <p className="text-[11px] text-text-tertiary font-semibold uppercase tracking-wider mb-1.5">Send SOL to</p>
            <p className="text-[13px] font-mono font-medium text-text-primary break-all leading-relaxed">
              {payment.payment_address}
            </p>
          </div>

          <button
            onClick={() => copyToClipboard(payment.payment_address, 'Address copied')}
            className="w-full py-3.5 bg-accent text-surface rounded-xl font-semibold text-[15px] hover:bg-accent-hover transition-all duration-200 active:scale-[0.98] cursor-pointer"
          >
            Copy Address
          </button>
        </div>
      )}

      {/* Status messages */}
      {payment.status === 'pending' && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          <p className="text-xs text-text-tertiary">Waiting for payment...</p>
        </div>
      )}

      {payment.status === 'detected' && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
          </span>
          <p className="text-xs text-sky-400 font-medium">Payment detected! Confirming...</p>
        </div>
      )}
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="bg-surface-raised rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.3)] border border-border-subtle p-8 max-w-[420px] w-full animate-page-enter">
        {children}
      </div>
    </div>
  );
}
