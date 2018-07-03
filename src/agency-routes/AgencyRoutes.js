import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { DirectionsBus, ExpandMore, Streetview } from '@material-ui/icons';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {
    ListItemAvatar,
    Avatar,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Typography
} from '@material-ui/core';

import { castArray } from 'lodash';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        backgroundColor: theme.palette.background.paper,
        height: '100%',
        width: '100%'
    },
    gridList: {
        width: '100%',
        height: '100%'
    },
    gridColumn: {
        overflow: 'auto !important',
        height: '100% !important'
    }
});

class AgencyRoutes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            routes: [],
            route: [],
            stop: []
        };
    }

    componentWillMount() {
        this.loadRoutes();
    }

    loadRoutes() {
        this.setState({route: null});
        this.setState({stop: null})

        fetch(
            'http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=' +
                this.props.match.params.tag
        )
            .then(data => {
                return data.json();
            })
            .then(data => {
                const routes = castArray(data.route).map(route => {
                    return (
                        <ListItem
                            button
                            key={route.tag}
                            onClick={this.loadRouteData.bind(this, route.tag)}
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <DirectionsBus />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={route.title} />
                        </ListItem>
                    );
                });

                this.setState({ routes: routes });
            });
    }

    loadRouteData(route) {
        this.setState({stop: null})

        fetch(
            `http://webservices.nextbus.com/service/publicJSONFeed?command=routeConfig&a=${
                this.props.match.params.tag
            }&r=${route}`
        )
            .then(data => {
                return data.json();
            })
            .then(data => {
                let routes = castArray(data.route.stop).map(r => {
                    return (
                        <ListItem
                            button
                            key={r.tag}
                            onClick={this.loadStopData.bind(this, route, r.tag)}
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <DirectionsBus />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={r.title} />
                        </ListItem>
                    );
                });

                this.setState({ route: routes });
            });
    }

    loadStopData(route, stopId) {
        fetch(
            `http://webservices.nextbus.com/service/publicJSONFeed?command=predictions&a=${
                this.props.match.params.tag
            }&r=${route}&s=${stopId}`
        )
            .then(data => {
                return data.json();
            })
            .then(data => {
                let stop = castArray(data.predictions.direction).map(d => {
                    return (
                        <ExpansionPanel key={d.title} defaultExpanded>
                            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                                <Typography varient="title">
                                    {d.title}
                                </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <List component="nav" dense={true}>
                                    {castArray(d.prediction).map(p => {
                                        return (
                                            <ListItem button key={p.tripTag}>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <Streetview />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={
                                                        p.minutes +
                                                        ' minutes away'
                                                    }
                                                    secondary={p.branch}
                                                />
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    );
                });

                this.setState({ stop: stop });
            });
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <GridList
                    cols={3}
                    spacing={8}
                    className={this.props.classes.gridList}
                >
                    <GridListTile
                        key="routes"
                        cols={1}
                        className={this.props.classes.gridColumn}
                    >
                        <List component="nav">{this.state.routes}</List>
                    </GridListTile>

                    <GridListTile
                        key="route"
                        cols={1}
                        className={this.props.classes.gridColumn}
                    >
                        <List component="nav">{this.state.route}</List>
                    </GridListTile>

                    <GridListTile
                        key="stop"
                        cols={1}
                        className={this.props.classes.gridColumn}
                    >
                        {this.state.stop}
                    </GridListTile>
                </GridList>
            </div>
        );
    }
}

AgencyRoutes.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AgencyRoutes);
