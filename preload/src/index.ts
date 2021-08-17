import localtunnel from 'localtunnel'
import axios from 'axios'

declare global {
  interface Window {
    localtunnel: typeof localtunnel
    axios: typeof axios
  }
}

window.localtunnel = localtunnel
window.axios = axios
