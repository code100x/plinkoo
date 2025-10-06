import { Link, Outlet, useLocation } from '@tanstack/react-router';
import {
  ChevronDownIcon,
  ChevronUp,
  ChevronUpIcon,
  ScaleIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { Header } from '@/components/Header';

const provablyFairRoutes = [
  {
    label: 'Overview',
    path: '/provably-fair',
  },
  {
    label: 'Implementation',
    path: '/provably-fair/implementation',
  },
  {
    label: 'Conversions',
    path: '/provably-fair/conversions',
  },
  {
    label: 'Game Events',
    path: '/provably-fair/game-events',
  },
  {
    label: 'Unhash Server Seed',
    path: '/provably-fair/unhash-server-seed',
  },
  {
    label: 'Calculation',
    path: '/provably-fair/calculation',
  },
];

function ProvablyFair(): JSX.Element {
  const { pathname } = useLocation();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      <Header openLoginModal={false} />
      <div className="container py-6">
        <div className="flex items-center gap-2">
          <ScaleIcon className="size-4 icon-neutral-weak" />
          <h2 className="font-semibold">Provably Fair</h2>
        </div>
        <div className="flex flex-col lg:grid grid-cols-6 gap-4 my-4 items-start">
          <div className="lg:flex flex-col col-span-1 bg-brand-stronger rounded-md py-2 hidden">
            {provablyFairRoutes.map(route => (
              <Link key={route.path} to={route.path}>
                <p
                  className={cn(
                    'text-sm font-medium text-neutral-default p-3 border-l-3 hover:bg-brand-strongest bg-transparent border-brand-stronger hover:border-l-brand-strongest',
                    {
                      'bg-brand-strongest  border-l-[#1475e1] hover:border-l-[#1475e1]':
                        route.path === pathname,
                    }
                  )}
                >
                  {route.label}
                </p>
              </Link>
            ))}
          </div>
          <DropdownMenu onOpenChange={setDropdownOpen} open={dropdownOpen}>
            <DropdownMenuTrigger className="bg-brand-stronger px-4 py-2 text-xs font-medium flex gap-2 items-center mt-2 rounded lg:hidden">
              <span>
                {
                  provablyFairRoutes.find(route => route.path === pathname)
                    ?.label
                }
              </span>
              {dropdownOpen ? (
                <ChevronUpIcon className="size-4 icon-neutral-weak" />
              ) : (
                <ChevronDownIcon className="size-4 icon-neutral-weak" />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-white "
              align="start"
              sideOffset={12}
            >
              {provablyFairRoutes.map(route => (
                <DropdownMenuItem
                  key={route.path}
                  asChild
                  className={cn(
                    'bg-transparent text-primary-foreground text-xs cursor-pointer font-semibold focus:bg-transparent focus:text-primary-foreground py-2',
                    { 'text-[#1475e1]': route.path === pathname }
                  )}
                >
                  <Link to={route.path}>{route.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="w-full flex flex-col col-span-5 p-2 lg:p-4 bg-brand-stronger rounded-md">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProvablyFair;
