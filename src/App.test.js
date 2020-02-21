import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";
import 'mutationobserver-shim';

test("renders App without crashing", () => {
  render(<App />);
});

test("input fields and submit btn are rendered", () => {
  const { queryByTestId } = render(<App />);

  queryByTestId(/firstName/i);
  queryByTestId(/lastName/i);
  queryByTestId(/email/i);
  queryByTestId(/message/i);
  queryByTestId(/submit/i);
});

test("form submit displays data", () => {
  const { getByLabelText, getByText } = render(<App />);

  const firstName = getByLabelText(/first name/i);
  const lastName = getByLabelText(/last name/i);
  const email = getByLabelText(/email/i);
  const message = getByLabelText(/message/i);

  fireEvent.change(firstName, { target: { value: "testName" } });
  fireEvent.change(lastName, { target: { value: "testName" } });
  fireEvent.change(email, { target: { value: "testEmail" } });
  fireEvent.change(message, { target: { value: "testMessage" } });

  expect(firstName.value).toBe("testName");
  expect(firstName.value).toBe("testName");
  expect(firstName.value).toBe("testEmail");
  expect(firstName.value).toBe("testMessage");

  fireEvent.click(getByText(/submit/i));

  const testText = getByText(/testName/i);
  expect(testText).toBeInTheDocument();
});
