import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp() {
    if (typeof window === 'undefined') return

    // 移除任何遗留的调试面板，保持页面干净
    const oldDebug = document.getElementById('video-debug')
    if (oldDebug) oldDebug.remove()

    const tryInsertBottomVideo = () => {
      // 将视频容器插入到首页功能区（VPHomeFeatures）之后
      let container = document.getElementById('bottom-video-container')
      if (!container) {
        const features = document.querySelector('.VPHomeFeatures')
        const hero = document.querySelector('.VPHomeHero')
        const parent = document.querySelector('main') || document.body
        
        container = document.createElement('div')
        container.id = 'bottom-video-container'
        container.style.cssText = `
          width: 100%;
          min-height: 320px;
          position: relative;
          margin: 32px 0 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #111827;
          border-radius: 12px;
          overflow: hidden;
        `
        if (features) {
          features.insertAdjacentElement('afterend', container)
        } else if (hero) {
          hero.insertAdjacentElement('afterend', container)
        } else {
          parent.appendChild(container)
        }
      }

      if (container.querySelector('video.bottom-video-el')) {
        return true
      }

      const video = document.createElement('video')
      video.className = 'bottom-video-el'
      video.autoplay = true
      video.loop = true
      video.muted = true
      video.playsInline = true
      video.controls = true
      video.preload = 'metadata'
      
      video.style.cssText = `
        width: 86%;
        max-width: 900px;
        height: auto;
        border-radius: 12px;
        box-shadow: 0 8px 28px rgba(0,0,0,0.25);
        display: block;
      `

      const source = document.createElement('source')
      source.src = '/hero-video.mp4'
      source.type = 'video/mp4'
      video.appendChild(source)
      
      video.addEventListener('error', () => {
        const tip = document.createElement('div')
        tip.textContent = '视频加载失败：/hero-video.mp4'
        tip.style.cssText = 'color:#fff;background:#b00020;padding:8px 12px;border-radius:8px;margin-top:12px;'
        container.appendChild(tip)
      })
      video.addEventListener('loadeddata', () => {
        const p = video.play()
        if (p && typeof p.catch === 'function') p.catch(() => {})
      })
      
      container.appendChild(video)
      return true
    }

    // 尝试多次插入，兼容异步渲染
    let attempts = 0
    const maxAttempts = 12
    const interval = setInterval(() => {
      attempts++
      if (tryInsertBottomVideo() || attempts >= maxAttempts) {
        clearInterval(interval)
      }
    }, 300)
  }
}