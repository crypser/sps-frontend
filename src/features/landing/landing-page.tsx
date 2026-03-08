import { Link, useNavigate } from 'react-router-dom';
import { Zap, ArrowRight, Shield, Wallet, ChevronRight } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useRef, useEffect } from 'react';
import { useAuth } from '../auth/auth-context';

function Section({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function CodeHighlightRequest() {
  return (
    <pre className="text-[12.5px] font-mono leading-[1.7] overflow-x-auto">
      <span className="text-[#e06c75]">curl</span> <span className="text-text-secondary">-X</span> <span className="text-[#c678dd]">POST</span> <span className="text-[#98c379]">https://api.payzen.tech/payments</span> <span className="text-text-tertiary">\</span>{'\n'}
      {'  '}<span className="text-text-secondary">-H</span> <span className="text-[#98c379]">"Authorization: Bearer sk_live_..."</span> <span className="text-text-tertiary">\</span>{'\n'}
      {'  '}<span className="text-text-secondary">-H</span> <span className="text-[#98c379]">"Content-Type: application/json"</span> <span className="text-text-tertiary">\</span>{'\n'}
      {'  '}<span className="text-text-secondary">-d</span> <span className="text-[#98c379]">{"'"}</span><span className="text-white/60">{'{'}</span>{'\n'}
      {'    '}<span className="text-[#e06c75]">"amount_sol"</span><span className="text-white/40">:</span> <span className="text-[#d19a66]">2.5</span><span className="text-white/40">,</span>{'\n'}
      {'    '}<span className="text-[#e06c75]">"order_id"</span><span className="text-white/40">:</span> <span className="text-[#98c379]">"ORD-1842"</span><span className="text-white/40">,</span>{'\n'}
      {'    '}<span className="text-[#e06c75]">"description"</span><span className="text-white/40">:</span> <span className="text-[#98c379]">"Pro Plan"</span>{'\n'}
      {'  '}<span className="text-white/60">{'}'}</span><span className="text-[#98c379]">{"'"}</span>
    </pre>
  );
}

function CodeHighlightResponse() {
  return (
    <pre className="text-[12.5px] font-mono leading-[1.7] overflow-x-auto">
      <span className="text-white/60">{'{'}</span>{'\n'}
      {'  '}<span className="text-[#e06c75]">"payment_id"</span><span className="text-white/40">:</span> <span className="text-[#98c379]">"pay_7f3a9c..."</span><span className="text-white/40">,</span>{'\n'}
      {'  '}<span className="text-[#e06c75]">"payment_address"</span><span className="text-white/40">:</span> <span className="text-[#98c379]">"9WzDXwBb..."</span><span className="text-white/40">,</span>{'\n'}
      {'  '}<span className="text-[#e06c75]">"amount_sol"</span><span className="text-white/40">:</span> <span className="text-[#d19a66]">2.5</span><span className="text-white/40">,</span>{'\n'}
      {'  '}<span className="text-[#e06c75]">"status"</span><span className="text-white/40">:</span> <span className="text-[#98c379]">"pending"</span><span className="text-white/40">,</span>{'\n'}
      {'  '}<span className="text-[#e06c75]">"checkout_url"</span><span className="text-white/40">:</span> <span className="text-[#98c379]">"https://payzen.tech/pay/pay_7f3a9c..."</span>{'\n'}
      <span className="text-white/60">{'}'}</span>
    </pre>
  );
}

export function LandingPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.06] bg-black/80 backdrop-blur-2xl">
        <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Link to="/" className="flex items-center gap-2 mr-4">
              <Zap className="w-[18px] h-[18px] text-white" />
              <span className="text-[14px] font-semibold text-text-primary tracking-[-0.02em]">PayZen</span>
            </Link>
            <a href="#features" className="px-3 py-1.5 text-[13px] text-text-tertiary hover:text-text-primary transition-colors hidden sm:block">Features</a>
            <a href="#developers" className="px-3 py-1.5 text-[13px] text-text-tertiary hover:text-text-primary transition-colors hidden sm:block">Developers</a>
            <a href="#pricing" className="px-3 py-1.5 text-[13px] text-text-tertiary hover:text-text-primary transition-colors hidden sm:block">Pricing</a>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="px-3.5 py-1.5 text-[13px] text-text-secondary hover:text-text-primary transition-colors hidden sm:block"
            >
              Log in
            </Link>
            <Link
              to="/login"
              className="px-3.5 py-1.5 bg-white text-black text-[13px] font-medium rounded-lg hover:bg-white/90 transition-all duration-150"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Boxed content container */}
      <div className="max-w-[1000px] mx-auto mt-[120px] border border-white/[0.06]">
        {/* Hero */}
        <div className="relative">
          {/* Hero background illustration - grid covers full area */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '120px 120px',
          }} />
          {/* Central glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_45%,rgba(255,255,255,0.05),transparent)]" />
          </div>

          <div className="relative py-28 sm:py-36 px-6">
            <div className="max-w-[700px] mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex justify-center mb-8"
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-[12px] text-text-secondary font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Now in public beta
                  <ChevronRight className="w-3 h-3 text-text-tertiary" />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-center text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-[-0.045em] leading-[1.05]"
              >
                <span className="gradient-text">Payment infrastructure</span>
                <br />
                <span className="text-text-tertiary">for Solana merchants</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="mt-6 text-center text-[17px] text-text-secondary max-w-[480px] mx-auto leading-relaxed"
              >
                Accept SOL payments with a simple API. Non-custodial, real-time confirmations, instant withdrawals.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="mt-10 flex items-center justify-center gap-3"
              >
                <Link
                  to="/login"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-full text-[14px] font-medium hover:bg-white/90 transition-all duration-150 active:scale-[0.97]"
                >
                  Start Building
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <a
                  href="#developers"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/[0.12] text-text-secondary rounded-full text-[14px] font-medium hover:text-text-primary hover:border-white/[0.2] hover:bg-white/[0.03] transition-all duration-150"
                >
                  View API Docs
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Code block showcase */}
        <Section>
          <div className="border-t border-white/[0.06] p-6 sm:p-10">
            <div className="border border-white/[0.06] bg-[#080808] overflow-hidden rounded-lg">
              {/* Chrome bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-3 py-0.5 rounded bg-white/[0.04] text-[11px] text-text-tertiary font-mono">
                    Terminal
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.06]">
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">POST</span>
                    <span className="text-[11px] text-text-tertiary font-mono">/payments</span>
                  </div>
                  <CodeHighlightRequest />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20">200</span>
                    <span className="text-[11px] text-text-tertiary font-mono">Response</span>
                  </div>
                  <CodeHighlightResponse />
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Features */}
        <Section id="features">
          <div className="border-t border-white/[0.06] px-6 sm:px-10 py-16">
            <p className="text-[12px] font-medium text-text-tertiary uppercase tracking-widest mb-2">Features</p>
            <h2 className="text-2xl font-bold text-text-primary tracking-[-0.03em]">
              Everything you need
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-white/[0.06]">
            {/* Instant Setup */}
            <div className="px-6 sm:px-8 py-8 transition-colors duration-300 hover:bg-white/[0.015] border-b border-white/[0.06] sm:border-r">
              <div className="mb-5 h-[100px] rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-center overflow-hidden">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white/60" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="w-20 h-1.5 rounded-full bg-white/[0.08]" />
                    <div className="w-14 h-1.5 rounded-full bg-white/[0.04]" />
                  </div>
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center ml-2">
                    <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                </div>
              </div>
              <h3 className="text-[14px] font-semibold text-text-primary tracking-[-0.01em] mb-1.5">Instant Setup</h3>
              <p className="text-[13px] text-text-secondary leading-relaxed">Connect your wallet and start accepting payments. No KYC, no paperwork.</p>
            </div>

            {/* Non-Custodial */}
            <div className="px-6 sm:px-8 py-8 transition-colors duration-300 hover:bg-white/[0.015] border-b border-white/[0.06] sm:border-r">
              <div className="mb-5 h-[100px] rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-center overflow-hidden">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full border-2 border-white/[0.1] flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white/50" strokeWidth={1.5} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500/30 border border-emerald-500/40 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="absolute inset-0 rounded-full border border-dashed border-white/[0.06] scale-[1.8]" />
                </div>
              </div>
              <h3 className="text-[14px] font-semibold text-text-primary tracking-[-0.01em] mb-1.5">Non-Custodial</h3>
              <p className="text-[13px] text-text-secondary leading-relaxed">Funds flow through escrow and are swept to your treasury. You keep control.</p>
            </div>

            {/* Real-Time */}
            <div className="px-6 sm:px-8 py-8 transition-colors duration-300 hover:bg-white/[0.015] border-b border-white/[0.06]">
              <div className="mb-5 h-[100px] rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-center overflow-hidden px-6">
                <div className="flex items-center gap-2 w-full">
                  {[0.3, 0.5, 0.7, 0.4, 0.9, 0.6, 0.8, 0.5, 0.7, 1.0].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end h-[50px]">
                      <div
                        className="w-full rounded-sm bg-white/[0.08]"
                        style={{ height: `${h * 100}%`, opacity: 0.3 + i * 0.07 }}
                      />
                    </div>
                  ))}
                  <div className="ml-1 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                </div>
              </div>
              <h3 className="text-[14px] font-semibold text-text-primary tracking-[-0.01em] mb-1.5">Real-Time</h3>
              <p className="text-[13px] text-text-secondary leading-relaxed">Watch payments confirm in real time. Webhook notifications on every change.</p>
            </div>

            {/* API-First */}
            <div className="px-6 sm:px-8 py-8 transition-colors duration-300 hover:bg-white/[0.015] sm:border-r border-white/[0.06]">
              <div className="mb-5 h-[100px] rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-center overflow-hidden px-5">
                <div className="font-mono text-[10px] leading-[1.6] w-full">
                  <span className="text-[#c678dd]">const</span> <span className="text-[#e06c75]">pay</span> <span className="text-white/40">=</span> <span className="text-[#c678dd]">await</span> <span className="text-[#61afef]">payzen</span><span className="text-white/40">.</span><span className="text-[#61afef]">create</span><span className="text-white/40">{'({'}</span>{'\n'}
                  {'  '}<span className="text-[#e06c75]">amount</span><span className="text-white/40">:</span> <span className="text-[#d19a66]">2.5</span><span className="text-white/40">,</span>{'\n'}
                  {'  '}<span className="text-[#e06c75]">currency</span><span className="text-white/40">:</span> <span className="text-[#98c379]">"SOL"</span>{'\n'}
                  <span className="text-white/40">{'});'}</span>
                </div>
              </div>
              <h3 className="text-[14px] font-semibold text-text-primary tracking-[-0.01em] mb-1.5">API-First</h3>
              <p className="text-[13px] text-text-secondary leading-relaxed">Clean REST API with JWT and API key auth. Fully programmatic.</p>
            </div>

            {/* Easy Withdrawals */}
            <div className="px-6 sm:px-8 py-8 transition-colors duration-300 hover:bg-white/[0.015] sm:border-r border-white/[0.06]">
              <div className="mb-5 h-[100px] rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-center overflow-hidden">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-[10px] font-mono text-white/50">SP</div>
                  <div className="flex items-center gap-1">
                    <div className="w-5 h-px bg-white/[0.1]" />
                    <svg className="w-3 h-3 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    <div className="w-5 h-px bg-white/[0.1]" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center">
                    <Wallet className="w-3.5 h-3.5 text-white/50" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
              <h3 className="text-[14px] font-semibold text-text-primary tracking-[-0.01em] mb-1.5">Easy Withdrawals</h3>
              <p className="text-[13px] text-text-secondary leading-relaxed">Withdraw to any Solana wallet instantly. Flat 0.001 SOL network fee.</p>
            </div>

            {/* QR & Pay Links */}
            <div className="px-6 sm:px-8 py-8 transition-colors duration-300 hover:bg-white/[0.015]">
              <div className="mb-5 h-[100px] rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-center overflow-hidden">
                <div className="grid grid-cols-5 grid-rows-5 gap-[3px]">
                  {[
                    1,1,1,0,1,
                    1,0,1,1,0,
                    1,1,1,0,1,
                    0,1,0,1,1,
                    1,0,1,1,1,
                  ].map((filled, i) => (
                    <div
                      key={i}
                      className={`w-[8px] h-[8px] rounded-[2px] ${filled ? 'bg-white/[0.2]' : 'bg-white/[0.04]'}`}
                    />
                  ))}
                </div>
              </div>
              <h3 className="text-[14px] font-semibold text-text-primary tracking-[-0.01em] mb-1.5">QR & Pay Links</h3>
              <p className="text-[13px] text-text-secondary leading-relaxed">Shareable payment links and Solana Pay compatible QR codes.</p>
            </div>
          </div>
        </Section>

        {/* How it works */}
        <Section>
          <div className="border-t border-white/[0.06] px-6 sm:px-10 py-16">
            <p className="text-[12px] font-medium text-text-tertiary uppercase tracking-widest mb-2">How it works</p>
            <h2 className="text-2xl font-bold text-text-primary tracking-[-0.03em]">Three steps to get paid</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-white/[0.06]">
            {/* 01 - Connect */}
            <div className="px-6 sm:px-8 py-8 md:border-r border-white/[0.06]">
              <div className="mb-5 h-[100px] rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-center overflow-hidden">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.06] flex items-center justify-center">
                    <svg className="w-4 h-4 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" /></svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <div className="text-[9px] font-mono text-white/40">Connected</div>
                    </div>
                    <div className="text-[9px] font-mono text-white/25">9WzD...xBb4</div>
                  </div>
                </div>
              </div>
              <div className="text-[11px] font-mono font-medium text-text-tertiary/60 tracking-wider mb-3">01</div>
              <h3 className="text-[16px] font-semibold text-text-primary tracking-[-0.02em] mb-1.5">Connect</h3>
              <p className="text-[13px] text-text-secondary leading-relaxed">Sign in with Phantom or Solflare. Your wallet becomes your merchant identity.</p>
            </div>

            {/* 02 - Create */}
            <div className="px-6 sm:px-8 py-8 md:border-r border-white/[0.06]">
              <div className="mb-5 h-[100px] rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-center overflow-hidden px-5">
                <div className="w-full space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-[9px] font-mono text-white/30">Amount</div>
                    <div className="text-[9px] font-mono text-white/50">2.5 SOL</div>
                  </div>
                  <div className="w-full h-px bg-white/[0.06]" />
                  <div className="flex items-center justify-between">
                    <div className="text-[9px] font-mono text-white/30">Order</div>
                    <div className="text-[9px] font-mono text-white/50">ORD-1842</div>
                  </div>
                  <div className="w-full h-px bg-white/[0.06]" />
                  <div className="flex justify-end">
                    <div className="px-2 py-0.5 rounded bg-white/[0.08] text-[8px] font-mono text-white/50">Create →</div>
                  </div>
                </div>
              </div>
              <div className="text-[11px] font-mono font-medium text-text-tertiary/60 tracking-wider mb-3">02</div>
              <h3 className="text-[16px] font-semibold text-text-primary tracking-[-0.02em] mb-1.5">Create</h3>
              <p className="text-[13px] text-text-secondary leading-relaxed">Generate payment links via dashboard or API. Share the link or QR code.</p>
            </div>

            {/* 03 - Get Paid */}
            <div className="px-6 sm:px-8 py-8">
              <div className="mb-5 h-[100px] rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-center overflow-hidden">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400/80">Confirmed</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[18px] font-bold text-white/70 tracking-tight">+2.5</span>
                    <span className="text-[10px] font-mono text-white/30">SOL</span>
                  </div>
                </div>
              </div>
              <div className="text-[11px] font-mono font-medium text-text-tertiary/60 tracking-wider mb-3">03</div>
              <h3 className="text-[16px] font-semibold text-text-primary tracking-[-0.02em] mb-1.5">Get Paid</h3>
              <p className="text-[13px] text-text-secondary leading-relaxed">Payments confirm on-chain and credit your balance. Withdraw anytime.</p>
            </div>
          </div>
        </Section>

        {/* Developers */}
        <Section id="developers">
          <div className="border-t border-white/[0.06] px-6 sm:px-10 py-16">
            <p className="text-[12px] font-medium text-text-tertiary uppercase tracking-widest mb-2">Developers</p>
            <h2 className="text-2xl font-bold text-text-primary tracking-[-0.03em]">Built API-first</h2>
            <p className="mt-2 text-[14px] text-text-secondary max-w-md">Integrate in minutes with our REST API. Simple auth, predictable responses, real-time webhooks.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-white/[0.06]">
            {/* REST API */}
            <div className="px-6 sm:px-8 py-8 hover:bg-white/[0.015] transition-colors duration-200 sm:border-r border-white/[0.06]">
              <div className="mb-5 h-[100px] rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-center overflow-hidden px-5">
                <div className="w-full space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-1 py-px rounded text-[8px] font-bold font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">GET</span>
                    <span className="text-[9px] font-mono text-white/35">/payments</span>
                    <span className="ml-auto text-[8px] font-mono text-emerald-400/60">200</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-1 py-px rounded text-[8px] font-bold font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20">POST</span>
                    <span className="text-[9px] font-mono text-white/35">/payments</span>
                    <span className="ml-auto text-[8px] font-mono text-emerald-400/60">201</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-1 py-px rounded text-[8px] font-bold font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">GET</span>
                    <span className="text-[9px] font-mono text-white/35">/withdrawals</span>
                    <span className="ml-auto text-[8px] font-mono text-emerald-400/60">200</span>
                  </div>
                </div>
              </div>
              <h3 className="text-[14px] font-semibold text-text-primary tracking-[-0.01em] mb-1.5">REST API</h3>
              <p className="text-[13px] text-text-secondary leading-relaxed">Create payments, check status, manage withdrawals. JWT or API key auth.</p>
            </div>

            {/* Webhooks */}
            <div className="px-6 sm:px-8 py-8 hover:bg-white/[0.015] transition-colors duration-200">
              <div className="mb-5 h-[100px] rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-center overflow-hidden px-5">
                <div className="w-full space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[9px] font-mono text-white/40">payment.confirmed</span>
                    <span className="ml-auto text-[8px] font-mono text-white/20">2s ago</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span className="text-[9px] font-mono text-white/40">payment.pending</span>
                    <span className="ml-auto text-[8px] font-mono text-white/20">14s ago</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[9px] font-mono text-white/40">withdrawal.completed</span>
                    <span className="ml-auto text-[8px] font-mono text-white/20">1m ago</span>
                  </div>
                </div>
              </div>
              <h3 className="text-[14px] font-semibold text-text-primary tracking-[-0.01em] mb-1.5">Webhooks</h3>
              <p className="text-[13px] text-text-secondary leading-relaxed">Get notified on every payment status change. Signed payloads.</p>
            </div>
          </div>
          <div className="border-t border-white/[0.06] px-6 sm:px-8 py-4">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-[13px] text-text-tertiary hover:text-text-primary transition-colors font-medium"
            >
              Read the full documentation
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </Section>

        {/* Pricing */}
        <Section id="pricing">
          <div className="border-t border-white/[0.06] px-6 sm:px-10 py-16">
            <p className="text-[12px] font-medium text-text-tertiary uppercase tracking-widest mb-2">Pricing</p>
            <h2 className="text-2xl font-bold text-text-primary tracking-[-0.03em]">Simple, transparent</h2>
            <p className="mt-2 text-[14px] text-text-secondary">No hidden fees. No monthly charges. Pay only when you get paid.</p>
          </div>
          <div className="border-t border-white/[0.06]">
            <div className="px-6 sm:px-10 py-12 text-center">
              <span className="text-5xl font-bold text-text-primary tracking-[-0.05em]">1%</span>
              <p className="mt-1.5 text-text-secondary text-[13px]">per confirmed payment</p>
            </div>
            <div className="border-t border-white/[0.06]">
              {[
                ['Platform fee', '1%'],
                ['Withdrawal fee', '0.001 SOL'],
                ['Monthly fee', 'Free'],
                ['Setup fee', 'Free'],
                ['Payment limits', 'None'],
              ].map(([label, value], i, arr) => (
                <div key={label} className={`flex items-center justify-between px-6 sm:px-10 py-3.5 text-[13px] ${i < arr.length - 1 ? 'border-b border-white/[0.04]' : ''}`}>
                  <span className="text-text-secondary">{label}</span>
                  <span className="text-text-primary font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* CTA */}
        <Section>
          <div className="border-t border-white/[0.06] relative overflow-hidden">
            <div className="absolute inset-0 dot-grid opacity-20" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_100%_at_50%_100%,rgba(255,255,255,0.03),transparent)]" />
            <div className="relative px-6 sm:px-10 py-24 text-center">
              <h2 className="text-3xl font-bold tracking-[-0.04em] leading-tight">
                <span className="gradient-text">Start accepting SOL</span>
                <br />
                <span className="text-text-tertiary">in under a minute</span>
              </h2>
              <p className="mt-4 text-text-secondary text-[14px] max-w-sm mx-auto leading-relaxed">
                Connect your wallet, create a payment, share the link.
              </p>
              <div className="mt-8">
                <Link
                  to="/login"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-full text-[14px] font-medium hover:bg-white/90 transition-all duration-150 active:scale-[0.97] cursor-pointer"
                >
                  Get Started Free
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* Footer */}
      <footer className="py-8 px-6">
        <div className="max-w-[1000px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-text-tertiary" />
              <span className="text-[12px] text-text-tertiary">PayZen</span>
            </div>
            <span className="text-[12px] text-text-tertiary/50">Beta</span>
          </div>
          <div className="flex items-center gap-5">
            <Link to="/terms" className="text-[12px] text-text-tertiary hover:text-text-secondary transition-colors">Terms</Link>
            <Link to="/privacy" className="text-[12px] text-text-tertiary hover:text-text-secondary transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
