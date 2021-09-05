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
        page,
        state,
        setGlobalFilter,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
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




            </table>
            <div>
                Page {' '}
                <span>
                    <strong> {pageIndex + 1} of {pageOptions.length} </strong>
                </span> {' '}

                <span>
                    | Go to page: {' '}
                    <input
                        type='number'
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(pageNumber)
                        }}
                    style={{ width: '50px' }}/>
                </span>


                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
            </div>

        </div>
    )
}