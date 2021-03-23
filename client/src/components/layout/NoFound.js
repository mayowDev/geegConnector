import React, {Fragment} from 'react'

const NoFound = () => {
    return (
        <Fragment>
            <h1 className="x-large text-primary">
                <i className="fa fa-exclamation-triangle"/> Page Not Found
            </h1>
            <p className="large">Sorry, but this page doesn't exist</p>
            
        </Fragment>
    )
}

export default NoFound
