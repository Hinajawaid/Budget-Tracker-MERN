import { useState } from 'react'
import TextFieldCustom from '../components/TextField';
import { Typography, Link, Button } from '@mui/material';
import { signInAPI } from '../utils/api';
import { userLoginInfo } from '../types/User';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const formLoginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // setLoginSubmitted(true);
        const success: { token?: string | undefined } = await signInAPI({
            email: email,
            password: password,
        } as userLoginInfo);

        if (success.token) {
            // Save the token in local storage
            localStorage.setItem('token', success.token);
            console.log('Token saved:', success.token);
            navigate('/dashboard');
        } else {
            console.log('Login failed');
        }
    };

    return (
        <div>
            <div style={{ backgroundColor: "white", display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ backgroundColor: "#FDC414", height: '600px', width: '20%', borderRadius: "20px", display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h3" fontFamily={'cursive'} fontSize={25} color={"white"} margin={5}>
                        {`Start your journey
                        with us`}
                    </Typography>
                </div>
                <div style={{ display: "flex", flexDirection: "column", margin: "20px", marginLeft: "30px" }}>
                    <Typography variant="h3" fontFamily={'cursive'} fontSize={22} marginLeft={2}>
                        SignIn
                    </Typography>
                    <Link href="/" color="inherit" marginLeft={2} marginTop={2}>
                        Don't Have an account? SignUp
                    </Link>
                    <form onSubmit={formLoginHandler} noValidate style={{ display: "flex", flexDirection: "column", margin: "20px", marginLeft: "30px" }}>
                        <TextFieldCustom style={{}} shrink={false} type='email' label='Email' value={email} onChange={setEmail} />
                        <TextFieldCustom style={{}} shrink={false} type='password' label='Password' value={password} onChange={setPassword} />
                        <Button type="submit" variant="contained" style={{ marginTop: "25px", width: "130px", backgroundColor: "#FDC414", color: "black" }} >Submit</Button>
                    </form></div>
            </div>
        </div >
    )
}
