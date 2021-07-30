import { map } from 'async';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { getAllCategories } from '../../services/category.service'
import { createNewOrganisation, getOrganisationById } from '../../services/organisations.services'
import Spinner from '../../components/core/Spinner';

function EditSupplier() {

  const { orgId } = useParams();
  console.log('Org ID',orgId)

  const [ loading, setLoading ] = useState(true);
  const [ submitting, setSubmitting ] = useState(false);
  const [ categoryOptions, setOptions ] = useState([]);
  const [ orgDetails, setOrganisation ] = useState({requestType: "UPDATE"});

  const handleInput = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    console.log(key,value)
    const newOrg = {...orgDetails}
    newOrg[key] = value;
    setOrganisation({...orgDetails, newOrg});
  }

  const handleSubmit = () => {
    console.log('Submit');
    createNewOrganisation(orgDetails);
  }
  
  useEffect((e) => {
    setLoading(true);
    getOrganisationById(orgId)
      .then((org) => {
        console.log('Tejas',org);
        setOrganisation({
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
        setLoading(false);
      })
  }, [])

  // useEffect(() => {
  //   getAllCategories()
  //     .then((response) => setOptions(response.data));
  // },[])


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
          {loading ? <Spinner /> : 
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
                    <label>Website</label>
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
                    <label>Organisation Type</label>
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
                    <button className="button is-solid accent-button form-button" onClick={handleSubmit}>
                      Save changes
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

export default EditSupplier;
