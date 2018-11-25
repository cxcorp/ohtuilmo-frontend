import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ReactMarkdown from 'react-markdown'
import './Topic.css'

const Topic = ({ content, isEditable, onPageChange }) => {
  return (
    <div className="single-topic-container">
      <div className="block">
        <Typography variant="h4" id="title">
          {content.title}
        </Typography>
      </div>
      <div className="block">
        <Typography variant="h6">Customer</Typography>
        <Typography variant="body1">{content.customerName}</Typography>
      </div>
      <div className="block">
        <Typography variant="h6">Contact email</Typography>
        <Typography variant="body1">{content.email}</Typography>
      </div>
      <div className="block">
        <Typography variant="h6">Description</Typography>
        <ReactMarkdown>{content.description}</ReactMarkdown>
      </div>
      <div className="block">
        <Typography variant="h6">Implementation environment</Typography>
        <ReactMarkdown>{content.environment}</ReactMarkdown>
      </div>
      <div className="block">
        <Typography variant="h6">Special requests</Typography>
        <ReactMarkdown>{content.specialRequests}</ReactMarkdown>
      </div>
      <div className="block">
        <Typography variant="h6">Additional information</Typography>
        <ReactMarkdown>{content.additionalInfo}</ReactMarkdown>
      </div>
      {isEditable && (
        <div className="topic-edit-button">
          <Button variant="contained" color="primary" onClick={onPageChange}>
            Edit
          </Button>
        </div>
      )}
    </div>
  )
}

export default Topic
