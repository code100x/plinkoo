import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface CommonTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  forceHide?: boolean;
  contentClassName?: string;
  arrowClassName?: string;
}

function CommonTooltip({
  children,
  content,
  open,
  onOpenChange = () => {
    void 0;
  },
  forceHide = false,
  contentClassName,
  arrowClassName,
}: CommonTooltipProps): JSX.Element {
  if (forceHide) {
    return <>{children}</>;
  }
  return (
    <TooltipProvider>
      <Tooltip
        {...{
          ...(open !== undefined && { onOpenChange, open }),
        }}
      >
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className={cn(
            'font-medium bg-brand-weak text-neutral-default',
            contentClassName
          )}
          arrowClassName={arrowClassName}
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default CommonTooltip;
