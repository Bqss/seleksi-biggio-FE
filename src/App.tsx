import { RouterProvider } from 'react-router-dom';
import router from "@/routes";
import './App.css'
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './services/UseQuery';

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
