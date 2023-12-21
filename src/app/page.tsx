'use client';
import {
  Box,
  Button,
  Center,
  SimpleGrid,
  Skeleton,
  Text,
  Title,
} from '@mantine/core';
import { usePaginatePages } from '@/hooks';
import { BentoGrid } from '@/components/BentoGrid/BentoGrid';
import { PagesCard } from '@/components/PagesCard';
import { Empty } from '@/components/Empty';
import { ErrorAlert } from '@/components/ErrorAlert';
import { IconChevronDown } from '@tabler/icons-react';

export default function Home() {
  const { size, setSize, isReachingEnd, pages, isLoadingMore, error } =
    usePaginatePages(20);

  return (
    <Box>
      <Title order={2} mb="md">
        Notes
      </Title>
      {error && (
        <ErrorAlert title="Error loading pages" message={error.toString()} />
      )}
      {isLoadingMore && (
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
      )}
      {pages.length > 0 ? (
        <>
          {pages.length > 0 && (
            <>
              <Text fz="sm" tt="uppercase" c="dimmed" mb="md">
                Pinned
              </Text>
              <BentoGrid pages={pages.slice(0, 10)} loading={isLoadingMore} />
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
        </>
      ) : (
        <Empty />
      )}
    </Box>
  );
}
