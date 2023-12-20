import {
  ActionIcon,
  ActionIconProps,
  Badge,
  darken,
  Flex,
  isLightColor,
  lighten,
  Paper,
  PaperProps,
  rem,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { IPage } from '@/types';
import classes from './PagesCard.module.css';
import { colourNameToHex } from '@/utils';
import {
  IconArchive,
  IconBellPlus,
  IconDotsVertical,
  IconPhotoScan,
  IconPin,
  IconUserPlus,
} from '@tabler/icons-react';
import Link from 'next/link';
import { PATH_PAGE } from '@/constants/routes';

type NotesCardProps = {
  note: IPage;
  lineClamp?: number;
} & PaperProps;

const ICON_SIZE = 14;

const ACTION_PROPS: ActionIconProps = {
  size: 'md',
};

export const PagesCard = (props: NotesCardProps) => {
  const theme = useMantineTheme();
  const {
    note: { name, description, modified_date, color, id },
    lineClamp,
  } = props;
  const parsedColor = colourNameToHex(color);

  const PAPER_PROPS: PaperProps = {
    bg: lighten(parsedColor, 0.9),
    withBorder: true,
    className: classes.card,
    style: {
      height: '100%',
      borderColor: isLightColor(parsedColor)
        ? darken(parsedColor, 0.3)
        : lighten(parsedColor, 0.7),
    },
  };

  return (
    <Paper component={Link} href={PATH_PAGE.details(id)} {...PAPER_PROPS}>
      <ActionIcon className={classes.pinAction}>
        <IconPin size={ICON_SIZE} />
      </ActionIcon>
      <Stack gap="xs">
        <Text fz="md" fw={700} tt="capitalize" lineClamp={1}>
          {name}
        </Text>
        <Text lineClamp={lineClamp || 3} fz="sm">
          {description}
        </Text>
        <Flex gap="sm" wrap="wrap">
          {name
            .split(' ')
            .slice(0, 2)
            .map((n) => (
              <Badge key={n} variant="outline">
                {n}
              </Badge>
            ))}
        </Flex>
        <Flex gap="sm" className={classes.action}>
          <ActionIcon {...ACTION_PROPS}>
            <IconBellPlus size={ICON_SIZE} />
          </ActionIcon>
          <ActionIcon {...ACTION_PROPS}>
            <IconUserPlus size={ICON_SIZE} />
          </ActionIcon>
          <ActionIcon {...ACTION_PROPS}>
            <IconPhotoScan size={ICON_SIZE} />
          </ActionIcon>
          <ActionIcon {...ACTION_PROPS}>
            <IconArchive size={ICON_SIZE} />
          </ActionIcon>
          <ActionIcon {...ACTION_PROPS}>
            <IconDotsVertical size={ICON_SIZE} />
          </ActionIcon>
        </Flex>
      </Stack>
    </Paper>
  );
};
