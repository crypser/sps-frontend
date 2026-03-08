import { Link } from 'react-router-dom';
import { usePayments } from '../../hooks/use-payments';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { StatusBadge } from '../../components/ui/badge';
import { TableSkeleton } from '../../components/ui/skeleton';
import { EmptyState } from '../../components/ui/empty-state';
import { formatSOL, formatDate, truncateAddress } from '../../utils/format';
import { copyToClipboard } from '../../utils/clipboard';

export function RecentPaymentsTable() {
  const { data, isLoading } = usePayments();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-[15px] font-semibold text-text-primary tracking-[-0.02em]">Recent Payments</h3>
          <Link
            to="/payments"
            className="text-[13px] text-text-secondary hover:text-text-primary font-semibold transition-colors"
          >
            View all
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="p-6">
            <TableSkeleton rows={5} cols={5} />
          </div>
        ) : !data?.length ? (
          <EmptyState
            title="No payments yet"
            description="Create your first payment to get started."
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
                {data.slice(0, 5).map((payment) => (
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
  );
}
