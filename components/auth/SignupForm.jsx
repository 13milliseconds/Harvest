import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSignUp } from '../../hooks/useAuth';
import Button from '@mui/material/Button';


export default function SignupForm(){
    const [loading, error, signUp] = useSignUp()

    return <div className="p-6 bg-white dark:bg-slate-600">
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
            <label htmlFor="email">Email Address</label>
           <Field type="email" name="email" className="border block text-black p-1 mb-1"/>
           <ErrorMessage name="email" component="div" className='text-red-500'/>
           <label htmlFor="password">Password</label>
           <Field type="password" name="password" className="border block text-black p-1  mb-1"/>
           <ErrorMessage name="password" component="div" />
           <label htmlFor="confirmpassword">Confirm Password</label>
           <Field type="password" name="confirmpassword" className="border block text-black p-1 mb-1"/>
           <ErrorMessage name="confirmpassword" component="div" />
           <Button variant="contained" type="submit" disabled={isSubmitting}>
             Submit
           </Button>
         </Form>
       )}
     </Formik>
    </div>
}