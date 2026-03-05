import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { QHIcon } from '../ui/QHIcon';
import { TEXT } from '../../constants/text';
import { ROUTES } from '../../constants/routes';

interface SidebarNavItem {
  label: string;
  icon: string;
  path: string;
}

const NAV_ITEMS: SidebarNavItem[] = [
  { label: TEXT.dashboard.overview, icon: 'dashboard', path: ROUTES.dashboard },
  { label: TEXT.dashboard.jobs, icon: 'briefcase', path: ROUTES.dashboardJobs },
  { label: TEXT.dashboard.applicants, icon: 'users', path: ROUTES.dashboardApplicants },
  { label: TEXT.dashboard.messages, icon: 'message', path: ROUTES.dashboardMessages },
  { label: TEXT.dashboard.settings, icon: 'settings', path: ROUTES.dashboardSettings },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-white border-r border-neutral-300 transition-all duration-300 z-40 ${
        isCollapsed ? 'w-20' : 'w-64'
      } hidden md:flex flex-col`}
    >
      {/* Logo and Toggle */}
      <div className="flex items-center justify-between h-20 px-6 border-b border-neutral-300">
        {!isCollapsed && (
          <Link to={ROUTES.home} className="flex items-center">
            <span className="text-xl font-logo font-bold text-neutral-900">
              QuickHire
            </span>
          </Link>
        )}
        <button
          type="button"
          onClick={toggleCollapse}
          className="p-2 rounded-lg text-neutral-700 hover:bg-tertiary transition-colors duration-200"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!isCollapsed}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isCollapsed ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-6 overflow-y-auto">
        <ul className="space-y-2 px-3">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.path);
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors duration-200 ${
                    active
                      ? 'bg-primary text-white'
                      : 'text-neutral-700 hover:bg-tertiary hover:text-primary'
                  }`}
                  aria-current={active ? 'page' : undefined}
                  title={isCollapsed ? item.label : undefined}
                >
                  <QHIcon
                    name={item.icon}
                    size="md"
                    className={active ? 'text-white' : 'text-neutral-700'}
                  />
                  {!isCollapsed && (
                    <span className="text-body font-medium">{item.label}</span>
                  )}
                  {active && !isCollapsed && (
                    <div className="ml-auto w-1 h-6 bg-white rounded-full" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="border-t border-neutral-300 p-4">
        <div
          className={`flex items-center gap-3 ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
            JD
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-body-sm font-semibold text-neutral-900 truncate">
                John Doe
              </p>
              <p className="text-body-sm text-neutral-600 truncate">
                john@company.com
              </p>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <button
            type="button"
            className="w-full mt-3 flex items-center gap-2 px-3 py-2 rounded-lg text-neutral-700 hover:bg-tertiary transition-colors duration-200"
            aria-label={TEXT.dashboard.logout}
          >
            <QHIcon name="logout" size="sm" className="text-neutral-700" />
            <span className="text-body-sm font-medium">
              {TEXT.dashboard.logout}
            </span>
          </button>
        )}
      </div>
    </aside>
  );
}
