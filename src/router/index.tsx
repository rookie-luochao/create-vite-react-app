import { Spin } from 'antd';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import routes from './routes';

export default function Router() {
  const router = createBrowserRouter(routes, {
    future: {
      // Normalize `useNavigation()`/`useFetcher()` `formMethod` to uppercase
      v7_normalizeFormMethod: true,
    },
  });

  return <RouterProvider fallbackElement={<Spin spinning />} router={router} />;
}
