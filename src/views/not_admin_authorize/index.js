import { useAuth0 } from "../../auth0"
import { pathKeys } from "../../constants"

const NotAdminAuthorize = props => {
    const { logout } = useAuth0()

    const handleLogout = () => {
        logout({ returnTo: `${window.location.origin}${pathKeys.LOGIN}` })
    }

    return (
        <>
            <div className="d-flex align-items-center justify-content-center h-100">
                <div>
                    <h1 className='align-middle'>
                        You are not an admin. Please contact an admin if this is a mistake.
                    </h1>
                    <div className='d-flex align-items-center justify-content-center h-100'>
                        <button onClick={() => handleLogout()}>
                            Login again
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}


export  default NotAdminAuthorize;