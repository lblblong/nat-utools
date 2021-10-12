import { Popups } from 'lbl-popups'
import { Observer } from 'mobx-react'
import { FC, useRef } from 'react'
import { StoreServer } from 'src/store/server'
import styles from './index.module.scss'

interface Props {
  id: number
}

const NatLog: FC<Props> = (props) => {
  const nat = StoreServer.getNatById(props.id)
  const indexRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const resetScroll = () => {
    setTimeout(() => {
      if (indexRef.current && contentRef.current) indexRef.current.scrollTop = contentRef.current.offsetHeight
    })
  }

  return (
    <Observer>
      {() => {
        resetScroll()
        return (
          <div className={styles.index} ref={indexRef}>
            <div className={styles.content} ref={contentRef}>
              {nat.logs.map((l) => {
                return <div className={styles.item}>{l}</div>
              })}
            </div>
          </div>
        )
      }}
    </Observer>
  )
}

export function openNatLog(props: Props) {
  return Popups.open({
    el: NatLog,
    props,
    position: 'right',
  })
}
