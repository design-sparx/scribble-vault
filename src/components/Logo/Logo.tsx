import { Flex, Image, rem, Text, UnstyledButton } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

type LogoProps = {
  withLabel?: boolean;
};

export const Logo = ({ withLabel }: LogoProps) => {
  const isMobile = useMediaQuery('(max-width: 769px)');

  return (
    <UnstyledButton>
      <Flex
        component="div"
        align="center"
        justify={isMobile ? 'flex-start' : 'space-between'}
        gap="sm"
      >
        <Image
          src={
            withLabel ? 'logo/logo-color.png' : '/logo/logo-no-background.png'
          }
          alt="scribble vault logo"
          h={rem(28)}
          w="auto"
          fit="contain"
        />
        {withLabel && <Text>Scribble Vault</Text>}
      </Flex>
    </UnstyledButton>
  );
};
