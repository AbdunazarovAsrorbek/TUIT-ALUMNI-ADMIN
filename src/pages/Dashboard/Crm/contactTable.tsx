import React, { useMemo } from 'react';
import TableContainer from "Common/TableContainer";
import { ContactData } from 'Common/data';
import { Link } from 'react-router-dom';

const ContactTable = () => {

  const columns = useMemo(() => [
    {
      header: "Contact Name",
      accessorKey: "name",
      enableColumnFilter: false,
      enableSorting: true,
      cell: (cell: any) => (
        <>
          <div className="d-flex align-items-center gap-2">
            <img src={cell.row.original.image} alt="react.png" className="avatar-xxs rounded" />
            <Link to={"/pages-profile"} className="text-reset contact_name">{cell.row.original.name}</Link>
          </div>
        </>
      ),
    },
    {
      header: "Phone Number",
      accessorKey: "phoneNumber",
      enableColumnFilter: false,
      enableSorting: true,
    },
    {
      header: "Leeds Score",
      accessorKey: "score",
      enableColumnFilter: false,
      enableSorting: true,
    },
    {
      header: "Location",
      accessorKey: "location",
      enableColumnFilter: false,
      enableSorting: true,
    },
    {
      header: "Create Date",
      accessorKey: "date",
      enableColumnFilter: false,
      enableSorting: true,
    },
  ], []
  );

  return (
    <React.Fragment>
      <TableContainer
        isPagination={true}
        columns={(columns || [])}
        data={(ContactData || [])}
        isBordered={false}
        customPageSize={5}
        PaginationClassName='align-items-center mt-4 pt-2'
        divClassName="table-responsive table-card mt-0"
        tableClass="table table-borderless table-centered align-middle table-nowrap mb-0"
        theadClass="text-muted table-light"
      />
    </React.Fragment>
  );
};

export { ContactTable };