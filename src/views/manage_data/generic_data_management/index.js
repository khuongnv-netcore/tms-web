import { useCallback, useEffect, useState } from "react";
import { Trash2, Edit } from "react-feather";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Row } from "reactstrap";
import { CustomConfirmModal, CustomDataTable } from "../../../modules";
import { genericDataManagementActions } from "../../../redux/actions";
import { genericDataManagementDataSelector } from "../../../redux/selectors/entitiesSelector";
import RoleForm from "./roleForm";
import './index.scss'

const GenericDataManagement = () => {
    const { t, i18n } = useTranslation();

    const dispatch = useDispatch();
    
    const [showModal, setShowModal] = useState(false);

    const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
    const [dataForForm, setDataForForm] = useState(null);
    const [targetItem, setTargetItem] = useState(null);

    const [titleForm, setTitleForm] = useState("");

    const list = useSelector(genericDataManagementDataSelector.list); 
    const genericDataManagementPaginationSetting = useSelector(genericDataManagementDataSelector.pagination);

    const {
        pageIndex: PageIndexList,
        pageCount: rowPerPageList,
        total: total, 
        orderBy: orderListBy,
        sortBy: sortListBy
    } = genericDataManagementPaginationSetting;


    const getList = (param) => {
        dispatch(genericDataManagementActions.getList(param))
    }

    useEffect(() => {
        getList(genericDataManagementPaginationSetting)
    }, [])

    const callBackAfterUpdate = useCallback(() => {
        setDataForForm({});
        setShowModal(false);
        setIsShowConfirmModal(false);
        getList(genericDataManagementPaginationSetting);
    }, [setShowModal, setIsShowConfirmModal, getList]);

    const addItem = (param) => {
        setTitleForm(t('Add Item'))
        dispatch(genericDataManagementActions.addItem(
            param,
            callBackAfterUpdate,
            null,
            t('user.Role.message_added_role_successfully')
            ));
    }

    const updateUserRole = (param) => {
        dispatch(genericDataManagementActions.updateItem(
            param,
            callBackAfterUpdate,
            null,
            t('user.User.message_changed_role_successfully')
            ));
    }
    
    const handleShowModal = (isShow) => {
        setShowModal(isShow);
        if (!isShow) {
            setDataForForm({});
        }
    }

    const handleShowConfirmModal = (isShow) => {
        setIsShowConfirmModal(isShow);
    }

    const handleAddItem = () => {
        setShowModal(true);
        setDataForForm(null);
    }

    const handleDeleteItem = () => {
        dispatch(genericDataManagementActions.deleteItem(
            targetItem, 
            callBackAfterUpdate, 
            null, 
            t('user.Role.message_deleted_role_successfully')
            ));
    }

    const handleCancelDeleteItem = () => {
        setTargetItem(null);
        setIsShowConfirmModal(false);
    }

    const handleUpdateItem = (param) => {
        if (param) {
            if (param.id && param.id.length > 0) {
                // update 
                updateUserRole(param)
            } else {
                // add new
                addItem(param)
            }
        }
    }

    const handleEdit = (rowItem) => {
        setShowModal(true)
        setDataForForm(rowItem);
    }

    const handleDelete = (rowItem) => {
        setIsShowConfirmModal(true);
        setTargetItem(rowItem);
    }

    const genericDataManagementColumns = [
        {
            name: t('user.Role.table_column_name'), 
            width: "75%",
            minWidth: '250px',
            selector: 'displayName',
            sortable: true,
        },
        {
            name: t('user.Role.table_column_actions'),
            minWidth: '150px',
            allowOverflow: true,
            cell: row => (
            <div>
                <Edit className="cursor-pointer" onClick={() => handleEdit(row)}/>
                <Trash2 className="cursor-pointer" onClick={() => handleDelete(row)}/>
            </div>
            )
        }
    ]

    const handleChangePageIndexList = (pageIndex) => {
        getList({...genericDataManagementPaginationSetting, pageIndex: pageIndex});
    }

    const handleChangeRowPerPageList = (numberOfRow) => {
        getList({...genericDataManagementPaginationSetting, pageCount: numberOfRow});
    }
    
    const handleSortingRole = (column, sortDirection) => {
        const sortBy = column.selector;
        const orderBy = sortDirection;
        getList(
            {
                ...genericDataManagementPaginationSetting,
                sortBy,
                orderBy
            }
        );
    }

    return (
        <>
            <div className='invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75'>
                <Row>
                    <Col xl='6' className='d-flex align-items-center p-0'>
                        {t('Generic')}
                    </Col>
                    <Col
                        xl='6'
                        className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'
                    >
                        <Button.Ripple color='primary' onClick={() => handleAddItem()}>
                            {t('Add Item')}
                        </Button.Ripple>
                    </Col>
                </Row>
            </div>
            <Card>
                <CustomDataTable 
                    data={list} 
                    columns={genericDataManagementColumns}
                    pagination=
                    {{
                        defaultSortField: "displayName",
                        pageIndex: PageIndexList,
                        total: total,
                        pageLength: rowPerPageList,
                        onChangePageIndex: handleChangePageIndexList,
                        onChangeRowPerPage: handleChangeRowPerPageList,
                        onSorting: handleSortingRole
                    }}
                />
            </Card>

            <RoleForm
                isShowModal={showModal} 
                handleShowModal={(isOpen) => handleShowModal(isOpen)}
                genericData={dataForForm}
                title={titleForm}
                handleUpdateItem={(formData) => handleUpdateItem(formData)}
            />

            <CustomConfirmModal 
                isOpen={isShowConfirmModal}
                title={t('user.Role.form_title_delete')}
                modalContent={t('user.Role.delete_role_content')}
                setBasicModal={(isModalOpen) => handleShowConfirmModal(isModalOpen)}
                onPrimaryButtonClick={() => handleDeleteItem()}
                onSecondaryButtonClick={() => handleCancelDeleteItem()}
            />
        </>
    )
}

export default GenericDataManagement;
