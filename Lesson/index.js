import React, { Component } from 'react'

import StudentAvatar from '@img/studentAvatar.png'
import classNames from 'classnames'

import { getLessonVideoUrl } from 'helpers'

import styles from './Lesson.module.css'
import { TaskChat } from '../TaskChat'

export class Lesson extends Component {
  renderVideo (lesson) {
    if (lesson.lessonVideo) {
      const url = getLessonVideoUrl(lesson.lessonVideo)
      if (url) {
        return (
          <div className={styles.videoContainer}>
            <iframe
              className={styles.video}
              title='video'
              src={url}
              frameBorder='0'
              allowFullScreen
            />
          </div>
        )
      }
    }
    if (lesson.embedVideo) {
      return (
        <div className={styles.videoContainer}>
          <iframe
            className={styles.video}
            title='video'
            src={lesson.embedVideo}
            frameBorder='0'
            allowFullScreen
          />
        </div>
      )
    }
    return null
  }

  render () {
    const {
      lesson,
      tasks,
      fromCurator,
      student,
      sumbmitAction,
      sendLessonProgress,
      isValid,
      isAccept
    } = this.props

    const { studentLessonId, lessonStatus } = lesson

    return (
      <React.Fragment>
        {this.renderVideo(lesson)}

        <div className={classNames('col-9 ml-auto mr-auto fr-view')}>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{
              __html: lesson.description
            }}
          />
        </div>

        {!!lesson.tasks.length && (
          <div className='col-9 ml-auto mr-auto'>
            <div className={styles.taskHeader}>Задание на день</div>
            <div className={styles.studentContainer}>
              {fromCurator && student ? (
                <div>
                  <img
                    className={styles.studenAvatar}
                    src={StudentAvatar}
                    alt=''
                  />
                  {student.fullName}
                </div>
              ) : (
                <div />
              )}

              <div className={styles.reviewButtons}>
                {!(lessonStatus === 'ready' && isValid) ? null : isAccept ? (
                  <div
                    className={classNames(
                      styles.curatorReviewButton,
                      styles.accept
                    )}
                    onClick={sendLessonProgress}
                  >
                    Принять
                  </div>
                ) : (
                  <div
                    className={styles.curatorReviewButton}
                    onClick={sendLessonProgress}
                  >
                    Отклонить
                  </div>
                )}

                {lessonStatus === 'completed' && (
                  <>
                    <div className={styles.curatorReviewStatusButton}>
                      Задание принято
                    </div>
                    {fromCurator && (
                      <div className={styles.taskCancelButton}></div>
                    )}
                  </>
                )}

                {lessonStatus === 'reopen' && (
                  <>
                    <div
                      className={classNames(
                        styles.curatorReviewStatusButton,
                        styles.canceled
                      )}
                    >
                      Задание не принято
                    </div>
                    {fromCurator && (
                      <div className={styles.taskCancelButton}></div>
                    )}
                  </>
                )}
              </div>
            </div>
            {tasks}

            {!fromCurator &&
              (lessonStatus === 'reopen' || lessonStatus === 'pending') && (
              <div
                className={styles.reviewButton}
                onClick={() => sumbmitAction(studentLessonId)}
              >
                  Отправить на проверку
              </div>
            )}
          </div>
        )}

        <TaskChat />
      </React.Fragment>
    )
  }
}
