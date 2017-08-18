export const RealtorDetailRow = ({ name, mlsnumber, price, handler }) => {
    return (
        <tr className="Row" onClick={handler}>
            <td>{name}</td>
            <td><b>{mlsnumber}</b>&nbsp;</td>
            <td>{price}</td>
        </tr>
    )
}

export default RealtorDetailRow;