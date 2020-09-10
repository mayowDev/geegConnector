import React,{useState, Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createProfile} from '../../actions/profile'

const CreateProfile = props => {
    const {createProfile, history} = props;
    const [formData, setFormData] = useState({
        company:'',
        website:'',
        location:'',
        bio:'',
        status:'',
        skills:'',
        githubusername:'',
        youtube:'',
        facebook:'',
        twitter:'',
        instagram:'',
        linkedin:''
        
    });
    const [displaySocialInputs, toggleSocialInputs] = useState(false);
    const {
        company,
        website,
        location,
        bio,
        status,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,
        githubusername
    } = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = e =>{
        e.preventDefault();
        createProfile(formData, history)
    }
    return (
        <Fragment>
        <h1 className="large text-primary">Edit Your Profile</h1>
        <p className="lead">
          <i className="fa fa-user" /> Add some changes to your profile
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={e=> onSubmit(e)}>
          <div className="form-group">
            <select name="status" value={status} onChange={e => onChange(e)}>
              <option>* Select Professional Status</option>
              <option value="Developer">Developer</option>
              <option value="Junior Developer">Junior Developer</option>
              <option value="Senior Developer">Senior Developer</option>
              <option value="Manager">Manager</option>
              <option value="Student or Learning">Student or Learning</option>
              <option value="Instructor">Instructor or Teacher</option>
              <option value="Intern">Intern</option>
              <option value="Other">Other</option>
            </select>
            <small className="form-text">
              Give us an idea of where you are at in your career
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Company"
              name="company"
              value={company}
              onChange={e => onChange(e)}
            />
            <small className="form-text">
              Could be your own company or one you work for
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Website"
              name="website"
              value={website}
              onChange={e => onChange(e)}
            />
            <small className="form-text">
              Could be your own or a company website
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Location"
              name="location"
              onChange={e => onChange(e)}
              value={location}
            
            />
            <small className="form-text">
              City & state suggested (eg. Boston, MA)
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Skills"
              name="skills"
              value={skills}
              onChange={e => onChange(e)}
            />
            <small className="form-text">
              Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Github Username"
              name="githubusername"
              value={githubusername}
              onChange={e => onChange(e)}
            />
            <small className="form-text">
              If you want your latest repos and a Github link, include your
              username
            </small>
          </div>
          <div className="form-group">
            <textarea
              placeholder="A short bio of yourself"
              name="bio"
              value={bio}
              onChange={e => onChange(e)}
            />
            <small className="form-text">Tell us a little about yourself</small>
          </div>
  
          <div className="my-2">
            <button
              onClick={() => toggleSocialInputs(!displaySocialInputs)}
              type="button"
              className="btn btn-light"
            >
              Add Social Network Links
            </button>
            <span>Optional</span>
          </div>
          {displaySocialInputs && (
            <Fragment>
                <div className="form-group social-input">
                <i className="fa fa-twitter fa-2x" />
                <input
                    type="text"
                    placeholder="Twitter URL"
                    name="twitter"
                    value={twitter}
                    onChange={e => onChange(e)}
                />
                </div>

                <div className="form-group social-input">
                <i className="fa fa-facebook fa-2x" />
                <input
                    type="text"
                    placeholder="Facebook URL"
                    name="facebook"
                    value={facebook}
                    onChange={e => onChange(e)}
                />
                </div>

                <div className="form-group social-input">
                <i className="fa fa-youtube fa-2x" />
                <input
                    type="text"
                    placeholder="YouTube URL"
                    name="youtube"
                    value={youtube}
                    onChange={e => onChange(e)}
                />
                </div>

                <div className="form-group social-input">
                <i className="fa fa-linkedin fa-2x" />
                <input
                    type="text"
                    placeholder="Linkedin URL"
                    name="linkedin"
                    value={linkedin}
                    onChange={e => onChange(e)}
                />
                </div>

                <div className="form-group social-input">
                <i className="fa fa-instagram fa-2x" />
                <input
                    type="text"
                    placeholder="Instagram URL"
                    name="instagram"
                    value={instagram}
                    onChange={e => onChange(e)}
                //   onChange={onChange}
                />
                </div>
            </Fragment>
          )}
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </form>
      </Fragment>
    )
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,

}

const mapStateToProps = state =>({
    auth:state.auth
})

export default connect(null, {createProfile})(withRouter(CreateProfile));
