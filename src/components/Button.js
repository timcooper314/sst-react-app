const Button = ({colour, text}) => {
    return (
        <button
            className='btn'
            style={{backgroundColor: colour}}>
                {text}
        </button>
    )
}

export default Button
