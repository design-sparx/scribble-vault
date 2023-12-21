'use client';
import { usePageDetails } from '@/hooks';
import {
  Badge,
  Box,
  darken,
  Divider,
  Flex,
  isLightColor,
  lighten,
  Paper,
  PaperProps,
  Skeleton,
  Stack,
  Text,
} from '@mantine/core';
import { colourNameToHex } from '@/utils';
import { IconAlarm, IconCalendarTime, IconFlag } from '@tabler/icons-react';
import { PageEditor } from '@/components/PageEditor';
import { DateTimePicker } from '@mantine/dates';

import classes from './page.module.css';
import dayjs from 'dayjs';
import { ErrorAlert } from '@/components/ErrorAlert';

export default function PageDetailsPage({
  params,
}: {
  params: { pageId: string };
}) {
  const { pageData, pageError, pageLoading } = usePageDetails(params.pageId);
  const parsedColor = colourNameToHex(pageData?.color || '');

  const PAPER_PROPS: PaperProps = {
    bg: lighten(parsedColor, 0.9),
    py: 0,
    px: 'md',
    shadow: 'md',
    withBorder: true,
    classNames: { root: classes.card },
    style: {
      borderColor: isLightColor(parsedColor)
        ? darken(parsedColor, 0.3)
        : lighten(parsedColor, 0.6),
    },
  };

  if (pageLoading) {
    return (
      <Stack my="md">
        <Skeleton h={32} />
        <Skeleton h={200} />
        <Skeleton h={28} />
      </Stack>
    );
  }

  if (pageError) {
    return (
      <ErrorAlert title="Error loading page" message={pageError?.toString()} />
    );
  }

  return (
    <>
      <>
        <title>{pageData?.name}</title>
        <meta name="description" content={pageData?.description} />
      </>
      {pageData && (
        <Box className={classes.root}>
          <Stack>
            <Paper {...PAPER_PROPS}>
              <PageEditor
                title={pageData.name}
                description={pageData.description}
                content={pageData.content}
                pb="md"
              />

              <Divider
                color={
                  isLightColor(parsedColor)
                    ? darken(parsedColor, 0.3)
                    : lighten(parsedColor, 0.5)
                }
                label="Notes info"
                labelPosition="left"
              />

              <Stack py="md">
                <Flex justify="space-between">
                  <Flex gap="xs" wrap="wrap">
                    {pageData?.name.split(' ').map((n) => (
                      <Text key={n} component="a" href="#">
                        #{n}
                      </Text>
                    ))}
                  </Flex>
                  <Badge leftSection={<IconFlag size={12} />}>
                    {pageData.priority}
                  </Badge>
                </Flex>
              </Stack>

              <Divider
                color={
                  isLightColor(parsedColor)
                    ? darken(parsedColor, 0.3)
                    : lighten(parsedColor, 0.5)
                }
                label="Dates"
                labelPosition="left"
              />

              <Flex gap="sm" justify="space-between" py="md">
                <DateTimePicker
                  label="Set reminder"
                  dropdownType="modal"
                  minDate={new Date()}
                  value={dayjs(pageData.due_date, 'M/D/YYYY').toDate()}
                  leftSection={<IconAlarm size={14} />}
                />
                <DateTimePicker
                  label="Created"
                  dropdownType="modal"
                  minDate={new Date()}
                  value={dayjs(pageData.created_date, 'M/D/YYYY').toDate()}
                  leftSection={<IconCalendarTime size={14} />}
                  readOnly
                />
              </Flex>
            </Paper>
          </Stack>
        </Box>
      )}
    </>
  );
}
