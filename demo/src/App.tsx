import { useState, useEffect } from 'react'
import './App.css'
import ColorPalette from './components/ColorPalette'
import ThemeToggle from './components/ThemeToggle'
import Header from './components/Header'
import CodeExample from './components/CodeExample'

// 颜色配置
const colors = [
  'red', 'volcano', 'orange', 'gold', 'yellow', 'lime',
  'green', 'cyan', 'blue', 'geekblue', 'purple', 'magenta', 'grey'
]

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [searchTerm, setSearchTerm] = useState('')

  // 初始化主题
  useEffect(() => {
    const savedTheme = localStorage.getItem('nova-color-theme') as 'light' | 'dark'
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initialTheme = savedTheme || systemTheme

    setTheme(initialTheme)
    document.documentElement.setAttribute('data-theme', initialTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('nova-color-theme', newTheme)
  }

  // 过滤颜色
  const filteredColors = colors.filter(color =>
    color.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="app">
      <Header />
      <ThemeToggle theme={theme} onToggle={toggleTheme} />

      <main className="main-content">
        <section className="colors-section">
          <div className="section-header">
            <h2>
              <span className="section-icon">🎨</span>
              颜色调色板
            </h2>
            <p>科学的颜色生成算法，为每种基础颜色生成10个色阶，支持明亮和暗黑两种主题</p>

            <div className="search-container">
              <div className="search-input-wrapper">
                <svg className="search-icon" viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                <input
                  type="text"
                  placeholder="搜索颜色..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                {searchTerm && (
                  <button
                    className="clear-button"
                    onClick={() => setSearchTerm('')}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </button>
                )}
              </div>
              <div className="color-count">
                {filteredColors.length} / {colors.length} 种颜色
              </div>
            </div>
          </div>

          <div className="color-grid">
            {filteredColors.map(color => (
              <ColorPalette key={color} colorName={color} />
            ))}
          </div>

          {filteredColors.length === 0 && (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>未找到匹配的颜色</h3>
              <p>尝试搜索其他关键词，如 "blue"、"red" 等</p>
            </div>
          )}
        </section>

        <CodeExample />

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Nova Color System</h3>
              <p>科学的颜色生成算法，为现代Web应用提供完整的颜色解决方案。</p>
            </div>
            <div className="footer-section">
              <h4>特性</h4>
              <ul>
                <li>13种基础颜色</li>
                <li>130个颜色变量</li>
                <li>明亮/暗黑主题</li>
                <li>TypeScript支持</li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>资源</h4>
              <ul>
                <li><a href="#" onClick={(e) => e.preventDefault()}>GitHub</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>NPM</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>文档</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>更新日志</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Nova Color System. Made with ❤️ for developers.</p>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App
