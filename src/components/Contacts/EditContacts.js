import { map } from 'async';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { getAllCategories } from '../../services/category.service'
import { updateOrg, getOrganizationById } from '../../services/organizations.services'
import Spinner from '../../components/core/Spinner';
import Toast, { ToastStates } from '../core/Toast';

function EditEvent() {

  const { orgId } = useParams();
  console.log('Org ID',orgId)

  const [ loading, setLoading ] = useState(true);
  const [ categoryOptions, setOptions ] = useState([]);
  const [ orgDetails, setOrganization ] = useState({requestType: "UPDATE", orgId});

  const [ submitting, setSubmitting ] = useState(false);
  const [ showToast, setShowToast ] = useState(false);
  const [ toastAttr, setToastAttr ] = useState({});


  const onToastHide = () => {
    setShowToast(false);
  }

  const handleInput = (e) => {
    setOrganization({ ...orgDetails, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit');
    setSubmitting(true);
    updateOrg(orgDetails)
      .then((response) =>{
        console.log('Error', response.data.error);
        if(response.data.error) {
          console.log("errororor")
          setToastAttr({...toastAttr, title:'Opps!', message: response.data.data[0], state: ToastStates.FAIL});
          setShowToast(true);
        }
        else {
          setToastAttr({...toastAttr, title:'Great!', message: 'Supplier updated successfully', state: ToastStates.SUCCESS});
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
  
  useEffect((e) => {
    setLoading(true);
    getOrganizationById(orgId)
      .then((org) => {
        console.log('Tejas',org);
        setOrganization({
          orgId: orgId,
          orgName: org.OrgName,
          email: org.Email,
          phone: org.PhoneNo,
          city: org.City,
          state: org.State,
          zipCode: org.Zipcode,
          fedtaxid: org.FedTaxId,
          website: org.Website,
          address: org.Address,
          country: org.Country,
        })
        getAllCategories().then((response) => setOptions(response.data));
        setLoading(false);
      })
  }, [])


  return (
    <div className="settings-wrapper">
      <Toast toastState={toastAttr.state} title={toastAttr.title} message={toastAttr.message} show={showToast} onClose={onToastHide}/>
      {orgDetails && <div id="general-settings" className="settings-section is-active">
        <div className="settings-panel">
          <div className="title-wrap">
            <a className="mobile-sidebar-trigger">
              <i data-feather="menu" />
            </a>
            <h2>Edit Contact</h2>
          </div>
          <div className="settings-form-wrapper">
          {loading ? <Spinner /> : 
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
                        name="orgName"
                        onChange={handleInput}
                        value={orgDetails.orgName || ""}
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
                        value={orgDetails.email || ""}
                        required
                      />
                      <div className="form-icon">
                        <i data-feather="mail" />
                      </div>
                    </div>
                  </div>
                  {/*Field*/}
                  <div className="field field-group">
                    <label>Phone Number</label>
                    <div className="control has-icon">
                      <input
                        type="text"
                        className="input is-fade"
                        name="phone"
                        onChange={handleInput}
                        value={orgDetails.phone || ""}
                        required
                      />
                      <div className="form-icon">
                        <i data-feather="phone" />
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
                        name="website"
                        onChange={handleInput}
                        value={orgDetails.website || ""}
                        required
                      />
                      <div className="form-icon">
                        <i data-feather="link" />
                      </div>
                    </div>
                  </div>
                  {/*Field*/}
                  <div className="field field-group">
                    <label>Facebook Page Address</label>
                    <div className="control has-icon">
                      <input
                        type="text"
                        className="input is-fade"
                        name="facebook"
                        onChange={handleInput}
                        value={orgDetails.facebook || ""}
                        required
                      />
                      <div className="form-icon">
                        <i data-feather="facebook" />
                      </div>
                    </div>
                  </div>
                  {/*Field*/}
                  <div className="field field-group">
                    <label>Instagram Page Address</label>
                    <div className="control has-icon">
                      <input
                        type="text"
                        className="input is-fade"
                        name="instagram"
                        onChange={handleInput}
                        value={orgDetails.instagram || ""}
                        required
                      />
                      <div className="form-icon">
                        <i data-feather="instagram" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-12">
                  {/*Field*/}
                  <div className="field field-group">
                    <label>Address</label>
                    <div className="control">
                      <textarea
                        type="text"
                        className="textarea is-fade"
                        rows={1}
                        placeholder= "Fill in your address..."
                        style={{height: '70px'}}
                        name="address"
                        onChange={handleInput}
                        value={orgDetails.address || ""}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="column is-6">
                  {/*Field*/}
                  <div className="field field-group">
                    <label>City</label>
                    <div className="control has-icon">
                      <input
                        type="text"
                        className="input is-fade"
                        name="city"
                        onChange={handleInput}
                        value={orgDetails.city || ""}
                        required
                      />
                      <div className="form-icon">
                        <i data-feather="map-pin" />
                      </div>
                    </div>
                  </div>
                  {/*Field*/}
                  <div className="field field-group">
                    <label>State</label>
                    <div className="control has-icon">
                      <input
                        type="text"
                        className="input is-fade"
                        name="state"
                        onChange={handleInput}
                        value={orgDetails.state || ""}
                        required
                      />
                      <div className="form-icon">
                        <i data-feather="flag" />
                      </div>
                    </div>
                  </div>
                  {/*Field*/}
                  <div className="field field-group is-autocomplete">
                    <label>Country</label>
                    <div className="control has-icon">
                      <input
                        id="country-autocpl"
                        type="text"
                        className="input is-fade"
                        name="country"
                        onChange={handleInput}
                        value={orgDetails.country || ""}
                        required
                      />
                      <div className="form-icon">
                        <i data-feather="globe" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-6">
                  {/*Field*/}
                  <div className="field field-group">
                    <label>Zip Code</label>
                    <div className="control has-icon">
                      <input
                        type="text"
                        className="input is-fade"
                        name="zipCode"
                        onChange={handleInput}
                        value={orgDetails.zipCode || ""}
                        required
                      />
                      <div className="form-icon">
                        <i data-feather="flag" />
                      </div>
                    </div>
                  </div>
                  
                  {/*Field*/}
                  <div className="field field-group">
                    <label>Fed Tax ID</label>
                    <div className="control has-icon">
                      <input
                        type="text"
                        className="input is-fade"
                        name="fedtaxid"
                        onChange={handleInput}
                        value={orgDetails.fedtaxid || ""}
                        required
                      />
                      <div className="form-icon">
                        <i data-feather="dollar-sign" />
                      </div>
                    </div>
                  </div>
                  {/*Field*/}
                  <div className="field field-group">
                    <label>Organization Type</label>
                    <div className="control has-icon">
                      <select
                        type="text"
                        className="input is-fade"
                        name="orgtype"
                        onChange={handleInput}
                        value={orgDetails.orgtype || ""}
                        required
                      >
                        <option disabled selected value> --  Select a Category  -- </option>
                        {categoryOptions.map((item) => <option value={item.CategoryId} key={map.key}>{item.CategoryName}</option>)}
                      </select>
                      <div className="form-icon">
                        <i data-feather="settings" />
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
                    { submitting ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </div>
            </form>}
          </div>
        </div>
      </div>}
    </div>
  )
}

export default EditEvent;
