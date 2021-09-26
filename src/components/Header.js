import Button from './Button'

const Header = ({ onAdd, showAdd }) => {
    return (
    <header>
        <h1>Umbrella</h1>
        <Button 
            colour={showAdd ? 'red' : 'green'} 
            text={showAdd ? "Hide Tracks" : "Get Tracks"}
            onClick={onAdd}
        />
    </header>
    )
}

export default Header
