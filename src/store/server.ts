// import { proxy } from 'ajax-hook'
import localtunnel from 'localtunnel'
import { makeAutoObservable } from 'mobx'
import { openAlert } from 'src/components/alert'
import { openHelp } from 'src/components/help'
import { openNatEdit } from 'src/components/nat-edit'
import { openNatLog } from 'src/components/nat-log'
import { onPluginEnterCBParams } from 'utools-helper/@types/utools'
import { Nat, NatState } from '../model/nat'

declare global {
  interface Window {
    localtunnel: typeof localtunnel
  }
}

// proxy({
//   onRequest: (config, handler) => {
//     if (config) config.headers['Bypass-Tunnel-Reminder'] = 'true'
//     handler.next(config)
//   },
//   onError: (err, handler) => {
//     handler.next(err)
//   },
//   onResponse: (response, handler) => {
//     handler.next(response)
//   },
// })

function getStorageID() {
  return utools.getLocalId() + '_servers'
}

class Store {
  constructor() {
    makeAutoObservable(this)
    utools.onPluginEnter(this.onPluginEnter)
    utools.onPluginReady(() => {
      this.loadDb()
      if (this.natList.length === 0) {
        openHelp()
      }
    })
  }

  onPluginEnter = (params: onPluginEnterCBParams) => {}

  natList: Nat[] = []

  async add() {
    const data = await openNatEdit()
    const nat = new Nat(data)
    this.natList.push(nat)
    this.flushDb()
    this.start(nat.id)
  }

  getNatById(id: number) {
    return this.natList.find((it) => it.id === id)!
  }

  async start(id: number) {
    const nat = this.getNatById(id)
    await nat.start()
    if (nat.subdomain && nat.url!.indexOf('//' + nat.subdomain) === -1) {
      openAlert({
        title: '提示',
        content: '子域名被占用，已为您分配其他子域名',
      })
    }
  }

  async stop(id: number) {
    const nat = this.getNatById(id)
    await nat.stop()
  }

  async del(id: number) {
    await this.stop(id)
    this.natList = this.natList.filter((it) => it.id !== id)
    this.flushDb()
  }

  async edit(id: number) {
    const nat = this.getNatById(id)
    const originState = nat.state
    if (originState === NatState.loading) return
    if (originState === NatState.on) {
      await this.stop(id)
    }
    const data = await openNatEdit({
      defaultValue: nat.toJSON(),
    })
    nat.port = data.port
    nat.subdomain = data.subdomain
    nat.local_host = data.local_host
    this.flushDb()
    if (originState === NatState.on) {
      this.start(id)
    }
  }

  async showLog(id: number) {
    openNatLog({ id })
  }

  async openHelp() {
    openHelp()
  }

  toggle = async (id: number) => {
    const nat = this.getNatById(id)
    if (nat.state === NatState.on || nat.state === NatState.loading) {
      await this.stop(nat.id)
    } else {
      await this.start(nat.id)
    }
  }

  loadDb = () => {
    try {
      const it = utools.db.get<
        {
          id: number
          subdomain?: string
          port: number
        }[]
      >(getStorageID())
      if (!it || !it.data) return
      this.natList = it.data.map((d) => new Nat(d))
    } catch (err) {
      alert(err)
    }
  }

  flushDb() {
    let it = utools.db.get<
      {
        id: number
        subdomain?: string
        port: number
      }[]
    >(getStorageID())

    const data = this.natList.map((d) => d.toJSON())

    if (!it) {
      it = {
        _id: getStorageID(),
        data: data,
      }
    } else {
      it.data = data
    }

    const { ok, error } = utools.db.put(it)
    if (!ok) {
      throw Error(error)
    }
  }
}

export const StoreServer = new Store()
