import React, { useMemo } from "react"
import { useSortBy, useTable, useGlobalFilter, useFilters, usePagination } from "react-table"
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
import './table.css'
import { GlobalFilter } from "./globalFilter"

export const PaginateTable = () => {

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])

    const tableInstance = useTable({
        // columns: columns,
        // data: data
        columns,
        data

    },
        useFilters, // for column filters
        useGlobalFilter,
        usePagination
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        page,
        state,
        setGlobalFilter,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        prepareRow
    } = tableInstance

    const { globalFilter } = state
    const { pageIndex } = state

    return (


        <div>

            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table {...getTableProps()}>
                <thead>

                    {
                        headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps(column)}> {column.render('Header')}

                                        <span>
                                            {column.isSorted ? (column.isSortedDesc ? 'V' : '^') : ''}
                                        </span>

                                        <div>
                                            {/* column filter */}
                                            {column.canFilter ? column.render('Filter') : null}
                                        </div>

                                    </th>
                                ))}
                            </tr>
                        ))
                    }

                </thead>

                <tbody {...getTableBodyProps()}>

                    {
                        page.map((row) => {
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
            Page { ' ' }
            <span>
               <strong> {pageIndex + 1} of { pageOptions.length } </strong>
            </span> { ' ' }
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
            <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>


        </div>
    )
}