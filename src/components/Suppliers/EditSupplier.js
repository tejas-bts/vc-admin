import { map } from 'async';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { getSuppliersById, updateSupplier } from '../../services/suppliers.services'
import { getAllOrganizations} from '../../services/organizations.services'
import Spinner from '../../components/core/Spinner';
import Toast, { ToastStates } from '../core/Toast';

function EditSupplier() {

  const { supplierId } = useParams();

  const [ loading, setLoading ] = useState(true);
  const [ orgOptions, setOrgOptions ] = useState([]);
  const [ supplierDetails, setSupplier ] = useState({requestType: "UPDATE"});

  const [ submitting, setSubmitting ] = useState(false);
  const [ showToast, setShowToast ] = useState(false);
  const [ toastAttr, setToastAttr ] = useState({});

  const handleInput = (e) => {
    setSupplier({ ...supplierDetails, [e.target.name]: e.target.value });
  }

  const onToastHide = () => {
    setShowToast(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit');
    setSubmitting(true);
    updateSupplier(supplierDetails)
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

  useEffect(() => {
    console.log('Supplier', supplierDetails);
    }, [supplierDetails])
  
  useEffect((e) => {
    setLoading(true);
    getAllOrganizations().then((response) => setOrgOptions(response.data));
    getSuppliersById(supplierId)
      .then((supplier) => {
        console.log('Supplier',supplier);
        setSupplier({
          ...supplierDetails,
          supplierId: supplierId,
          supplierName: supplier.SupplierName,
          orgName: supplier.OrgName,
          email: supplier.Email,
          phone: supplier.PhoneNo,
          city: supplier.City,
          state: supplier.State,
          zipCode: supplier.Zipcode,
          fedtaxid: supplier.FedTaxId,
          website: supplier.Website,
          address: supplier.Address,
          country: supplier.Country,
          contactName: supplier.ContactName,
        })
        setLoading(false);
      })
  }, [])


  return (
    <div className="settings-wrapper">
      <Toast toastState={toastAttr.state} title={toastAttr.title} message={toastAttr.message} show={showToast} onClose={onToastHide}/>
      {supplierDetails && <div id="general-settings" className="settings-section is-active">
        <div className="settings-panel">
          <div className="title-wrap">
            <a className="mobile-sidebar-trigger">
              <i data-feather="menu" />
            </a>
            <h2>Edit Supplier</h2>
          </div>
          <div className="settings-form-wrapper">
          {loading ? <Spinner /> : 
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
                      value={supplierDetails.supplierName}
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
                      value={supplierDetails.contactName}
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
                      value={supplierDetails.email}
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
                      value={supplierDetails.phone}
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
                      value={supplierDetails.website}
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
                      value={supplierDetails.country}
                      required
                    />
                    <div className="form-icon">
                      <i data-feather="globe" />
                    </div>
                  </div>
                </div>
                {/*Field*/}
                <div className="field field-group">
                  <label>Organization</label>
                  <div className="control has-icon">
                    <select
                      type="text"
                      className="input is-fade"
                      name="orgId"
                      onChange={handleInput}
                      required
                    >
                      <option disabled selected value> --  Select an Organization  -- </option>
                      {orgOptions.map((item) => <option value={item.OrgId} key={map.key}>{item.OrgName}</option>)}
                    </select>
                    <div className="form-icon">
                      <i data-feather="settings" />
                    </div>
                  </div>
                </div>
                {/*Field*/}
                <div className="field field-group">
                  <label>Retailer Type</label>
                  <div className="control has-icon">
                    <select
                      type="text"
                      className="input is-fade"
                      name="supplierType"
                      onChange={handleInput}
                      required
                    >
                      <option disabled selected value> --  Select Type of Retailer  -- </option>
                      <option value="Retailer" selected={supplierDetails.supplierType == "Retailer"} > Retailer </option>
                      <option value="Manufacturer" selected={supplierDetails.supplierType == "Manufacturer"}> Manufacturer </option>
                      <option value="Distributor" selected={supplierDetails.supplierType == "Distributor"}> Distributor </option>
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

export default EditSupplier;
