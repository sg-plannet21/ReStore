import * as yup from "yup";

export const validationSchema = [
  yup.object({
    fullName: yup.string().required().label("Full Name"),
    address1: yup.string().required().label("Address 1"),
    address2: yup.string().required().label("Address 2"),
    city: yup.string().required().label("City"),
    state: yup.string().required().label("State"),
    zip: yup.string().required().label("Zip"),
    country: yup.string().required().label("Country"),
  }),
  yup.object(),
  yup.object({ nameOnCard: yup.string().required().label("Name on Card") }),
];
