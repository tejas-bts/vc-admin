import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";


const CustomToast = ({
    toastState = ToastStates.DEFAULT,
    title,
    message,
    onClose,
  }) => {

    const [show, setShow] = useState(true);
    useEffect(() => {
      if (show) {
        setTimeout(() => {
          const anchor = document.getElementById("toast-anchor");
          setShow(false);
          ReactDOM.render(null,anchor)
        }, 3000);
      }
    }, [show]);
  
    return (
      show === true && (
        <div className={getClassName(toastState)}>
          <div class="toast fade show" role="alert">
            <div class="toast-header">
              <strong class="mr-auto">
                {toastState === ToastStates.SUCCESS ? (
                  <FiCheckCircle className="mr-1" />
                ) : (
                  <FiAlertCircle className="mr-1" />
                )}{" "}
                {title}
              </strong>
            </div>
            <div class="toast-body">{message}</div>
          </div>
        </div>
      )
    );
  };


class Toaster {
  static success(title, message) {
    const anchor = document.getElementById("toast-anchor");
    ReactDOM.render(
    <CustomToast
        toastState={ToastStates.SUCCESS}
        title={title}
        message={message}
    />, anchor)
  }

  static fail(title, message) {
    const anchor = document.getElementById("toast-anchor");
    ReactDOM.render(
    <CustomToast
        toastState={ToastStates.FAIL}
        title={title}
        message={message}
    />, anchor)
  }
}


export const ToastStates = {
  DEFAULT: "DEFAULT",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  FAIL: "FAIL",
};



const getClassName = (state) => {
  switch (state) {
    case ToastStates.SUCCESS:
      return "success";
    case ToastStates.FAIL:
      return "fail";
    case ToastStates.LOADING:
      return "loading";
    default:
      return "default";
  }
};

export default Toaster;
