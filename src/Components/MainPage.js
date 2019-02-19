import React, {useReducer} from 'react';
import DisplayResults from './DisplayReasults';
import '../styles/MainPage.css';
import FormComponent from './FormComponent'

const initialInputState = '';
const results = [];

function reducerInput(state, action) {
    console.log('state: ', state);
    console.log('action.val: ', action.value);
    switch (action.type) {
        case 'text': 
        // If action.type == 'text return action value as inputState
            return action.value; 
        default:
            throw new Error('Unexpected action');
    }
}
function reducerResults(state, action) {
    switch (action.type) {
        case 'submit': 
            return action.results;
        default: 
            throw new Error('Unexpected action');
    }
}
function MainPage() {
    // 1. Call useReducer and recieve  state and dispatch
    /** Reducer returns the current state and dispatch function */
    const [inputState, dispatch] = useReducer(reducerInput, initialInputState); 
    console.log('inputState: ', inputState);

    const handleChange = (e) => {
        return dispatch({type: 'text', value: e.target.value})
    }
    const [serchResults, dispatch2] = useReducer(reducerResults, results);
    const submitForm = function(e) {
        e.preventDefault();
        let query = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrlimit=10&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max&origin=*&gsrsearch=" + inputState;
        fetch(query)
            .then(response => response.json())
            .then( result => dispatch2({type: 'submit', results: result.query.pages}) );
        let fullHeight = document.getElementsByClassName('main')[0];
        fullHeight.classList.remove('full-height');
    }
        return(
        <div className="main full-height">
            <h1 className="main-title">Wikipedia Viewer</h1>
            <a href="https://en.wikipedia.org/wiki/Special:Random" target="_blank" rel="noopener noreferrer" className="random">Click here to get a random article</a>
            {/** 2. Call handleChange onChange */}
            <FormComponent handleChange = {handleChange} inputVal = {inputState} submitHandler={submitForm} />
            <DisplayResults pages = {serchResults} />
        </div>
        );
 
}
export default MainPage;