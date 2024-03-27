import { toast } from "react-toastify";

const DEFAULT_DURATION = 5000

const notifyDefault = (message, duration = DEFAULT_DURATION) => notify("default", message, duration)

const notifyError = (message, duration = DEFAULT_DURATION) => notify("error", message, duration)

const notifyInfo = (message, duration = DEFAULT_DURATION) => notify("info", message, duration)

const notifySuccess = (message, duration = DEFAULT_DURATION) => notify("success", message, duration)

const notifyWarning = (message, duration = DEFAULT_DURATION) => notify("warning", message, duration)

const notify = (type, message, duration) => {
  const method = type === "default" ? toast : toast[type]
  method(message, { autoClose: duration, position: "top-right" })
}

export const useNotification = () => ({
  notify,
  notifyDefault,
  notifyError,
  notifyInfo,
  notifySuccess,
  notifyWarning
});
