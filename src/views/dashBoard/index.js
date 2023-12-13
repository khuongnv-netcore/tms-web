import { useCallback, useEffect, useState } from "react";
import { Trash2 } from "react-feather";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Row } from "reactstrap";
import { CustomConfirmModal, CustomDataTable } from "../../modules";
import { userActions, roleActions } from "../../redux/actions";
import { roleDataSelector, userDataSelector } from "../../redux/selectors/entitiesSelector";
import RoleForm from "../manage_data/user/roleForm";
import UpdateUserRoleForm from "../manage_data/user/updateUserRoleForm";
import './index.scss'

const DashBoard = () => {
  const { t, i18n } = useTranslation();

    const dispatch = useDispatch();
    
    useEffect(() => {

    }, [])

    return (
        <>
        </>
    )
}

export default DashBoard