import React from 'react'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import ScrollToTopButton from './components/ScrollToTopButton'
import RoutesHandler from './pages/RoutesHandler'
import './App.css'
import { QueryClient, QueryClientProvider, } from 'react-query'
const App = () => {
  const queryClient = new QueryClient()
  return (
    <div>
      <div className='fixed-bottom hidden sm:flex sm:justify-end -z-20'>
        <ScrollToTopButton />
      </div>
      <Toaster />
      <QueryClientProvider client={queryClient}>
      <RoutesHandler />
      </QueryClientProvider>
    </div >
  )
}

export default App