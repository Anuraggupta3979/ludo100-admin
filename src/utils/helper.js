import axios from "axios";
// import fileDownload from "js-file-download";
import Cookies from "js-cookie";
import { message } from "antd";
import API_MANAGER from "../API";

let HELPERS = {
  getCookie: (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  },

  request: (config) => {
    config.headers = config.headers ? config.headers : {};

    return axios
      .request(config)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  },
  secureRequest: async (config) => {
    config.headers = config.headers ? config.headers : {};
    let hashcode = localStorage.getItem("hashcode");
    if (!hashcode) {
      message.error("Your session is expired, please login again.");
      if (window?.location?.pathname !== "/login") {
        window.open(`/login`, "_self");
      }
      return;
    }
    config.headers["Authorization"] = `Bearer ${hashcode} `;
    try {
      const response = await HELPERS.request(config);
      return response;
    } catch (err) {
      if (err?.response && err?.response?.status === 401) {
        localStorage.clear(); // Clear local storage
        message.error("Your session is expired, please login again.");
        window.open("/login", "_self"); // Redirect to login page
      } else {
        throw err;
      }
    }
  },
  converToFormData: (obj, rootName, ignoreList) => {
    var formData = new FormData();
    function appendFormData(data, root) {
      if (!ignore(root)) {
        root = root || "";
        if (data instanceof File) {
          formData.append(root, data);
        } else if (Array.isArray(data)) {
          for (var i = 0; i < data.length; i++) {
            appendFormData(data[i], root + "[" + i + "]");
          }
        } else if (typeof data === "object" && data) {
          for (var key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
              if (root === "") {
                appendFormData(data[key], key);
              } else {
                appendFormData(data[key], root + "." + key);
              }
            }
          }
        } else {
          if (data !== null && typeof data !== "undefined") {
            formData.append(root, data);
          }
        }
      }
    }
    function ignore(root) {
      return (
        Array.isArray(ignoreList) &&
        ignoreList.some(function (x) {
          return x === root;
        })
      );
    }
    appendFormData(obj, rootName);
    return formData;
  },
  //   handleDownload: (url, filename) => {
  //     let type = url.split("?")[0];
  //     type = type.split(".");
  //     const name = filename + "." + type[type.length - 1];
  //     axios
  //       .get(url, {
  //         headers: {
  //           "Access-Control-Allow-Origin": "*",
  //           "Access-Control-Allow-Methods": "GET",
  //           "Content-Type": "application/json",
  //         },
  //         responseType: "blob",
  //       })
  //       .then((res) => {
  //         fileDownload(res.data, name);
  //       })
  //       .catch((err) => {
  //         message.warn("Something went wrong");
  //       });
  //   },
  debounce: (fn, wait) => {
    let timeout;
    return function () {
      const context = this,
        args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        fn.apply(context, args);
      }, wait);
    };
  },
  // downloadFile: (response) => {
  //   try {
  //     let fileName = null;
  //     const fieldToFind = "filename";
  //     const headerValues = response.headers["content-disposition"];
  //     if (headerValues && headerValues !== "") {
  //       const headerValuesArray = headerValues.split(";");
  //       for (let i = 0; i < headerValuesArray.length; i++) {
  //         const headerValue = headerValuesArray[i].trim();
  //         // Does this header value string begin with the name we want?
  //         if (
  //           headerValue.substring(0, fieldToFind.length + 1) ===
  //           fieldToFind + "="
  //         ) {
  //           fileName = headerValue.substring(fieldToFind.length + 1);
  //           break;
  //         }
  //       }
  //     }
  //     var blob = new Blob([response?.data]);
  //     fileDownload(blob, `${fileName}`);
  //   } catch (err) {
  //     message.warn("Something went wrong");
  //   }
  // },
  deleteCookie: (name) => {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  },
};

export default HELPERS;
