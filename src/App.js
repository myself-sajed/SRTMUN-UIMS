import React from 'react'
import { Toaster } from 'react-hot-toast'
import RoutesHandler from './pages/RoutesHandler'
import { QueryClient, QueryClientProvider, } from 'react-query'

const App = () => {

  const queryClient = new QueryClient()


  return (
    <>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <RoutesHandler />
      </QueryClientProvider>

    </ >
  )
}

export default App