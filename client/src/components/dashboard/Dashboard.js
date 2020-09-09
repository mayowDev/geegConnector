import React, {useEffect} from 'react'
import {connect} from 'react-redux';
import {getProfile} from '../../actions/profile'
import PropTypes from 'prop-types'

function Dashboard({getProfile, auth, profile}) {
    useEffect(()=>{
        getProfile()
    }, [])
    return (
        <div>
            Dashboard
        </div>
    )
}

Dashboard.propTypes = {
    getProfile: PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired,

}
const mapStateToProps = state =>({
    
    auth:state.auth,
    profile: state.profile
})
export default connect(mapStateToProps, {getProfile})(Dashboard)

