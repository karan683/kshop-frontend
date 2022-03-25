import React from 'react'

const Message = ({ variant, children }) => {
  return <div className={`${variant} p-3 mb-4`}>{children}</div>
}

Message.defaultProps = {
  variant: 'bg-green-200',
}

export default Message
