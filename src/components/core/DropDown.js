import React, { useState, useEffect } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';

function DropDown({options=[], selected, preText}) {

    const [dropdownOpen, setOpen] = useState(false);
    const toggle = () => {
        console.log("Clicked");
        setOpen(!dropdownOpen);
    }

    useEffect(() => {
        console.log(dropdownOpen);
    }, [dropdownOpen])


    return (
        <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} className="custom-dropdown">
            <DropdownToggle caret size="sm">
               {preText || ""} Small Button
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem>Another Action</DropdownItem>
                <DropdownItem>Another Action</DropdownItem>
            </DropdownMenu>
        </ButtonDropdown>
    )
}

export default DropDown
