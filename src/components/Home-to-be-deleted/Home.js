import React, { useState, useContext } from "react";
import NavBar from "../core/NavBar/NavBar";
import { FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import authContext from "../../Context/authContext";
import AdminProfile from "../Profile/AdminProfile";

function Home() {
  let { allData, setAllData } = useContext(authContext);

  const tabs = {
    liveEvents: 0,
    upcomingEvents: 1,
    subscribedEvents: 2,
  };

  const [activeTab, setActiveTab] = useState(tabs.liveEvents);

  const userData = {
    profilePicture: allData.userDetails.profilePicture
      ? allData.userDetails.profilePicture
      : "https://via.placeholder.com/150x150",
    firstName: allData.userDetails.firstName
      ? allData.userDetails.firstName
      : "Chandler",
    lastName: allData.userDetails.lastName
      ? allData.userDetails.lastName
      : "Bing",
    emailAddress: allData.userDetails.emailAddress
      ? allData.userDetails.emailAddress
      : "something@something.com",
  };

  const userStats = {
    eventsCount: 20,
    interestsCount: 12,
    followingsCount: 36,
  };

  const upcomingEventsList = [
    {
      id: 1,
      brandLogo: "assets/img/icons/shop/brands/1.svg",
      eventTitle: "Wine tasting for ABC brand by John Doe",
      eventSubTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      eventDate: "10 - 12 - 2021",
      eventTime: "20: 00",
      eventHost: "Whole Foods",
      eventPresenter: "Trade Winds",
    },
    {
      id: 2,
      brandLogo: "assets/img/icons/shop/brands/2.svg",
      eventTitle: "Wine tasting for ABC brand by John Doe",
      eventSubTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      eventDate: "10 - 12 - 2021",
      eventTime: "20: 00",
      eventHost: "Whole Foods",
      eventPresenter: "Trade Winds",
    },
    {
      id: 3,
      brandLogo: "assets/img/icons/shop/brands/3.svg",
      eventTitle: "Wine tasting for ABC brand by John Doe",
      eventSubTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      eventDate: "10 - 12 - 2021",
      eventTime: "20: 00",
      eventHost: "Whole Foods",
      eventPresenter: "Trade Winds",
    },
    {
      id: 4,
      brandLogo: "assets/img/icons/shop/brands/4.svg",
      eventTitle: "Wine tasting for ABC brand by John Doe",
      eventSubTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      eventDate: "10 - 12 - 2021",
      eventTime: "20: 00",
      eventHost: "Whole Foods",
      eventPresenter: "Trade Winds",
    },
  ];

  const liveEventsList = [
    {
      id: 1,
      eventTitle: "Wine tasting for ABC brand by John Doe",
      eventSubTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      liveUsersCount: 137,
      streamThumbnail: "https://via.placeholder.com/400x200",
    },
    {
      id: 2,
      eventTitle: "Wine tasting for ABC brand by John Doe",
      eventSubTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      liveUsersCount: 137,
      streamThumbnail: "https://via.placeholder.com/400x200",
    },
    {
      id: 3,
      eventTitle: "Wine tasting for ABC brand by John Doe",
      eventSubTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      liveUsersCount: 137,
      streamThumbnail: "https://via.placeholder.com/400x200",
    },
    {
      id: 4,
      eventTitle: "Wine tasting for ABC brand by John Doe",
      eventSubTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      liveUsersCount: 137,
      streamThumbnail: "https://via.placeholder.com/400x200",
    },
    {
      id: 5,
      eventTitle: "Wine tasting for ABC brand by John Doe",
      eventSubTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      liveUsersCount: 137,
      streamThumbnail: "https://via.placeholder.com/400x200",
    },
  ];

  const filterCategories = [
    {
      categoryImage: "assets/img/icons/shop/all.svg",
      categoryTitle: "All",
    },
    {
      categoryImage: "assets/img/icons/shop/men.svg",
      categoryTitle: "Men",
    },
    {
      categoryImage: "assets/img/icons/shop/skirt.svg",
      categoryTitle: "Women",
    },
    {
      categoryImage: "assets/img/icons/shop/hat.svg",
      categoryTitle: "Hats",
    },
    {
      categoryImage: "assets/img/icons/shop/backpack.svg",
      categoryTitle: "Bags",
    },
    {
      categoryImage: "assets/img/icons/shop/shoes.svg",
      categoryTitle: "Shoes",
    },
    {
      categoryImage: "assets/img/icons/shop/clock.svg",
      categoryTitle: "Accessories",
    },
  ];

  return (
    <div>
      <NavBar />
      <AdminProfile />
    </div>
  );
}

export default Home;
