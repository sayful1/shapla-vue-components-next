class ToggleEvent {
  /**
   * Listen event
   *
   * @param event
   * @param callback
   */
  static on(event: string, callback: EventListener | (() => void)) {
    document.addEventListener(event, ((e: CustomEvent) => callback(e.detail)) as EventListener);
  }

  /**
   * Dispatch event
   *
   * @param event
   * @param data
   */
  static dispatch(event: string, data: any) {
    document.dispatchEvent(new CustomEvent(event, {detail: data}));
  }
}

const createUUID = (): string => {
  const pattern = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
  return pattern.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

interface TogglesPropsInterface {
  accordion: boolean,
  iconPosition: string,
  boxedMode: boolean,
  showDivider: boolean,
  titleColor: string,
  uuid: string,
}

export {ToggleEvent, createUUID, TogglesPropsInterface};
export default ToggleEvent;
