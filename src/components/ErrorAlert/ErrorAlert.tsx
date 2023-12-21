import { IconInfoCircle } from '@tabler/icons-react';
import { Alert, AlertProps } from '@mantine/core';

type ErrorAlertProps = {
  message: string;
} & AlertProps;

export const ErrorAlert = ({ message, ...others }: ErrorAlertProps) => {
  const icon = <IconInfoCircle size={18} />;
  return (
    <Alert variant="light" color="red" title={others.title} icon={icon}>
      {message}
    </Alert>
  );
};
