import React, { useState, useEffect } from "react";
import { FiAlertCircle, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { Toast, ToastBody, ToastHeader, Spinner } from "reactstrap";

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

const CustomToast = ({
  show,
  toastState = ToastStates.DEFAULT,
  title,
  message,
  onClose,
}) => {
  useEffect(() => {
    if (show) {
      setTimeout(() => {
        if (onClose !== undefined) onClose();
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

export default CustomToast;
