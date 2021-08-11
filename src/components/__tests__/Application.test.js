import React from "react";
import { render, cleanup, waitForElement, fireEvent, prettyDOM } from "@testing-library/react";
import { getByText, getAllByTestId, getByPlaceholderText, getByAltText, queryByText } from "@testing-library/react"

import Application from "components/Application";

afterEach(cleanup);


describe("Application", () => {
  it( "defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
  
    return waitForElement(() => getByText("Monday"))
            .then ((res) => {
              fireEvent.click(getByText("Tuesday"));
              expect(getByText(/Leopold Silver/i)).toBeInTheDocument();
  
            })
  });
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async() => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"))
    // console.log(prettyDOM(container));

    const appointments = getAllByTestId(container, "appointment");
    // console.log(prettyDOM(appointments));

    const appointment = getAllByTestId(container, "appointment")[0];
    // console.log(prettyDOM(appointment));

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    // debug()
    // console.log(prettyDOM(appointment));
    expect(getByText(appointment, "SAVING")).toBeInTheDocument()
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"))

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    console.log(prettyDOM(day));
    expect(getByText(day, "no spots remaining")).toBeInTheDocument()

  });
})