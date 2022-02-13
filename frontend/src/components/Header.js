import LoadingButton from './LoadingButton'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

const Header = ({ endpointText, onAdd, showAdd, isLoading, datesList, onDateSelect, selectedDate, onTimeRangeSelect, selectedTimeRange }) => {
    const timeRangeList = ["short_term", "medium_term", "long_term"]
    return (
        <header>
            <h1>{"Top " + endpointText}</h1>
            <LoadingButton
                colour={showAdd ? '#41A2CB' : '#5BBF5B'}
                text={showAdd ? "Hide " + endpointText : "Get " + endpointText}
                onClick={onAdd}
                isLoading={isLoading}
            />
            <DropdownButton
                id="dropdown-basic-button"
                title="Date"
                onSelect={onDateSelect}>
                {(datesList).map(
                    (variant) => (
                        <Dropdown.Item
                            id={`dropdown-split-variants-${variant}`}
                            key={`dropdown-split-variants-${variant}`}
                            eventKey={variant}>
                            {variant}
                        </Dropdown.Item>
                    )
                )}
            </DropdownButton>
            <p> {selectedDate} </p>
            <DropdownButton
                id="dropdown-basic-button"
                title="Time Range"
                onSelect={onTimeRangeSelect}>
                {(timeRangeList).map(
                    (variant) => (
                        <Dropdown.Item
                            id={`dropdown-split-variants-${variant}`}
                            key={`dropdown-split-variants-${variant}`}
                            eventKey={variant}>
                            {variant}
                        </Dropdown.Item>
                    )
                )}
            </DropdownButton >
            <p> {selectedTimeRange} </p>
        </header>
    )
}

export default Header
