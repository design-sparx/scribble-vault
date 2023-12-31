'use client';
import { usePaginatePages } from '@/hooks';
import { PagesCard } from '@/components/PagesCard';
import {
  Box,
  Button,
  Center,
  SimpleGrid,
  Skeleton,
  Stack,
} from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';

export default function WorkspaceDetails({
  params,
}: {
  params: { workspaceId: string };
}) {
  const { size, setSize, isReachingEnd, pages, isLoadingMore, error } =
    usePaginatePages(12, { workspace_id: params.workspaceId });

  if (isLoadingMore) {
    return (
      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
        spacing={{ base: 'md', sm: 'sm', lg: 'lg' }}
        verticalSpacing={{ base: 'md', sm: 'sm', lg: 'lg' }}
        my="md"
      >
        {Array(20)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={200} />
          ))}
      </SimpleGrid>
    );
  }

  return (
    <Box component={Stack}>
      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
        spacing={{ base: 'md', sm: 'sm', lg: 'lg' }}
        verticalSpacing={{ base: 'md', sm: 'sm', lg: 'lg' }}
        my="md"
      >
        {pages?.map((page) => <PagesCard key={page.id} note={page} />)}
      </SimpleGrid>
      <Center py="md">
        <Button
          loading={isLoadingMore || isReachingEnd}
          onClick={() => setSize(size + 1)}
          rightSection={<IconChevronDown size={18} />}
        >
          {isLoadingMore
            ? 'Loading...'
            : isReachingEnd
              ? 'No more posts'
              : 'Load more'}
        </Button>
      </Center>
    </Box>
  );
}
