import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from "../../components/core/Spinner";
import { FiArrowRightCircle, FiEdit } from 'react-icons/fi';
import { useParams } from 'react-router'; 
import { getAllQRcodes, createQRcode } from '../../services/qr.services';
import Toaster from '../core/Toaster';


function QrCodeListItem({ item, onSelect, onEdit }) {
  return (
    <div class="flex-table-item">
      <div className="w-30">
        <span>{item.qrName}</span>
      </div>
      <div className="w-50">
        <span>{`${new Date(item.createdOn).toLocaleDateString()} ${new Date(item.createdOn).toLocaleTimeString()}`}</span>
      </div>
      <div className="w-10" style={{ display: "flex", alignItems: "center" }}>
        <FiEdit style={{fontSize:'1.3rem'}} onClick={() => onEdit(item)} className="cursor-pointer" />
      </div>
      <div className="w-10" style={{ display: "flex", alignItems: "center" }}>
        <FiArrowRightCircle style={{fontSize:'1.3rem'}} onClick={() => onSelect(item)} className="cursor-pointer"/>
      </div>
    </div>
  );
}

var QRCodes = () => {

    const { eventId } = useParams();
    console.log("Event Id", eventId)

    const [loading, setLoading] = useState(false);
    const [selectedQr, setQR] = useState({});
    const [qrList, setQRList] = useState([]);
    const [showQRform, setShow] = useState(false);
    const [saving, setSaving] = useState(false);
    const [loadingImage, setLoadingImage] = useState(false);
    const [newQrData, setNewQrData] = useState({ eventId, createdBy: 144 })

    const fetchData = () => {
      setLoading(true);
      getAllQRcodes(eventId)
        .then((qrCodes) => {
          setQRList(qrCodes);
          setLoading(false);
        } )
    }

    useEffect(() => {
      fetchData();
    }, [])

    const onSelect = (qrCode) => {
      setLoadingImage(true);
      setQR(qrCode)
    }

    const onSubmit = (e) => {
      e.preventDefault();
      setSaving(true);
      createQRcode(newQrData)
        .then(() => {
          setSaving(false);
          setShow(false);
          fetchData();
          setNewQrData({});
          Toaster.success("Awesome!", "QR code was saved successfully!")
        })
        .catch((error) => {console.log("error", error)})
    }

    const download = (url) => {
      axios({
        url,
        method:'GET',
        responseType: 'blob'
      })
      .then((response) => {
            const url = window.URL
            .createObjectURL(new Blob([response.data]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', 'image.jpg');
              document.body.appendChild(link);
              link.click();
      })
    }

    const onEdit = (item) => {
      console.log(item);
      setShow(true);
      setNewQrData({
        "eventId" : item.eventId, 
        "qrName" : item.qrName, 
        "createdBy" : item.createdBy, 
        "qrId" :  item.qrId
      })
    }

    const onCancel = () => {
      setNewQrData({});
      setShow(false);
    }

    const handleInput = (e) => {
      setNewQrData({...newQrData, [e.target.name]:e.target.value });
    }

    return (
      <div>
        <div className="videos-wrapper has-player">
          <div className="player-wrapper">
            <div className="content-wrapper">
              <div className="columns">
                <div className="column is-two-third">
                  {
                    showQRform ? 
                  <div className="card mb-3">
                    <div className="settings-panel">
                      <div className="title-wrap mb-3">
                        <a className="mobile-sidebar-trigger">
                          <i data-feather="menu" />
                        </a>
                        <h2>{newQrData.qrId ? "Edit QR Code" : "Create new QR code"}</h2>
                      </div>
                      <div className="settings-form-wrapper">
                        <form className="settings-form" onSubmit={onSubmit}>
                          <div className="columns is-multiline">
                            <div className="column is-12">
                              {/*Field*/}
                              <div className="field field-group">
                                <label>Name</label>
                                <div className="control has-icon">
                                  <input
                                    type="text"
                                    className="input is-fade"
                                    name="qrName"
                                    onChange={handleInput}
                                    value={newQrData.qrName}
                                    required
                                  />
                                  <div className="form-icon">
                                    <i data-feather="user" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="column is-12">
                              <button
                                type="reset" 
                                className="button accent-button mb-3 float-left"
                                onClick={onCancel}
                              >
                                Cancel
                              </button>
                              <button type="submit" className="button is-solid accent-button mb-3 float-right" disabled={saving}>
                                { saving ? (<><i class="fa fa-spinner fa-spin mr-3"/> Saving...</>) : "Save" }
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div> :
                  <button 
                    className="button is-solid accent-button mb-3 float-right"
                    onClick={() => setShow(true)}
                  >
                    New QR Code
                  </button>
                  }
                  <div class="flex-table">
                  {loading ? <Spinner /> : qrList.map((item) => <QrCodeListItem item={item} onSelect={onSelect} onEdit={onEdit} key={item.qrId} />)}
                  </div>
                </div>
                <div className="column is-one-third">
                  <div className="card">
                    <div className="field">
                      <h1 className="text-center text-bold h1">{selectedQr.qrName}</h1> 
                    </div>
                    <div className="card-body">
                      {Object.keys(selectedQr).length > 0 ? 
                      (
                      <>
                        <img onLoad={() => setLoadingImage(false)} className="w-100" src={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${selectedQr.qrLink}`} alt="qr"/>
                        <div className="columns mt-4">
                          <div className="column is-two-third">
                            <p className="mt-2"><span className="text-bold">Scan count :</span> {selectedQr.qrScanCount}</p>
                          </div>
                          <div className="column is-one-third">
                            <button 
                              type="submit"
                              className="button is-solid accent-button mb-3 float-right"
                              onClick={() => download(`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${selectedQr.qrLink}`)}
                            >
                              Download
                            </button>
                            </div>
                        </div>
                        <p>
                          <span className="text-bold">Link : </span>
                          <a href={selectedQr.qrLink}>{selectedQr.qrLink}</a>
                        </p>
                        <button 
                          className="button is-solid mt-3 w-100 accent-button"
                          onClick={() => {
                            navigator.clipboard.writeText(selectedQr.qrLink)
                            Toaster.success("Copied!", "The QR code link is copied to the clipboard");
                            }}
                        >
                          Copy Link
                        </button>
                      </>
                      )
                       : <p>Select a QR code to view details here</p>}
                      {
                        loadingImage && <div className="w-100"><Spinner/></div> 
                      }
                    </div>                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

  export default QRCodes;