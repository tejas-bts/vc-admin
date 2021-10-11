import React from 'react'
import { Switch, Route } from "react-router-dom";
import Organizations from '../Organizations';
import Suppliers from '../Suppliers';
import Stores from '../Stores';
import Contacts from '../Contacts';
import Events from '../Events';
import NavBar from "../../components/core/NavBar/NavBar";
import Menu from "../core/Menu";


const frame = () => <div className="settings-wrapper"><iframe height="1000" className="w-100 h-100" src="https://app.powerbi.com/view?r=eyJrIjoiYTVlYjA3NWYtMWQzNC00OWRjLWI1NzItNGFhODM5MGU1ODY2IiwidCI6ImMwMjUxMDg4LTgyMjAtNGIxNy1hNDc2LTY5YmZkMjE3NGQ2ZCIsImMiOjF9&pageName=ReportSectionb35d2a397c3724837762%22" frameborder="0" allowFullScreen="true"></iframe></div>

const index = (props) => {
    const { match } = props;
    return (
        <div className="view-wrapper is-full">
            <NavBar />
            <Menu  {...props} />
            <Switch>
                <Route path={`${match.path}/organizations`} component={Organizations} />
                <Route path={`${match.path}/suppliers`} component={Suppliers} />
                <Route path={`${match.path}/stores`} component={Stores} />
                <Route path={`${match.path}/contacts`} component={Contacts} />
                <Route path={`${match.path}/events`} component={Events} />
                <Route path={`${match.path}/report`} component={frame} />
            </Switch>
        </div>
    )
}

export default index