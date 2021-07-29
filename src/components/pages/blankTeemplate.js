import React from 'react';
import SideBar from '../core/SideBar';
import NavBar from '../core/NavBar';
import { Link } from 'react-router-dom';

export default function Blank() {
    return (
        <div>
            <SideBar />
            <NavBar />
            <Link to="/navbar">Tejas</Link>
        </div>
    )
}
