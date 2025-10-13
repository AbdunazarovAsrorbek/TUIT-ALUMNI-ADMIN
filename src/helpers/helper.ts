import { APIClient } from "./api_helper";
import * as url from "./url_helper"
import { REJECT } from "./url_helper";
const api = new APIClient();

// Login Method
export const login = (data: any) => api.adminLogin(url.POST_FAKE_LOGIN, data);

// logOut
export const logOut = () => api.logOut(url.LOG_OUT);

// Admin
export const getAdminById = () => api.getAdminById(url.GET_ADMIN_BY_ID)
export const updateAdmin = (data: any) => api.updateAdmin(url.UPDATE_ADMIN, data)

//Faculty
export const getFacultyList = () => api.getData(url.GET_FACULTY_LIST, null);
export const addFacultyList = (data: any) => api.create(url.ADD_FACULTY_LIST, data);
export const updateFacultyList = (data: any) => api.updateByID(url.UPDATE_FACULTY_LIST + "/" + data.id, data.updateFormData);
export const deleteFacultyList = (id: any) => api.deleteById(url.DELETE_FACULTY_LIST, id);

//Alumni
export const getAlumniList = (data: any, page: any) => api.getProduct(url.GET_ALUMNI_LIST, page, data);
export const deleteAlumniList = (id: any) => api.deleteById(url.DELETE_ALUMNI_LIST, id);
// export const getAlumni = (data: any, page: any) => api.getAlumni(url.GET_ALUMNI, page, data);

// Get LMS statistics
export const getStudentList = () => api.getData(url.GET_STUDENT_LIST, null);

//Attribute
export const getAttributeList = () => api.getData(url.GET_ATTRIBUTE_LIST, null);
export const addAttributeList = (data: any) => api.createCategory(url.ADD_ATTRIBUTE_LIST, data);
export const updateAttributeList = (data: any) => api.updateByID(url.UPDATE_ATTRIBUTE_LIST + "/" + data.id, data);
export const deleteAttributeList = (id: any) => api.deleteById(url.DELETE_ATTRIBUTE_LIST, id);

//Discount
export const getDiscountList = () => api.getData(url.GET_DISCOUNT_LIST, null);
export const addDiscountList = (data: any) => api.createCategory(url.ADD_DISCOUNT_LIST, data);
export const updateDiscountList = (data: any) => api.updateByID(url.UPDATE_DISCOUNT_LIST + "/" + data.id, data);
export const deleteDiscountList = (id: any) => api.deleteById(url.DELETE_DISCOUNT_LIST, id);

//Notification
export const getNotification = (data: any) => api.getConfirmation(url.GET_NOTIFICATION, data);
export const reject = (id: any) => api.updateColor(url.REJECT + "/" + id, null);
export const accept = (id: any) => api.updateColor(url.ACCEPT + "/" + id, null);

// model
export const getModelList = () => api.getData(url.GET_MODEL_LIST, null);
export const addModelList = (data: any) => api.createCategory(url.ADD_MODEL_LIST, data);
export const updateModelList = (data: any) => api.updateByID(url.UPDATE_MODEL_LIST + "/" + data.id, data);
export const deleteModelList = (id: any) => api.deleteById(url.DELETE_MODEL_LIST, id);

// Pages
//News
export const getNewsList = (data: any, pagination: any) => api.getNews(url.GET_NEWS_LIST, pagination, data);
export const addNewsList = (data: any) => api.createCategory(url.ADD_NEWS_LIST, data);
export const updateNewsList = (data: any, id: any) => api.updateByID(url.UPDATE_NEWS_LIST + "/" + id, data);
export const deleteNewsList = (id: any) => api.deleteById(url.DELETE_NEWS_LIST, id);
export const getNewsById = (id: any) => api.getNewsById(url.GET_NEWS_BY_ID, id);

// ClubMember
export const getClubMemberList = () => api.getClubMember(url.GET_CLUB_MEMBER);
export const updateClubMemberList = (id: any) => api.updateClubMember(url.UPDATE_CLUB_MEMBER, id);
export const createClubMemberList = (data: any) => api.createClubMember(url.CREATE_CLUB_MEMBER, data);
export const deleteClubMemberList = (id: any) => api.deleteClubMember(url.DELETE_CLUB_MEMBER, id);

// Vacancy
export const getVacancyList = () => api.getVacancy(url.GET_VACANCY_LIST);
export const addVacancyList = (data: any) => api.createVacancy(url.ADD_VACANCY_LIST, data);
export const updateVacancyList = (data: any) => api.updateVacancy(url.UPDATE_VACANCY_LIST + "/" + data.id, data.formData);
export const deleteVacancyList = (id: any) => api.deleteVacancy(url.DELETE_VACANCY_LIST, id);
export const getVacancyById = (id: any) => api.getVacancyById(url.GET_VACANCY_BY_ID, id)

// Event
export const getEventList = () => api.getEvent(url.GET_EVENT_LIST);
export const addEventList = (data: any) => api.createEvent(url.ADD_EVENT_LIST, data);
export const updateEventList = (data: any) => api.updateEvent(url.UPDATE_EVENT_LIST + "/" + data.id, data.formData);
export const deleteEventList = (id: any) => api.deleteEvent(url.DELETE_EVENT_LIST, id);
export const getEventById = (id: any) => api.getEventById(url.GET_EVENT_BY_ID, id)

// Media
export const getMediaList = () => api.getMedia(url.GET_MEDIA_LIST);
export const addMediaList = (data: any) => api.createMedia(url.ADD_MEDIA_LIST, data);
export const updateMediaList = (id: any) => api.updateMedia(url.UPDATE_MEDIA_LIST, id);
export const deleteMediaList = (id: any) => api.deleteMedia(url.DELETE_MEDIA_LIST, id);

// Media Category
export const getMediaCategoryList = () => api.getData(url.GET_MEDIACATEGORY_LIST, null);
export const addMediaCategoryList = (data: any) => api.create(url.ADD_MEDIACATEGORY_LIST, data);
export const updateMediaCategoryList = (data: any) => api.updateByID(url.UPDATE_MEDIACATEGORY_LIST + "/" + data.id, data.updateFormData);
export const deleteMediaCategoryList = (id: any) => api.deleteById(url.DELETE_MEDIACATEGORY_LIST, id);