import React from "react"

// eslint-disable-next-line react/prop-types
const ErrorMessage = ({message}) => {
	if (message) {
		return(
			<div className="errorMessage">{message}</div>
		)
	}

}

export default ErrorMessage
