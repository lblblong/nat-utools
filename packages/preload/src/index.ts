import localtunnel from 'localtunnel'

declare global {
  interface Window {
    localtunnel: typeof localtunnel
  }
}

window.localtunnel = localtunnel
