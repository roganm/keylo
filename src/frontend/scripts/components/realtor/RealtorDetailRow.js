export const RealtorDetailRow = ({ name, mlsnumber, price, handler }) => {
    return (
        <tr className="Row" onClick={handler}>
            <td>{name}</td>
            <td><b>{mlsnumber}</b>&nbsp;</td>
            <td>${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
        </tr>
    )
}

export default RealtorDetailRow;