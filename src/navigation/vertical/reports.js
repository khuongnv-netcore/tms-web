import { FileText, Package } from 'react-feather'
import { pathKeys, pathNames } from '../../constants'

export default [
    {
        header: 'Reports'
    },
    {
        id: 'reportInvoiceReport',
        title: pathNames.REPORT.INVOICE_REPORT,
        icon: <FileText size={20} />,
        navLink: pathKeys.REPORT.INVOICE_REPORT,
    },
    // {
    //     id: 'reportDebug',
    //     title: pathNames.REPORT.DEBUG,
    //     icon: <Package size={20} />,
    //     navLink: pathKeys.REPORT.DEBUG,
    // },
]