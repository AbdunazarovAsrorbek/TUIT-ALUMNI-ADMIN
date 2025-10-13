import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";

// Product

// Authentication
import LoginReducer from "./auth/login/reducer";
import FacultyReducer from "./faculty/reducer";
import AlumniReducer from "./alumni/reducer";
import NotificationReducer from "./notification/reducer";
import NewsReducer from "./pages/news/reducer";
import StudentReducer from "./studentsStatistics/reducer";
import ClubMemberReducer from "./clubMember/reducer";
import VacancyReducer from "./vacancy/reducer";
import EventReducer from "./event/reducer";
import MediaReducer from "./media/reducer";
import MediaCategoryReducer from "./mediaCategory/reducer";
import AdminReducer from "./admin/reducer";

const rootReducer = combineReducers({
    Layout: LayoutReducer,
    Login: LoginReducer,
    Faculty: FacultyReducer,
    Alumni: AlumniReducer,
    Notification: NotificationReducer,
    News: NewsReducer,
    Student: StudentReducer,
    ClubMember: ClubMemberReducer,
    Vacancy: VacancyReducer,
    Event: EventReducer,
    Media: MediaReducer,
    MediaCategory: MediaCategoryReducer,
    Admin: AdminReducer,
});

export default rootReducer;

