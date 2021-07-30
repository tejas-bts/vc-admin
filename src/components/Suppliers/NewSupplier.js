import { map } from 'async';
import React, { useEffect, useState } from 'react'
import { createNewSupplier } from '../../services/suppliers.services'
import { getAllOrganizations } from '../../services/organizations.services'
import Toast, { ToastStates } from '../core/Toast';

function NewSupplier() {

  const [ submitting, setSubmitting ] = useState(false);
  const [ showToast, setShowToast ] = useState(false);
  const [ toastAttr, setToastAttr ] = useState({});
  const [ orgOptions, setOrgOptions ] = useState([]);
  const [ supplierDetails, setSupplier ] = useState({requestType: "INSERT"});

  const handleInput = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    const newSupplier = {...supplierDetails}
    newSupplier[key] = value;
    setSupplier(newSupplier);
  }

  const onToastHide = () => {
    setShowToast(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit');
    setSubmitting(true);
    createNewSupplier(supplierDetails)
      .then((response) =>{
        console.log('Error', response.data.error);
        if(response.data.error) {
          console.log("errororor")
          setToastAttr({...toastAttr, title:'Opps!', message: response.data.data[0], state: ToastStates.FAIL});
          setShowToast(true);
        }
        else {
          setToastAttr({...toastAttr, title:'Great!', message: 'Supplier added successfully', state: ToastStates.SUCCESS});
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
  
  useEffect(() => {
    getAllOrganizations()
      .then((response) => setOrgOptions(response.data));
  }, [])

  useEffect(() => {
    console.log(supplierDetails);
  }, [supplierDetails])

  return (
    <>
    <Toast toastState={toastAttr.state} title={toastAttr.title} message={toastAttr.message} show={showToast} onClose={onToastHide}/>
    <div className="settings-wrapper">
      <div id="general-settings" className="settings-section is-active">
        <div className="settings-panel">
          <div className="title-wrap">
            <a className="mobile-sidebar-trigger">
              <i data-feather="menu" />
            </a>
            <h2>Add a new Supplier</h2>
          </div>
          <div className="settings-form-wrapper">
            <form className="settings-form" onSubmit={handleSubmit}>
              <div className="columns is-multiline">
                <div className="column is-6">
                  {/*Field*/}
                  <div className="field field-group">
                    <label>Supplier Name</label>
                    <div className="control has-icon">
                      <input
                        type="text"
                        className="input is-fade"
                        name="supplierName"
                        onChange={handleInput}
                        required
                      />
                      <div className="form-icon">
                        <i data-feather="user" />
                      </div>
                    </div>
                  </div>{/*Field*/}
                  <div className="field field-group">
                    <label>Contact Name</label>
                    <div className="control has-icon">
                      <input
                        type="text"
                        className="input is-fade"
                        name="contactName"
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
                    <label>Phone Number</label>
                    <div className="control has-icon">
                      <input
                        type="text"
                        className="input is-fade"
                        name="phone"
                        onChange={handleInput}
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
                        required
                      />
                      <div className="form-icon">
                        <i data-feather="link" />
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
                        required
                      />
                      <div className="form-icon">
                        <i data-feather="globe" />
                      </div>
                    </div>
                  </div>
                  {/*Field*/}
                  <div className="field field-group">
                    <label>Organisation</label>
                    <div className="control has-icon">
                      <select
                        type="text"
                        className="input is-fade"
                        name="orgId"
                        onChange={handleInput}
                        required
                      >
                        <option disabled selected value> --  Select a Organisation  -- </option>
                        {orgOptions.map((item) => <option value={item.OrgId} key={map.key}>{item.OrgName}</option>)}
                      </select>
                      <div className="form-icon">
                        <i data-feather="settings" />
                      </div>
                    </div>
                  </div>
                  {/*Field*/}
                  <div className="field field-group">
                    <label>Supplier Type</label>
                    <div className="control has-icon">
                      <select
                        type="text"
                        className="input is-fade"
                        name="supplierType"
                        onChange={handleInput}
                        required
                      >
                        <option disabled selected value> --  Select Type of Supplier  -- </option>
                        <option value="Retailer"> Retailer </option>
                        <option value="Manufacturer"> Manufacturer </option>
                        <option value="Distributor"> Distributor </option>
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
                    { submitting ? 'Adding...' : 'Add'}
                    </button> 
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default NewSupplier;
