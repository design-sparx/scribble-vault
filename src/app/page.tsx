'use client';
import { Box, Flex, Loader, SimpleGrid, Text, Title } from '@mantine/core';
import { usePaginatePages } from '@/hooks';
import { BentoGrid } from '@/components/BentoGrid/BentoGrid';
import { PagesCard } from '@/components/PagesCard';
import { Empty } from '@/components/Empty';

export default function Home() {
  const { size, setSize, isReachingEnd, pages, isLoadingMore, error } =
    usePaginatePages(24);

  return (
    <Box>
      <Title order={2}>Notes</Title>
      {isLoadingMore && <Loader />}
      {pages.length > 0 ? (
        <>
          {pages.length > 0 && (
            <>
              <Text fz="sm" tt="uppercase" c="dimmed" my="md">
                Pinned
              </Text>
              <BentoGrid pages={pages.slice(7, 14)} loading={isLoadingMore} />
            </>
          )}
          <Text fz="sm" tt="uppercase" c="dimmed" my="md">
            Others
          </Text>
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
        </>
      ) : (
        <Empty />
      )}
    </Box>
  );
}
