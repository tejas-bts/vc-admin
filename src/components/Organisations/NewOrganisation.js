import { map } from 'async';
import React, { useEffect, useState } from 'react'
import { getAllCategories } from '../../services/category.service'
import { createNewOrganisation, getAllOrganisationType } from '../../services/organisations.services'

function NewOrganisation() {

  const [ orgTypeOptions, setOrgTypeOptions ] = useState([]);
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
    getAllOrganisationType()
      .then((response) => setOrgTypeOptions(response.data));
  }, [])

  useEffect(() => {
    console.log(orgDetails);
  }, [orgDetails])

  return (
    <div className="settings-wrapper">
      <div id="general-settings" className="settings-section is-active">
        <div className="settings-panel">
          <div className="title-wrap">
            <a className="mobile-sidebar-trigger">
              <i data-feather="menu" />
            </a>
            <h2>Add new Organisation</h2>
          </div>
          <div className="settings-form-wrapper">
            <div className="settings-form">
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
                      />
                      <div className="form-icon">
                        <i data-feather="dollar-sign" />
                      </div>
                    </div>
                  </div>
                  {/*Field*/}
                  <div className="field field-group">
                    <label>Organisation Type</label>
                    <div className="control has-icon">
                      <select
                        type="text"
                        className="input is-fade"
                        name="orgtype"
                        onChange={handleInput}
                      >
                        <option disabled selected value> --  Select a Organisation type  -- </option>
                        {orgTypeOptions.map((item) => <option value={item.OrgTypeId} key={map.key}>{item.OrgType}</option>)}
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
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewOrganisation
