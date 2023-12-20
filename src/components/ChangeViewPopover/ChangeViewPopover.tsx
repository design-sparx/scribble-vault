import {
  Button,
  ButtonProps,
  Popover,
  PopoverProps,
  Select,
  Text,
  TextInput,
} from '@mantine/core';
import { IconLayout } from '@tabler/icons-react';

type ChangeViewPopoverProps = { buttonProps?: ButtonProps } & PopoverProps;

export const ChangeViewPopover = ({
  buttonProps,
  ...others
}: ChangeViewPopoverProps) => {
  return (
    <Popover {...others}>
      <Popover.Target>
        <Button leftSection={<IconLayout size={18} />} {...buttonProps}>
          View
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <form action="">
          <TextInput label="Change view" />
        </form>
      </Popover.Dropdown>
    </Popover>
  );
};
