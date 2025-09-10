import { useState } from 'react'
import './ColorPalette.css'

interface ColorPaletteProps {
  colorName: string
}

const ColorPalette = ({ colorName }: ColorPaletteProps) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const copyToClipboard = async (colorVar: string, index: number) => {
    try {
      await navigator.clipboard.writeText(colorVar)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  const getColorValue = (colorName: string, index: number) => {
    const element = document.createElement('div')
    element.style.backgroundColor = `var(--${colorName}-${index})`
    document.body.appendChild(element)
    const computedColor = window.getComputedStyle(element).backgroundColor
    document.body.removeChild(element)
    return computedColor
  }

  const colorIcons = {
    red: '🔴', volcano: '🌋', orange: '🟠', gold: '🟡', yellow: '🟨',
    lime: '🟢', green: '💚', cyan: '🔵', blue: '🔷', geekblue: '💙',
    purple: '🟣', magenta: '🩷', grey: '⚫'
  }

  return (
    <div className="color-palette">
      <div className="palette-header">
        <div className="palette-icon">
          {colorIcons[colorName as keyof typeof colorIcons] || '🎨'}
        </div>
        <h3 className="palette-title">{colorName}</h3>
        <div className="palette-primary" style={{ backgroundColor: `var(--${colorName}-6)` }}></div>
      </div>

      <div className="color-swatches">
        {Array.from({ length: 10 }, (_, i) => {
          const index = i + 1
          const colorVar = `--${colorName}-${index}`
          const isPrimary = index === 6

          return (
            <div
              key={index}
              className={`color-swatch ${isPrimary ? 'primary' : ''}`}
              style={{ backgroundColor: `var(${colorVar})` }}
              onClick={() => copyToClipboard(colorVar, index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              title={`点击复制 ${colorVar}`}
            >
              <div className="swatch-content">
                <div className="swatch-left">
                  <span className="swatch-index">{index}</span>
                  {isPrimary && <span className="primary-badge">Primary</span>}
                </div>

                <div className="swatch-center">
                  <div className="swatch-variable">{colorVar}</div>
                  <div className="swatch-value">{getColorValue(colorName, index)}</div>
                </div>

                <div className="swatch-right">
                  {copiedIndex === index ? (
                    <span className="copied-indicator">
                      <svg viewBox="0 0 24 24" width="16" height="16">
                        <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    </span>
                  ) : (
                    <span className="copy-icon">
                      <svg viewBox="0 0 24 24" width="16" height="16">
                        <path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                      </svg>
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ColorPalette
