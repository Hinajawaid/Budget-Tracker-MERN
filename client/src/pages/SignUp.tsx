import React, { useState } from 'react'
import TextFieldCustom from '../components/TextField';
import { Typography, Link, Button } from '@mui/material';
import { signUpAPI } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { userSignUpInfo } from '../types/User';

export default function SignUp() {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [budget, setBudget] = useState(0);
    const navigate = useNavigate();

    const signUpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // setLoginSubmitted(true);
        const success = await signUpAPI({
            firstName: name,
            lastName: lastName,
            email: email,
            password: password,
            budget: budget

        } as userSignUpInfo);

        if (success != null) {
            console.log(success);
            console.log("yeseess")
            navigate('/login');
        } else {
            //   setAlertOpen(true);
            console.log("nooooooo")
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
                        Signup
                    </Typography>
                    <Link href="/login" color="inherit" marginLeft={2} marginTop={2}>
                        Already Have an account? SignIn
                    </Link>
                    <form onSubmit={signUpHandler} style={{ display: "flex", flexDirection: "column", margin: "20px", marginLeft: "30px" }}>
                        <TextFieldCustom style={{}} shrink={false} type='text' label='First Name' value={name} onChange={setName} />
                        <TextFieldCustom style={{}} shrink={false} type='text' label='Last Name' value={lastName} onChange={setLastName} />
                        <TextFieldCustom style={{}} shrink={false} type='email' label='Email' value={email} onChange={setEmail} />
                        <TextFieldCustom style={{}} shrink={false} type='password' label='Password' value={password} onChange={setPassword} />
                        <TextFieldCustom style={{}} shrink={false} type='password' label='Confirm Password' value={cpassword} onChange={setCPassword} />
                        <TextFieldCustom style={{}} shrink={false} type='number' label='Budget Limit' value={budget} onChange={setBudget} />
                        <Button type='submit' variant="contained" style={{ marginTop: "25px", width: "130px", backgroundColor: "#FDC414", color: "black" }} >Submit</Button>
                    </form>
                </div>
            </div>
        </div >
    )
}
