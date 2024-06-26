import * as Yup from "yup";
export const validateCompany = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  desc: Yup.string().required("Description is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("New Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  phone: Yup.string()
    .matches(/^\d+$/, "Phone number must contain only numbers")
    .min(10, "Phone number must be exactly 10 digits")
    .max(10, "Phone number must be exactly 10 digits")
    .required("Phone is required"),
  cName: Yup.string().required("Company name is required"),
});
export const doctorValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  address: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Address is required"),
  phone: Yup.string()
    .matches(/^\d+$/, "Phone number must contain only numbers")
    .min(10, "Phone number must be exactly 10 digits")
    .max(10, "Phone number must be exactly 10 digits")
    .required("Phone is required"),
  gender: Yup.string().required("Gender is required"),
  age: Yup.number()
    .required("Age is required")
    .positive("Age must be a positive number")
    .integer("Age must be an integer"),
  speciality: Yup.string().required("Doctor specialty is required"),
});

export const validateEmployee = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  address: Yup.string().required("Address is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("New Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  gender: Yup.string().required("Gender is required"),
  age: Yup.number()
    .required("Age is required")
    .positive("Age must be a positive number")
    .integer("Age must be an integer"),
  phone: Yup.string()
    .matches(/^\d+$/, "Phone number must contain only numbers")
    .min(10, "Phone number must be exactly 10 digits")
    .max(10, "Phone number must be exactly 10 digits")
    .required("Phone is required"),
});

export const validateLogin = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const validateTraining = Yup.object().shape({
  disease: Yup.string().required("Disease is required"),
  age: Yup.number()
    .required("Age is required")
    .positive("Age must be a positive number")
    .integer("Age must be an integer"),
  gender: Yup.string().default("both"),
  chestPain: Yup.number().required("Chest pain is required"),
  sugar: Yup.number().required("Sugar level is required"),
  restecg: Yup.number().required(
    "Resting electrocardiographic measurement is required"
  ),
  exang: Yup.number().required("Exercise induced angina is required"),
  slope: Yup.number().required(
    "Slope of the peak exercise ST segment is required"
  ),
  ca: Yup.number().required(
    "Number of major vessels colored by flouroscopy is required"
  ),
  thal: Yup.number().required("Thalassemia is required"),
  bp: Yup.number().required("Blood pressure is required"),
  cholesterol: Yup.number().required("Cholesterol level is required"),
  thalach: Yup.number().required("Maximum heart rate achieved is required"),
  oldPeak: Yup.number().required(
    "ST depression induced by exercise relative to rest is required"
  ),
});

export const validateCheck = Yup.object().shape({
  age: Yup.number()
    .required("Age is required")
    .positive("Age must be a positive number")
    .integer("Age must be an integer"),
  // gender: Yup.string().default("both"),
  chestPain: Yup.number().required("Chest pain is required"),
  sugar: Yup.number().required("Sugar level is required"),
  restecg: Yup.number().required(
    "Resting electrocardiographic measurement is required"
  ),
  exang: Yup.number().required("Exercise induced angina is required"),
  slope: Yup.number().required(
    "Slope of the peak exercise ST segment is required"
  ),
  ca: Yup.number().required(
    "Number of major vessels colored by flouroscopy is required"
  ),
  thal: Yup.number().required("Thalassemia is required"),
  bp: Yup.number().required("Blood pressure is required"),
  cholesterol: Yup.number().required("Cholesterol level is required"),
  thalach: Yup.number().required("Maximum heart rate achieved is required"),
  oldPeak: Yup.number().required(
    "ST depression induced by exercise relative to rest is required"
  ),
});
export const validateFeedback = Yup.object().shape({
  text: Yup.string().required("Text is required"), // Validate the 'text' field to be a non-empty string
});

export const validateForgotPassword = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  newPassword: Yup.string()
    .required("New Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});
