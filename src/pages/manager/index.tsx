import classNames from 'classnames'
import { Observer } from 'mobx-react'
import React from 'react'
import { Icon } from '../../components/icon'
import { NatState } from '../../model/nat'
import { StoreServer } from '../../store/server'
import styles from './index.module.scss'

export const IndexPage = () => {
  return (
    <Observer>
      {() => (
        <div className={styles.index}>
          <div className={styles.actions}>
            <div
              className={styles.action}
              onClick={() => utools.shellOpenExternal('https://github.com/lblblong/nat-utools')}
            >
              <Icon value="github-line" />
            </div>
            <div className={styles.action} onClick={() => StoreServer.openHelp()}>
              <Icon value="question-mark" />
            </div>
            <div className={styles.action} onClick={() => StoreServer.add()}>
              <Icon value="add-line" />
            </div>
          </div>
          <div className={styles.list}>
            {StoreServer.natList.map((it) => {
              return (
                <div
                  className={classNames(styles.item, {
                    [styles.active]: it.state === NatState.on,
                    [styles.loading]: it.state === NatState.loading,
                  })}
                  key={it.id}
                >
                  <div className={styles.lbox}>
                    <span className={styles.state}></span>
                    <span className={styles.name}>
                      {it.port}
                      {it.subdomain ? ` - ${it.subdomain}` : ''}
                    </span>
                    <span
                      className={styles.url}
                      onClick={() => {
                        utools.shellOpenExternal(it.url!)
                      }}
                    >
                      {it.url}
                    </span>
                  </div>

                  <div className={styles.rbox}>
                    <button className={classNames(styles.btn, styles.del)} onClick={() => StoreServer.del(it.id)}>
                      删除
                    </button>
                    <button
                      disabled={it.state === NatState.loading}
                      className={classNames(styles.btn)}
                      onClick={() => StoreServer.edit(it.id)}
                    >
                      编辑
                    </button>
                    <button className={classNames(styles.btn)} onClick={() => StoreServer.showLog(it.id)}>
                      查看日志
                    </button>
                    <button
                      disabled={!it.url}
                      className={classNames(styles.btn)}
                      onClick={() => {
                        utools.copyText(it.url!)
                        utools.showNotification('地址已成功复制到剪切板')
                      }}
                    >
                      复制地址
                    </button>
                    <button
                      disabled={it.state === NatState.loading}
                      className={styles.btn}
                      onClick={() => StoreServer.toggle(it.id)}
                    >
                      {it.state === NatState.off ? '启动服务' : '关闭服务'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </Observer>
  )
}
