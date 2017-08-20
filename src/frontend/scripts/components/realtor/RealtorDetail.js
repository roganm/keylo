import RealtorDetailRow from './RealtorDetailRow';

const RealtorDetail = ({ listings }) => {
    return (
        <table className="Table">
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
        </table>

    )
}

export default RealtorDetail;