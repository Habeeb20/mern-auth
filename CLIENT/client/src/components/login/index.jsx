import { Link} from "react-router-dom";
import styles from "./style.css";
import { useState } from "react";
import axios from axios
import { Error } from "mongoose";

const Signup = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const [error, setError] = useState("")




  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
        const url = "http:localhost:8080/api/auth";
        const {data:res} = await axios.post(url, data);
        localStorage.setItem("token", res.data)
        window.location ="/"
        navigate("/login")
        console.log(res.message)
    } catch (error) {
        if(error.response && error.response.status >= 400 && error.response.status <= 500){
            setError(error.response.data.message)
        }
        
        
    }

  }
  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
        <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login To your Account</h1>
        
           

            <input
              type="email"
              placeholder="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
              className={styles.input}
            />

            <input
              type="password"
              placeholder="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}

            <button type="submit" className={styles.green_btn}>
                Sign In
            </button>
          </form>
          
        </div>
        <div className={styles.right}>
        <h1>New here ?</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sign up
            </button>
          </Link>
        
        </div>
      </div>
    </div>
  );
};
