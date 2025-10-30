import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp() {
    if (typeof window === 'undefined') return

    // 作为首页全屏固定背景的视频
    const base = (import.meta && import.meta.env && import.meta.env.BASE_URL) ? import.meta.env.BASE_URL : '/'
    const srcPath = base.endsWith('/') ? `${base}hero-video.mp4` : `${base}/hero-video.mp4`

    const ensureBackgroundVideo = () => {
      const isHome = !!document.querySelector('.VPHomeHero')
      const existing = document.getElementById('bg-video-container')

      // 非首页时移除背景视频
      if (!isHome) {
        if (existing) existing.remove()
        return false
      }

      if (existing) return true

      const container = document.createElement('div')
      container.id = 'bg-video-container'
      container.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: -1;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        background: #000;
      `

      const video = document.createElement('video')
      video.className = 'bg-video-el'
      video.autoplay = true
      video.loop = true
      video.muted = true
      video.playsInline = true
      video.controls = false
      video.preload = 'metadata'
      video.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: cover;
        pointer-events: none;
        display: block;
      `

      const source = document.createElement('source')
      source.src = srcPath
      source.type = 'video/mp4'
      video.appendChild(source)

      video.addEventListener('loadeddata', () => {
        const p = video.play()
        if (p && typeof p.catch === 'function') p.catch(() => {})
      })

      container.appendChild(video)
      document.body.appendChild(container)
      return true
    }

    // 尝试插入并在后续路由变更时维持状态
    let attempts = 0
    const maxAttempts = 20
    const interval = setInterval(() => {
      attempts++
      ensureBackgroundVideo()
      if (attempts >= maxAttempts) clearInterval(interval)
    }, 300)
  }
}