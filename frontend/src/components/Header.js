import LoadingButton from './LoadingButton'

const Header = ({ onAdd, showAdd, isLoading }) => {
    return (
        <header>
            <h1>Top Tracks</h1>
            <LoadingButton
                colour={showAdd ? '#41A2CB' : '#5BBF5B'}
                text={showAdd ? "Hide Tracks" : "Get Tracks"}
                onClick={onAdd}
                isLoading={isLoading}
            />
        </header>
    )
}

export default Header
