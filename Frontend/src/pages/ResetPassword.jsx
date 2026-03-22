import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom'

const ResetPassword = () => {

    const { resetPassword } = useContext(AuthContext);
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, Setpassword] = useState("");
    const [message, Setmessage] = useState("");

    const HandelSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await resetPassword(token, password);
            Setmessage(res.message);

            setTimeout(() => {
                navigate("/login")
            }, 2000)
        }
        catch (err) {
            Setmessage(err.message)
        }

    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Reset Password</h2>
                <form onSubmit={HandelSubmit}>
                    <input
                        type="password"
                        placeholder="Enter New Password"
                        value={password}
                        onChange={(e) => Setpassword(e.target.value)}
                        required
                        autoComplete="new-password"
                    />
                    <button type="submit">Reset Password</button>

                </form>
                <p>{message}</p>
            </div>
        </div>
    )

}

export default ResetPassword;