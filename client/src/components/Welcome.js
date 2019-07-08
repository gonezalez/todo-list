import React, { Component } from 'react';
import {
    Badge
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';

class Welcome extends Component {

    static propTypes = {
        isAuthenticated: PropTypes.bool,
    }

    render () {
        if (this.props.isAuthenticated)
            return ''
        return <div>
            <h3>
                Bienvenido! Para empezar por favor <Badge color="dark"><LoginModal /></Badge>
                &nbsp;o <Badge color="dark"><RegisterModal /></Badge>
            </h3>
        </div>
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
    mapStateToProps,
    null
)(Welcome);