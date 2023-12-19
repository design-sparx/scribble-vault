'use client';
import { usePageDetails } from '@/hooks';
import {
  Badge,
  Box,
  Flex,
  Group,
  lighten,
  Paper,
  PaperProps,
  Stack,
  Text,
} from '@mantine/core';
import { colourNameToHex } from '@/utils';
import { DateView } from '@/components/DateView';
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
    bg: 'none',
    p: 'md',
    shadow: 'sm',
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
        <Box bg={lighten(parsedColor, 0.9)} className={classes.root}>
          <Stack>
            <Paper {...PAPER_PROPS}>
              <PageEditor
                title={pageData.name}
                description={pageData.description}
                content={pageData.content}
              />
            </Paper>

            <Paper {...PAPER_PROPS}>
              <Stack>
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
            </Paper>

            <Paper {...PAPER_PROPS}>
              <Flex gap="sm" justify="space-between">
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
