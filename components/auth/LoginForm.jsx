import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSignIn } from '../../hooks/useAuth';

export default function LoginForm(){
    const [loading, error, signIn] = useSignIn()

    return <div className="p-6 bg-white">
        <h1>Log in</h1>
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
         }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
            signIn(values)
       }}
     >
       {({ isSubmitting }) => (
         <Form>
           <Field type="email" name="email" className="border"/>
           <ErrorMessage name="email" component="div" />
           <Field type="password" name="password" className="border"/>
           <ErrorMessage name="password" component="div" />
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </Form>
       )}
     </Formik>
    </div>
}