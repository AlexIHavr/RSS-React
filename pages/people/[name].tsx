import { Details } from 'components/details/Details';
import { Provider } from 'react-redux';
import { store } from 'reduxToolkit/store';

export default function Person(): JSX.Element {
  return (
    <Provider store={store}>
      <Details />
    </Provider>
  );
}
