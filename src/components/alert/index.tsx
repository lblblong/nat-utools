import { Popups, useController } from 'lbl-popups'
import { Observer } from 'mobx-react'
import { FC } from 'react'
import styles from './index.module.scss'

interface Props {
  title: React.ReactNode
  content: React.ReactNode
}

const Alert: FC<Props> = (props) => {
  const ctl = useController()
  return (
    <Observer>
      {() => (
        <div className={styles.index}>
          <div className={styles.title}>{props.title}</div>

          <div className={styles.content}>{props.content}</div>

          <div
            className={styles.btn}
            onClick={() => {
              ctl.close()
            }}
          >
            确定
          </div>
        </div>
      )}
    </Observer>
  )
}

export function openAlert(props: Props) {
  return Popups.open({
    el: Alert,
    position: 'center',
    props,
  })
}
