import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Home from './components/WeatherForecast';
import SqlFileDataList from './components/SqlFileDataComponent';
import Earnings from './components/Earning';
import Deductions from './components/WeatherForecast';
import AllReports from './components/WeatherForecast';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'pension',
        element: <SqlFileDataList />,
      },
      {
        path: 'earnings',
        element: <Earnings />,
      },
      {
        path: 'deductions',
        element: <Deductions />,
      },
      {
        path: 'all-reports',
        element: <AllReports />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
