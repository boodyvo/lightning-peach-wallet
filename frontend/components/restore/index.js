import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { analytics } from "additional";
import { connect } from "react-redux";
import { authTypes as types } from "modules/auth";
import Seed from "./seed";
import UserForm from "./user-form";

class Restore extends Component {
    constructor(props) {
        super(props);
        this.username = null;
        this.password = null;

        analytics.pageview("/restore", "Restore Password");
    }

    setUser = ({ username, password }) => {
        this.username = username;
        this.password = password;
    };

    render() {
        let content;
        switch (this.props.authStep) {
            case types.RESTORE_STEP_SEED:
                content = <Seed username={this.username} password={this.password} />;
                break;
            case types.RESTORE_STEP_USER_PASS:
            default:
                content = <UserForm username={this.username} onValidUser={this.setUser} />;
                break;
        }

        return (
            <Fragment>
                <div className="home__title">
                    Wallet recovery
                </div>
                {content}
            </Fragment>
        );
    }
}

Restore.propTypes = {
    authStep: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    authStep: state.auth.authStep,
});

export default connect(mapStateToProps)(Restore);
