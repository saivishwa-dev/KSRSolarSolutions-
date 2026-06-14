import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Outlet, Link, createRootRouteWithContext } from '@tanstack/react-router'
import '../styles.css'

function NotFoundComponent() {
  return (
    <div style={{textAlign:'center',padding:'50px'}}>
      <h1>404 - Page not found</h1>
      <a href='/'>Go home</a>
    </div>
  )
}

export const Route = createRootRouteWithContext()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
})

function RootComponent() {
  return <Outlet />
}
