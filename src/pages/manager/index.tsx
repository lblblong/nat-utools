import classNames from 'classnames'
import { Observer } from 'mobx-react'
import React from 'react'
import { openAlert } from 'src/components/alert'
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
              <Icon value='github-line' />
            </div>
            <div className={styles.action} onClick={() => StoreServer.openHelp()}>
              <Icon value='question-mark' />
            </div>
            <div className={styles.action} onClick={() => StoreServer.add()}>
              <Icon value='add-line' />
            </div>
          </div>
          <div className={styles.list}>
            {StoreServer.natList.map((it) => {
              return (
                <div
                  className={classNames(styles.item, {
                    [styles.loading]: it.state === NatState.loading,
                    [styles.active]: it.state === NatState.on,
                  })}
                  key={it.id}
                >
                  <div className={styles.top}>
                    <div className={styles.lbox}>
                      <span className={styles.state}></span>
                    </div>

                    <div className={styles.cbox}>
                      <span className={styles.name}>
                        {it.local_host || 'localhost'}:{it.port}
                        {it.subdomain ? ` • ${it.subdomain}` : ''}
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
                      {/* {it.state === NatState.off && (
                      <button className={styles.btn} onClick={() => StoreServer.start(it.id)}>
                        启动服务
                      </button>
                    )} */}
                      <button
                        className={styles.btn}
                        onClick={() => {
                          it.state !== NatState.off ? StoreServer.stop(it.id) : StoreServer.start(it.id)
                        }}
                      >
                        {it.state !== NatState.off ? '关闭服务' : '启动服务'}
                      </button>
                    </div>
                  </div>
                  <div className={styles.bottom}>
                    <span
                      className={styles.url}
                      onClick={() => {
                        if (it.url) {
                          utools.shellOpenExternal(it.url)
                        } else {
                          openAlert({
                            title: '提示',
                            content: '请先启动服务',
                          })
                        }
                      }}
                    >
                      {it.url || `-`}
                    </span>
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
