import { App } from 'App';
import { Params } from 'api/api.consts';
import { Details } from 'components/details/Details';
import { NotFound } from 'components/notFound/NotFound';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import 'styles/styles.scss';

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

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
