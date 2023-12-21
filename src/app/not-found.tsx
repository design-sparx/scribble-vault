'use client';
import { Container, Title, Text, Group, Button } from '@mantine/core';
import Link from 'next/link';
import classes from './not-found.module.css';

export default function NotFound() {
  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>You have found a secret place.</Title>
      <Text c="dimmed" size="md" ta="center" className={classes.description}>
        Unfortunately, this is only a 404 page. You may have mistyped the
        address, or the page has been moved to another URL.
      </Text>
      <Group justify="center">
        <Link href="/">
          <Button variant="subtle" size="md">
            Take me back to home page
          </Button>
        </Link>
      </Group>
    </Container>
  );
}
