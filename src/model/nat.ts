import { EventEmitter } from 'events'
import { makeAutoObservable } from 'mobx'

export enum NatState {
  on,
  off,
  loading,
}

export class Nat {
  constructor(it: Partial<Nat> = {}) {
    makeAutoObservable(this)
    if (it.subdomain === '') {
      delete it.subdomain
    }
    this.id = Date.now()
    Object.assign(this, it)
  }

  id: number
  state = NatState.off
  subdomain?: string
  port = 6600
  tunnel?: EventEmitter & { url: string; close: () => void }
  url?: string
  logs: string[] = []
}
