import { Box, Modal, ModalProps, TextInput, Button, Flex } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
});

type ShareModalProps = ModalProps;

export const ShareModal = ({ ...others }: ShareModalProps) => {
  const form = useForm({
    initialValues: { email: '' },

    validate: zodResolver(schema),
  });

  return (
    <Modal title="Share options" {...others}>
      <form onSubmit={form.onSubmit(console.log)}>
        <Flex align="flex-end" gap="xs">
          <TextInput
            label="Email"
            placeholder="Email"
            style={{ flex: 1 }}
            {...form.getInputProps('email')}
          />
          <Button type="submit" variant="filled">
            Invite
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};
