import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Zap } from 'lucide-react';
import { useWalletLogin } from './use-wallet-login';
import { useAuth } from './auth-context';
import { Button } from '../../components/ui/button';

export function LoginPage() {
  const { connected } = useWallet();
  const { isAuthenticated } = useAuth();
  const { login, isLoggingIn, error } = useWalletLogin();
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Nav */}
      <nav className="border-b border-white/[0.06] px-6 h-14 flex items-center">
        <Link to="/" className="flex items-center gap-2">
          <Zap className="w-[18px] h-[18px] text-white" />
          <span className="text-[14px] font-semibold text-text-primary tracking-[-0.02em]">Pazen</span>
        </Link>
      </nav>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-[1000px] w-full border border-white/[0.06] animate-page-enter">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left - illustration */}
            <div className="hidden md:flex relative overflow-hidden border-r border-white/[0.06]">
              {/* Grid bg */}
              <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
                backgroundSize: '80px 80px',
              }} />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(255,255,255,0.04),transparent)]" />

              <div className="relative flex flex-col items-center justify-center w-full p-12">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/[0.06] flex items-center justify-center mb-8">
                  <Zap className="w-7 h-7 text-white/80" />
                </div>
                <h2 className="text-2xl font-bold text-text-primary tracking-[-0.04em] text-center">Payment infrastructure<br /><span className="text-text-tertiary">for Solana</span></h2>
                <div className="mt-10 w-full max-w-[260px] space-y-3">
                  {[
                    ['Non-custodial', 'You keep full control'],
                    ['1% platform fee', 'No hidden charges'],
                    ['Instant setup', 'No KYC required'],
                  ].map(([title, desc]) => (
                    <div key={title} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                      <div>
                        <div className="text-[12px] font-medium text-white/70">{title}</div>
                        <div className="text-[11px] text-white/30">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - login form */}
            <div className="flex flex-col items-center justify-center px-8 py-16 sm:px-12 sm:py-20">
              <div className="w-full max-w-[320px]">
                <div className="md:hidden flex items-center justify-center mb-8">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.06] flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white/80" />
                  </div>
                </div>

                <h1 className="text-xl font-bold text-text-primary tracking-[-0.03em] mb-1">Connect your wallet</h1>
                <p className="text-[13px] text-text-tertiary mb-8">Sign in with Phantom or Solflare to continue</p>

                <div className="flex flex-col gap-4">
                  <WalletMultiButton />

                  {connected && !isAuthenticated && (
                    <>
                      <label className="flex items-start gap-2.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={agreed}
                          onChange={(e) => setAgreed(e.target.checked)}
                          className="mt-0.5 w-4 h-4 rounded border-white/[0.1] bg-white/[0.04] accent-white cursor-pointer flex-shrink-0"
                        />
                        <span className="text-[12px] text-text-tertiary leading-relaxed">
                          I agree to the{' '}
                          <Link to="/terms" className="text-text-secondary hover:text-text-primary underline underline-offset-2 transition-colors">
                            Terms of Service
                          </Link>{' '}
                          and{' '}
                          <Link to="/privacy" className="text-text-secondary hover:text-text-primary underline underline-offset-2 transition-colors">
                            Privacy Policy
                          </Link>
                        </span>
                      </label>

                      <Button
                        onClick={login}
                        loading={isLoggingIn}
                        disabled={!agreed}
                        className="w-full"
                        size="lg"
                      >
                        Verify wallet ownership
                      </Button>
                    </>
                  )}

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                      <p className="text-red-400 text-[13px] text-center font-medium">{error}</p>
                    </div>
                  )}
                </div>

                <p className="mt-8 text-[11px] text-text-tertiary/50 leading-relaxed">
                  You'll be asked to sign a message to verify wallet ownership. No transaction will be made.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
