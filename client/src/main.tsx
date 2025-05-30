import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { AuthProvider } from './context/AuthContext';

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
        <RouterProvider router={router} />
      </AuthProvider>
    </StrictMode>
  )
}
