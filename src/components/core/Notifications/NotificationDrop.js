import React from "react";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";


function NotificationDrop({isActive}) {
  const notificationData = [
    {
      id: 1,
      profilePicture: "https://via.placeholder.com/50x50",
      notificationText: "David Kim commented on your post.",
      time: "30 minutes ago",
      type: 1,
    },
    {
      id: 2,
      profilePicture: "https://via.placeholder.com/50x50",
      notificationText: "Stella Bergmann shared a on your wall.",
      time: "43 minutes ago",
      type: 1,
    },
    {
      id: 3,
      profilePicture: "https://via.placeholder.com/50x50",
      notificationText: "Elise Walker shared an Image with you an 2 other people.",
      time: "Yesterday",
      type: 1,
    },
    {
      id: 4,
      profilePicture: "https://via.placeholder.com/50x50",
      notificationText: "David Kim commented on your post.",
      time: "2 days ago",
      type: 1,
    },

  ]
	return (
		<div className={`nav-drop ${isActive && "is-active"}`}>
			<div className="inner">
				<div className="nav-drop-header">
					<span>Notifications</span>
					<a href="#">
						<i data-feather="bell" />
					</a>
				</div>
				<div className="nav-drop-body is-notifications">
          {
            notificationData.map((item) => 
              <Link to="/" key={notificationData.id}>
                <div className="media">
                  <figure className="media-left">
                    <p className="image">
                      <img src={item.profilePicture} data-demo-src="assets/img/avatars/david.jpg" alt="" />
                    </p>
                  </figure>
                  <div className="media-content">
                  <span>{item.notificationText}</span>
                    <span className="time">{item.time}</span>
                  </div>
                  <div className="media-right">
                    <div className="added-icon">
                      <FiHeart />
                    </div>
                  </div>
                </div>
              </Link>
          )}
				</div>
				<div className="nav-drop-footer">
					<Link to="notifications">View All</Link>
				</div>
			</div>
		</div>
	);
}

export default NotificationDrop;
