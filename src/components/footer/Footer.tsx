import { useAppSelector } from 'hooks/useAppSelector';
import { FC } from 'react';

export const Footer: FC = () => {
  const selectedNames = useAppSelector((state) => state.select.selectedNames);

  return <div>{!!selectedNames.length && <h3>{selectedNames.length} are selected</h3>}</div>;
};
