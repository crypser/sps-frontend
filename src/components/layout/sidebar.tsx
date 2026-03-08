import { NavLink, Link } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { LayoutDashboard, CreditCard, ArrowDownToLine, Settings, BookOpen, PanelLeftClose, PanelLeft, Zap, LogOut } from 'lucide-react';
import { truncateAddress } from '../../utils/format';
import { useAuth } from '../../features/auth/auth-context';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/payments', label: 'Payments', icon: CreditCard },
  { to: '/withdrawals', label: 'Withdrawals', icon: ArrowDownToLine },
  { to: '/settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { publicKey, disconnect } = useWallet();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    disconnect();
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 bg-sidebar text-white flex flex-col border-r border-border-subtle z-40 transition-all duration-300 ${
        collapsed ? 'w-[68px]' : 'w-[240px]'
      }`}
    >
      {/* Logo + collapse toggle */}
      <div className={`flex items-center justify-between h-16 ${collapsed ? 'justify-center px-4' : 'px-5'}`}>
        <Link to="/" className="flex-shrink-0">
          <Zap className="w-5 h-5 text-white" />
        </Link>
        {!collapsed && (
          <button
            onClick={onToggle}
            className="text-white/40 hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-white/[0.04]"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        )}
        {collapsed && (
          <button
            onClick={onToggle}
            className="text-white/40 hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-white/[0.04]"
          >
            <PanelLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Main nav */}
      <nav className={`flex-1 mt-2 space-y-0.5 ${collapsed ? 'px-2' : 'px-3'}`}>
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/dashboard'}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl text-[13.5px] font-medium transition-all duration-200 cursor-pointer ${
                collapsed ? 'justify-center px-0 py-2.5' : 'px-3 py-2.5'
              } ${
                isActive
                  ? 'bg-white/[0.08] text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
              }`
            }
          >
            <Icon className="w-[18px] h-[18px] flex-shrink-0" />
            {!collapsed && label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom section */}
      <div className={`space-y-1 ${collapsed ? 'px-2' : 'px-3'} pb-2`}>
        <NavLink
          to="/docs"
          className={({ isActive }) =>
            `group flex items-center gap-3 rounded-xl text-[13.5px] font-medium transition-all duration-200 cursor-pointer ${
              collapsed ? 'justify-center px-0 py-2.5' : 'px-3 py-2.5'
            } ${
              isActive
                ? 'bg-white/[0.08] text-white'
                : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
            }`
          }
        >
          <BookOpen className="w-[18px] h-[18px] flex-shrink-0" />
          {!collapsed && 'API Docs'}
        </NavLink>
      </div>

      {/* Profile + logout */}
      {publicKey && (
        <div className={`border-t border-border-subtle ${collapsed ? 'px-2 py-3' : 'px-4 py-3'}`}>
          {collapsed ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white">
                {publicKey.toBase58().slice(0, 2).toUpperCase()}
              </div>
              <button
                onClick={handleLogout}
                className="text-white/30 hover:text-red-400 transition-colors cursor-pointer p-1"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
                {publicKey.toBase58().slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium text-white/80 truncate font-mono tracking-tight">
                  {truncateAddress(publicKey.toBase58(), 5)}
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <p className="text-[11px] text-white/35 font-medium">Connected</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-white/30 hover:text-red-400 transition-colors cursor-pointer p-1 flex-shrink-0"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
