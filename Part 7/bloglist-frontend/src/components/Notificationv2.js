/* eslint-disable */
import { useSelector } from 'react-redux'

import { Alert } from 'react-bootstrap'


const Notification = () => {
    const notification = useSelector(({notification}) => notification)    
    if (notification.message === null) {
        return null
      }
      if (notification.success===true){
        return (
          <Alert variant="success">
            {notification.message}
          </Alert>
        )
      } else {
        return (
          <Alert variant="danger">
            {notification.message}
          </Alert>
        )
      }
}

export default Notification