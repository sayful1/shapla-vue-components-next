import { mount } from "@vue/test-utils";
import { ShaplaCross } from "../../src/index";

describe("ShaplaCross", () => {
  test("defaults size to normal and aria-label to close", () => {
    const wrapper = mount(ShaplaCross);
    expect(wrapper.vm.size).toEqual("normal");
    expect(wrapper.vm.ariaLabel).toEqual("close");
  });

  test("can change size.", async () => {
    const wrapper = mount(ShaplaCross);
    await wrapper.setProps({ size: "small" });

    // Assert the rendered text of the component
    expect(wrapper.vm.size).toEqual("small");
    expect(wrapper.classes()).toContain("shapla-delete-icon");
    expect(wrapper.classes()).toContain("is-small");
  });
});
