let loadPromise

export function loadGoogleCharts() {
  if (typeof window === 'undefined') return Promise.resolve()

  const boot = () =>
    new Promise((resolve) => {
      window.google.charts.load('current', { packages: ['corechart', 'bar'] })
      window.google.charts.setOnLoadCallback(resolve)
    })

  if (window.google?.charts) return boot()

  if (loadPromise) return loadPromise

  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://www.gstatic.com/charts/loader.js'
    script.async = true
    script.onload = () => boot().then(resolve).catch(reject)
    script.onerror = () => reject(new Error('Google Charts 로드 실패'))
    document.head.appendChild(script)
  })
  return loadPromise
}
