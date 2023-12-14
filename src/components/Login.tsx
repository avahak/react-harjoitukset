import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface LoginFormInput {
    username: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInput>();

    const onSubmit: SubmitHandler<LoginFormInput> = (data) => {
        // Handle login logic
        console.log('Submitted data:', data);
    };

    return (
        <div style={{display: "flex", height: "100%", width: "100%", justifySelf: "center", justifyContent: "center", alignSelf: "center"}}>
        <div style={{background: "#555", padding: "10px", fontSize: "1.5rem"}}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="username">Username</label>
                <input {...register('username', { required: 'Username is required' })} />
                {errors.username ? <p className='error-text'>{errors.username.message}</p> : null }
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input {...register('password', { required: 'Password is required' })} />
                {errors.password ? <p className='error-text'>{errors.password.message}</p> : null}
            </div>

            <button type="submit">Login</button>
        </form>
        </div>
        </div>
    );
};

export default LoginForm;