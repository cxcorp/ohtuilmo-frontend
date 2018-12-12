import React from 'react'
import { connect } from 'react-redux'
import topicFormPageActions from '../reducers/actions/topicFormPageActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import './TopicForm.css'

const TopicForm = (props) => {
  return (
    <div className="topic-form">
      <div className="preview-button">
        <Button
          variant="contained"
          color="primary"
          onClick={() => props.updatePreview(true)}
        >
          Preview
        </Button>
      </div>
      <form onSubmit={props.onSubmit}>
        <div>
          <TextField
            fullWidth
            required
            label="Title / Aihe"
            margin="normal"
            value={props.content.title}
            onChange={(e) => props.updateTitle(e.target.value)}
          />
        </div>
        <div>
          <TextField
            fullWidth
            required
            label="Customer / Asiakas"
            margin="normal"
            value={props.content.customerName}
            onChange={(e) => props.updateCustomerName(e.target.value)}
          />
        </div>
        <div>
          <TextField
            type="email"
            fullWidth
            required
            label="Contact email / Yhteyshenkilön sähköpostiosoite"
            margin="normal"
            value={props.content.email}
            onChange={(e) => props.updateEmail(e.target.value)}
          />
        </div>
        <p>
          The fields below have Markdown support. / Seuraavia kenttiä voi
          muotoilla Markdown-notaatiolla. (<a href='https://guides.github.com/features/mastering-markdown/'>Markdown instructions / Markdown ohjeet</a>)
        </p>
        <div>
          <TextField
            fullWidth
            required
            label="Description / Aiheen kuvaus"
            multiline
            rows={props.isEditForm ? '' : 7}
            margin="normal"
            value={props.content.description}
            onChange={(e) => props.updateDescription(e.target.value)}
          />
        </div>
        <div>
          <TextField
            fullWidth
            required
            label="Implementation environment / Toteutusympäristö"
            multiline
            rows={props.isEditForm ? '' : 7}
            margin="normal"
            value={props.content.environment}
            onChange={(e) => props.updateEnvironment(e.target.value)}
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="Special requests / Erityisvaatimukset"
            multiline
            rows={props.isEditForm ? '' : 7}
            margin="normal"
            value={props.content.specialRequests}
            onChange={(e) => props.updateSpecialRequests(e.target.value)}
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="Additional info / Lisätietoja"
            multiline
            rows={props.isEditForm ? '' : 7}
            margin="normal"
            value={props.content.additionalInfo}
            onChange={(e) => props.updateAdditionalInfo(e.target.value)}
          />
        </div>
        <div className="form-buttons">
          <div className="form-button">
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              {props.submitButtonText}
            </Button>
          </div>
          {props.isEditForm && (
            <div className="form-button">
              <Button
                variant="contained"
                color="primary"
                onClick={props.onCancel}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  ...topicFormPageActions
}

const ConnectedTopicForm = connect(
  null,
  mapDispatchToProps
)(TopicForm)

export default ConnectedTopicForm
