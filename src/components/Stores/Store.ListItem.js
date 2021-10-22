import React from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { RenderWithPermission } from "../../utils/ConditionalRenderer";
import { userPermissions } from "../../utils/user";

function StoreListItem({ store, match }) {
  return (
    <div class="flex-table-item">
      <div className="w-20">
        <span>{store.StoreName}</span>
      </div>
      <div className="w-10">
        <span>{store.TotalStores}</span>
      </div>
      <div className="w-15">
        <span>{store.StoreCode}</span>
      </div>
      <div className="w-20">
        <span>{store.StoreType}</span>
      </div>
      <div className="w-15">
        <span>{store.IsActive ? "Active" : "Inactive"}</span>
      </div>
      <RenderWithPermission permission={userPermissions.EDIT_STORES}>
        <div className="w-10" style={{ display: "flex", alignItems: "center" }}>
          <Link to={`${match.path}edit/${store.StoreID}`} key={store.StoreID}>
            <span style={{ fontSize: "20px" }}>
              <FiEdit />
            </span>
          </Link>
        </div>
      </RenderWithPermission>
    </div>
  );
}

export default StoreListItem;
