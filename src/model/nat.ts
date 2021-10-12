import { EventEmitter } from 'events'
import { makeAutoObservable } from 'mobx'
import { openAlert } from 'src/components/alert'

export enum NatState {
  on,
  off,
  loading,
}

export class Nat {
  constructor(it: Partial<Nat> = {}) {
    makeAutoObservable(this)

    if (!it.port) throw Error('请传入端口号')

    this.id = it.id || Date.now()
    this.subdomain = it.subdomain || undefined
    this.local_host = it.local_host || undefined
    this.port = it.port
  }

  id: number
  subdomain?: string
  local_host?: string
  port = 6600
  state = NatState.off
  tunnel?: EventEmitter & { url: string; close: () => void }
  url?: string
  logs: string[] = []

  async start() {
    try {
      if (this.state === NatState.loading) return
      this.state = NatState.loading
      this.log('启动中')
      this.tunnel = await window.localtunnel({
        port: this.port,
        subdomain: this.subdomain,
        local_host: this.local_host,
      })
      if (this.state !== NatState.loading) throw Error('主动关闭')
      this.url = this.tunnel.url
      this.state = NatState.on
      this.log(`启动成功：${this.url}`)

      const onRequest = (req: any) => {
        this.log(`${req.method} ${req.path}`)
      }

      const onError = (err: Error) => {
        console.log(this.id, err)
        this.log(err.message)
      }

      this.tunnel?.once('close', () => {
        this.tunnel?.off('error', onError)
        this.tunnel?.off('request', onRequest)
        this.reset()
        this.log('已关闭')
      })
      this.tunnel?.on('error', onError)
      this.tunnel?.on('request', onRequest)
    } catch (err) {
      this.state = NatState.off
      this.log('启动失败：' + err.message)
      openAlert({
        title: '启动失败',
        content: err.message,
      })
      throw err
    }
  }

  async stop() {
    if (this.state === NatState.off) return

    if (this.tunnel) {
      return new Promise<void>((ok) => {
        this.tunnel?.once('close', () => {
          ok()
        })
        this.tunnel?.close()
      })
    } else {
      this.reset()
    }
  }

  reset() {
    this.state = NatState.off
    this.tunnel = undefined
    this.url = ''
  }

  log(log: string) {
    this.logs.push(log)
    if (this.logs.length >= 1000) {
      this.logs = this.logs.slice(100)
    }
  }

  toJSON() {
    return {
      id: this.id,
      subdomain: this.subdomain,
      local_host: this.local_host,
      port: this.port,
    }
  }
}
