import React from 'react'

function CreateNew() {
    return (
        <div id="general-settings" className="settings-section is-active">
        <div className="settings-panel">
          <div className="title-wrap">
            <a className="mobile-sidebar-trigger">
              <i data-feather="menu" />
            </a>
            <h2>Add new Organization</h2>
          </div>
          <div className="settings-form-wrapper">
            <div className="settings-form">
              <div className="columns is-multiline">
                <div className="column is-6">
                  {/*Field*/}
                  <div className="field field-group">
                    <label>Organization Name</label>
                    <div className="control has-icon">
                      <input
                        type="text"
                        className="input is-fade"
                        defaultValue="OrgName"
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
                        defaultValue="jennadavis@gmail.com"
                      />
                      <div className="form-icon">
                        <i data-feather="mail" />
                      </div>
                    </div>
                  </div>
                  {/*Field*/}
                  <div className="field field-group">
                    <label>Year of Birth</label>
                    <div className="control has-icon">
                      <input
                        type="number"
                        className="input is-fade"
                        defaultValue={1994}
                      />
                      <div className="form-icon">
                        <i data-feather="calendar" />
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
                        defaultValue="Davis"
                      />
                      <div className="form-icon">
                        <i data-feather="user" />
                      </div>
                    </div>
                  </div>
                  {/*Field*/}
                  <div className="field field-group">
                    <label>Mobile Number</label>
                    <div className="control has-icon">
                      <input
                        type="text"
                        className="input is-fade"
                        defaultValue="+91 90909 1234"
                      />
                      <div className="form-icon">
                        <i data-feather="phone" />
                      </div>
                    </div>
                  </div>
                  {/*Field*/}
                  <div className="field field-group">
                    <label>Zip Code</label>
                    <div className="control has-icon">
                      <input
                        type="text"
                        className="input is-fade"
                        defaultValue={440009}
                      />
                      <div className="form-icon">
                        <i data-feather="compass" />
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
                        placeholder="Fill in your address..."
                        defaultValue={""}
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
                        defaultValue="Melbourne"
                      />
                      <div className="form-icon">
                        <i data-feather="map-pin" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-6">
                  {/*Field*/}
                  <div className="field field-group is-autocomplete">
                    <label>Country</label>
                    <div className="control has-icon">
                      <input
                        id="country-autocpl"
                        type="text"
                        className="input is-fade"
                        defaultValue="Australia"
                      />
                      <div className="form-icon">
                        <i data-feather="globe" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-12">
                  <div className="buttons">
                    <button className="button is-solid accent-button form-button">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default CreateNew
