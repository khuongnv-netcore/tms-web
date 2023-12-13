import { useCallback, useEffect, useState } from "react";
import { Trash2 } from "react-feather";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Row } from "reactstrap";
import { CustomConfirmModal, CustomDataTable } from "../../../modules";
import { userActions, roleActions } from "../../../redux/actions";
import { roleDataSelector, userDataSelector } from "../../../redux/selectors/entitiesSelector";
import RoleForm from "./roleForm";
import UpdateUserRoleForm from "./updateUserRoleForm";
import './index.scss'

const User = () => {
    const { t, i18n } = useTranslation();

    const dispatch = useDispatch();
    
    const [showModal, setShowModal] = useState(false);
    const [showUpdateRoleModal, setShowUpdateRoleModal] = useState(false);

    const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
    const [roleDataForForm, setRoleDataForForm] = useState(null);
    const [targetItem, setTargetItem] = useState(null);
    const [userDataForForm, setUserDataForForm] = useState(null);

    const listRole = useSelector(roleDataSelector.listRole);
    const rolePaginationSetting = useSelector(roleDataSelector.pagination);

    const listUser = useSelector(userDataSelector.listUser);
    const userPaginationSetting = useSelector(userDataSelector.pagination);

    const {
        pageIndex: PageIndexListRole,
        pageCount: rowPerPageListRole,
        total: totalRole,
        orderBy: orderRoleBy,
        sortBy: sortRoleBy
    } = rolePaginationSetting;

    const {
        pageIndex: PageIndexListUser,
        pageCount: rowPerPageListUser,
        total: totalUser,
        orderBy: orderUserBy,
        sortBy: sortUserBy
    } = userPaginationSetting


    const getListRole = (param) => {
        dispatch(roleActions.getListRole(param))
    }

    const getListUser = (param) => {
        dispatch(userActions.getListUser(param))
    }

    useEffect(() => {
        getListUser(userPaginationSetting);
        getListRole(rolePaginationSetting)
    }, [])

    const callBackAfterUpdate = useCallback(() => {
        setRoleDataForForm({});
        setShowModal(false);
        setIsShowConfirmModal(false);
        getListUser(userPaginationSetting);
        getListRole(rolePaginationSetting);
    }, [setShowModal, setIsShowConfirmModal, getListUser, getListRole]);

    const addnewRoleItem = (param) => {
        dispatch(roleActions.addnewRoleItem(
            param,
            callBackAfterUpdate,
            null,
            t('user.Role.message_added_role_successfully')
            ));
    }

    const handleDeleteRole = () => {
        dispatch(roleActions.deleteRoleItem(
            targetItem, 
            callBackAfterUpdate, 
            null, 
            t('user.Role.message_deleted_role_successfully')
            ));
    }

    const callBackAfterUpdateUserRole = useCallback(() => {
        getListUser(userPaginationSetting);
        setRoleDataForForm({});
    }, [getListUser, setShowUpdateRoleModal]);

    const updateUserRole = (userRoleData) => {
        dispatch(userActions.updateUserRole(
            userRoleData,
            callBackAfterUpdateUserRole,
            null,
            t('user.User.message_changed_role_successfully')
            ));
    }

    const handleUpdateUserRole = (formData) => {
        // update user roles
        if (formData && formData.id && formData.id.length > 0) {
            setShowUpdateRoleModal(false);
            updateUserRole(formData);
        }
    }

    const handleShowUpdateRoleModal = (isShow) => {
        setShowUpdateRoleModal(isShow);
        if (!isShow) {
            setUserDataForForm(null);
        }
    }

    const handleShowModal = (isShow) => {
        setShowModal(isShow);
        if (!isShow) {
            setRoleDataForForm({});
        }
    }

    const handleShowConfirmModal = (isShow) => {
        setIsShowConfirmModal(isShow);
    }

    const handleAddNewRole = () => {
        setShowModal(true);
        setRoleDataForForm(null);
    }

    const handleDeleteRoleItem = () => {
        handleDeleteRole();
    }

    const handleCancelDeleteRoleItem = () => {
        setTargetItem(null);
        setIsShowConfirmModal(false);
    }

    const handleUpdateRole = (formData) => {
        if (formData) {
            // add new
            addnewRoleItem(formData);
        }
    }

    const handleChangeRole = (rowItem) => {
        const item = {...rowItem};
        item.userId = rowItem.id;
        item.rolesInput = [];

        item.roles.map((roleItem) => {
            item.rolesInput.push(roleItem.id);
        })

        setUserDataForForm(item)
        setShowUpdateRoleModal(true);
    }

    const renderRoles = (rowItem) => {
        const { roles } = rowItem;
        const listName = [];
        roles.map((roleItem) => {
            listName.push(roleItem.displayName)
        })
        return listName.join(", ");
    }

    const userTableColumns = [
        {
            name: t('user.User.table_column_name'),
            selector: 'firstName',
            minWidth: '150px',
            sortable: true,
            cell: row => (
                `${row.firstName} ${row.lastName}`
            )
        },
        {
            name: t('user.User.table_column_email'),
            selector: 'emailAddress',
            minWidth: '250px',
            sortable: true,
        },
        {
            name: t('user.User.table_column_role'),
            selector: 'roles',
            minWidth: '250px',
            sortable: true,
            cell: row => renderRoles(row) 
        },
        {
            name: t('user.User.table_column_actions'),
            minWidth: '150px',
            allowOverflow: true,
            cell: row => (
                <Button.Ripple color='primary' className={'pd-half'} onClick={() => handleChangeRole(row)}>
                    {t('user.User.button_change_role')}
                </Button.Ripple>
            )
        }
    ];

    const handleDelete = (rowItem) => {
        setIsShowConfirmModal(true);
        setTargetItem(rowItem);
    }

    const roleColumns = [
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
                <Trash2 className="cursor-pointer" onClick={() => handleDelete(row)}/>
            )
        }
    ]

    const handleChangePageIndexListRole = (pageIndex) => {
        getListRole({...rolePaginationSetting, pageIndex: pageIndex});
    }

    const handleChangeRowPerPageListRole = (numberOfRow) => {
        getListRole({...rolePaginationSetting, pageCount: numberOfRow});
    }
    
    const handleSortingRole = (column, sortDirection) => {
        const sortBy = column.selector;
        const orderBy = sortDirection;
        getListRole(
            {
                ...rolePaginationSetting,
                sortBy,
                orderBy
            }
        );
    }

    const handleChangePageIndexListUser = (pageIndex) => {
        getListUser({...userPaginationSetting, pageIndex: pageIndex});
    }

    const handleChangeRowPerPageListUser = (numberOfRow) => {
        getListUser({...userPaginationSetting, pageCount: numberOfRow});
    }

    const handleSortingUser = (column, sortDirection) => {
        const sortBy = column.selector;
        const orderBy = sortDirection;
        getListUser(
            {
                ...userPaginationSetting,
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
                        {t('user.User.title')}
                    </Col>
                </Row>
            </div>
            <Card>
                <CustomDataTable 
                    data={listUser} 
                    columns={userTableColumns}
                    pagination={{
                        defaultSortField: "firstName",
                        pageIndex: PageIndexListUser,
                        total: totalUser,
                        pageLength: rowPerPageListUser,
                        onChangePageIndex: handleChangePageIndexListUser,
                        onChangeRowPerPage: handleChangeRowPerPageListUser,
                        onSorting: handleSortingUser
                    }}
                />
            </Card>
            <div className='invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75'>
                <Row>
                    <Col xl='6' className='d-flex align-items-center p-0'>
                        {t('user.Role.title')}
                    </Col>
                    <Col
                        xl='6'
                        className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'
                    >
                        <Button.Ripple color='primary' onClick={() => handleAddNewRole()}>
                            {t('user.Role.button_add_role')}
                        </Button.Ripple>
                    </Col>
                </Row>
            </div>
            <Card>
                <CustomDataTable 
                    data={listRole} 
                    columns={roleColumns}
                    pagination={{
                        defaultSortField: "displayName",
                        pageIndex: PageIndexListRole,
                        total: totalRole,
                        pageLength: rowPerPageListRole,
                        onChangePageIndex: handleChangePageIndexListRole,
                        onChangeRowPerPage: handleChangeRowPerPageListRole,
                        onSorting: handleSortingRole
                    }}
                />
            </Card>

            <RoleForm
                isShowModal={showModal} 
                handleShowModal={(isOpen) => handleShowModal(isOpen)}
                roleData={roleDataForForm}
                title={t('user.Role.form_title')}
                handleUpdateRole={(formData) => handleUpdateRole(formData)}
            />

            <UpdateUserRoleForm 
                isShowModal={showUpdateRoleModal} 
                handleShowModal={(isOpen) => handleShowUpdateRoleModal(isOpen)}
                userData={userDataForForm}
                title={t('user.User.form_title')}
                handleUpdateUserRole={(formData) => handleUpdateUserRole(formData)}
            />

            <CustomConfirmModal 
                isOpen={isShowConfirmModal}
                title={t('user.Role.form_title_delete')}
                modalContent={t('user.Role.delete_role_content')}
                setBasicModal={(isModalOpen) => handleShowConfirmModal(isModalOpen)}
                onPrimaryButtonClick={() => handleDeleteRoleItem()}
                onSecondaryButtonClick={() => handleCancelDeleteRoleItem()}
            />
        </>
    )
}

export default User;
