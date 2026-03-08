import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useBalance } from '../../hooks/use-balance';
import { Card, CardContent } from '../../components/ui/card';
import { Skeleton } from '../../components/ui/skeleton';
import { formatSOL } from '../../utils/format';

export function BalanceOverview() {
  const { data: balance, isLoading } = useBalance();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="py-6">
              <Skeleton className="h-3.5 w-24 mb-3" />
              <Skeleton className="h-7 w-28" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!balance) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
      {/* Available balance */}
      <Card>
        <CardContent className="py-6">
          <p className="text-[13px] font-medium text-text-secondary mb-1">Available Balance</p>
          <p className="text-2xl font-bold text-text-primary tracking-[-0.02em]">
            {formatSOL(balance.available_balance)}
          </p>
          {balance.available_balance > 0 && (
            <Link
              to="/withdrawals"
              className="inline-flex items-center gap-1 text-xs text-text-secondary hover:text-text-primary font-semibold mt-3 transition-colors"
            >
              Withdraw
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="py-6">
          <p className="text-[13px] font-medium text-text-tertiary mb-1">Pending Balance</p>
          <p className="text-xl font-bold text-text-primary tracking-[-0.02em]">
            {formatSOL(balance.pending_balance)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="py-6">
          <p className="text-[13px] font-medium text-text-tertiary mb-1">Total Earned</p>
          <p className="text-xl font-bold text-text-primary tracking-[-0.02em]">
            {formatSOL(balance.total_earned)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="py-6">
          <p className="text-[13px] font-medium text-text-tertiary mb-1">Total Fees (1%)</p>
          <p className="text-xl font-bold text-text-primary tracking-[-0.02em]">
            {formatSOL(balance.total_fees)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
