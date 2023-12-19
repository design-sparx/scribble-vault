import {
  Box,
  px,
  SimpleGrid,
  Skeleton,
  Stack,
  useMantineTheme,
} from '@mantine/core';
import { IPage } from '@/types';
import { PagesCard } from '../PagesCard';

const BASE_HEIGHT = 500;

const getChild = (height: number, page: IPage, loading?: boolean) => (
  <Skeleton visible={loading} height={height} radius="md" animate={true}>
    <PagesCard note={page} style={{ height }} lineClamp={1} />
  </Skeleton>
);

const getSubHeight = (children: number, spacing: number) =>
  BASE_HEIGHT / children - spacing * ((children - 1) / children);

type BentoGridProps = {
  pages: IPage[]; // limit to 7;
  loading?: boolean;
};

export const BentoGrid = ({ pages, loading }: BentoGridProps) => {
  const theme = useMantineTheme();
  return (
    <Box my="md">
      <SimpleGrid cols={{ base: 1, xs: 4 }}>
        <Stack>
          {getChild(
            getSubHeight(2, px(theme.spacing.md) as number),
            pages[0]!,
            loading
          )}
          {getChild(
            getSubHeight(2, px(theme.spacing.md) as number),
            pages[0]!,
            loading
          )}
        </Stack>
        <Stack>
          {getChild(
            getSubHeight(3, px(theme.spacing.md) as number),
            pages[1]!,
            loading
          )}
          {getChild(
            getSubHeight(3, px(theme.spacing.md) as number),
            pages[2]!,
            loading
          )}
          {getChild(
            getSubHeight(3, px(theme.spacing.md) as number),
            pages[3]!,
            loading
          )}
        </Stack>
        <Stack>
          {getChild(
            getSubHeight(3, px(theme.spacing.md) as number),
            pages[3]!,
            loading
          )}
          {getChild(
            getSubHeight(3, px(theme.spacing.md) as number),
            pages[4]!,
            loading
          )}
          {getChild(
            getSubHeight(3, px(theme.spacing.md) as number),
            pages[5]!,
            loading
          )}
        </Stack>
        <Stack>
          {getChild(
            getSubHeight(2, px(theme.spacing.md) as number),
            pages[6]!,
            loading
          )}
          {getChild(
            getSubHeight(2, px(theme.spacing.md) as number),
            pages[6]!,
            loading
          )}
        </Stack>
      </SimpleGrid>
    </Box>
  );
};
