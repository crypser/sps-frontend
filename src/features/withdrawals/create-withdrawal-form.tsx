import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useCreateWithdrawal } from '../../hooks/use-withdrawals';
import { useBalance } from '../../hooks/use-balance';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { formatSOL } from '../../utils/format';

export function CreateWithdrawalForm() {
  const { publicKey } = useWallet();
  const { data: balance } = useBalance();
  const createWithdrawal = useCreateWithdrawal();

  const [amount, setAmount] = useState('');
  const [destination, setDestination] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const prefillWallet = () => {
    if (publicKey) setDestination(publicKey.toBase58());
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    const parsed = parseFloat(amount);
    if (!amount || isNaN(parsed) || parsed <= 0) {
      errs.amount = 'Enter a valid amount';
    } else if (parsed < 0.01) {
      errs.amount = 'Minimum withdrawal is 0.01 SOL';
    } else if (balance && parsed > balance.available_balance) {
      errs.amount = 'Exceeds available balance';
    }
    if (!destination || destination.length < 32) {
      errs.destination = 'Enter a valid Solana address';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    await createWithdrawal.mutateAsync({
      amount: parseFloat(amount),
      destination_address: destination,
    });

    setAmount('');
    setDestination('');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-[15px] font-semibold text-text-primary tracking-[-0.02em]">New Withdrawal</h3>
          {balance && (
            <span className="text-[13px] text-text-tertiary">
              Available: <span className="font-semibold text-text-primary">{formatSOL(balance.available_balance)}</span>
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Input
              label="Amount (SOL)"
              type="number"
              step="any"
              min="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              error={errors.amount}
            />
            <p className="mt-1.5 text-[12px] text-text-tertiary">
              Network fee: 0.001 SOL deducted from amount
            </p>
          </div>

          <div>
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <Input
                  label="Destination Address"
                  placeholder="Solana wallet address"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  error={errors.destination}
                />
              </div>
              {publicKey && (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={prefillWallet}
                  className="mb-0.5"
                >
                  Use mine
                </Button>
              )}
            </div>
          </div>

          <Button
            type="submit"
            loading={createWithdrawal.isPending}
            className="w-full"
          >
            Request Withdrawal
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
