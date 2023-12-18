import { object, string, bool } from "yup";

export let bookingSchema = object({
  creditCard: string("credit card is required").required(
    "credit card is required"
  ),
  username: string().required("user name is required"),
  year: string().matches(/^[0-9]{2}$/, "Year is required"),
  month: string().matches(/^[0-9]{2}$/, "Month is required"),
  country: string()
    .required()
    .matches(/^(?!Choose a country$).*$/, "country is required"),
  license: bool()
    .required()
    .oneOf([true], "You must accept the terms and conditions"),
  cvc: string().matches(/^[0-9]{3}$/, "CVC Must be exactly 3 digits"),
  // .oneOf(/^[0-9]{3}$/, "CVC Must be exactly 3 digits"),
});
