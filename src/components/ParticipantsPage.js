import React from 'react'
import { connect } from 'react-redux'
import participantsPageActions from '../reducers/actions/participantsPageActions'
import notificationActions from '../reducers/actions/notificationActions'
import registrationService from '../services/registration'
import Button from '@material-ui/core/Button'

class ParticipantsPage extends React.Component {

  async componentWillMount() {
    try {
      if (window.localStorage.getItem('loggedInUser') === null) {
        window.location.replace(process.env.PUBLIC_URL + '/')
      } else {
        const token = JSON.parse(window.localStorage.getItem('loggedInUser'))
        if(!token.user.admin || token === undefined || token === null) {
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
      const fetchedRegistrations = await registrationService.getAll()
      //sorts topics based on timestamp
      const sortedRegistrations = fetchedRegistrations.sort((t1, t2) =>
        t1.createdAt > t2.createdAt ? -1 : t1.createdAt < t2.createdAt ? 1 : 0
      )
      this.props.updateRegistrations(sortedRegistrations)
    } catch (e) {
      console.log('error happened', e.response)
      this.props.setError('Some error happened')
      setTimeout(() => {
        this.props.clearNotifications()
      }, 3000)
    }
  }

  render() {
    return (
      <div className="participants-container">
        <div>
          <table>
            <tr>
              <th>id</th>
              <th>student_number</th>
              <th>preferred topic #1</th>
              <th>preferred topic #2</th>
              <th>preferred topic #3</th>
              <th>preferred topic #4</th>
              <th>preferred topic #5</th>
              <th></th>
              <th>created</th>
              <th>configuration</th>
            </tr>
            {this.props.registrations.map(registration => {
              <tr>
                <td>${registration.id}</td>
                <td>${registration.student_number}</td>
                <td>preferred topic #1</td>
                <td>preferred topic #2</td>
                <td>preferred topic #3</td>
                <td>preferred topic #4</td>
                <td>preferred topic #5</td>
                <td></td>
                <td>${registration.createdAt}</td>
                <td>${registration.configuration_id}</td>
              </tr>
            })
            }
          </table>
        </div>
        <div className="export-cvs-button">
          <Button variant="outlined">
            Export CVS-file
          </Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    registrations: state.participantsPage.registrations
  }
}

const mapDispatchToProps = {
  ...participantsPageActions,
  ...notificationActions
}

const ConnectedParticipantsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ParticipantsPage)

export default ConnectedParticipantsPage
