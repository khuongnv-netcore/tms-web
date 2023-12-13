import React from "react";
import { CustomFormModal } from "../../../../modules";
import { useForm } from 'react-hook-form'
import { ValidationForm, SelectMultipleWithValidator } from "../../../../modules/validatorComponent";
import { useTranslation } from "react-i18next";
import { roleDataSelector } from "../../../../redux/selectors/entitiesSelector";
import { useSelector } from "react-redux";

const UpdateUserRoleForm = (props) => {
    const { isShowModal, handleShowModal, userData, title, handleUpdateUserRole } = props
    const { t, i18n } = useTranslation();
    const listRole = useSelector(roleDataSelector.listRole);

    const listRoleInput = [];
    listRole.map((roleItem) => listRoleInput.push({
        ...roleItem,
        name: roleItem.displayName
    }))

    const defaultValues = React.useMemo(
        () => ({
            userId: userData?.userId || "",
            id: userData?.id || "",
            roleIds: userData?.rolesInput || [],
        }), [userData]
    );

    const userRoleForm = useForm({defaultValues, shouldUnregister: false})

    React.useEffect(() => {
        userRoleForm.reset(defaultValues);
    }, [defaultValues]);

    const handleSubmit = (formData) => {
        handleUpdateUserRole(formData)
    }

    const handleSetUserRole = (value) => {
        userRoleForm.setValue("roleIds", value)
    }

    return (
        <>
            <CustomFormModal
                isOpen={isShowModal} 
                setBasicModal={(isModalOpen) => handleShowModal(isModalOpen)} 
                title={title}
            >
                <ValidationForm 
                    formContext={userRoleForm}
                    onSubmit={(values) => handleSubmit({...values, id: userRoleForm.getValues("id")})}
                    primaryButtonText={t('modal.primary_button_text')}
                >
                    <SelectMultipleWithValidator
                        name='roleIds'
                        id='roleIds'
                        label={t('user.User.form_role_list')}
                        options={listRoleInput}
                        value={userRoleForm.watch("roleIds")}
                        onChange={(e) => handleSetUserRole(e)}
                        size={4}
                    />
                </ValidationForm>
            </CustomFormModal>
        </>
    )
}

export default UpdateUserRoleForm;
