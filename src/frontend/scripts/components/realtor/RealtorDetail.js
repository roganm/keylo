import RealtorDetailRow from './RealtorDetailRow';
import { Table } from 'react-bootstrap';

const RealtorDetail = ({ listings }) => {
    return (
        <Table striped bordered condensed hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>MLSNumber</th>
                    <th>Price</th>
                </tr>
            </thead>

            <tbody>
                {listings.map((listing, i) =>
                    <RealtorDetailRow key={i}
                        {...listing} />
                )}
            </tbody>
        </Table>

    )
}

export default RealtorDetail;