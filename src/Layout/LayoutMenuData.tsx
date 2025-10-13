import React, { useEffect, useState } from "react";

const Navdata = () => {
    //state data
    const [isDashboard, setIsDashboard] = useState(false);
    const [isEcommerce, setIsEcommerce] = useState(false);
    const [isLearning, setIsLearning] = useState(false);
    const [isSupportTicket, setIsSupportTicket] = useState(false);
    const [isRealEstate, setIsRealEstate] = useState(false);
    const [isAuthentication, setIsAuthentication] = useState(false);
    const [isPages, setIsPages] = useState(false);
    const [isEvent, setIsEvent] = useState(false);
    const [isVacancy, setIsVacancy] = useState(false);
    const [isMedia, setIsMedia] = useState(false);

    // Components
    const [isBootstrapUi, setIsBootstrapUi] = useState(false);
    const [isAdvanceUi, setIsAdvanceUi] = useState(false);
    const [isWidgets, setIsWidgets] = useState(false);
    const [isForms, setIsForms] = useState(false);
    const [isTables, setIsTables] = useState(false);
    const [isCharts, setIsCharts] = useState(false);
    const [isIcons, setIsIcons] = useState(false);
    const [isMaps, setIsMaps] = useState(false);

    const [isOrder, setIsOrder] = useState(false);
    const [isInvoice, setIsInvoice] = useState(false);
    const [isShipping, setIsShipping] = useState(false);
    const [isLocalization, setIsLocalization] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [isMultiLevel, setIsMultiLevel] = useState(false);

    // Authentication
    const [isError, setIsError] = useState(false);

    const [iscurrentState, setIscurrentState] = useState('Dashboard');

    function updateIconSidebar(e: any) {
        if (e && e.target && e.target.getAttribute("sub-items")) {
            const ul: any = document.getElementById("two-column-menu");
            const iconItems: any = ul.querySelectorAll(".nav-icon.active");
            let activeIconItems = [...iconItems];
            activeIconItems.forEach((item) => {
                item.classList.remove("active");
                let id: any = item.getAttribute("sub-items");
                let menusId = document.getElementById(id);
                if (menusId) {
                    (menusId.parentElement as HTMLElement).classList.remove("show");
                }
            });
            e.target.classList.add("active");
        }
    }

    useEffect(() => {
        document.body.classList.remove('twocolumn-panel');

        if (iscurrentState !== 'Dashboard') {
            setIsDashboard(false);
        }
        if (iscurrentState !== 'Ecommerce') {
            setIsEcommerce(false);
        }
        if (iscurrentState !== 'Learning') {
            setIsLearning(false);
        }
        if (iscurrentState !== 'Invoice') {
            setIsInvoice(false);
        }
        if (iscurrentState !== 'Support Ticket') {
            setIsSupportTicket(false);
        }
        if (iscurrentState !== 'Real Estate') {
            setIsRealEstate(false);
        }
        if (iscurrentState !== 'Authentication') {
            setIsAuthentication(false);
        }
        if (iscurrentState !== 'Pages') {
            setIsPages(false);
        }
        if (iscurrentState !== 'Bootstrap UI') {
            setIsBootstrapUi(false);
        }
        if (iscurrentState !== 'AdvanceUi') {
            setIsAdvanceUi(false);
        }
        if (iscurrentState !== 'Widgets') {
            setIsWidgets(false);
        }
        if (iscurrentState !== 'Forms') {
            setIsForms(false);
        }
        if (iscurrentState !== 'Tables') {
            setIsTables(false);
        }
        if (iscurrentState !== 'Charts') {
            setIsCharts(false);
        }
        if (iscurrentState !== 'Icons') {
            setIsIcons(false);
        }
        if (iscurrentState !== 'Maps') {
            setIsMaps(false);
        }
        if (iscurrentState !== 'Orders') {
            setIsOrder(false);
        }
        if (iscurrentState !== 'Shipping') {
            setIsShipping(false);
        }
        if (iscurrentState !== 'Localization') {
            setIsLocalization(false);
        }
        if (iscurrentState !== 'Auth') {
            setIsAuth(false);
        }
    }, [
        iscurrentState,
        isDashboard,
        isLearning,
        isRealEstate,
        isEcommerce,
        isSupportTicket,
        isOrder,
        isInvoice,
        isShipping,
        isLocalization,
        isAuth,
        isMultiLevel,
        isAuthentication,
        isPages,
        isEvent,
        isVacancy,
        isMedia,
        isBootstrapUi,
        isAdvanceUi,
        isWidgets,
        isForms,
        isTables,
        isCharts,
        isIcons,
        isMaps
    ]);

    const menuItems: any = [
        {
            label: "Menu",
            isHeader: true,
        },
        {
            id: "dashboard",
            label: "Dashboards",
            icon: "ph-gauge",
            link: "/#",
            click: function (e: any) {
                e.preventDefault();
                setIsDashboard(!isDashboard);
                setIscurrentState('Dashboard');
                updateIconSidebar(e);
            },
            stateVariables: isDashboard,
            subItems: [

                {
                    id: "crm",
                    label: "CRM",
                    link: "/dashboard",
                    parentId: "dashboard",
                },
            ],
        },

        {
            label: "Controller",
            isHeader: true,
        },
        {
            id: "faculty-list",
            label: "Faculty",
            icon: "ph-calendar",
            link: "/faculty-list",
        },
        {
            id: "students-list",
            label: "Alumni",
            icon: "bi bi-layers",
            link: "/alumni-list",
        },
        {
            id: "colors-list",
            label: "Notification",
            icon: "ph-paint-brush-broad",
            link: "/notification",
        },
        {
            id: "member-list",
            label: "Members",
            icon: "ph-users-three",
            link: "/club-member",
        },
        {
            id: "banner",
            label: "Banner",
            icon: "ph-megaphone",
            link: "/banner-list",
        },
        {
            id: "media",
            label: "Media",
            icon: "ph-camera",
            link: "/#",
            click: function (e: any) {
                e.preventDefault();
                setIsMedia(!isMedia);
                setIscurrentState('Media');
                updateIconSidebar(e);
            },
            stateVariables: isMedia,
            subItems: [
                {
                    id: "media",
                    label: "Media",
                    icon: "ph-camera",
                    link: "/media",
                },
                {
                    id: "mediaCategory",
                    label: "Media Category",
                    icon: "ph-bold ph-squares-four",
                    link: "/mediaCategory",
                },
            ]
        },
        {
            id: "vacancy",
            label: "Vacancy",
            icon: "ph-briefcase",
            link: "/#",
            click: function (e: any) {
                e.preventDefault();
                setIsVacancy(!isVacancy);
                setIscurrentState('Vacancy');
                updateIconSidebar(e);
            },
            stateVariables: isVacancy,
            subItems: [
                {
                    id: "vacancies",
                    label: "Vacancies",
                    icon: "ph-paint-brush-broad",
                    link: "/vacancies",
                },
                {
                    id: "createVacancies",
                    label: "Create Vacancies",
                    icon: "ph-paint-brush-broad",
                    link: "/create-vacancies",
                },
            ]
        },
        {
            id: "event",
            label: "Event",
            icon: "ph-calendar",
            link: "/#",
            click: function (e: any) {
                e.preventDefault();
                setIsEvent(!isEvent);
                setIscurrentState('Event');
                updateIconSidebar(e);
            },
            stateVariables: isEvent,
            subItems: [
                {
                    id: "events",
                    label: "Events",
                    icon: "ph-paint-brush-broad",
                    link: "/events",
                },
                {
                    id: "createEvents",
                    label: "Create Events",
                    icon: "ph-paint-brush-broad",
                    link: "/create-events",
                },
            ]
        },
        {
            id: "user-profile",
            label: "Profile",
            icon: "ph-user",
            link: "/user-profile",
        },
        // {
        //     id: "attributes",
        //     label: "Attributes",
        //     icon: "ph-calendar",
        //     link: "/attributes-list",
        // },
        // {
        //     id: "models",
        //     label: "Models",
        //     icon: "ph-bandaids",
        //     link: "/models-list",
        // },
        // {
        //     id: "discount",
        //     label: "Discount",
        //     icon: "ph-ticket",
        //     link: "/discounts-list",
        // },
        // {
        //     id: "ecommerce",
        //     label: "Product",
        //     icon: "ph-storefront",
        //     link: "/#",
        //     click: function (e: any) {
        //         e.preventDefault();
        //         setIsEcommerce(!isEcommerce);
        //         setIscurrentState('Ecommerce');
        //         updateIconSidebar(e);
        //     },
        //     stateVariables: isEcommerce,
        //     subItems: [
        //         {id: 1, label: "Products", link: "/apps-ecommerce-products", parentId: "ecommerce"},
        //         {id: 2, label: "Product Grid", link: "/apps-ecommerce-product-grid", parentId: "ecommerce"},
        //         {id: 2, label: "Product Details", link: "/apps-ecommerce-product-details", parentId: "ecommerce"},
        //         {id: 3, label: "Create Product", link: "/apps-ecommerce-add-product", parentId: "ecommerce"},
        //         {id: 6, label: "Customers", link: "/apps-ecommerce-customers", parentId: "ecommerce"},
        //     ],
        // },



        // {
        //     label: "Pages",
        //     isHeader: true,
        // },
        // {
        //     id: "pages",
        //     label: "Pages",
        //     icon: "ph-address-book",
        //     link: "/#",
        //     click: function (e: any) {
        //         e.preventDefault();
        //         setIsPages(!isPages);
        //         setIscurrentState('Pages');
        //         updateIconSidebar(e);
        //     },
        //     stateVariables: isPages,
        //     subItems: [
        //         {
        //             id: "News",
        //             label: "News",
        //             link: "/news-list",
        //             parentId: "pages"
        //         },
        //         {
        //             id: "CreateNews",
        //             label: "Create News",
        //             link: "/create-news",
        //             parentId: "pages"
        //         },
        //         {
        //             id: "profileSettings",
        //             label: "Profile Settings",
        //             link: "/profile-settings",
        //             parentId: "pages"
        //         },
        //         {
        //             id: "footer",
        //             label: "Footer",
        //             link: "/footer-settings",
        //             parentId: "pages"
        //         },
        //         {
        //             id: "banner",
        //             label: "Banner",
        //             link: "/banner-list",
        //             parentId: "pages"
        //         },
        //         {
        //             id: "discountBanner",
        //             label: "Discount banner",
        //             link: "/discount-banner",
        //             parentId: "pages"
        //         },
        //     ]
        // },



        // {
        //     label: "Authentication",
        //     isHeader: true,
        // },

        // {
        //     id: "authentication",
        //     label: "Authentication",
        //     icon: "ph-user-circle",
        //     link: "/#",
        //     click: function (e: any) {
        //         e.preventDefault();
        //         setIsAuthentication(!isAuthentication);
        //         setIscurrentState('Authentication');
        //         updateIconSidebar(e);
        //     },
        //     stateVariables: isAuthentication,
        //     subItems: [
        //         {
        //             id: "signin",
        //             label: "Sign In",
        //             link: "#",
        //             parentId: "authentication"
        //         },
        //         {
        //             id: "sign up",
        //             label: "Sign Up",
        //             link: "#",
        //             parentId: "authentication"
        //         },
        //         {
        //             id: "password-reset",
        //             label: "Password Reset",
        //             link: "#",
        //             parentId: "authentication"
        //         },
        //         {
        //             id: "password-create",
        //             label: "Password Create",
        //             link: "#",
        //             parentId: "authentication"
        //         },
        //         {
        //             id: "lockscreen",
        //             label: "Lock Screen",
        //             link: "#",
        //             parentId: "authentication"
        //         },
        //         {
        //             id: "logout",
        //             label: "Logout",
        //             link: "#",
        //             parentId: "authentication"
        //         },
        //         {
        //             id: "error",
        //             label: "Error",
        //             link: "/#",
        //             parentId: "authentication",
        //             isChildItem: true,
        //             click: function (e: any) {
        //                 e.preventDefault();
        //                 setIsError(!isError);
        //             },
        //             stateVariables: isError,
        //             subItems: [
        //                 {
        //                     id: 1,
        //                     label: "404 Error",
        //                     link: "/auth-404",
        //                     parentId: "authentication"
        //                 },
        //                 {
        //                     id: 2,
        //                     label: "500",
        //                     link: "/auth-500",
        //                     parentId: "authentication"
        //                 },
        //                 {
        //                     id: 3,
        //                     label: "503",
        //                     link: "/auth-503",
        //                     parentId: "authentication"
        //                 },
        //                 {
        //                     id: 4,
        //                     label: "Offline Page",
        //                     link: "/auth-offline",
        //                     parentId: "authentication"
        //                 },
        //             ]
        //         },
        //     ],
        // },

    ];

    return <React.Fragment>{menuItems}</React.Fragment>;
};

export default Navdata;