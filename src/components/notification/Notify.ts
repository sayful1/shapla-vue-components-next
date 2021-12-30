interface NotificationDataArgsInterface {
  id: string;
  type: string;
  message: string;
  title?: string;
  timeout: number;
}

class Notify {
  /**
   * Listen event
   *
   * @param callback
   */
  static on(callback) {
    document.addEventListener("show.ShaplaVueNotification", (e: CustomEvent) =>
      callback(e.detail)
    );
  }

  /**
   * Dispatch event
   *
   * @param data
   */
  static dispatch(data) {
    document.dispatchEvent(
      new CustomEvent("show.ShaplaVueNotification", { detail: data })
    );
  }

  /**
   * Create UUID
   *
   * @returns {string}
   */
  static createUUID(): string {
    const pattern = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    return pattern.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  /**
   * Get parameters
   *
   * @param {string|object} message
   * @param args
   * @return {Object}
   */
  static getParams(message: string | NotificationDataArgsInterface, ...args) {
    let params: NotificationDataArgsInterface = {
      id: Notify.createUUID(),
      type: "primary",
      message: "Please add some message.",
      title: "",
      timeout: 3000,
    };

    if (typeof message === "object") {
      params = Object.assign(params, message);
      return params;
    }

    params.message = message;

    if (!args.length) {
      return params;
    }

    if (args.length > 1) {
      params.title = args[0];
      params.timeout = args[1];
    } else {
      if (typeof args[0] === "number") {
        params.timeout = args[0];
      } else {
        params.title = args[0];
      }
    }

    return params;
  }

  /**
   * Create notification
   *
   * @param {object} params
   */
  static create(params) {
    Notify.dispatch(params);
  }

  /**
   * Create primary notification
   *
   * @param message
   * @param params
   */
  static default(message, ...params) {
    Notify.primary(message, ...params);
  }

  /**
   * Create primary notification
   *
   * @param message
   * @param params
   */
  static primary(message, ...params) {
    const _params = Notify.getParams(message, ...params);
    _params.type = "primary";
    Notify.create(_params);
  }

  /**
   * Create success notification
   *
   * @param message
   * @param params
   */
  static success(message, ...params) {
    const _params = Notify.getParams(message, ...params);
    _params.type = "success";
    Notify.create(_params);
  }

  /**
   * Create info notification
   *
   * @param message
   * @param params
   */
  static info(message, ...params) {
    const _params = Notify.getParams(message, ...params);
    _params.type = "info";
    Notify.create(_params);
  }

  /**
   * Create warning notification
   *
   * @param message
   * @param params
   */
  static warning(message, ...params) {
    const _params = Notify.getParams(message, ...params);
    _params.type = "warning";
    Notify.create(_params);
  }

  /**
   * Create warning notification
   *
   * @param message
   * @param params
   */
  static error(message, ...params) {
    const _params = Notify.getParams(message, ...params);
    _params.type = "error";
    Notify.create(_params);
  }
}

export { Notify, NotificationDataArgsInterface };
export default Notify;
