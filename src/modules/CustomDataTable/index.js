import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// ** Third Party Components
import DataTable from "react-data-table-component"
import { ChevronDown } from 'react-feather'
import ReactPaginate from "react-paginate";
import { Card, CardHeader, CardTitle, Col, Label, Input, Row } from 'reactstrap'

const CustomDataTable = (props) => {

    const { data, columns, pagination } = props;

    const {
        total,
        pageIndex,
        pageLength,
        onChangePageIndex,
        onChangeRowPerPage,
        rowsPerPageOptions = [5, 10, 25],
        onSorting,
        defaultSortField,
      } = pagination || {}

    const handlePagination = page => {
        onChangePageIndex(page.selected);
    }

    const CustomPagination = () => {
        const pageCount = Math.ceil(Number(total / pageLength));

        return (
            <ReactPaginate
                previousLabel={''}
                nextLabel={''}
                forcePage={pageIndex}
                onPageChange={page => handlePagination(page)}
                pageCount={pageCount}
                breakLabel={'...'}
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                activeClassName={'active'}
                pageClassName={'page-item'}
                nextLinkClassName={'page-link'}
                nextClassName={'page-item next'}
                previousClassName={'page-item prev'}
                previousLinkClassName={'page-link'}
                pageLinkClassName={'page-link'}
                breakClassName='page-item'
                breakLinkClassName='page-link'
                containerClassName={'pagination react-paginate justify-content-end p-1'}
            />
        );
    }

    const handlePerPage = (e) => {
        const nextRowPerPage = parseInt(e.target.value, 10)
        typeof onChangeRowPerPage === 'function' && onChangeRowPerPage(nextRowPerPage);
    }

    const renderHeaderPaing = () => {
        return(
            <>
                <Row className='mx-0 mt-1 mb-50'>
                    <Col sm='6'>
                        <div className='d-flex align-items-center'>
                        <Label for='sort-select'>Show</Label>
                        <Input
                            className='dataTable-select'
                            type='select'
                            id='sort-select'
                            value={pageLength}
                            onChange={e => handlePerPage(e)}
                        >
                            {
                                rowsPerPageOptions.map((item) => {
                                    return <option value={item} key={item}>{item}</option>
                                })
                            }
                        </Input>
                        <Label for='sort-select'>entries</Label>
                        </div>
                    </Col>
                </Row>
            </>
        )
    }

    const customPaging = {}
    if(pagination) {
        customPaging.onSort = (column, sortDirection, event) => onSorting(column, sortDirection);
    }

    return (
        <>
            {
                pagination ? renderHeaderPaing() : null
            }
            <DataTable
                noHeader
                responsive={true}
                pagination={pagination}
                data={data}
                columns={columns}
                className='react-dataTable'
                sortIcon={<ChevronDown size={10} />}
                defaultSortField={pagination ? defaultSortField : null}
                sortServer={!!pagination}
                paginationServer={!!pagination}
                paginationDefaultPage={pagination ? pageIndex + 1 : 1}
                paginationComponent={CustomPagination}
                {...customPaging}
            />
        </>
    )
}

CustomDataTable.propTypes = {
    data: PropTypes.array,
    columns: PropTypes.array,
    pagination: PropTypes.shape({
        total: PropTypes.number,
        pageIndex: PropTypes.number,
        pageLength: PropTypes.number,
        onChangePageIndex: PropTypes.func,
        onChangeRowPerPage: PropTypes.func,
        rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
        onSorting: PropTypes.func,
        defaultSortField: PropTypes.string
    }),
}

CustomDataTable.defaultProps = {
    data: [],
    columns: [],
    pagination: undefined
};
  
export default CustomDataTable
  