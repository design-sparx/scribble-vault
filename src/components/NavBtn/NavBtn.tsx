import { useRouter } from 'next/navigation';
import { Button, ActionIcon, Tooltip } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

type BackButtonProps = {
  action: 'back' | 'forward';
  asIcon?: boolean;
};

export const NavBtn = ({ action, asIcon }: BackButtonProps) => {
  const { back, forward } = useRouter();

  const icon = action === 'back' ? <IconChevronLeft /> : <IconChevronRight />;
  const label = action === 'back' ? 'Back' : 'Forward';

  const handleClick = () => {
    action === 'back' ? back() : forward();
  };

  return (
    <Tooltip
      label={action === 'back' ? 'click to go back' : 'click to go forward'}
    >
      {asIcon ? (
        <ActionIcon onClick={handleClick}>{icon}</ActionIcon>
      ) : (
        <Button onClick={handleClick} leftSection={icon}>
          {label}
        </Button>
      )}
    </Tooltip>
  );
};
