import { map } from 'async';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { getAllCategories } from '../../services/category.service'
import { createNewOrganisation, getOrganisationById } from '../../services/organisations.services'

function EditOrganisation() {

  const { orgId } = useParams();
  console.log('Org ID',orgId)

  const [ categoryOptions, setOptions ] = useState([]);
  const [ orgDetails, setOrganisation ] = useState({requestType: "INSERT"});

  const handleInput = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    const newOrg = {...orgDetails}
    newOrg[key] = value;
    setOrganisation(newOrg);
  }

  const handleSubmit = () => {
    console.log('Submit');
    createNewOrganisation(orgDetails);
  }
  
  useEffect(() => {
    getAllCategories()
      .then((response) => setOptions(response.data));
    getOrganisationById(orgId)
      .then((org) => {
        console.log('Tejas',org);
        setOrganisation({
          orgName: org.OrgName,
          email: org.Email,
          phone: org.PhoneNo,
          city: org.City,
          state: org.State,
          zipCode: org.Zipcode,
        })
      })
  }, [])

  useEffect(() => {
    console.log('Org Details',orgDetails);
  }, [orgDetails])

  return (
    <div className="settings-wrapper">
      {orgDetails && <div id="general-settings" className="settings-section is-active">
        <div className="settings-panel">
          <div className="title-wrap">
            <a className="mobile-sidebar-trigger">
              <i data-feather="menu" />
            </a>
            <h2>Edit Organisation</h2>
          </div>
          <div className="settings-form-wrapper">
            <form className="settings-form">
              <div className="columns is-multiline">
                <div className="column is-6">
                  {/*Field*/}
                  <div className="field field-group">
                    <label>Organisation Name</label>
                    <div className="control has-icon">
                      <input
                        type="text"
                        className="input is-fade"
                        name="orgName"
                        onChange={handleInput}
                        value={orgDetails.orgName}
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
                        value={orgDetails.email}
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
                        value={orgDetails.phone}
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
                    <label>Website</label>
                    <div className="control has-icon">
                      <input
                        type="text"
                        className="input is-fade"
                        name="website"
                        onChange={handleInput}
                        value={orgDetails.website}
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
                        value={orgDetails.facebook}
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
                        value={orgDetails.instagram}
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
                        value={orgDetails.address}
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
                        value={orgDetails.city}
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
                        value={orgDetails.state}
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
                        value={orgDetails.country}
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
                        value={orgDetails.zipCode}
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
                        value={orgDetails.fedtaxid}
                      />
                      <div className="form-icon">
                        <i data-feather="dollar-sign" />
                      </div>
                    </div>
                  </div>
                  {/*Field*/}
                  <div className="field field-group">
                    <label>Organisation Category</label>
                    <div className="control has-icon">
                      <select
                        type="text"
                        className="input is-fade"
                        name="orgtype"
                        onChange={handleInput}
                        value={orgDetails.orgtype}
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
                    <button className="button is-solid accent-button form-button" onClick={handleSubmit}>
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default EditOrganisation
