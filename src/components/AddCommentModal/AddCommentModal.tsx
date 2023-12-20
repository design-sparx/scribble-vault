import {
  Box,
  Modal,
  ModalProps,
  TextInput,
  Button,
  Flex,
  Textarea,
  Tabs,
  Timeline,
  Text,
  Stack,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import {
  IconGitBranch,
  IconGitCommit,
  IconGitPullRequest,
  IconMessageDots,
  IconMessages,
  IconTimeline,
} from '@tabler/icons-react';

const schema = z.object({
  message: z
    .string()
    .min(2, { message: 'Message should have at least 2 letters' }),
});

type ShareModalProps = ModalProps;

export const AddCommentModal = ({ ...others }: ShareModalProps) => {
  const form = useForm({
    initialValues: { email: '' },

    validate: zodResolver(schema),
  });

  return (
    <Modal {...others}>
      <Tabs defaultValue="comments" variant="outline">
        <Tabs.List>
          <Tabs.Tab value="comments" leftSection={<IconMessages size={20} />}>
            Comments
          </Tabs.Tab>
          <Tabs.Tab value="timeline" leftSection={<IconTimeline size={20} />}>
            Timeline
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="comments" pt="sm">
          <form onSubmit={form.onSubmit(console.log)}>
            <Stack gap="xs" align="flex-start">
              <Textarea
                label="Add comment"
                placeholder="add a message"
                w="100%"
                {...form.getInputProps('message')}
              />
              <Button type="submit" variant="filled">
                Comment
              </Button>
            </Stack>
          </form>
        </Tabs.Panel>

        <Tabs.Panel value="timeline" pt="sm">
          <Timeline active={1} bulletSize={24} lineWidth={2}>
            <Timeline.Item
              bullet={<IconGitBranch size={12} />}
              title="New branch"
            >
              <Text c="dimmed" size="sm">
                You&apos;ve created new branch{' '}
                <Text variant="link" component="span" inherit>
                  fix-notifications
                </Text>{' '}
                from master
              </Text>
              <Text size="xs" mt={4}>
                2 hours ago
              </Text>
            </Timeline.Item>

            <Timeline.Item bullet={<IconGitCommit size={12} />} title="Commits">
              <Text c="dimmed" size="sm">
                You&apos;ve pushed 23 commits to
                <Text variant="link" component="span" inherit>
                  fix-notifications branch
                </Text>
              </Text>
              <Text size="xs" mt={4}>
                52 minutes ago
              </Text>
            </Timeline.Item>

            <Timeline.Item
              title="Pull request"
              bullet={<IconGitPullRequest size={12} />}
              lineVariant="dashed"
            >
              <Text c="dimmed" size="sm">
                You&apos;ve submitted a pull request
                <Text variant="link" component="span" inherit>
                  Fix incorrect notification message (#187)
                </Text>
              </Text>
              <Text size="xs" mt={4}>
                34 minutes ago
              </Text>
            </Timeline.Item>

            <Timeline.Item
              title="Code review"
              bullet={<IconMessageDots size={12} />}
            >
              <Text c="dimmed" size="sm">
                <Text variant="link" component="span" inherit>
                  Robert Gluesticker
                </Text>{' '}
                left a code review on your pull request
              </Text>
              <Text size="xs" mt={4}>
                12 minutes ago
              </Text>
            </Timeline.Item>
          </Timeline>
        </Tabs.Panel>
      </Tabs>
    </Modal>
  );
};
