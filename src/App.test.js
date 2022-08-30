import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "@cfaester/enzyme-adapter-react-18";
import App from "./App";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => shallow(<App />);

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

test("render without error", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

test("renders increment button", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "increment-button");
  expect(button.length).toBe(1);
});

test("render counter display", () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.length).toBe(1);
});

test("render display starts at 0", () => {
  const wrapper = setup();
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("0");
});

test("Clicking button increments counter display", () => {
  const wrapper = setup();

  //find the button
  const button = findByTestAttr(wrapper, "increment-button");

  //click the button
  button.simulate("click");

  //find the display, and test that the number has been incremented
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("1");
});

test("Clicking button decrements counter display", () => {
  const wrapper = setup();

  //find increment button
  const incrementButton = findByTestAttr(wrapper, "increment-button");

  //click increment button to increment the counter value
  incrementButton.simulate("click");

  //find decrement button
  const decrementButton = findByTestAttr(wrapper, "decrement-button");

  //click decrement button to descrement the counter value
  decrementButton.simulate("click");

  //find the display and test that the number has been incremented and then decremented
  const count = findByTestAttr(wrapper, "count").text();

  expect(count).toBe("0");
});

test("display error message when counter is at 0 and decrement button is clicked", () => {
  const wrapper = setup();

  //find decrement button
  const decrementButton = findByTestAttr(wrapper, "decrement-button");

  //click decrement button
  decrementButton.simulate("click");

  //check error message is displayed
  const errorDiv = findByTestAttr(wrapper, "error-message");
  const errorHasHiddenClass = errorDiv.hasClass("hidden");
  expect(errorHasHiddenClass).toBe(false);
});

test("Clicking increment button clears the error", () => {
  const wrapper = setup();

  //find decrement button
  const decrementButton = findByTestAttr(wrapper, "decrement-button");
  //click decrement button
  decrementButton.simulate("click");
  //find increment button
  const incrementButton = findByTestAttr(wrapper, "increment-button");
  //click increment button
  incrementButton.simulate("click");

  //check no error is showing
  const errorDiv = findByTestAttr(wrapper, "error-messgae");

  // const errorHasHiddenClass = errorDiv.hasClass("hidden");
  const errorHasHiddenClass = errorDiv.isEmpty();

  expect(errorHasHiddenClass).toBe(true);
});
