import PropTypes from 'prop-types'
import Button from "react-bootstrap/Button";
import { BsArrowRepeat } from "react-icons/bs";
import "./LoadingButton.css";


const LoadingButton = ({ colour, text, onClick, isLoading, className = "" }) => {
    return (
        <Button
            block
            onClick={onClick}
            className={`LoaderButton ${className}`}
            style={{ backgroundColor: colour }}>
            {isLoading && <BsArrowRepeat className="spinning" />}
            {text}
        </Button>
    );
}

LoadingButton.propTypes = {
    text: PropTypes.string,
    colour: PropTypes.string,
    onClick: PropTypes.func,
    isLoading: PropTypes.bool,
}

export default LoadingButton
