import Button from 'react-bootstrap/Button';

import Pagination from 'react-bootstrap/Pagination';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable, useSortBy, useFilters, usePagination, useGlobalFilter } from 'react-table';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


//const baseURL = 'http://localhost:3000/api/weatherforecast';
const WeatherForecast = () => {

  const [forecasts, setForecasts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseURL = 'http://localhost:5273';
        //const baseURL = 'http://5cg9523v7n:8082';
        const response = await axios.get(`${baseURL}/WeatherForecast`);
        setForecasts(response.data);
      } catch (error) {
        console.error('Error fetching weather forecast:', error);
      }
    };

    fetchData();
  }, []);

  const data = React.useMemo(() => forecasts, [forecasts]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Temperature (°C)',
        accessor: 'temperatureC',
      },
      {
        Header: 'Summary',
        accessor: 'summary',
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
    setPageSize,
    state: { pageIndex, pageSize, filters, globalFilter },
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
      data,
      initialState: { pageSize: 5 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  return (
    <div>
      <center>
        <h1>Weather Forecast</h1>
      </center>

      <Container>
        <div className="d-flex flex-column">
          <div className='d-flex float-right'>
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

          </div>
          <br />
          <Table striped bordered hover>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                          : ''}
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
          <div className="pagination">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {'<<'}
            </button>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {'<'}
            </button>
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}

              <button onClick={() => nextPage()} disabled={!canNextPage}>
                {'>'}
              </button>
              <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                {'>>'}
              </button>
            </span>
            {/* Page number inputs */}
            <span className="mx-3">
              Go to page:{' '}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(pageNumber);
                }}
                style={{ width: '50px' }}
              />
            </span>
          </div>
        </div>
        <div>
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {Math.ceil(rows.length / pageSize)}
            </strong>{' '}
          </span>
          <select
            className="form-control d-inline-block"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </Container>
    </div>

  );
};

export default WeatherForecast;