import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { usePayments } from '../../hooks/use-payments';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { StatusBadge } from '../../components/ui/badge';
import { TableSkeleton } from '../../components/ui/skeleton';
import { EmptyState } from '../../components/ui/empty-state';
import { formatSOL, formatDate, truncateAddress } from '../../utils/format';
import { copyToClipboard } from '../../utils/clipboard';

export function PaymentsPage() {
  const { data, isLoading } = usePayments();

  return (
    <div className="space-y-6 animate-page-enter">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-[-0.03em]">Payments</h1>
          <p className="mt-1 text-sm text-text-secondary">Manage and track all payments</p>
        </div>
        <Link to="/payments/new">
          <Button>
            <Plus className="w-4 h-4 mr-1.5" />
            Create Payment
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6">
              <TableSkeleton rows={8} cols={5} />
            </div>
          ) : !data?.length ? (
            <EmptyState
              title="No payments"
              description="Create your first payment to start accepting SOL."
              action={
                <Link to="/payments/new">
                  <Button>Create Payment</Button>
                </Link>
              }
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-subtle">
                    {['Payment ID', 'Amount', 'Status', 'Tx Hash', 'Created', 'Actions'].map((h) => (
                      <th
                        key={h}
                        className="text-left text-[11px] font-semibold text-text-tertiary uppercase tracking-wider px-6 py-3"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((payment) => (
                    <tr
                      key={payment.id}
                      className="border-b border-border-subtle/50 last:border-0 hover:bg-surface-sunken/40 transition-colors duration-150"
                    >
                      <td className="px-6 py-3.5 text-[13px] font-mono font-medium text-text-primary">
                        {truncateAddress(payment.id, 6)}
                      </td>
                      <td className="px-6 py-3.5 text-[13px] font-semibold text-text-primary tabular-nums">
                        {formatSOL(payment.amount_sol)}
                      </td>
                      <td className="px-6 py-3.5">
                        <StatusBadge status={payment.status} />
                      </td>
                      <td className="px-6 py-3.5 text-[13px] font-mono text-text-tertiary">
                        {payment.tx_hash ? truncateAddress(payment.tx_hash, 6) : '—'}
                      </td>
                      <td className="px-6 py-3.5 text-[13px] text-text-secondary">
                        {formatDate(payment.created_at)}
                      </td>
                      <td className="px-6 py-3.5">
                        {(payment.status === 'pending' || payment.status === 'detected') && (
                          <button
                            onClick={() => copyToClipboard(
                              `${window.location.origin}/pay/${payment.id}`,
                              'Payment link copied',
                            )}
                            className="text-[13px] text-text-secondary hover:text-text-primary font-semibold transition-colors cursor-pointer"
                          >
                            Copy Link
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
