const goodNotificationStyle = {
  color: 'green',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}

const badNotificationStyle = {
  color: 'red',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}

const Notification = ({ message, notificationStatus }) => {
  if (message === null) {
    return null
  }

  const notificationStyle = notificationStatus?
    badNotificationStyle : goodNotificationStyle

  return (
    <div className='notification' style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification
