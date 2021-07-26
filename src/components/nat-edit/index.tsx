import { Popups, useController } from 'lbl-popups'
import { Observer, useLocalStore } from 'mobx-react'
import { FC } from 'react'
import styles from './index.module.scss'

interface Props {
  defaultValue?: {
    port: number
    subdomain?: string
  }
}

const NatEdit: FC<Props> = (props) => {
  const ctl = useController()
  const localStore = useLocalStore(() => {
    return {
      port: props.defaultValue?.port || '',
      subdomian: props.defaultValue?.subdomain || '',
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
          <div
            className={styles.btn}
            onClick={() => {
              ctl.close({
                port: localStore.port,
                subdomain: localStore.subdomian,
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

export function openNatEdit(props?: Props): Promise<{
  port: number
  subdomain?: string
}> {
  return Popups.open({
    el: NatEdit,
    position: 'center',
    props
  })
}
