import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileExperience = props => {
    const {experience:{ company, title, location, description, from, to }} = props;
    return (
        <div>
            <p className="text-dark"><strong> Company: </strong>{company}</p>
            <p> <strong> Position: </strong> {title}</p>
            <p> <strong> Description: </strong> {description}</p>
            <p> <strong> Location: </strong> {location}</p>
            <p> 
                <strong> Date: </strong> 
                <Moment format='DD/MM/YYYY'>{from}</Moment> - {' '}
                {!to? 'Current': <Moment format='DD/MM/YYYY'>{to}</Moment>}
            </p>
            
        </div>
    )
}

ProfileExperience.propTypes = {
    experience: PropTypes.object.isRequired,

}

export default ProfileExperience
