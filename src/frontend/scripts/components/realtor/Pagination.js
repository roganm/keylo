import { Button, ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';

const Pagination = ({ first, last, total, current, pages, perPage, pageHandler, perPageHandler }) => {


    var buttons = [];

    for (var i = 1; i <= pages; i++) {
        buttons.push(i);
    }

    if(current > pages) {
        current = pages;
    }

    return (
        <div className="Pagination">
            <span>Showing {first} to {last} of {total}<br></br><br></br>
            </span>
            <ButtonGroup>
                {  
                    buttons.map((button) =>
                        <Button active={current === button} key={button} onClick={() => pageHandler(button)}>{button}</Button>
                    )
                }
                <DropdownButton title="Records Per Page" id="bg-nested-dropdown">
                    <MenuItem eventKey="1" active={perPage === 25} onClick={() => perPageHandler(25)}>25</MenuItem>
                    <MenuItem eventKey="2" active={perPage === 50} onClick={() => perPageHandler(50)}>50</MenuItem>
                    <MenuItem eventKey="3" active={perPage === 75} onClick={() => perPageHandler(75)}>75</MenuItem>
                    <MenuItem eventKey="4" active={perPage === 100} onClick={() => perPageHandler(100)}>100</MenuItem>
                </DropdownButton>
            </ButtonGroup>
        </div>
    )
}

export default Pagination;