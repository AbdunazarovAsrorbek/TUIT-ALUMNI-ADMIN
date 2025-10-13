import React, { Fragment, useEffect, useState } from "react";
import { Row, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import {
  Column,
  Table as ReactTable,
  ColumnFiltersState,
  FilterFn,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender
} from '@tanstack/react-table';

import { rankItem } from '@tanstack/match-sorter-utils';

// Column Filter
const Filter = ({
  column
}: {
  column: Column<any, unknown>;
  table: ReactTable<any>;
}) => {
  const columnFilterValue = column.getFilterValue();

  return (
    <>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={value => column.setFilterValue(value)}
        placeholder="Search..."
        className="w-36 border shadow rounded"
        list={column.id + 'list'}
      />
      <div className="h-1" />
    </>
  );
};

// Global Filter
const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [debounce, onChange, value]);

  return (
    <input {...props} value={value} onChange={e => setValue(e.target.value)} />
  );
};
interface TableContainerProps {
  columns?: any;
  data?: any;
  divClassName?: any;
  tableClass?: any;
  theadClass?: any;
  isBordered?: boolean;
  customPageSize?: number;
  isGlobalFilter?: boolean;
  isPagination: boolean;
  PaginationClassName?: string;
  SearchPlaceholder?: string;
}

const TableContainer = ({
  columns,
  data,
  tableClass,
  theadClass,
  divClassName,
  isBordered,
  isPagination,
  customPageSize,
  isGlobalFilter,
  PaginationClassName,
  SearchPlaceholder
}: TableContainerProps) => {

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({
      itemRank
    });
    return itemRank.passed;
  };

  const table = useReactTable({
    columns,
    data,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  const {
    getHeaderGroups,
    getRowModel,
    getCanPreviousPage,
    getCanNextPage,
    getPageOptions,
    setPageIndex,
    nextPage,
    previousPage,
    setPageSize,
    getState
  } = table;

  useEffect(() => {
    Number(customPageSize) && setPageSize(Number(customPageSize));
  }, [customPageSize, setPageSize]);

  return (
    <Fragment>
      {isGlobalFilter && <DebouncedInput
        value={globalFilter ?? ''}
        onChange={value => setGlobalFilter(String(value))}
        className="p-2 font-lg shadow border border-block"
        placeholder={SearchPlaceholder}
      />}

      <div className={divClassName ? divClassName : "table-responsive"}>
        <Table hover className={tableClass} bordered={isBordered}>
          <thead className={theadClass}>
            {getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none sort'
                          : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}>
                      {header.isPlaceholder ? null : (
                        <React.Fragment>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: ' ',
                            desc: ' ',
                          }
                          [header.column.getIsSorted() as string] ?? null}
                          {header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} table={table} />
                            </div>
                          ) : null}
                        </React.Fragment>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {getRowModel().rows.map(row => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      {
        isPagination && (
          <Row className={PaginationClassName}>
            <div className="col-sm">
              <div className="text-muted">Showing <span className="fw-semibold">{getState().pagination.pageSize}</span> of <span className="fw-semibold">{data.length}</span> Results</div>
            </div>
            <div className="col-sm-auto mt-3 mt-sm-0">
              <div className="pagination-wrap hstack gap-2 justify-content-center">
                <Button variant="link" className="page-item pagination-prev" disabled={!getCanPreviousPage()} onClick={previousPage}>
                  <i className="mdi mdi-chevron-left align-middle"></i>
                </Button>
                <ul className="pagination listjs-pagination mb-0">
                  {getPageOptions().map((item: any, key: number) => (
                    <React.Fragment key={key}>
                      <li className={getState().pagination.pageIndex === item ? "active" : ""}>
                        <Link to="#" className="page" onClick={() => setPageIndex(item)}>{item + 1}</Link>
                      </li>
                    </React.Fragment>
                  ))}
                </ul>
                <Button variant="link" className="page-item pagination-next" disabled={!getCanNextPage()} onClick={nextPage}>
                  <i className="mdi mdi-chevron-right align-middle"></i>
                </Button>
              </div>
            </div>
          </Row>
        )
      }
    </Fragment>
  );
};

export default TableContainer;