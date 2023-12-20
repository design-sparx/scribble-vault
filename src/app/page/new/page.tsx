import { PageEditor } from '@/components/PageEditor';
import { Button, Flex, Paper, PaperProps, Stack } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';

const PAPER_PROPS: PaperProps = {
  px: 'md',
  shadow: 'md',
  withBorder: true,
};

export default function NewPage() {
  return (
    <>
      <title>New page</title>
      <Stack mt="md" align="flex-start">
        <PageEditor {...PAPER_PROPS} w="100%" />
        <Flex gap="xs" mt="md">
          <Button variant="filled" leftSection={<IconDeviceFloppy size={18} />}>
            Save
          </Button>
          <Button>Cancel</Button>
        </Flex>
      </Stack>
    </>
  );
}
