import React, { useMemo } from "react"
import { useSortBy, useTable } from "react-table"
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
import './table.css'

export const BasicSortTable = () => {

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])

    const tableInstance = useTable({
        // columns: columns,
        // data: data
        columns,
        data       

    }, useSortBy)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
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
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}> {column.render('Header')}
                                    
                                    <span>
                                        { column.isSorted ? (column.isSortedDesc ? 'V' : '^' ) : '' }
                                    </span>
                                     </th>
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

                <tfoot>
                    {
                        footerGroups.map(footerGroup => (
                            <tr {...footerGroup.getFooterGroupProps()}>
                                {
                                    footerGroup.headers.map(column => (
                                        <td {...column.getFooterProps()}>
                                            {
                                                 column.render('Footer') 
                                            }
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }

                </tfoot>


            </table>

        </div>
    )
}