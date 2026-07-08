import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
//受けとってるApp
//最初の文字が大文字だったらコンポーネント。
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* コンポーネントとして実行されている */}
    {/* タグは必ず閉じる 後ろ側に/ */}
    <App />
  </StrictMode>,
)
