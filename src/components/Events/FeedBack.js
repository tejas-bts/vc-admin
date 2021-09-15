import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from "../../components/core/Spinner";
import { useParams } from 'react-router'; 
import { getEventFeedback } from '../../services/feedback.services';
import { StarRating } from '../StarRating';


function FeedbackListItem({ item, onSelect }) {
  console.log("Feedback",item);
  return (
    <div class="flex-table-item cursor-pointer" onClick={onSelect}>
      <div className="is-one-third">
        <span className="text-center"><StarRating onClick={onSelect} rating={item.hostRating} showCount={true} /></span>
      </div>
      <div className="is-one-third">
        <span className="text-center"><StarRating onClick={onSelect} rating={item.presenterRating} showCount={true} /></span>
      </div>
      <div className="is-one-third">
        <span className="text-center"><StarRating onClick={onSelect} rating={item.virtualCataRating} showCount={true} /></span>
      </div>
    </div>
  );
}

var Feedback = () => {

    const { eventId } = useParams();
    console.log("Event Id", eventId)

    const [loading, setLoading] = useState(false);
    const [selectedFeedback, setFeedback] = useState({});
    const [feedbackList, setFeedbackList] = useState([]);
    const [averageRating, setAverageRating] = useState({});
    const [showQRform, setShow] = useState(false);
    const [saving, setSaving] = useState(false);
    const [loadingImage, setLoadingImage] = useState(false);
    const [newQrData, setNewQrData] = useState({ eventId, createdBy: 144 })

    const fetchData = () => {
      setLoading(true);
      getEventFeedback(eventId)
        .then((feedbacks) => {
          console.log("Feedbacks", feedbacks);
          setFeedbackList(feedbacks.data);
          setAverageRating(feedbacks.avgData);
          setLoading(false);
        } )
    }

    useEffect(() => {
      fetchData();
    }, [])

    const onSelect = (feedback) => {
      setFeedback(feedback)
      console.log("Harshu",feedback)
    }

    return (
      <div>
        <div className="videos-wrapper has-player">
          <div className="player-wrapper">
            <div className="content-wrapper">
              <div className="columns">
                <div className="column is-two-third mt-3">
                  <div class="flex-table">
                    {
                      loading ? <Spinner />
                      :
                      <>
                        <div className="card mb-5 columns mr-0 ml-0">
                          <div className="column text-center">
                             <span className="text-bold" style={{fontSize:'2.5rem'}}>{averageRating.hAvgRating}</span>
                             <span><StarRating rating={averageRating.hAvgRating} /></span>
                             <span>Average Ratings for Host</span>
                          </div>
                          <div className="column text-center">
                             <span className="text-bold" style={{fontSize:'2.5rem'}}>{averageRating.vcAvgRating}</span>
                             <span><StarRating rating={averageRating.vcAvgRating} /></span>
                             <span>Average Ratings for VirtualCata</span>
                          </div>
                          <div className="column text-center">
                             <span  className="text-bold" style={{fontSize:'2.5rem'}}>{averageRating.pAvgRating}</span>
                             <span><StarRating rating={averageRating.pAvgRating} /></span>
                             <span>Average Ratings for Presenter</span>
                          </div>
                        </div>
                        <div class="flex-table-header">
                          <div className="is-one-third text-center">
                            <span>Host Ratings</span>
                          </div>
                          <div className="is-one-third text-center">
                            <span>Presenter Ratings</span>
                          </div>
                          <div className="is-one-third text-center">
                            <span>VirtualCata Ratings</span>
                          </div>
                        </div>
                        { feedbackList.map((item) => <FeedbackListItem item={item} onSelect={() => onSelect(item)} key={item.feebackId} />)}
                      </>
                    }
                  </div>
                </div>
                <div className="column is-one-third">
                  <div className="card">
                    <div className="card-body">
                      {Object.keys(selectedFeedback).length > 0 ? 
                      (
                      <>
                        <div className="columns mt-4">
                          <div className="column">
                            <p className="mr-2 mb-2">Host Ratings : </p>
                            <p className="mr-2 mb-2">Presenter Ratings : </p>
                            <p className="mr-2 mb-2">VirtualCata Ratings : </p>
                          </div>
                          <div className="column">
                            <p className="mr-2 mb-2"><StarRating showCount rating={selectedFeedback.hostRating}/></p>
                            <p className="mr-2 mb-2"><StarRating showCount rating={selectedFeedback.presenterRating}/></p>
                            <p className="mr-2 mb-2"><StarRating showCount rating={selectedFeedback.virtualCataRating}/></p>
                          </div>
                        </div>
                        <p>
                          <span className="text-bold">Feedback : </span>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </p>
                      </>
                      )
                       : 
                      <div className="column text-center">
                        <span className="text-bold" style={{fontSize:'2.5rem'}}>{feedbackList.length}</span><br />
                        <span>Total Feedback Submissions</span>
                      </div>
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

export default Feedback;