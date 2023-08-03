const Notification = ({ message, error }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={error ? 'error' : 'note'}>
      {message}
    </div>
  )
}

export default Notification
