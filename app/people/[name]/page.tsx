import { App } from 'App';
import { Details } from 'components/details/Details';

export default function Person({ params }: { params: { name?: string } }): JSX.Element {
  return (
    <App>
      <Details name={params.name} />
    </App>
  );
}
