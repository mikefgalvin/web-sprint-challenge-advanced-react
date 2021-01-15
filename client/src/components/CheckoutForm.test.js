import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    render(<CheckoutForm/>);

    const header = screen.queryAllByText(/checkout form/i);
    // console.log(header);
});

test("form shows success message on submit with form details", () => {

    render(<CheckoutForm/>);

    //1. 
    const firstNameInput = screen.queryByLabelText(/first name:/i);
    const lastNameInput = screen.queryByLabelText(/last name:/i);
    const addressInput = screen.queryByLabelText(/address/i);
    const cityInput = screen.queryByLabelText(/city:/i);
    const stateInput = screen.queryByLabelText(/state:/i);
    const zipInput = screen.queryByLabelText(/zip:/i);

    //2. 

    userEvent.type(firstNameInput, 'Mike');
    userEvent.type(lastNameInput, 'Galvin');
    userEvent.type(addressInput, '100 Sprint Lane');
    userEvent.type(cityInput, 'Sprintville');
    userEvent.type(stateInput, 'CA');
    userEvent.type(zipInput, '95688');

    //3. 
    const button = screen.getByRole('button');
    userEvent.click(button);

    const newOrder = screen.getByTestId('successMessage');
    expect(newOrder).toBeInTheDocument();

    console.log(newOrder);


});
