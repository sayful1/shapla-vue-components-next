import { mount } from "@vue/test-utils";
import { ShaplaButton } from "../../src/index";

describe("ShaplaButton", () => {
  test("defaults theme to default, size to normal, href to empty string and all boolean props to false", () => {
    const wrapper = mount(ShaplaButton);
    expect(wrapper.vm.theme).toEqual("default");
    expect(wrapper.vm.size).toEqual("normal");
    expect(wrapper.vm.href).toEqual("");
    expect(wrapper.vm.fullwidth).toEqual(false);
    expect(wrapper.vm.disabled).toEqual(false);
    expect(wrapper.vm.outline).toEqual(false);
    expect(wrapper.vm.rounded).toEqual(false);
    expect(wrapper.vm.fab).toEqual(false);
    expect(wrapper.vm.shadow).toEqual(false);
  });

  test("Can be a link element if href set.", async () => {
    const wrapper = mount(ShaplaButton);
    await wrapper.setProps({ href: "https://example.com" });
    expect(wrapper.html()).toContain("<a");
    expect(wrapper.html()).toContain("</a>");
    expect(wrapper.attributes("href")).toBe("https://example.com");
  });
});
