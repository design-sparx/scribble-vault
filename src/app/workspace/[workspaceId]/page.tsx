'use client';
import { usePaginatePages } from '@/hooks';
import { PagesCard } from '@/components/PagesCard';
import { Box, Flex, SimpleGrid, Stack, Text } from '@mantine/core';

export default function WorkspaceDetails({
  params,
}: {
  params: { workspaceId: string };
}) {
  const { size, setSize, isReachingEnd, pages, isLoadingMore, error } =
    usePaginatePages(24, { workspace_id: params.workspaceId });

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
      <Flex>
        <button
          disabled={isLoadingMore || isReachingEnd}
          onClick={() => setSize(size + 1)}
        >
          {isLoadingMore
            ? 'Loading...'
            : isReachingEnd
              ? 'No more posts'
              : 'Load more'}
        </button>
        <Text>{size}</Text>
      </Flex>
    </Box>
  );
}
