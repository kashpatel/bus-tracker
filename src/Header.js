import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
    flex: {
        flex: 1
    }
};

function Header(props) {
    const { classes } = props;
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="title"
                    color="inherit"
                    className={classes.flex}
                >
                    Bus Tracker
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

Header.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
