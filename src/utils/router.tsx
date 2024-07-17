import { App } from 'App';
import { Params } from 'api/api.consts';
import { Details } from 'components/details/Details';
import { NotFound } from 'components/notFound/NotFound';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: import.meta.env.BASE_URL,
    element: <App />,
    children: [
      {
        path: `:${Params.NAME}`,
        element: <Details />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
