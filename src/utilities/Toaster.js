import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const success_toaster = (message) => {
  toast.success(message, {
    position: "top-right",
    theme: "light",
  });
};

export const info_toaster = (message) => {
  toast.info(message, {
    position: "top-right",
    theme: "light",
  });
};

export const warning_toaster = (message) => {
  toast.warning(message, {
    position: "top-right",
    theme: "light",
  });
};

export const error_toaster = (message) => {
  toast.error(message, {
    position: "top-right",
    theme: "light",
  });
};

export const mini_toaster = (message) => {
  toast(message, {
    position: "bottom-center",
    theme: "light",
  });
};
