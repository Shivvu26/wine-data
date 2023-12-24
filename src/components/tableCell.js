const TableCell = (props) => {
    console.log(props);
    let { data, type } = props;

    return ( 
        <div>
        <p style={{'textAlign': 'center', 'fontWeight': '700'}}>{type} Chart</p>
            <table>
                <thead>
                <tr>
                    <th>Measure</th>
                    {data.mean.map((_, index) => {
                       return <th key={index}>Class {index+1}</th>
                    })}
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{type} Mean</td>
                    {data.mean.map((item, index) => {
                       return <td key={index}>{item}</td>
                    })}
                </tr>
                <tr>
                    <td>{type} Median</td>
                    {data.median.map((item, index) => {
                       return <td key={index}>{item}</td>
                    })}
                </tr>
                <tr>
                    <td>{type} Mode</td>
                    {data.mode.map((item, index) => {
                    return <td key={index}>
                        {item.map((val, i) => {
                        return <span>{val}{i < item.length - 1 && ', '}</span>
                       })}
                       </td>
                    })}
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TableCell;