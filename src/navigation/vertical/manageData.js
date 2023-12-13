import { CheckSquare, User, MapPin, CloudRain, Grid, Clipboard } from 'react-feather';
import { pathKeys, pathNames } from '../../constants'

export default [
    {
        header: 'Manage Data'
    },
    {
        id: 'manageUser',
        title: pathNames.MANAGE_DATA.USER,
        icon: <User size={20} />,
        navLink: pathKeys.MANAGE_DATA.USER
    },
    {
        id: 'manageGenericDataManagement',
        title: pathNames.MANAGE_DATA.GENERIC_DATA_MANAGEMENT,
        icon: <User size={20} />,
        navLink: pathKeys.MANAGE_DATA.GENERIC_DATA_MANAGEMENT
    },
]