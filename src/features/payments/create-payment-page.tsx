import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { useCreatePayment } from '../../hooks/use-payments';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { buildSolanaPayUri, formatSOL } from '../../utils/format';
import { copyToClipboard } from '../../utils/clipboard';
import type { CreatePaymentResponse } from '../../types';

export function CreatePaymentPage() {
  const navigate = useNavigate();
  const createPayment = useCreatePayment();
  const [result, setResult] = useState<CreatePaymentResponse | null>(null);

  const [form, setForm] = useState({
    amount: '',
    order_id: '',
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    const amount = parseFloat(form.amount);
    if (!form.amount || isNaN(amount) || amount <= 0) {
      errs.amount = 'Enter a valid amount greater than 0';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const data = await createPayment.mutateAsync({
      amount_sol: parseFloat(form.amount),
      order_id: form.order_id || undefined,
      description: form.description || undefined,
    });

    setResult(data);
  };

  if (result) {
    const payUri = buildSolanaPayUri(result.payment_address, result.amount_sol);

    return (
      <div className="max-w-lg mx-auto space-y-6 animate-page-enter">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-[-0.03em]">Payment Created</h1>
          <p className="mt-1 text-sm text-text-secondary">Share this with your customer</p>
        </div>

        <Card>
          <CardContent className="py-10 flex flex-col items-center gap-8">
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-border-subtle">
              <QRCodeSVG value={payUri} size={180} level="M" />
            </div>

            <div className="text-center space-y-1.5">
              <p className="text-3xl font-bold text-text-primary tracking-[-0.03em]">
                {formatSOL(result.amount_sol)}
              </p>
              <p className="text-[13px] text-text-tertiary font-mono break-all max-w-xs">
                {result.payment_address}
              </p>
            </div>

            <div className="w-full space-y-2.5">
              <Button
                className="w-full"
                onClick={() => copyToClipboard(`${window.location.origin}/pay/${result.payment_id}`, 'Payment link copied')}
              >
                Copy Payment Link
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => copyToClipboard(result.payment_address, 'Address copied')}
              >
                Copy Address
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => navigate('/payments')}
              >
                Back to Payments
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6 animate-page-enter">
      <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-[-0.03em]">Create Payment</h1>
        <p className="mt-1 text-sm text-text-secondary">Generate a new payment request</p>
      </div>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Amount (SOL)"
              type="number"
              step="any"
              min="0"
              placeholder="0.00"
              value={form.amount}
              onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
              error={errors.amount}
            />

            <Input
              label="Order ID (optional)"
              placeholder="ORD-001"
              value={form.order_id}
              onChange={(e) => setForm((f) => ({ ...f, order_id: e.target.value }))}
            />

            <Input
              label="Description (optional)"
              placeholder="Payment for..."
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />

            <div className="flex gap-3 pt-1">
              <Button
                type="submit"
                loading={createPayment.isPending}
                className="flex-1"
              >
                Create Payment
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
