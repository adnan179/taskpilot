import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
const router = createRouter({
    routeTree,
    defaultPreload: "intent",
})

declare module '@tanstack/react-router'{
  interface Register{
    router: typeof router
  }
}

const rootElement = document.getElementById("root")!
if(!rootElement.innerHTML){
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <AuthProvider>
        <ToastContainer ariaLabel="Toast" autoClose={5000} position="top-right" />
        <RouterProvider router={router} />
      </AuthProvider>
    </StrictMode>
  )
}
