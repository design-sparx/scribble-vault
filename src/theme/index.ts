import {
  ActionIcon,
  createTheme,
  Loader,
  MantineColorsTuple,
} from '@mantine/core';

const brightOrangeColor: MantineColorsTuple = [
  '#fff1dc',
  '#fddbb1',
  '#f9c884',
  '#f5b854',
  '#f2ab26',
  '#d9830d',
  '#a95b06',
  '#793903',
  '#491c00',
  '#1c0600',
];

export const myTheme = createTheme({
  primaryColor: 'bright-orange',
  primaryShade: 6,
  colors: {
    'bright-orange': brightOrangeColor,
  },
  focusRing: 'auto',
  defaultRadius: 'lg',
  fontFamily: 'Open Sans, sans-serif',
  headings: { fontFamily: 'Open Sans, sans-serif' },
  components: {
    ActionIcon: ActionIcon.extend({
      defaultProps: {
        variant: 'subtle',
      },
    }),
    Loader: Loader.extend({
      defaultProps: {
        type: 'dots',
      },
    }),
  },
});
