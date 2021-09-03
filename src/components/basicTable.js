import React, { useMemo } from "react"
import { useTable } from "react-table"
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
// import ReactTable from "react-table-6";  
// import "react-table-6/react-table.css" 

export const BasicTable = () => {

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])

    const tableInstance = useTable({
        // columns: columns,
        // data: data

        columns,
        data

    })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = tableInstance

    return (
        <div>
            <table {...getTableProps()}>
                <thead>

                   {
                       headerGroups.map((headerGroup) => (
                           <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}> {column.render('Header')} </th>
                                ))}
                           </tr>
                       ))
                   }

                </thead>

                <tbody {...getTableBodyProps()}>

                    {
                        rows.map((row) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <td {...cell.getCellProps()}> {cell.render('Cell')} </td>
                                    ))}

                                </tr>
                            )
                        })
                    }


                </tbody>
            </table>

        </div>
    )
}