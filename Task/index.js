import React, { Component } from 'react'
import classNames from 'classnames'

import { withModal } from 'components'
import { FileUpload } from 'features/SIFCourseLessons/components/FileUpload'

import styles from './Task.module.css'

class Task extends Component {
  render() {
    const {
      id,
      position,
      name,
      answer,
      photos,
      video,
      onChange,
      handleOnBlur,
      taskType,
      status,
      fromCurator,
      studentLessonId,
      studentTask,
      courseId,
      openModal,
      deletePhotoAction,
      taskAction,
      lessonStatus
    } = this.props
    return (
      <div className={styles.tasksContainer}>
        <div className={styles.taskItem}>
          <div className={styles.taskItemNumber}>{position}</div>
          <div className={styles.taskItemName}>{name}</div>
        </div>

        {fromCurator && status === 'ready' && (
          <div className={styles.taskStatusContainer}>
            <div
              className={classNames(styles.readyTaskStatus, styles.reopened)}
              onClick={() => taskAction('reopen')}
            >
              
            </div>
            <div className={styles.readyTaskStatus} onClick={() => taskAction('completed')}>
              
            </div>
          </div>
        )}

        <div
          className={classNames(styles.taskStatus, {
            [styles.reopened]: status === 'reopen'
          })}
        >
          {status === 'completed' ? '' : status === 'reopen' && ''}
        </div>

        {video && (
          <div className={styles.videoContainer}>
            <video src={video} controls className={styles.videoPlayer} />
          </div>
        )}

        {photos && !!photos.length && (
          <div className={styles.imagesContainer}>
            {photos.map((photo) => (
              <div
                key={photo.id}
                className={styles.imageContainer}
                onClick={() =>
                  openModal(<img src={photo.photo} alt="" />, {
                    withoutCloseButton: false,
                    closeOnButtonClick: true,
                    isImage: true
                  })
                }
              >
                <img src={photo.photo} className={styles.image} alt="" />
                {(lessonStatus === 'reopen' || lessonStatus === 'pending') && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation()
                      deletePhotoAction(photo.id)
                    }}
                    className={styles.imageDelete}
                  >
                    
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        <div className={styles.taskAnswer}>
          {fromCurator || lessonStatus === 'completed' || lessonStatus === 'ready' ? (
            <div>{answer}</div>
          ) : (
            taskType === 'text' && (
              <input
                type="text"
                name="answer"
                className={classNames(styles.editInput, styles.editVideoInput)}
                placeholder="Ответ"
                value={answer}
                onChange={onChange}
                onBlur={handleOnBlur}
              />
            )
          )}

          {taskType === 'image' && (lessonStatus === 'reopen' || lessonStatus === 'pending') && (
            <FileUpload
              taskType={taskType}
              studentTask={studentTask}
              taskId={id}
              studentLessonId={studentLessonId}
              courseId={courseId}
            />
          )}

          {taskType === 'video' && (lessonStatus === 'reopen' || lessonStatus === 'pending') && (
            <FileUpload
              taskType={taskType}
              studentTask={studentTask}
              taskId={id}
              studentLessonId={studentLessonId}
              courseId={courseId}
            />
          )}
        </div>
      </div>
    )
  }
}

export const WrappedTask = withModal(Task)
