import React from "react";
import { connect } from "react-redux";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { maxLengthCreator, requiredField } from "../../utils/validators/validators";
import { Input } from "../common/FormsControls/FormsControls";
import { login } from "../../redux/authReducer";
import { Navigate } from "react-router-dom";
// @ts-ignore
import s from '../common/FormsControls/FormsControls.module.css';
import { AppStateType } from "../../redux/reduxStore";

const maxLength10 = maxLengthCreator(10);

type LoginFormValuesType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
}

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({ handleSubmit, error, captchaUrl }) => {
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

            {captchaUrl && <img src={captchaUrl} alt="captcha" />}
            {captchaUrl && <div>
                <Field
                    placeholder="Enter captcha"
                    name={"captcha"}
                    component={Input}
                    validate={[requiredField]}
                />
            </div>}
            {error && <div className={s.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Log In</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
    form: 'login'
})(LoginForm);

type MapStatePropsType = {
    captchaUrl: string | null,
    isAuth: boolean
}

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if (props.isAuth) {
        return <Navigate to={"/profile"} />
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
        </div>
    )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        captchaUrl: state.auth.captchaUrl,
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, { login })(Login);