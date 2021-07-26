import { CSSProperties, FC } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  className?: string
  value?: string
  style?: CSSProperties
}

export const Icon: FC<Props> = (props) => {
  return <span style={props.style} className={classNames(styles.index, 'icon-' + props.value, props.className)} />
}

Icon.defaultProps = {
  value: 'star',
}
