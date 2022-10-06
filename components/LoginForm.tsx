import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { loginRequest } from '../lib/request';

interface User {
    username: string;
    password: string;
}

export default function LoginForm () {
    const initialValues : User = { username: '', password: '' }
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                username: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .test(
                    'test-valid',
                    'Invalid username. Latinic and number',
                    (username: string | undefined) => RegExp('^[a-zA-Z0-9]+$').test(username ?? '')
                )
                .required('Required'),
                
                password: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            })}
            onSubmit={async (values, { setSubmitting }) => {
                console.info(values);
                loginRequest(values);
                
                setSubmitting(false);
                

            }}
        >
            <Form>
                <label htmlFor="username">Username</label>
                <Field name="username" type="text" />
                <ErrorMessage name="username" />

                <label htmlFor="password">Password</label>
                <Field name="password" type="password" />
                <ErrorMessage name="password" />

                <button type="submit">Submit</button>
            </Form>
        </Formik>
    );
}