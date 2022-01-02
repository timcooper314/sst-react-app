import Button from './Button'

const Header = ({ onAdd, showAdd }) => {
    return (
    <header>
        <h1>Top Tracks</h1>
        <Button 
            colour={showAdd ? '#41A2CB' : '#5BBF5B'}
            text={showAdd ? "Hide Tracks" : "Get Tracks"}
            onClick={onAdd}
        />
    </header>
    )
}

export default Header
