import { cn } from '@/lib/utils';

const BetIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 64 64"
      className={cn('svg-icon size-4 icon-neutral-weak', className)}
    >
      <title></title>
      <path d="M59.732 0H4.266A4.266 4.266 0 0 0 0 4.266V60c0 2.21 1.79 4 4 4h56c2.21 0 4-1.79 4-4V4.266A4.266 4.266 0 0 0 59.734 0zM17.998 50.24l-8-8 4.266-4.266 3.866 3.894 9.734-9.866 4.266 4.266zm0-20-8-8 4.134-4.374 3.866 3.894 9.866-9.894 4.266 4.266zm36 14.774h-14v-6.026h14zm0-20h-14v-6.026h14z"></path>
    </svg>
  );
};

export default BetIcon;
