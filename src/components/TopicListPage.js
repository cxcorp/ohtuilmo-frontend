import React from 'react'
import { connect } from 'react-redux'
import topicListPageActions from '../reducers/actions/topicListPageActions'
import notificationActions from '../reducers/actions/notificationActions'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Switch from '@material-ui/core/Switch'
import Divider from '@material-ui/core/Divider'
import topicService from '../services/topic'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'
import Grid from '@material-ui/core/Grid'

const buttonTheme = createMuiTheme({
  palette: {
    primary: green,
    secondary: red
  }
})

class TopicListPage extends React.Component {

  async componentWillMount() {
    try {
      if (window.localStorage.getItem('loggedInUser') === null) {
        window.location.replace(process.env.PUBLIC_URL + '/')
      } else {
        const token = JSON.parse(window.localStorage.getItem('loggedInUser'))
        if (!token.user.admin || token === undefined || token === null) {
          window.location.replace(process.env.PUBLIC_URL + '/')
        }
      }
    } catch (e) {
      console.log('error happened', e.response)
      this.props.setError('Some error happened')
      setTimeout(() => {
        this.props.clearNotifications()
      }, 3000)
    }
  }

  async componentDidMount() {
    try {
      const fetchedTopics = await topicService.getAll()
      //sorts topics based on timestamp
      const sortedTopics = fetchedTopics.sort((t1, t2) =>
        t1.createdAt > t2.createdAt ? -1 : t1.createdAt < t2.createdAt ? 1 : 0
      )
      this.props.updateTopics(sortedTopics)
    } catch (e) {
      console.log('error happened', e.response)
      this.props.setError('Some error happened')
      setTimeout(() => {
        this.props.clearNotifications()
      }, 3000)
    }
  }

  handleActiveChange = topic => async (event) => {
    event.preventDefault()
    try {
      topic.active = !topic.active
      const updatedTopics = this.props.topics.map(topic2 => { return topic2.id === topic.id ? topic : topic2 })
      await topicService.update(topic)
      this.props.updateTopics(updatedTopics)
      this.props.setSuccess('Topic update submitted succesfully!')
      setTimeout(() => {
        this.props.clearNotifications()
      }, 3000)
    } catch (e) {
      console.log('error happened', e.response)
      this.props.setError('Some error happened')
      setTimeout(() => {
        this.props.clearNotifications()
      }, 3000)
    }
  }

  handleFilterChange = event => {
    event.preventDefault()
    const filter = event.target.value
    if (filter === 'active' || filter === 'inactive') {
      this.props.updateFilter(filter)
    } else {
      this.props.updateFilter('all')
    }
  }

  showTopic = topic => {
    const filter = this.props.filter
    if (filter === 'active' || filter === 'inactive') {
      const active = filter === 'active'
      return topic.active === active
    } else {
      return true
    }
  }

  handleEmailButtonPress = topic => async (event) => {
    event.preventDefault()
    console.log(`You pressed: ${event.currentTarget.value}`)
    console.log(topic)
    console.log('No Email Sent, feature not implemented')
  }

  render() {
    return (
      <div>
        <Select
          value={this.props.filter}
          onChange={this.handleFilterChange}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </Select>
        <Grid container spacing={8} justify="flex-end">
          <Grid item xs={4}>
            <Typography align="right" variant="subtitle1">Send email</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography align="right" variant="subtitle1">Active</Typography>
          </Grid>
        </Grid>

        {this.props.topics.map(topic => {
          if (this.showTopic(topic)) {
            return (
              <List key={topic.id}>
                <ListItem>
                  <a href={process.env.PUBLIC_URL + '/topics/' + topic.id}>
                    <ListItemText primary={topic.content.title} />
                  </a>
                  <ListItemText primary={`${topic.content.customerName} (${topic.content.email})`} secondary={`created: ${topic.createdAt}`} />
                  <ListItemSecondaryAction>
                    <MuiThemeProvider theme={buttonTheme}>
                      <Button
                        color="primary"
                        variant="outlined"
                        value="Finnish-Yes"
                        onClick={this.handleEmailButtonPress(topic)}
                      >
                        Finnish-Yes
                      </Button>
                      <Button
                        color="secondary"
                        variant="outlined"
                        value="Finnish-No"
                        onClick={this.handleEmailButtonPress(topic)}
                      >
                        Finnish-No
                      </Button>
                      <Button
                        color="primary"
                        variant="outlined"
                        value="English-Yes"
                        onClick={this.handleEmailButtonPress(topic)}
                      >
                        English-Yes
                      </Button>
                      <Button
                        color="secondary"
                        variant="outlined"
                        value="English-No"
                        onClick={this.handleEmailButtonPress(topic)}
                      >
                        English-No
                      </Button>
                    </MuiThemeProvider>
                    <Switch
                      checked={topic.active}
                      onChange={this.handleActiveChange(topic)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider inset />
              </List>
            )
          } else {
            return null
          }
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    topics: state.topicListPage.topics,
    filter: state.topicListPage.filter
  }
}

const mapDispatchToProps = {
  ...topicListPageActions,
  ...notificationActions
}

const ConnectedTopicListPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicListPage)

export default ConnectedTopicListPage