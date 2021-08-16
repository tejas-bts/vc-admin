
import React, {  useState, useEffect } from 'react';
import Toast, { ToastStates } from '../core/Toast';
import { createOrUpdateContact, fetchContactTypes } from '../../services/contacts.services';

function NewContact() {

  console.log("New Contact");

  const [ submitting, setSubmitting ] = useState(false);
  const [ showToast, setShowToast ] = useState(false);
  const [ toastAttr, setToastAttr ] = useState({});
  const [ contactDetails, setContact ] = useState({profileType: "native"});
  const [ contactTypes, setContactTypes ] = useState([]);


  const formatDate = (date) => {
    var today = new Date(date);
    var dd = today.getDate();

    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) dd='0'+dd; 
    if(mm<10) mm='0'+mm;

    return `${mm}-${dd}-${yyyy}`;
  }


  const handleInput = (e) => {
    const newContact = {...contactDetails}
    newContact[e.target.name] = e.target.value;
    setContact(newContact);
  }

  const onToastHide = () => {
    setShowToast(false);
  }

  useEffect(() => {
    fetchContactTypes()
      .then((contactTypes) => setContactTypes(contactTypes))
  }, [])

  
  useEffect(() => {
    console.log(contactDetails);
  }, [contactDetails])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit');
    setSubmitting(true);
    let newContact = contactDetails;
    newContact['yearOfBirth'] = formatDate(contactDetails.yearOfBirth)
    createOrUpdateContact(contactDetails)
      .then((response) =>{
        console.log('Error', response.data.error);
        if(response.data.error) {
          console.log("errororor")
          setToastAttr({...toastAttr, title:'Opps!', message: response.data.data[0], state: ToastStates.FAIL});
          setShowToast(true);
        }
        else {
          setToastAttr({...toastAttr, title:'Great!', message: 'Store added successfully', state: ToastStates.SUCCESS});
          setShowToast(true);
          e.target.reset();
        }
      })
      .catch((error) => {
        setToastAttr({...toastAttr, title:'Oops!', message: 'Something went wrong. Please try again after sometime', state: ToastStates.FAIL})
        setShowToast(true);
      })
      .finally(() => {
        setSubmitting(false);
      })
  }
  

  return (
    <div className="settings-wrapper">
    <Toast toastState={toastAttr.state} title={toastAttr.title} message={toastAttr.message} show={showToast} onClose={onToastHide}/>
    <div id="general-settings" className="settings-section is-active">
      <div className="settings-panel">
        <div className="title-wrap">
          <a className="mobile-sidebar-trigger">
            <i data-feather="menu" />
          </a>
          <h2>New Contact</h2>
        </div>
        <div className="settings-form-wrapper">
          <form className="settings-form" onSubmit={handleSubmit}>
            <div className="columns is-multiline">
              <div className="column is-6">
                {/*Field*/}
                <div className="field field-group">
                  <label>First Name</label>
                  <div className="control has-icon">
                    <input
                      type="text"
                      className="input is-fade"
                      name="firstName"
                      onChange={handleInput}
                      required
                    />
                    <div className="form-icon">
                      <i data-feather="user" />
                    </div>
                  </div>
                </div>
                {/*Field*/}
                <div className="field field-group">
                  <label>Email</label>
                  <div className="control has-icon">
                    <input
                      type="text"
                      className="input is-fade"
                      name="email"
                      onChange={handleInput}
                      required
                    />
                    <div className="form-icon">
                      <i data-feather="mail" />
                    </div>
                  </div>
                </div>
                {/*Field*/}
                <div className="field field-group">
                  <label>Date of Birth</label>
                  <div className="control has-icon">
                    <input
                      type="date"
                      className="input is-fade"
                      name="yearOfBirth"
                      onChange={handleInput}
                      required
                    />
                    <div className="form-icon">
                      <i data-feather="phone" />
                    </div>
                  </div>
                </div>
                {/*Field*/}
                <div className="field field-group">
                  <label>Password</label>
                  <div className="control has-icon">
                    <input
                      type="password"
                      className="input is-fade"
                      name="password"
                      onChange={handleInput}
                      required
                    />
                    <div className="form-icon">
                      <i data-feather="instagram" />
                    </div>
                  </div>
                </div>
                {/*Field*/}
                <div className="field field-group">
                    <label>Event Type</label>
                    <div className="control has-icon">
                      <select
                        type="text"
                        className="input is-fade"
                        name="contactTypeId"
                        onChange={handleInput}
                        required
                      >
                        <option disabled selected value> --  Select an Contact type  -- </option>
                        {contactTypes.map((item) => <option value={item.ContactTypeId} key={item.ContactTypeId}>{item.ContactType}</option>)}
                      </select>
                      <div className="form-icon">
                        <i data-feather="settings" />
                      </div>
                    </div>
                  </div>
              </div>
              <div className="column is-6">
                {/*Field*/}
                <div className="field field-group">
                  <label>Last Name</label>
                  <div className="control has-icon">
                    <input
                      type="text"
                      className="input is-fade"
                      name="lastName"
                      onChange={handleInput}
                      required
                    />
                    <div className="form-icon">
                      <i data-feather="link" />
                    </div>
                  </div>
                </div>
                {/*Field*/}
                <div className="field field-group">
                  <label>Phone Number</label>
                  <div className="control has-icon">
                    <input
                      type="number"
                      className="input is-fade"
                      name="phoneNumber"
                      onChange={handleInput}
                      required
                    />
                    <div className="form-icon">
                      <i data-feather="facebook" />
                    </div>
                  </div>
                </div>
                {/*Field*/}
                <div className="field field-group">
                  <label>Zip Code</label>
                  <div className="control has-icon">
                    <input
                      type="number"
                      className="input is-fade"
                      name="zipCode"
                      onChange={handleInput}
                      required
                    />
                    <div className="form-icon">
                      <i data-feather="instagram" />
                    </div>
                  </div>
                </div>
                {/*Field*/}
                <div className="field field-group">
                  <label>Confirm Password</label>
                  <div className="control has-icon">
                    <input
                      type="password"
                      className="input is-fade"
                      name="cpassword"
                      onChange={handleInput}
                      required
                    />
                    <div className="form-icon">
                      <i data-feather="instagram" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-12">
                <div className="buttons">
                  <button 
                    type="submit"
                    className="button is-solid accent-button form-button"
                    disabled={submitting}
                  >
                  { submitting ? 'Saving...' : 'Create'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default NewContact;
