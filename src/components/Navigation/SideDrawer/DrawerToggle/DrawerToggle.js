import React from 'react';
import classes from './DrawerToggle.css'

const drawerToggle = (props) => (
    <div onClick={props.clicked} className={classes.DrawerToggle}>
        <i className="fa fa-bars" style={{color: 'white',fontSize: '22px'}} aria-hidden="true"></i>
    </div>
);

export default drawerToggle
