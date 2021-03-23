import React, {Fragment} from 'react';
import Moment from 'react-moment'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {deletExperience} from '../../actions/profile'

const Experience = props => {
    const {experience, deletExperience} = props;
    const experiences = experience.map(exp=>(
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
            <td>
                <Moment format='DD/MM/YYYY'>{exp.from}</Moment> - {' '}
                {
                    exp.to === null ? ('Now') : 
                    <Moment format='DD/MM/YYYY'>{exp.to}</Moment>
                }
            </td>
            <td>
                <button className="btn btn-danger"
                onClick= {()=> deletExperience(exp._id)}>Delete</button>
            </td>
        </tr>
    ))
    return (
        <Fragment>
            <h2 className="my-2">Experience Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className='hide-sm'>Title</th>
                        <th className='hide-sm'>Years</th>
                        <th/>
                    </tr>
                </thead>
                <tbody>
                    {experiences}
                </tbody>
            </table>
        </Fragment>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deletExperience: PropTypes.func.isRequired
}

export default connect(null, {deletExperience}) (Experience)
