import React from 'react';
import RealtorRow from './RealtorRow';
import './Realtor.css';

const RealtorList = ({ realtors }) => {

    return (
        <table className="Table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>GUID</th>
                    <th>Update At</th>
                </tr>
            </thead>
            <tbody>
                {realtors.map((realtor, i) =>
                    <RealtorRow key={i}
                        {...realtor} />
                )}
            </tbody>

        </table>
    )
}

export default RealtorList;