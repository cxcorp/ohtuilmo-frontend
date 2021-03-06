import React from 'react'
import { connect } from 'react-redux'
import Topic from './Topic'
import TopicEditPage from './TopicEditPage'
import viewTopicPageActions from '../reducers/actions/viewTopicPageActions'
import topicService from '../services/topic'
import './ViewTopicPage.css'

class ViewTopicPage extends React.Component {
  async componentDidMount() {
    const id = this.props.match.params.id
    try {
      const topic = await topicService.getOne(id)
      this.props.setTopic(topic)
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
      var admin = false
      if (loggedInUser) {
        admin = loggedInUser.user.admin === true
      }
      if (admin || isNaN(id)) {
        this.props.setEditable(true)
      }
    } catch (e) {
      console.log(e)
    }
  }

  changePage = () => {
    this.props.setEditMode(true)
  }

  render() {
    //only try to render topic contents when state has been set
    if (!this.props.topic) {
      return <div />
    }
    return (
      <div className="topic-view-page-container">
        {this.props.isOnEditMode ? (
          <TopicEditPage
            topic={this.props.topic.content}
            id={this.props.match.params.id}
          />
        ) : (
          <Topic
            content={this.props.topic.content}
            isEditable={this.props.isEditable}
            onPageChange={this.changePage}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    topic: state.viewTopicPage.topic,
    isEditable: state.viewTopicPage.isEditable,
    isOnEditMode: state.viewTopicPage.isOnEditMode
  }
}

const mapDispatchToProps = {
  ...viewTopicPageActions
}

const ConnectedViewTopicPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewTopicPage)

export default ConnectedViewTopicPage
