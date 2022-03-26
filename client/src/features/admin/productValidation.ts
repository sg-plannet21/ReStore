import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().required().label("Name"),
  brand: yup.string().required().label("Brand"),
  type: yup.string().required().label("Type"),
  price: yup.number().moreThan(100).required().label("Price"),
  quantityInStock: yup.number().min(0).required().label("Type"),
  description: yup.string().required().label("Description"),
  file: yup
    .mixed()
    .when("pictureUrl", {
      is: (value: string) => !value,
      then: yup.mixed().required("Please provide an image"),
    })
    .label("File"),
});
