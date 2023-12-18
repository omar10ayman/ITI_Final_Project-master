import * as yup from "yup";
export const searchSchema = yup.object().shape({
    destination: yup.string().required() ,
    CheckIn: yup.string().required() ,
    CheckOut:yup.string().required()  ,
    GuestAndRooms:yup.string().required()  ,
    nights:yup.number().required().positive().min(1)
})