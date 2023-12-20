import {
  Box,
  Modal,
  ModalProps,
  TextInput,
  Button,
  Flex,
  TagsInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, { message: 'Name should have at least 2 letters' }),
  icon: z.string().url({ message: 'Invalid url' }),
  tags: z.string().array().max(5),
});

type EditWorkspaceModalProps = ModalProps;

export const EditWorkspaceModal = ({ ...others }: EditWorkspaceModalProps) => {
  const form = useForm({
    initialValues: { name: '', icon: '', tags: [] },

    validate: zodResolver(schema),
  });

  return (
    <Modal title="Edit" {...others}>
      <form onSubmit={form.onSubmit(console.log)}>
        <Flex gap="xs" direction="column">
          <TextInput
            label="Name"
            placeholder="name"
            {...form.getInputProps('name')}
          />
          <TextInput
            label="Icon"
            placeholder="icon"
            {...form.getInputProps('icon')}
          />
          <TagsInput
            label="Tags"
            placeholder="enter tag"
            description="Max of 5 tags allowed"
            {...form.getInputProps('tags')}
          />
          <Flex gap="xs">
            <Button type="submit" variant="filled">
              Save
            </Button>
            <Button onClick={others.onClose}>Cancel</Button>
          </Flex>
        </Flex>
      </form>
    </Modal>
  );
};
