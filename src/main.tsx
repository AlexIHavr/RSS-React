import { App } from 'App';
import { NotFound } from 'components/notFound/NotFound';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import 'styles/styles.scss';

const router = createBrowserRouter([
  {
    path: import.meta.env.BASE_URL,
    element: <App />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
