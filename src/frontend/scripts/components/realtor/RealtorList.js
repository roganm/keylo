import RealtorRow from './RealtorRow';
import { Table } from 'react-bootstrap';

const RealtorList = ({ realtors, handler }) => {

    return (
        <Table striped bordered condensed hover>
            <thead>
                <tr>
                    <th width="33%">Name</th>
                    <th width="34%">Phone</th>
                    <th width="33%">Update At</th>
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