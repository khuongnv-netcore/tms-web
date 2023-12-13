import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { globalActions } from '../../redux/actions';
import { notificationSelector } from '../../redux/selectors/globalSelector';
import ToastCustom from '../ToastCustom';

const Notifier = () => {
    const notificationContent = useSelector(notificationSelector);

    const dispatch = useDispatch();

    const closeNotification = () => {
        dispatch(globalActions.removeNotification());
    }

    useEffect(() => {
        if (notificationContent && notificationContent.length > 0) {
          setTimeout(() => closeNotification(), 3000);
        }
    }, [notificationContent]);

    return (
        notificationContent.map((itemNotification, index) => {
            return (
                <ToastCustom notification={itemNotification} key={index}/>
            )
        })
    )
}

export default Notifier;