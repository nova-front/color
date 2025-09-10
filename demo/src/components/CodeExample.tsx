import { useState } from 'react'
import './CodeExample.css'

const CodeExample = () => {
  const [activeTab, setActiveTab] = useState<'css' | 'js' | 'install'>('install')
  const [copied, setCopied] = useState(false)

  const examples = {
    install: `# 安装 Nova Color System
npm install @nova-fe/color

# 或使用 yarn
yarn add @nova-fe/color

# 或使用 pnpm
pnpm add @nova-fe/color`,

    css: `/* 引入主题CSS */
@import '@nova-fe/color/dist/system/theme.css';

/* 使用颜色变量 */
.button {
  background-color: var(--blue-6);
  color: white;
  border: 1px solid var(--blue-7);
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  transition: all 0.2s ease;
}

.button:hover {
  background-color: var(--blue-7);
  transform: translateY(-1px);
}

/* 暗黑主题自动切换 */
[data-theme="dark"] .card {
  background-color: var(--grey-9);
  color: var(--grey-2);
  border: 1px solid var(--grey-7);
}

/* 响应式颜色 */
.alert-success {
  background-color: var(--green-1);
  border: 1px solid var(--green-3);
  color: var(--green-7);
}`,

    js: `// 导入TypeScript变量定义
import {
  lightThemeVariables,
  darkThemeVariables
} from '@nova-fe/color/dist/system/theme-variables';

// 手动主题切换
function toggleTheme() {
  const isDark = document.documentElement
    .getAttribute('data-theme') === 'dark';
  document.documentElement
    .setAttribute('data-theme', isDark ? 'light' : 'dark');
}

// 跟随系统主题
function followSystemTheme() {
  document.documentElement.removeAttribute('data-theme');
}

// 获取颜色值
const primaryBlue = lightThemeVariables['--blue-6']; // #1677FF
const darkBlue = darkThemeVariables['--blue-6']; // #1668dc

// React Hook 示例
function useTheme() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return { theme, toggleTheme };
}`
  }

  const tabIcons = {
    install: '📦',
    css: '🎨',
    js: '⚡'
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(examples[activeTab])
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  return (
    <section className="code-example">
      <div className="section-header">
        <h2>
          <span className="section-icon">💻</span>
          快速开始
        </h2>
        <p>几行代码即可集成完整的颜色系统</p>
      </div>

      <div className="code-container">
        <div className="tabs">
          {Object.keys(examples).map((tab) => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab as keyof typeof examples)}
            >
              <span className="tab-icon">{tabIcons[tab as keyof typeof tabIcons]}</span>
              <span className="tab-text">
                {tab === 'install' ? '安装' :
                 tab === 'css' ? 'CSS 使用' :
                 'JavaScript 使用'}
              </span>
            </button>
          ))}
        </div>

        <div className="code-content">
          <div className="code-header">
            <div className="code-title">
              {activeTab === 'install' ? 'Package Installation' :
               activeTab === 'css' ? 'CSS Integration' :
               'JavaScript Usage'}
            </div>
            <button
              className={`copy-button ${copied ? 'copied' : ''}`}
              onClick={copyToClipboard}
            >
              {copied ? (
                <>
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  已复制
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                  </svg>
                  复制代码
                </>
              )}
            </button>
          </div>
          <pre className="code-block">
            <code>{examples[activeTab]}</code>
          </pre>
        </div>
      </div>
    </section>
  )
}

export default CodeExample
