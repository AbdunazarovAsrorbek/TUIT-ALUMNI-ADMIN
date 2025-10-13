import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import avatar1 from "assets/images/users/32/user-dummy-img.jpg";
import { getAdminById as onGetAdminById } from "slices/thunk";
import { useDispatch, useSelector } from 'react-redux';


const ProfileDropdown = () => {

    const [userName, setUserName] = useState<any>("Admin");

    const dispatch = useDispatch<any>();

    const admin = useSelector((state: any) => state.Admin.getAdminByIdList);

    useEffect(() => {
        dispatch(onGetAdminById());

    }, [dispatch]);

    return (
        <React.Fragment>
            <Dropdown className="ms-sm-3 header-item topbar-user">
                <Dropdown.Toggle
                    type="button"
                    className="btn bg-transparent border-0 arrow-none"
                    id="page-header-user-dropdown">
                    <span className="d-flex align-items-center">
                        <img className="rounded-circle header-profile-user" src={avatar1} alt="Header Avatar" />
                        <span className="text-start ms-xl-2">
                            <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{admin?.firstName}</span>
                            <span className="d-none d-xl-block ms-1 fs-sm text-muted user-name-sub-text">{admin?.roles}</span>
                        </span>
                    </span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-end">
                    <h6 className="dropdown-header">Welcome {admin?.firstName}!</h6>
                    <Dropdown.Item href={process.env.PUBLIC_URL + "/user-profile"}>
                        <i className="mdi mdi-account-circle text-muted fs-lg align-middle me-1"></i>
                        <span className="align-middle">Profile</span>
                    </Dropdown.Item>
                    <Dropdown.Item href="#">
                        <i className="mdi mdi-calendar-check-outline text-muted fs-lg align-middle me-1"></i>
                        <span className="align-middle">Taskboard</span>
                    </Dropdown.Item>
                    <div className="dropdown-divider"></div>
                    <Dropdown.Item href="#">
                        <span className="badge bg-soft-success text-success mt-1 float-end">New</span>
                        <i className="mdi mdi-cog-outline text-muted fs-lg align-middle me-1"></i>
                        <span className="align-middle">Settings</span>
                    </Dropdown.Item>
                    <Dropdown.Item href={process.env.PUBLIC_URL + "/logout"}>
                        <i className="mdi mdi-logout text-muted fs-lg align-middle me-1"></i>
                        <span className="align-middle" data-key="t-logout">Logout</span>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    );
}

export default ProfileDropdown;