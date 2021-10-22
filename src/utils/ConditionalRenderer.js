import { Fragment } from "react";
import { getCurrentUser } from "./user";

export const RenderWithPermission = (props) => {
  const currentUser = getCurrentUser();
  const isAllowed = () => {
    if (Array.isArray(props?.permission) && props?.permission.length) {
      for (var item of props.permission) {
        if (currentUser.permissions.includes(item)) return true;
      }
      return false;
    }
    console.log("Length", currentUser.permissions.length)
    return currentUser.permissions.includes(props.permission);
  };

  console.log("This",currentUser.permissions, props.permission);
  console.log(
    "Current User Permissions",
    currentUser.permissions,
    props.permission,
    isAllowed()
  );

  return <Fragment>{isAllowed() ? props.children : null}</Fragment>;
};
