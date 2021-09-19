import Button from './Button'

const Header = () => {
    const onClick = () => {
        console.log(process.env.REACT_APP_HELLO_WORLD_ENDPOINT)
    }
    return (
    <header>
        <h1>Umbrella</h1>
        <Button colour='green' text="Click a button"
        onClick={onClick}/>
    </header>
    )
}

export default Header
