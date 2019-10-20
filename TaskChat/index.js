import React, { Component } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

import User from '@img/user.svg'
import { TaskChatItem } from '../TaskChatItem'
import styles from './TaskChat.module.css'

const messages = [
  {
    id: 0,
    name: 'Алина Шпак',
    createdAt: '5 дней назад',
    message:
      'Молодец, всё хорошо, но полное имя всё-таки добавь, а то непонятно как к тебе обращаться))',
    photo: User
  },
  {
    id: 1,
    name: 'Алина Кабаева',
    createdAt: '5 дней назад',
    message: 'Хорошо, я всё сделаю',
    photo: User
  },
  {
    id: 2,
    name: 'Алина Шпак',
    createdAt: '3 дня назад',
    message: 'Умница!',
    photo: User
  }
]

export class TaskChat extends Component {
  render () {
    return (
      <div className={styles.main}>
        <div className={'col-9 ml-auto mr-auto'}>
          {messages.map(message => (
            <TaskChatItem key={message.id} {...message} />
          ))}
          <div className={styles.answerContainer}>
            <img className={styles.image} src={User} alt='' />
            <TextareaAutosize
              minRows={3}
              className={styles.input}
              type='text'
            />
          </div>
        </div>
      </div>
    )
  }
}
