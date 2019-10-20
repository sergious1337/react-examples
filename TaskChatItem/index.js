import React from 'react'

import styles from './TaskChatItem.module.css'

export const TaskChatItem = ({ photo, name, createdAt, message }) => {
  return (
    <div className={styles.main}>
      <img className={styles.image} src={photo} alt='' />
      <div className={styles.messageConteiner}>
        <div className={styles.header}>
          <div className={styles.name}>{name}</div>
          <div className={styles.createdAt}>{createdAt}</div>
        </div>
        <div className={styles.text}>{message}</div>
      </div>
    </div>
  )
}
