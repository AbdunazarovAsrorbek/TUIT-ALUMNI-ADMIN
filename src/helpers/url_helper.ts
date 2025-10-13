//LOGIN
export const POST_FAKE_LOGIN = "/api/v1/auth/admins";

// Log Out
export const LOG_OUT = "/api/v1/auth/logout"

// Admin
export const GET_ADMIN_BY_ID = "/api/v1/auth/admin/profile"
export const UPDATE_ADMIN = "/api/v1/admins/update"

//product
export const GET_PRODUCT = "/api/v1/products/search";
export const GET_PRODUCT_BY_ID = "/api/v1/products/findById";
export const ADD_NEW_PRODUCT = "/api/v1/products/create";
export const DELETE_PRODUCT = "/api/v1/products/delete";
export const UPDATE_PRODUCT = "/api/v1/products/update";

//Faculty
export const GET_FACULTY_LIST = `/api/v1/faculties/findAll`;
export const ADD_FACULTY_LIST = "/api/v1/faculties/create";
export const UPDATE_FACULTY_LIST = "/api/v1/faculties/update";
export const DELETE_FACULTY_LIST = "/api/v1/faculties/deleteById";

//Alumni
export const GET_ALUMNI_LIST = "/api/v1/alumni/search";
export const DELETE_ALUMNI_LIST = "/api/v1/alumni/delete";
// export const GET_ALUMNI = "/api/v1/alumni/findAll/pagination";

// Get LMS Statistics
export const GET_STUDENT_LIST = "/api/v1/statistics/students";

//Attribute
export const GET_ATTRIBUTE_LIST = "/api/v1/attributes/findAll";
export const ADD_ATTRIBUTE_LIST = "/api/v1/attributes/create";
export const UPDATE_ATTRIBUTE_LIST = "/api/v1/attributes/update";
export const DELETE_ATTRIBUTE_LIST = "/api/v1/attributes/deleteById";

//Discount
export const GET_DISCOUNT_LIST = "/api/v1/discounts/findAll";
export const ADD_DISCOUNT_LIST = "/api/v1/discounts/create";
export const UPDATE_DISCOUNT_LIST = "/api/v1/discounts/update";
export const DELETE_DISCOUNT_LIST = "/api/v1/discounts/deleteById";

//Notification
export const GET_NOTIFICATION = "/api/v1/confirmation-requests/search";
export const REJECT = "/api/v1/confirmation-requests/reject";
export const ACCEPT = "/api/v1/confirmation-requests/confirm";

//Model
export const GET_MODEL_LIST = "/api/v1/models/findAll";
export const ADD_MODEL_LIST = "/api/v1/models/create";
export const UPDATE_MODEL_LIST = "/api/v1/models/update";
export const DELETE_MODEL_LIST = "/api/v1/models/deleteById";

// Pages

// News
export const GET_NEWS_LIST = "/api/v1/news/search";
export const ADD_NEWS_LIST = "/api/v1/news/create";
export const UPDATE_NEWS_LIST = "/api/v1/news/update";
export const DELETE_NEWS_LIST = "/api/v1/news/deleteById";
export const GET_NEWS_BY_ID = "/api/v1/news/findById";

// Club member
export const GET_CLUB_MEMBER = "/api/v1/club-member/findAll";
export const CREATE_CLUB_MEMBER = "/api/v1/club-member/create";
export const UPDATE_CLUB_MEMBER = `/api/v1/club-member/update/{id}`;
export const DELETE_CLUB_MEMBER = "/api/v1/club-member/delete";

// Vacancy
export const GET_VACANCY_LIST = "/api/v1/vacancy/findAllVacancy";
export const ADD_VACANCY_LIST = "/api/v1/vacancy/createVacancy";
export const UPDATE_VACANCY_LIST = "/api/v1/vacancy/updateVacancy";
export const DELETE_VACANCY_LIST = "/api/v1/vacancy/deleteVacancy";
export const GET_VACANCY_BY_ID = "/api/v1/vacancy/findById";

// Event
export const GET_EVENT_LIST = "/api/v1/event/findAllEvent";
export const ADD_EVENT_LIST = "/api/v1/event/createEvent";
export const UPDATE_EVENT_LIST = "/api/v1/event/updateEvent";
export const DELETE_EVENT_LIST = "/api/v1/event/deleteEvent";
export const GET_EVENT_BY_ID = "/api/v1/event/findById";

// Media
export const GET_MEDIA_LIST = "/api/v1/media/findAll";
export const ADD_MEDIA_LIST = "/api/v1/media/create";
export const UPDATE_MEDIA_LIST = `/api/v1/media/update/{id}`;
export const DELETE_MEDIA_LIST = "/api/v1/media/delete";

// Media Categoty
export const GET_MEDIACATEGORY_LIST = "/api/v1/media-category/findAll";
export const ADD_MEDIACATEGORY_LIST = "/api/v1/media-category/create";
export const UPDATE_MEDIACATEGORY_LIST = "/api/v1/media-category/update";
export const DELETE_MEDIACATEGORY_LIST = "/api/v1/media-category/delete";