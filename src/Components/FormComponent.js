import React from 'react';

function FormComponent(props) {
    
        return (
            <form onSubmit = {props.submitHandler}>
                <input type='text' placeholder="What do you search for?" value = {props.inputVal} onChange = {(props.handleChange)}/>
                <button type='submit'><i className="fas fa-search"></i></button>
            </form>
        )
}

export default FormComponent;