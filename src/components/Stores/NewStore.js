import { map } from 'async';
import React, { useEffect, useState } from 'react'
import { createNewStore, getAllStoreType } from '../../services/stores.services'
import Toast, { ToastStates } from '../core/Toast';

function NewOrganisation() {

  const [ submitting, setSubmitting ] = useState(false);
  const [ showToast, setShowToast ] = useState(false);
  const [ toastAttr, setToastAttr ] = useState({});
  const [ storeTypeOptions, setStoreTypeOptions ] = useState([]);
  const [ storeDetails, setStore ] = useState({requestType: "INSERT", loggedInUserId : "2"
});

  const handleInput = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    const newOrg = {...storeDetails}
    newOrg[key] = value;
    setStore(newOrg);
  }

  const onToastHide = () => {
    setShowToast(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit');
    setSubmitting(true);
    createNewStore(storeDetails)
      .then((response) =>{
        console.log('Ansadas Error', response.data.error);
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
  
  useEffect(() => {
    getAllStoreType()
      .then((response) => {
        console.log("Store Type Options",storeTypeOptions)
        setStoreTypeOptions(response.data);
      });
  }, [])

  useEffect(() => {
    console.log(storeDetails);
  }, [storeDetails])

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
            <h2>Add new Store</h2>
          </div>
          <div className="settings-form-wrapper">
            <form className="settings-form" onSubmit={handleSubmit}>
              <div className="columns is-multiline">
                <div className="column is-6">
                  {/*Field*/}
                  <div className="field field-group">
                    <label>Store Name</label>
                    <div className="control has-icon">
                      <input
                        type="text"
                        className="input is-fade"
                        name="storeName"
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
                    <label>Store Code</label>
                    <div className="control has-icon">
                      <input
                        type="text"
                        className="input is-fade"
                        name="storeCode"
                        onChange={handleInput}
                        required
                      />
                      <div className="form-icon">
                        <i data-feather="mail" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-6">
                  {/*Field*/}
                  <div className="field field-group">
                    <label>License Number</label>
                    <div className="control has-icon">
                      <input
                        type="text"
                        className="input is-fade"
                        name="licenceNumber"
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
                    <label>EDI ID</label>
                    <div className="control has-icon">
                      <input
                        type="text"
                        className="input is-fade"
                        name="ediid"
                        onChange={handleInput}
                        required
                      />
                      <div className="form-icon">
                        <i data-feather="phone" />
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
                        name="address1"
                        onChange={handleInput}
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
                        required
                      />
                      <div className="form-icon">
                        <i data-feather="flag" />
                      </div>
                    </div>
                  </div>
                  {/*Field*/}
                  <div className="field field-group">
                    <label>Store Type</label>
                    <div className="control has-icon">
                      <select
                        type="text"
                        className="input is-fade"
                        name="storeTypeId"
                        onChange={handleInput}
                        required
                      >
                        <option disabled selected value> --  Select a Store type  -- </option>
                        {storeTypeOptions.map((item) => <option value={item.StoreTypeId} key={map.key}>{item.StoreType}</option>)}
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

export default NewOrganisation
