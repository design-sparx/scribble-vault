'use client';
import { usePageDetails } from '@/hooks';
import {
  Badge,
  Box,
  Divider,
  Flex,
  lighten,
  Paper,
  PaperProps,
  Stack,
  Text,
} from '@mantine/core';
import { colourNameToHex } from '@/utils';
import { IconAlarm, IconCalendarTime, IconFlag } from '@tabler/icons-react';
import { PageEditor } from '@/components/PageEditor';
import { DateTimePicker } from '@mantine/dates';

import classes from './page.module.css';
import dayjs from 'dayjs';

export default function PageDetailsPage({
  params,
}: {
  params: { pageId: string };
}) {
  const { pageData, pageError, pageLoading } = usePageDetails(params.pageId);
  const parsedColor = colourNameToHex(pageData?.color || '');

  const PAPER_PROPS: PaperProps = {
    bg: lighten(parsedColor, 0.9),
    p: 'md',
    shadow: 'md',
    withBorder: true,
    classNames: { root: classes.card },
    style: {
      borderColor: lighten(parsedColor, 0.6),
    },
  };

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
                py="md"
              />

              <Divider
                color={lighten(parsedColor, 0.5)}
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
                color={lighten(parsedColor, 0.5)}
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
