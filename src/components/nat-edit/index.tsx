import { Popups, useController } from 'lbl-popups'
import { Observer, useLocalStore } from 'mobx-react'
import { FC } from 'react'
import { Nat } from 'src/model/nat'
import styles from './index.module.scss'

type Data = Pick<Nat, 'port' | 'subdomain' | 'local_host'>

interface Props {
  defaultValue?: Data
}

const NatEdit: FC<Props> = (props) => {
  const ctl = useController()
  const localStore = useLocalStore(() => {
    return {
      port: props.defaultValue?.port || '',
      subdomian: props.defaultValue?.subdomain || '',
      local_host: props.defaultValue?.local_host || '',
      bindOnChange: (key: string) => {
        return (e: any) => {
          localStore[key] = e.target.value
        }
      },
    }
  })

  return (
    <Observer>
      {() => (
        <div className={styles.index}>
          <div className={styles.title}>创建内网穿透</div>
          <input
            placeholder="端口号"
            value={localStore.port}
            onChange={localStore.bindOnChange('port')}
            type="number"
          />
          <input
            placeholder="子域名（可选）"
            value={localStore.subdomian}
            onChange={localStore.bindOnChange('subdomian')}
          />
          <input
            placeholder="自定义HOST（可选）"
            value={localStore.local_host}
            onChange={localStore.bindOnChange('local_host')}
          />
          <div
            className={styles.btn}
            onClick={() => {
              ctl.close({
                port: localStore.port,
                subdomain: localStore.subdomian,
                local_host: localStore.local_host,
              })
            }}
          >
            确定
          </div>
        </div>
      )}
    </Observer>
  )
}

export function openNatEdit(props?: Props): Promise<Data> {
  return Popups.open({
    el: NatEdit,
    position: 'center',
    props,
  })
}
