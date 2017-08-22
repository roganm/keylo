import RealtorRow from './RealtorRow';
import { Table } from 'react-bootstrap';

const RealtorList = ({ realtors, handler }) => {

    return (
        <Table striped bordered condensed hover>
            <thead>
                <tr>
                    <th width="40%">Name</th>
                    <th width="20%">Number of Listings</th>
                    <th width="40%">Average Price</th>
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