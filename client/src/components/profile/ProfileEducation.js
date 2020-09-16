import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileEducation = props => {
    const {education:{ degree, school, fieldofstudy, description, current, from, to }} = props;
    return (
        <div>
            <p className="text-dark"><strong> School: </strong>{school}</p>
            <p> <strong> Degree: </strong> {degree}</p>
            <p> <strong> Field of Study: </strong> {fieldofstudy}</p>
            <p> 
                <strong> Date: </strong> 
                <Moment format='DD/MM/YYYY'>{from}</Moment> - {' '}
                {!to? 'Current': <Moment format='DD/MM/YYYY'>{to}</Moment>}
            </p>
            <p> <strong> Description: </strong> {description}</p>
            
            
        </div>
    )
}

ProfileEducation.propTypes = {
    education: PropTypes.object.isRequired,

}

export default ProfileEducation
