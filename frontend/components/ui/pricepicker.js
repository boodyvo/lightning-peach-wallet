import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DigitsField from "components/ui/digitsField";

class Pricepicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currency: this.props.bitcoinMeasureType,
            from: null,
            showInput: false,
            to: null,
        };
    }

    componentDidMount() {
        document.addEventListener("keyup", this.handleKeyUp);
        document.addEventListener("mouseup", this.handleMouseUp);
        document.addEventListener("touchend", this.handleTouchEnd);
    }

    componentWillUnmount() {
        document.removeEventListener("keyup", this.handleKeyUp);
        document.removeEventListener("mouseup", this.handleMouseUp);
        document.removeEventListener("touchend", this.handleTouchEnd);
    }

    setFromPrice = (e) => {
        this.setState({
            from: this.priceFrom.value.trim(),
        });
    };

    setToPrice = (e) => {
        this.setState({
            to: this.priceTo.value.trim(),
        });
    };

    setCurrency = (e) => {
        this.setState({
            currency: e.target.getAttribute("data-name"),
        });
    };

    handleKeyUp = (e) => {
        if (this.state.showInput && e.keyCode === 27) {
            this.hideInput();
        }
    };

    handleMouseUp = (e) => {
        if (this.state.showInput && !this.input.contains(e.target)) {
            this.hideInput();
        }
    };

    handleTouchEnd = (e) => {
        if (this.state.showInput && !this.input.contains(e.target)) {
            this.hideInput();
        }
    };

    hideInput = () => {
        this.setState({
            showInput: false,
        });
    };

    toggleDateInput = () => {
        this.setState({
            showInput: !this.state.showInput,
        });
    };

    reset = () => {
        this.priceFromComponent.reset();
        this.priceToComponent.reset();
        this.setState({
            currency: this.props.bitcoinMeasureType,
            from: null,
            showInput: false,
            to: null,
        });
    };

    render() {
        const { className, bitcoinMeasureType } = this.props;
        return (
            <div className="picker">
                <button
                    className={`button button__hollow picker__target ${className} ${
                        this.state.showInput ? "active" : ""
                    }`}
                    onClick={this.toggleDateInput}
                >
                    Price range
                </button>
                {this.state.showInput &&
                <div
                    className="picker__collapse"
                    ref={(ref) => { this.input = ref }}
                >
                    <div className="picker__row mt-14">
                        <div className="picker__label">
                            From
                        </div>
                        <DigitsField
                            id="price__from"
                            className="form-text form-text--long"
                            pattern={this.state.currency === "Satoshi"
                                ? "above_zero_int"
                                : "above_zero_float"}
                            name="price__from"
                            placeholder="0"
                            ref={(ref) => {
                                this.priceFromComponent = ref;
                            }}
                            setRef={(ref) => {
                                this.priceFrom = ref;
                            }}
                            setOnChange={this.setFromPrice}
                        />
                    </div>
                    <div className="picker__row mt-14">
                        <div className="picker__label">
                            To
                        </div>
                        <DigitsField
                            id="price__to"
                            className="form-text form-text--long"
                            pattern={this.state.currency === "Satoshi"
                                ? "above_zero_int"
                                : "above_zero_float"}
                            name="price__to"
                            placeholder="0"
                            ref={(ref) => {
                                this.priceToComponent = ref;
                            }}
                            setRef={(ref) => {
                                this.priceTo = ref;
                            }}
                            setOnChange={this.setToPrice}
                        />
                    </div>
                    <div className="picker__row picker__row--end">
                        <button
                            className={`button button__link ${
                                this.state.currency === bitcoinMeasureType
                                    ? "active"
                                    : ""
                            }`}
                            onClick={this.setCurrency}
                            data-name={bitcoinMeasureType}
                        >
                            {bitcoinMeasureType}
                        </button>
                        <button
                            className={`button button__link ${
                                this.state.currency === "USD"
                                    ? "active"
                                    : ""
                            }`}
                            onClick={this.setCurrency}
                            data-name="USD"
                        >
                            USD
                        </button>
                    </div>
                    <div className="picker__row picker__row--controls">
                        <button
                            className="button button__link"
                            onClick={this.reset}
                        >
                            Reset
                        </button>
                        <div className="picker__group">
                            <button
                                className="button button__link"
                                onClick={this.hideInput}
                            >
                                Cancel
                            </button>
                            <button
                                className="button button__link"
                                onClick={this.hideInput}
                            >
                                Ok
                            </button>
                        </div>
                    </div>
                </div>
                }
            </div>
        );
    }
}

Pricepicker.propTypes = {
    bitcoinMeasureType: PropTypes.string.isRequired,
    className: PropTypes.string,
};

const mapStateToProps = state => ({
    bitcoinMeasureType: state.account.bitcoinMeasureType,
});

export default connect(mapStateToProps)(Pricepicker);
