import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;


// intercepting to capture errors
axios.interceptors.response.use(
    function (response) {
        return response.data ? response.data : response;
    },
    function (error) {
        let message;
        const status = error.response ? error.response.status : null;

        switch (status) {
            case 500:
                message = "Internal Server Error";
                break;
            case 401:
                logoutUser();
                message = "Invalid credentials";
                break;
            case 404:
                message = "Sorry! The data you are looking for could not be found";
                break;
            default:
                message = error.message || "Something went wrong";
        }
        return Promise.reject(message);
    }
);

class APIClient {
    get = (url: any, params: any) => {
        let response;

        let paramKeys: any = [];

        if (params) {
            Object.keys(params).map(key => {
                paramKeys.push(key + '=' + params[key]);
                return paramKeys;
            });

            const queryString = paramKeys && paramKeys.length ? paramKeys.join('&') : "";
            response = axios.get(`${url}?${queryString}`, params);
        } else {
            response = axios.get(`${url}`, params);
        }

        return response;
    };

    getData = (url: any, data: any) => {
        return axios.get(`${url}`, data);
    }

    getConfirmation = (url: any, data: any) => {
        return axios.post(url + "?page=0&size=10", data);
    }

    getProduct = (url: any, pagination: any, data: any) => {
        return axios.post(`${url}?page=${pagination.page}&size=${pagination.size}`, data);
    }

    // getAlumni = (url: any, pagination: any, data: any) => {
    //     console.log(pagination, data)
    //     return axios.post(`${url}?page=${pagination.page}&size=${pagination.size}`, data);
    // }

    getNews = (url: any, pagination: any, data: any) => {
        return axios.post(`${url}?page=${pagination.page}&size=${pagination.size}`, data);
    }

    getProductById = (url: any, id: any) => {
        const newUrl = `${url}/${id}`;
        return axios.get(newUrl);
    }
    getNewsById = (url: any, id: any) => {
        const newUrl = `${url}/${id}`;
        return axios.get(newUrl);
    }

    create = (url: any, data: any) => {
        console.log(url, data);
        return axios.post(url, data);
    };

    updateByID = (url: any, data: any) => {
        let headers: { [key: string]: string } = {};
        if (data instanceof FormData) {
            headers["Content-Type"] = "multipart/form-data";
        }
        return axios.post(url, data, { headers })
    }

    updateColor = (url: any, data: any) => {
        return axios.post(url, data);
    }

    deleteById = (url: any, id: any) => {
        return axios.post(url + "/" + id)
    }

    // create Product

    createProduct = (url: any, data: any) => {
        let headers: { [key: string]: string } = {};
        if (data instanceof FormData) {
            headers["Content-Type"] = "multipart/form-data";
        }
        return axios.post(url, data, { headers });
    };

    createCategory = (url: any, data: any) => {
        let headers: { [key: string]: string } = {};
        if (data instanceof FormData) {
            headers["Content-Type"] = "multipart/form-data";
        }
        return axios.post(url, data, { headers });
    };


    // Login
    adminLogin = (url: any, data: any) => {
        return axios.post(url, data);
    };

    // LogOut
    logOut = (url: any) => {
        return axios.get(url)
    };

    // Admin
    getAdminById = (url: any,) => {
        return axios.get(url);
    }

    updateAdmin = (url: any, data: any) => {
        return axios.post(url, data);
    }

    /**
     * Updates data
     */
    update = (url: any, data: any) => {
        return axios.patch(url, data);
    };

    put = (url: any, data: any) => {
        return axios.put(url, data);
    };
    /**
     * Delete
     */
    delete = (url: any, config: any) => {
        return axios.delete(url, { ...config });
    };

    // ClubMember
    getClubMember = (url: any) => {
        return axios.get(url);
    };

    createClubMember = (url: any, data: any) => {
        let headers: { [key: string]: string } = {};
        if (data instanceof FormData) {
            headers["Content-Type"] = "multipart/form-data";
        }
        return axios.post(url, data, { headers });
    };

    updateClubMember = (url: any, data: any) => {
        const updateUrl = url.replace("{id}", data.id);
        return axios.post(updateUrl, data.updateFormData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    };

    deleteClubMember = (url: any, id: any) => {
        return axios.post(url + "/" + id);
    };


    // Vacancy
    getVacancy = (url: any) => {
        return axios.get(url, {
            headers: { lang: "uz" }
        });
    };

    createVacancy = (url: any, data: any) => {
        let headers: { [key: string]: string } = {
            lang: "uz"
        };
        if (data instanceof FormData) {
            headers["Content-Type"] = "multipart/form-data";
        }
        return axios.post(url, data, { headers });
    };

    updateVacancy = (url: any, data: any) => {
        let headers: { [key: string]: string } = {
            lang: "uz"
        };
        if (data instanceof FormData) {

            headers["Content-Type"] = "multipart/form-data";
        }
        return axios.post(url, data, { headers });
    }


    deleteVacancy = (url: any, id: any) => {
        return axios.post(url + "/" + id)
    }

    getVacancyById = (url: any, id: any) => {
        return axios.get(url + "/" + id);
    }



    // Event
    getEvent = (url: any) => {
        return axios.get(url)
    };


    createEvent = (url: any, data: any) => {
        let headers: { [key: string]: string } = {
        };
        if (data instanceof FormData) {
            headers["Content-Type"] = "multipart/form-data";
        }
        return axios.post(url, data, { headers });
    };

    updateEvent = (url: any, data: any) => {
        let headers: { [key: string]: string } = {
        };
        if (data instanceof FormData) {
            headers["Content-Type"] = "multipart/form-data";
        }
        return axios.post(url, data, { headers });
    }


    deleteEvent = (url: any, id: any) => {
        return axios.post(url + "/" + id)
    }

    getEventById = (url: any, id: any) => {
        return axios.get(url + "/" + id);
    }

    // Media
    getMedia = (url: any) => {
        return axios.get(url)
    };


    createMedia = (url: any, data: any) => {
        let headers: { [key: string]: string } = {};
        if (data instanceof FormData) {
            headers["Content-Type"] = "multipart/form-data";
        }
        return axios.post(url, data, { headers });
    };

    updateMedia = (url: any, data: any) => {
        const updateUrl = url.replace("{id}", data.id);
        return axios.post(updateUrl, data.updateFormData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }


    deleteMedia = (url: any, id: any) => {
        return axios.post(url + "/" + id)
    }


    // Media Category

    getMediaCategory = (url: any, data: any) => {
        return axios.get(`${url}`, data);
    }

    createMediaCategory = (url: any, data: any) => {
        return axios.post(url, data);
    };

    updateMediaCategory = (url: any, data: any) => {
        let headers: { [key: string]: string } = {};
        if (data instanceof FormData) {
            headers["Content-Type"] = "multipart/form-data";
        }
        return axios.post(url, data, { headers })
    }

    deleteMediaCategory = (url: any, id: any) => {
        return axios.post(url + "/" + id)
    }

}

const getLoggedInUser = () => {

    const user = localStorage.getItem("authAdmin");
    if (!user) {
        return null;
    } else {
        return JSON.parse(user);
    }
};

const logoutUser = () => {
    localStorage.removeItem("authAdmin");
    window.location.href = "/login";
}


export { APIClient, getLoggedInUser };