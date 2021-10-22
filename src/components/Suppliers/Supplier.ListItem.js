import React from 'react'
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi'
import { RenderWithPermission } from '../../utils/ConditionalRenderer';
import { userPermissions } from '../../utils/user';

function SupplierListItem({supplier, match}) {
    return (
            <div class="flex-table-item">
                <div className="w-30">
                    <span>{supplier.SupplierName}</span>
                </div>
                <div className="w-20">
                    <span>{supplier.SupplierType}</span>
                </div>
                <div className="w-30">
                    <span>{supplier.OrgName}</span>
                </div>
                <div className="w-10">
                    <span>{supplier.TotalSupplier}</span>
                </div>
                <RenderWithPermission permission={userPermissions.EDIT_SUPPLIERS}>
                    <div className="w-10" style={{display: 'flex', alignItems: 'center'}}>
                        <Link to={`${match.url}/edit/${supplier.SupplierID}`} key={supplier.SupplierID}>
                            <span style={{fontSize:'20px'}}><FiEdit /></span>    
                        </Link>
                    </div>
                </RenderWithPermission>
            </div>
    )
}

export default SupplierListItem;
