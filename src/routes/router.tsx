import { createBrowserRouter } from 'react-router-dom';
import { DashboardLayout } from '../layouts/dashboard-layout';
import { AuthGuard } from './auth-guard';
import { LandingPage } from '../features/landing/landing-page';
import { LoginPage } from '../features/auth/login-page';
import { DashboardPage } from '../features/dashboard/dashboard-page';
import { PaymentsPage } from '../features/payments/payments-page';
import { CreatePaymentPage } from '../features/payments/create-payment-page';
import { SettingsPage } from '../features/project/settings-page';
import { CheckoutPage } from '../features/checkout/checkout-page';
import { DocsPage } from '../features/docs/docs-page';
import { WithdrawalsPage } from '../features/withdrawals/withdrawals-page';
import { CreateWithdrawalPage } from '../features/withdrawals/create-withdrawal-page';
import { TermsPage } from '../features/legal/terms-page';
import { PrivacyPage } from '../features/legal/privacy-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/terms',
    element: <TermsPage />,
  },
  {
    path: '/privacy',
    element: <PrivacyPage />,
  },
  {
    path: '/pay/:paymentId',
    element: <CheckoutPage />,
  },
  {
    element: <AuthGuard />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'payments', element: <PaymentsPage /> },
          { path: 'payments/new', element: <CreatePaymentPage /> },
          { path: 'withdrawals', element: <WithdrawalsPage /> },
          { path: 'withdrawals/new', element: <CreateWithdrawalPage /> },
          { path: 'settings', element: <SettingsPage /> },
          { path: 'docs', element: <DocsPage /> },
        ],
      },
    ],
  },
]);
