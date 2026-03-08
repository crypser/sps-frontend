import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { BalanceOverview } from './balance-overview';
import { ProjectOverview } from './project-overview';
import { RecentPaymentsTable } from './recent-payments-table';
import { Button } from '../../components/ui/button';

export function DashboardPage() {
  return (
    <div className="space-y-8 stagger-children">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-[-0.03em]">Dashboard</h1>
          <p className="mt-1 text-sm text-text-secondary">Overview of your payment processor</p>
        </div>
        <Link to="/payments/new">
          <Button>
            <Plus className="w-4 h-4 mr-1.5" />
            Create Payment
          </Button>
        </Link>
      </div>

      <BalanceOverview />
      <ProjectOverview />
      <RecentPaymentsTable />
    </div>
  );
}
