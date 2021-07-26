import { Popups } from 'lbl-popups'
import { Observer } from 'mobx-react'
import { FC } from 'react'
import styles from './index.module.scss'

const Help: FC = () => {
  return (
    <Observer>
      {() => (
        <div className={styles.index}>
          <div className={styles.title}>关于内网穿透NAT</div>

          <div className={styles.content}>
            该 utools 扩展是基于 localtunnel 的封装，目前已在 GitHub 开源：
            <span className={styles.link} onClick={()=>utools.shellOpenExternal('https://github.com/lblblong/nat-utools')}>https://github.com/lblblong/nat-utools</span>
          </div>
        </div>
      )}
    </Observer>
  )
}

export function openHelp() {
  return Popups.open({
    el: Help,
    position: 'center',
  })
}
