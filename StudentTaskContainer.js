import React, { Component } from 'react'
import { compose, withApollo } from 'react-apollo'
import { withRouter } from 'react-router'

import { findCourseId } from '@helpers/urlUtils'
import { createStudentTask, updateStudentTask } from '../graphql'
import { WrappedTask } from '@features/CourseLessons/components/Task'

class StudentTaskContainer extends Component {
  state = {
    answer:
      this.props.studentTask && this.props.studentTask.answer ? this.props.studentTask.answer : ''
  }

  handleInputChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  deletePhotoAction = (photoId) => {
    const { studentTask, updateStudentTask } = this.props
    updateStudentTask({
      studentTaskId: studentTask.id,
      attributes: { removeImages: [photoId] }
    })
  }

  handleOnBlur = () => {
    const { answer } = this.state
    const { task, studentTask, studentLessonId, createStudentTask, updateStudentTask } = this.props

    if ((!studentTask && !answer) || (studentTask && answer === studentTask.answer)) {
      return
    }

    if (studentTask) {
      return updateStudentTask({
        studentTaskId: studentTask.id,
        attributes: { answer }
      })
    } else {
      return createStudentTask({
        studentLessonId,
        attributes: { answer, taskId: task.id }
      })
    }
  }

  render() {
    const { task, studentTask, studentLessonId, location, lessonStatus } = this.props
    const { answer } = this.state

    return (
      <WrappedTask
        {...task}
        answer={answer}
        handleOnBlur={this.handleOnBlur}
        onChange={this.handleInputChange}
        studentTask={studentTask}
        studentLessonId={studentLessonId}
        status={studentTask && studentTask.status}
        photos={studentTask && studentTask.photos}
        video={studentTask && studentTask.video}
        courseId={findCourseId(location)}
        deletePhotoAction={this.deletePhotoAction}
        lessonStatus={lessonStatus}
      />
    )
  }
}

export const WrappedStudentTaskContainer = compose(
  withApollo,
  withRouter,
  createStudentTask,
  updateStudentTask
)(StudentTaskContainer)
