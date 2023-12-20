import {
  ActionIcon,
  Button,
  createTheme,
  Loader,
  MantineColorsTuple,
  Menu,
  Popover,
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
        variant: 'default',
        size: 'lg',
      },
    }),
    Button: Button.extend({ defaultProps: { variant: 'default' } }),
    Loader: Loader.extend({
      defaultProps: {
        type: 'dots',
      },
    }),
    Menu: Menu.extend({
      defaultProps: {
        shadow: 'lg',
        width: 200,
      },
    }),
    Popover: Popover.extend({
      defaultProps: {
        shadow: 'lg',
        width: 200,
      },
    }),
  },
});
