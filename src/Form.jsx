import React, {useState, useEffect} from 'react';
import axios from "axios";
import './Form.css'

function Form() {
    const [inputs, setInputs] = useState("");
    const [result, setResult] = useState("");
    const [error, setError] = useState(false)
    const handleChange = (event) => {
        const value = event.target.value;
        setInputs(value)
    }

    useEffect(() => {

    }, [error])


    const handleSubmit = (event) => {
        event.preventDefault();
        setResult("")
        if(inputs >= 5000){
            setError(true)
            setInputs("")
        }
        else{
            axios.post("http://localhost:8080/api/v1/number", {num : inputs}).then(response =>{
                setResult(response.data)
                setError(false)
                setInputs("")
                console.log(response.data)
            }).catch((error) => {
                console.log(`${error.message}`)
            })
        }
    }
    return (
        <div className="container">


        <form className="form" onSubmit={handleSubmit}>

            <label> Input:
                <input
                    type="text"
                    name="integer"
                    value={inputs}
                    onChange={handleChange}
                />
            </label>
            <button type="submit"> Submit </button>
            <br/>
            <br/>
            <br/>
           {error && <p>Number cannot be greater than 4999</p>}
            {!error && <p>Roman Numeral: {result}</p>}

        </form>
        </div>
    )
}
export default Form;