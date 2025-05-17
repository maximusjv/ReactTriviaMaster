import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'

import '@/index.css'
import App from '@/App'

import StartPage from '@pages/Start'
import TriviaBuilderPage  from '@pages/TriviaBuilder'
import ResultPage from '@pages/Result'
import GamePage from '@pages/Game'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<App/>}> 
          <Route index element={<StartPage/>} />
          <Route path="/build" element={<TriviaBuilderPage/>} />
          <Route path="/results" element={<ResultPage/>} />
          <Route path="/game" element={<GamePage/>} />
        </Route>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)