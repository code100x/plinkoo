import { ChevronRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ScrollNextButtonProps {
  onClick?: () => void;
}

function ScrollNextButton({ onClick }: ScrollNextButtonProps): JSX.Element {
  return (
    <Button
      className="bg-brand-weaker text-white rounded-none hover:bg-opacity-80 w-10 h-12 p-0 hover:bg-brand-weakest shadow-none"
      onClick={onClick}
    >
      <ChevronRightIcon className="size-4" strokeWidth={2.5} />
    </Button>
  );
}

export default ScrollNextButton;
