import PropTypes from 'prop-types'
import Button from "react-bootstrap/Button";
import { BsArrowRepeat } from "react-icons/bs";
import "./LoadingButton.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";


const LoadingButton = ({ colour, text, onClick, isLoading, className = "" }) => {
    return (
        <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 100 }}
            overlay={
                <Tooltip id="button-tooltip">
                    Short term Tracks
                </Tooltip>
            }
        >
            <Button
                block
                onClick={onClick}
                className={`LoaderButton ${className}`}
                style={{ backgroundColor: colour }}>
                {isLoading && <BsArrowRepeat className="spinning" />}
                {text}
            </Button>
        </OverlayTrigger>
    );
}

LoadingButton.propTypes = {
    text: PropTypes.string,
    colour: PropTypes.string,
    onClick: PropTypes.func,
    isLoading: PropTypes.bool,
}

export default LoadingButton;
