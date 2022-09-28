import React from "react";
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, requiredField } from "../../utils/validators/validators";
import { Input } from "../common/FormsControls/FormsControls";

const maxLength10 = maxLengthCreator(10);

const LoginForm = (props) => {
    return (
        <form action="" onSubmit={props.handleSubmit}>
            <div>
                <Field
                    placeholder="Login"
                    name={"login"}
                    component={Input}
                    validate={[requiredField, maxLength10]}
                />
            </div>
            <div>
                <Field
                    placeholder="Password"
                    name={"password"}
                    component={Input}
                    validate={[requiredField, maxLength10]}
                />
            </div>
            <div>
                <Field
                    type="checkbox"
                    component={Input}
                    name={"rememberMe"}
                />
                Remember Me
            </div>
            <div>
                <button>Log In</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)



const Login = (props) => {
    const onSubmit = (formData) => {
        console.log(formData);
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}

export default Login;