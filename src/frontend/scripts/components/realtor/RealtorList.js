import RealtorRow from './RealtorRow';

const RealtorList = ({ realtors, handler }) => {

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
                        {...realtor} handler={handler} />
                )}
            </tbody>

        </table>
    )
}

export default RealtorList;