const RealtorDetail = ({ realtor, handler }) => {

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
                <tr onClick={handler}>
                    <td>{realtor.id}</td>
                    <td>{realtor.name}</td>
                    <td><b>{realtor.phonetype1}</b>&nbsp;</td>
                    <td>{realtor.guid}</td>
                    <td>{realtor.updated_at}</td>
                </tr>
            </tbody>

        </table>

    )
}

export default RealtorDetail;