import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="header-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
      </div>

      <div className="header-content">
        <div className="title-section">
          <div className="title-icon">
            <svg viewBox="0 0 100 100" className="logo-svg">
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--blue-5)" />
                  <stop offset="50%" stopColor="var(--purple-5)" />
                  <stop offset="100%" stopColor="var(--magenta-5)" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="45" fill="url(#logoGradient)" />
              <circle cx="35" cy="35" r="8" fill="var(--red-5)" />
              <circle cx="65" cy="35" r="8" fill="var(--orange-5)" />
              <circle cx="50" cy="65" r="8" fill="var(--green-5)" />
            </svg>
          </div>
          <h1 className="title">
            <span className="title-main">Nova</span>
            <span className="title-sub">Color System</span>
          </h1>
        </div>

        <p className="subtitle">
          科学的颜色生成算法 · 完美的主题切换 · 开发者友好的API
        </p>

        <div className="features">
          <div className="feature">
            <div className="feature-icon">⚡</div>
            <div className="feature-text">
              <h3>高性能</h3>
              <p>纯CSS变量，零运行时开销</p>
            </div>
          </div>
          <div className="feature">
            <div className="feature-icon">🎯</div>
            <div className="feature-text">
              <h3>精确算法</h3>
              <p>基于HSV色彩空间的科学生成</p>
            </div>
          </div>
          <div className="feature">
            <div className="feature-icon">🌙</div>
            <div className="feature-text">
              <h3>暗黑主题</h3>
              <p>智能混合算法，完美适配</p>
            </div>
          </div>
        </div>

        <div className="stats">
          <div className="stat">
            <div className="stat-number">13</div>
            <div className="stat-label">基础颜色</div>
          </div>
          <div className="stat">
            <div className="stat-number">130</div>
            <div className="stat-label">色彩变量</div>
          </div>
          <div className="stat">
            <div className="stat-number">2</div>
            <div className="stat-label">主题模式</div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
