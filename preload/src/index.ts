import localtunnel from 'localtunnel'
import axios from 'axios'

declare global {
  interface Window {
    localtunnel: typeof localtunnel
  }
}

axios.interceptors.request.use(
  function (config) {
    // 解决 localtrunnel 返回 401 问题
    config.headers['Bypass-Tunnel-Reminder'] = 'true'
    return config
  }
)

window.localtunnel = localtunnel