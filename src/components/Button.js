import PropTypes from 'prop-types'


const Button = ({colour, text, onClick}) => {
    return (
        <button
            onClick={onClick}
            className='btn'
            style={{backgroundColor: colour}}>
                {text}
        </button>
    )
}

Button.propTypes = {
    text: PropTypes.string,
    colour: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button
