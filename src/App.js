import React from 'react'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import ScrollToTopButton from './components/ScrollToTopButton'
import RoutesHandler from './pages/RoutesHandler'
import './App.css'
import { QueryClient, QueryClientProvider, } from 'react-query'
import { useLocation } from 'react-router-dom'

const App = () => {

  const queryClient = new QueryClient()
  const location = useLocation()


  return (
    <div className={location.pathname === "/" && 'dashboard-gradient'}>
      <div className='fixed-bottom hidden sm:flex sm:justify-end -z-20 '>
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