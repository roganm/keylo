import RealtorRow from './RealtorRow';
import { Table } from 'react-bootstrap';

const RealtorList = ({ realtors, asc, sortBy, handler, handleSort }) => {

    return (
        <Table striped bordered condensed hover>
            <thead>
                <tr>
                    <th width="37%" onClick={() => handleSort('name')}><span className="Underline">Name {(sortBy === "name") ? ((asc) ? '▲' : '▼') : null}</span></th>
                    <th width="26%" onClick={() => handleSort('count')}><span className="Underline">Number of Listings {(sortBy === "count") ? ((asc) ? '▲' : '▼') : null}</span></th>
                    <th width="37%" onClick={() => handleSort('average')}><span className="Underline">Average Price {(sortBy === "average") ? ((asc) ? '▲' : '▼') : null}</span></th>
                    <th>Average ToM</th>
                </tr>
            </thead>
            <tbody>
                {realtors.map((realtor, i) =>
                    <RealtorRow key={i}
                        {...realtor} handler={handler} />
                )}
            </tbody>
        </Table>
    )
}

export default RealtorList;