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
            <p>
              该 utools 扩展是基于 localtunnel 的封装，目前已在 GitHub 开源：
              <span
                className={styles.link}
                onClick={() => utools.shellOpenExternal('https://github.com/lblblong/nat-utools')}
              >
                https://github.com/lblblong/nat-utools
              </span>
            </p>
            <h4>使用说明：</h4>
            <p>
              点击右下角 +
              号按钮，输入你本地服务监听的端口号，如果需要自定义子域名则输入自定义的子域名，然后点击确定，即可获得可被外网访问的地址
            </p>
            <h4>状态说明：</h4>
            <p>
              <ul>
                <li>灰色：未启动</li>
                <li>灰蓝闪动：连接中</li>
                <li>蓝色：已启动</li>
              </ul>
            </p>
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
