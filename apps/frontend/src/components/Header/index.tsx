import { Link, useNavigate } from '@tanstack/react-router';
import { Balance } from './Balance';
import { getAuthState } from '@/features/auth/store/authStore';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import BetsIcon from '@/assets/icons/bets';
import LogoutIcon from '@/assets/icons/logout';
import UserIcon from '@/assets/icons/user';
import { cn } from '@/lib/utils';
import { fetchGet } from '@/api/_utils/fetch';

enum SettingsDropdownItems {
  MY_BETS = 'my-bets',
  // SETTINGS = 'settings',
  LOGOUT = 'logout',
}

const settingsDropdownItems: Record<
  SettingsDropdownItems,
  { label: string; icon: React.ElementType }
> = {
  // [SettingsDropdownItems.SETTINGS]: {
  //   label: 'Settings',
  //   icon: Settings,
  //   path: '/settings',
  // },
  [SettingsDropdownItems.MY_BETS]: {
    label: 'My Bets',
    icon: BetsIcon,
  },
  [SettingsDropdownItems.LOGOUT]: {
    label: 'Logout',
    icon: LogoutIcon,
  },
};

const settingsDropdownItemsOrder = [
  SettingsDropdownItems.MY_BETS,
  SettingsDropdownItems.LOGOUT,
];

export function Header({
  openLoginModal = true,
}: {
  openLoginModal?: boolean;
}): JSX.Element {
  const { user, showLoginModal, setUser } = getAuthState();
  const navigate = useNavigate();

  const handleDropdownItemClick = async (item: SettingsDropdownItems) => {
    switch (item) {
      case SettingsDropdownItems.MY_BETS:
        navigate({ to: '/my-bets' });
        break;
      case SettingsDropdownItems.LOGOUT:
        try {
          await fetchGet('/api/v1/auth/logout', { withCredentials: true });
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          // Clear user state regardless of API response
          setUser(null);
          // Navigate to home page instead of reload for better UX
          navigate({ to: '/' });
        }
        break;
    }
  };

  return (
    <header className="w-full bg-brand-default lg:px-4 py-2.5 shadow-xl">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/casino/home">
          <img
            alt="SimCasino Logo"
            className="h-6 w-auto sm:block hidden"
            src="/sim-casino-logo.webp"
          />
          <img
            alt="SimCasino Mini Logo"
            className="h-6 w-auto sm:hidden"
            src="/sim-casino-mini-logo.png"
          />
        </Link>
        {user ? <Balance /> : null}
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer focus-visible:outline-none flex p-2">
              <UserIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white " sideOffset={12}>
              {settingsDropdownItemsOrder.map(item => {
                const { label, icon: Icon } = settingsDropdownItems[item];
                return (
                  <DropdownMenuItem
                    key={item}
                    className={cn(
                      'bg-transparent text-primary-foreground text-xs cursor-pointer font-semibold focus:bg-transparent focus:text-primary-foreground py-2.5 flex items-center gap-2'
                    )}
                    onClick={() => handleDropdownItemClick(item)}
                  >
                    <Icon className="size-3.5 icon-primary-foreground" />
                    {label}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            className="bg-brand-weaker hover:bg-brand-weakest rounded-sm text-xs text-primary"
            onClick={() => {
              openLoginModal
                ? showLoginModal()
                : navigate({ to: '/casino/home' });
            }}
          >
            Login
          </Button>
        )}
      </div>
    </header>
  );
}
