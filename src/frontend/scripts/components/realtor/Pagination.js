import { Button, ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';

const Pagination = ({ first, last, total, current, pages, perPage, pageHandler, perPageHandler }) => {


    var buttons = [];

    for (var i = 1; i <= pages; i++) {
        buttons.push(i);
    }

    if (current > pages) {
        current = pages;
    }

    if (buttons.length < 15) {
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
                </ButtonGroup>
            </div>
        )
    } else {
        var innerLow = 0;
        var innerHigh = 0;
        if (current < 7) {
            innerLow = 3;
        } else if (current > pages - 6) {
            innerLow = pages - 8;
        } else {
            innerLow = current - 3;
        }
        
        innerHigh = innerLow + 5;

        return (
            <div className="Pagination">
                <span>Showing {first} to {last} of {total}<br></br><br></br>
                </span>
                <ButtonGroup>
                    {
                        buttons.slice(0, 3).map((button) =>
                            <Button active={current === button} key={button} onClick={() => pageHandler(button)}>{button}</Button>
                        )
                    }
                </ButtonGroup>
                <span className="Spacer">&nbsp;. . . &nbsp;</span>
                    <ButtonGroup>
                    {
                        buttons.slice(innerLow, innerHigh).map((button) =>
                            <Button active={current === button} key={button} onClick={() => pageHandler(button)}>{button}</Button>
                        )
                    }
                </ButtonGroup>
                <span className="Spacer">&nbsp;. . . &nbsp;</span>
                    <ButtonGroup>
                    {
                        buttons.slice(pages - 3, pages).map((button) =>
                            <Button active={current === button} key={button} onClick={() => pageHandler(button)}>{button}</Button>
                        )
                    }
                    <DropdownButton title="Records Per Page" id="bg-nested-dropdown">
                        <MenuItem eventKey="1" active={perPage === 15} onClick={() => perPageHandler(15)}>15</MenuItem>
                        <MenuItem eventKey="2" active={perPage === 25} onClick={() => perPageHandler(25)}>25</MenuItem>
                        <MenuItem eventKey="3" active={perPage === 50} onClick={() => perPageHandler(50)}>50</MenuItem>
                        <MenuItem eventKey="4" active={perPage === 75} onClick={() => perPageHandler(75)}>75</MenuItem>
                    </DropdownButton>
                </ButtonGroup>
            </div>
        )
    }
}

export default Pagination;

