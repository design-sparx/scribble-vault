import { Spotlight, SpotlightProps } from '@mantine/spotlight';
import { IconSearch } from '@tabler/icons-react';

type SearchSpotlightProps = SpotlightProps;

export const SearchSpotlight = ({ ...others }: SearchSpotlightProps) => {
  return (
    <Spotlight
      {...others}
      nothingFound="Nothing found..."
      highlightQuery
      searchProps={{
        leftSection: <IconSearch size={20} />,
        placeholder: 'Search...',
      }}
    />
  );
};
