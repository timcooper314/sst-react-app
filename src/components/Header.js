import Button from './Button'

const Header = () => {
    const onClick = () => {
        console.log('click')
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
