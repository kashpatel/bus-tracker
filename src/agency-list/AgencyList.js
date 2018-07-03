import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';

import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

import { agencyList } from './AgencyList.API';

const styles = theme => ({
    gridList: {
        width: '90%',
        height: '100%'
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)'
    },
    header: {
        margin: '15px 0',
        padding: 0
    }
});

class AgencyList extends React.Component {
    classes = {};

    constructor(props) {
        super(props);
        this.classes = props.classes;
    }

    render() {
        return (
            <GridList className={this.classes.gridList} cols={3} spacing={8}>
                <GridListTile
                    key="Subheader"
                    cols={3}
                    style={{ height: 'auto' }}
                >
                    <ListSubheader
                        component="div"
                        className={this.classes.header}
                    >
                        <Typography variant="title">
                            Public Transport Agencies
                        </Typography>
                    </ListSubheader>
                </GridListTile>

                {agencyList.agency.map(agency => (
                    <GridListTile key={agency.tag} cols={1}>
                        <img
                            src="https://www.flightexpert.com/blog/wp-content/uploads/2018/02/Interesting-facts-about-Toronto.jpg"
                            alt={agency.title}
                        />
                        <GridListTileBar
                            title={agency.regionTitle}
                            subtitle={agency.title}
                            actionIcon={
                                <IconButton
                                    className={this.classes.icon}
                                    href={`/agency/${agency.tag}`}
                                >
                                    <InfoIcon />
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        );
    }
}

AgencyList.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AgencyList);
