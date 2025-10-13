import { Navigate } from "react-router-dom";

import Fourzerofour from "pages/AuthenticationInner/Errors/404Error";
import Fivezerozero from "pages/AuthenticationInner/Errors/500Error";
import Fivezerothree from "pages/AuthenticationInner/Errors/503Error";
import OfflinePage from "pages/AuthenticationInner/Errors/Offline";
import Crm from "pages/Dashboard/Crm";

// Authentication
import Login from "pages/Authentication/Login";
import Logout from "pages/Authentication/Logout";
import UserProfile from "pages/Authentication/user-profile";
import FacultyList from "../pages/Faculty/facultyList";
import AlumniList from "../pages/Alumni/AlumniList";
import Notification from "../pages/Notification/Notification";
import ClubMember from "pages/ClubMember/ClubMember";
import Media from "pages/Media/Media";
import MediaCategory from "pages/MediaCategory/MediaCategory";

// Pages
import Banner from "pages/Banner/Banner";
import CreateNews from "../pages/Pages/CreateNews/CreateNews";
import DiscountBanner from "../pages/Pages/DiscountBanner/DiscountBanner";
import FooterSettings from "../pages/Pages/Footer/FooterSettings";
import News from "../pages/Pages/News/News";
import ProfileSettings from "../pages/Pages/ProfileSettings/ProfileSettings";

// Event
import Events from "pages/Event/Events/Events";
import CreateEvents from "pages/Event/CreateEvents/CreateEvents";

// Vacancy
import Vacancies from "pages/Vacancy/Vacancies/Vacancies";
import CreateVacancies from "pages/Vacancy/CreateVacancies/CreateVacancies";





const authProtectedRoutes = [
    // Dashboard
    { path: "/dashboard", component: <Crm /> },
    { path: "/", exact: true, component: <Navigate to="/dashboard" /> },
    { path: "*", component: <Navigate to="/dashboard" /> },
    { path: "/dashboard", name: "Crm Dashboard", component: <Crm /> },

    //user prpfile
    { path: "/user-profile", name: "UserProfile", component: <UserProfile /> },
    { path: "/", exact: true, name: "Navigate", component: <Navigate to="/dashboard" /> },
    { path: "/faculty-list", name: "FacultyList", component: <FacultyList /> },
    { path: "/alumni-list", name: "StudentList", component: <AlumniList /> },
    { path: "/notification", name: "Notification", component: <Notification /> },
    { path: "/club-member", name: "ClubMember", component: <ClubMember /> },
    { path: "/media", name: "Media", component: <Media /> },
    { path: "/mediaCategory", name: "MediaCategory", component: <MediaCategory /> },
    { path: "/banner-list", name: "Banner", component: <Banner /> },


    // Vacancy
    { path: "/vacancies", name: "Vacancies", component: <Vacancies /> },
    { path: "/create-vacancies", name: "CreateVacancies", component: <CreateVacancies /> },


    // Event
    { path: "/events", name: "Events", component: <Events /> },
    { path: "/create-events", name: "CreateEvents", component: <CreateEvents /> },


    //Pages
    { path: "/create-news", name: "CreateNews", component: <CreateNews /> },
    { path: "/discount-banner", name: "DiscountBanner", component: <DiscountBanner /> },
    { path: "/footer-settings", name: "FooterSettings", component: <FooterSettings /> },
    { path: "/news-list", name: "News", component: <News /> },
    { path: "/profile-settings", name: "ProfileSettings", component: <ProfileSettings /> },
];

const publicRoutes = [
    // Authentication
    { path: "/login", name: "Login", component: <Login /> },
    { path: "/logout", name: "Logout", component: <Logout /> },

    // Authentication Inner

    { path: "/auth-404", name: "Fourzerofour", component: <Fourzerofour /> },

    // Error 500
    { path: "/auth-500", name: "Fivezerozero", component: <Fivezerozero /> },

    // Error 503
    { path: "/auth-503", name: "Fivezerothree", component: <Fivezerothree /> },

    // Offline Page
    { path: "/auth-offline", name: "OfflinePage", component: <OfflinePage /> },

];

export { authProtectedRoutes, publicRoutes };