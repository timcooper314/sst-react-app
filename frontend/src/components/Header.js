import LoadingButton from './LoadingButton'

const Header = ({ endpointText, onAdd, showAdd, isLoading }) => {
    return (
        <header>
            <h1>{"Top " + endpointText}</h1>
            <LoadingButton
                colour={showAdd ? '#41A2CB' : '#5BBF5B'}
                text={showAdd ? "Hide " + endpointText : "Get " + endpointText}
                onClick={onAdd}
                isLoading={isLoading}
            />
        </header>
    )
}

export default Header
