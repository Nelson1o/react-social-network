import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, requiredField } from "../../utils/validators/validators";
import { Input } from "../common/FormsControls/FormsControls";
import { login } from "../../redux/authReducer";
import { Navigate } from "react-router-dom";
import s from '../common/FormsControls/FormsControls.module.css'

const maxLength10 = maxLengthCreator(10);

const LoginForm = ({handleSubmit, error}) => {
    return (
        <form action="" onSubmit={handleSubmit}>
            <div>
                <Field
                    placeholder="Email"
                    name={"email"}
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
            {error && <div className={s.formSummaryError}>
                {error}
            </div>}
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
        props.login(formData.email, formData.password, formData.rememberMe);
    }

    if (props.isAuth) {
        return <Navigate to={"/profile"} />
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, { login })(Login);