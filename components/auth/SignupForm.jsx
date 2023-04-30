import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSignUp } from '../../hooks/useAuth';


export default function SignupForm(){
    const [loading, error, signUp] = useSignUp()

    return <div className="p-6 bg-white">
        <h1>Sign up</h1>
        <Formik
       initialValues={{ email: '', password: '' }}
       validate={values => {
         const errors = {};
         if (!values.email) {
           errors.email = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
         } else if (!values.password){
            errors.password = 'Required';
         } else if (values.password !== values.confirmpassword){
            errors.confirmpassword = 'Passwords do not match';
         }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
            signUp(values)
       }}
     >
       {({ isSubmitting }) => (
         <Form>
           <Field type="email" name="email" className="border"/>
           <ErrorMessage name="email" component="div" />
           <Field type="password" name="password" className="border"/>
           <ErrorMessage name="password" component="div" />
           <Field type="password" name="confirmpassword" className="border"/>
           <ErrorMessage name="confirmpassword" component="div" />
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </Form>
       )}
     </Formik>
    </div>
}