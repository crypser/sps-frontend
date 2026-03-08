import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useWithdrawals } from '../../hooks/use-withdrawals';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { WithdrawalBadge } from '../../components/ui/badge';
import { TableSkeleton } from '../../components/ui/skeleton';
import { EmptyState } from '../../components/ui/empty-state';
import { formatSOL, formatDate, truncateAddress } from '../../utils/format';

export function WithdrawalsPage() {
  const { data, isLoading } = useWithdrawals();

  return (
    <div className="space-y-6 animate-page-enter">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-[-0.03em]">Withdrawals</h1>
          <p className="mt-1 text-sm text-text-secondary">Withdraw funds to your Solana wallet</p>
        </div>
        <Link to="/withdrawals/new">
          <Button>
            <Plus className="w-4 h-4 mr-1.5" />
            Make Withdrawal
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6">
              <TableSkeleton rows={8} cols={6} />
            </div>
          ) : !data?.length ? (
            <EmptyState
              title="No withdrawals"
              description="Request your first withdrawal to transfer funds out."
              action={
                <Link to="/withdrawals/new">
                  <Button>Make Withdrawal</Button>
                </Link>
              }
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-subtle">
                    {['Amount', 'Net', 'Status', 'Destination', 'Tx Hash', 'Created'].map((h) => (
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
                  {data.map((w) => (
                    <tr
                      key={w.id}
                      className="border-b border-border-subtle/50 last:border-0 hover:bg-surface-sunken/40 transition-colors duration-150"
                    >
                      <td className="px-6 py-3.5 text-[13px] font-semibold text-text-primary tabular-nums">
                        {formatSOL(w.amount)}
                      </td>
                      <td className="px-6 py-3.5 text-[13px] text-text-secondary tabular-nums">
                        {formatSOL(w.net_amount)}
                      </td>
                      <td className="px-6 py-3.5">
                        <WithdrawalBadge status={w.status} />
                      </td>
                      <td className="px-6 py-3.5 text-[13px] font-mono text-text-tertiary">
                        {truncateAddress(w.destination_address, 6)}
                      </td>
                      <td className="px-6 py-3.5 text-[13px] font-mono text-text-tertiary">
                        {w.tx_hash ? truncateAddress(w.tx_hash, 6) : '—'}
                      </td>
                      <td className="px-6 py-3.5 text-[13px] text-text-secondary">
                        {formatDate(w.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {data.some((w) => w.status === 'failed' && w.failure_reason) && (
                <div className="px-6 py-4 border-t border-border-subtle space-y-2">
                  {data
                    .filter((w) => w.status === 'failed' && w.failure_reason)
                    .map((w) => (
                      <div key={w.id} className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-[13px] text-red-400 font-medium">
                        <span className="font-mono">{truncateAddress(w.id, 6)}:</span>{' '}
                        {w.failure_reason}
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
