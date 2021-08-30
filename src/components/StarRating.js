import React, { useState, useEffect } from 'react';
import { BsFillStarFill, BsStar, BsStarHalf } from "react-icons/bs";

export const StarRating = ({rating=0, showCount = false}) => {
    const originalCount = rating;
    if(rating > 5) rating=5;
    const ratingArr = [];
    console.log("Rating", rating)
    while(rating >= 1) {
      rating--;
      ratingArr.push(<BsFillStarFill className="mr-1 cursor-pointer"/>);
    }
    if(rating > 0) ratingArr.push(<BsStarHalf className="mr-1 cursor-pointer"/>);
    while(ratingArr.length < 5) ratingArr.push(<BsStar className="mr-1 cursor-pointer"/>);
    return (
      <div>
        {
          ratingArr
        }
        {showCount && <> ({originalCount})</>}
      </div>
    )
}

export const StarRatingInput = ({ onChange }) => {
  
  const [rating, showRating] = useState(0);
  const [finalRating, setFinalRating] = useState(0);

  useEffect(() => {
    if(!!onChange) onChange(finalRating)
  }, [finalRating])
  
  const getClassName = (i) => {
    let classNames = 'fa mr-1 ';
    if(finalRating >= i) {
      classNames += 'fa-star';
      return classNames;
    }
    if(rating >= i) 
      classNames += 'fa-star opacity-30 ';
    else
      classNames += 'fa-star-o ';
    return classNames;
  }


  return (
      <div>
        <p className="cursor-pointer" onMouseLeave={() => {showRating(0)}}>
          <i 
            className={getClassName(1)} 
            onMouseEnter={() => showRating(1)} 
            onClick={() => setFinalRating(1)}
          />
          <i 
            className={getClassName(2)} 
            onMouseEnter={() => showRating(2)} 
            onClick={() => setFinalRating(2)}
          />
          <i 
            className={getClassName(3)} 
            onMouseEnter={() => showRating(3)}
            onClick={() => setFinalRating(3)}
          />
          <i 
            className={getClassName(4)} 
            onMouseEnter={() => showRating(4)} 
            onClick={() => setFinalRating(4)}
          />
          <i 
            className={getClassName(5)} 
            onMouseEnter={() => showRating(5)} 
            onClick={() => setFinalRating(5)}
          />
        </p>
      </div>
    )
}
