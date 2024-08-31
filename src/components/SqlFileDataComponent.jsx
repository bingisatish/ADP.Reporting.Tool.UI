import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/esm/Container';
import { Form, InputGroup } from 'react-bootstrap';
import { useTable, useSortBy, useFilters, usePagination, useGlobalFilter } from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

/* @remove-on-eject-begin */

React.Fragment = React.Fragment || 'div';
/* @remove-on-eject-end */

const SqlFileDataList = () => {
    const [sqlFileData, setSqlFileData] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchSqlFileData = async () => {
            try {
                const baseURL = 'http://localhost:5273/api';
                //const baseURL = 'http://5cg9523v7n:8082/api';

                const response = await axios.get(`${baseURL}/SqlFileData?pageNumber=${pageNumber}&pageSize=${pageSize}`);
                setSqlFileData(response.data);

                setTotalPages(Math.ceil(response.data.totalCount / pageSize));
            } catch (error) {
                console.error('Error fetching SqlFileData:', error.response.data);
            }
        };

        fetchSqlFileData();
    }, [pageNumber, pageSize]);
    const handlePageChange = (newPageNumber) => {
        setPageNumber(newPageNumber);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(parseInt(event.target.value));
    };

    // Define the columns for the table
    const data = React.useMemo(() => sqlFileData, [sqlFileData]);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Request ID',
                accessor: 'requestId',
            },
            {
                Header: 'Client',
                accessor: 'name',
            },
            {
                Header: 'Description',
                accessor: 'description',
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setFilter,
        state: { pageIndex, filters, globalFilter },
        setGlobalFilter,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
    } = useTable(
        {
            columns,
            data: sqlFileData,
            initialState: { pageSize: 10 },
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,
    );
    return (
        <div>
            <center>
                <h1>Pension Reports</h1>
            </center>
            <Container>
                <InputGroup style={{ width: "200px", fontSize: "1.2em" }}>
                    <Form.Control
                        type="text"
                        value={globalFilter || ''}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        placeholder="Search..."
                    />
                    <InputGroup.Text>
                        <FontAwesomeIcon icon={faSearch} />
                    </InputGroup.Text>
                </InputGroup>

                <br />

                <Table hover striped bordered {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}

                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>

                <div>
                    <span>
                        Page {pageNumber} of {totalPages}
                    </span>
                    <button onClick={() => handlePageChange(pageNumber - 1)} disabled={pageNumber === 1}>
                        Previous
                    </button>
                    <button onClick={() => handlePageChange(pageNumber + 1)} disabled={pageNumber === totalPages}>
                        Next
                    </button>
                    <select value={pageSize} onChange={handlePageSizeChange}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        {/* Add more options as needed */}
                    </select>
                </div>

            </Container >
        </div>
    );
};

export default SqlFileDataList;