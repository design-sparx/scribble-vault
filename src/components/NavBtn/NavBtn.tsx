import { useRouter } from 'next/navigation';
import {
  Button,
  ActionIcon,
  Tooltip,
  ActionIconProps,
  ButtonProps,
} from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

type BackButtonProps = {
  action: 'back' | 'forward';
  iconSize: number;
  asIcon?: boolean;
  actionProps?: ActionIconProps;
  buttonProps?: ButtonProps;
};

export const NavBtn = (props: BackButtonProps) => {
  const { action, asIcon, buttonProps, actionProps, iconSize } = props;
  const { back, forward } = useRouter();

  const icon =
    action === 'back' ? (
      <IconChevronLeft size={iconSize} />
    ) : (
      <IconChevronRight size={iconSize} />
    );
  const label = action === 'back' ? 'Back' : 'Forward';

  const handleClick = () => {
    action === 'back' ? back() : forward();
  };

  return (
    <Tooltip
      label={action === 'back' ? 'click to go back' : 'click to go forward'}
    >
      {asIcon ? (
        <ActionIcon onClick={handleClick} {...actionProps}>
          {icon}
        </ActionIcon>
      ) : (
        <Button onClick={handleClick} leftSection={icon} {...buttonProps}>
          {label}
        </Button>
      )}
    </Tooltip>
  );
};
