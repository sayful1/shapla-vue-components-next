class Spinner {
  /**
   * Activate spinner
   */
  static activate() {
    Spinner.dispatch(true);
  }

  /**
   * Deactivate spinner
   */
  static deactivate() {
    Spinner.dispatch(false);
  }

  /**
   * Listen event
   *
   * @param callback
   */
  static on(callback: EventListener | ((options: { active: boolean }) => void)) {
    document.addEventListener(
      "show.ShaplaVueSpinner",
      ((e: CustomEvent) => callback(e.detail)) as EventListener
    );
  }

  /**
   * Dispatch event
   *
   * @param {boolean} isActive
   */
  static dispatch(isActive: boolean) {
    document.dispatchEvent(
      new CustomEvent(
        "show.ShaplaVueSpinner",
        { detail: { active: isActive } }
      )
    );
  }
}

export default Spinner;