import * as Yup from "yup";
export const validateCompany = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  desc: Yup.string().required("Description is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be at least 6 characters")
    .required("Password is required"),
  phone: Yup.string()
    .min(10, "Phone number must be exactly 10 digits")
    .max(10, "Phone number must be exactly 10 digits")
    .required("Phone is required"),
  cName: Yup.string().required("Company name is required"),
});

export const validateEmployee = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be at least 6 characters")
    .required("Password is required"),
  phone: Yup.string()
    .typeError("Phone must be a number")
    // .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone is required"),
});

export const validateLogin = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});
