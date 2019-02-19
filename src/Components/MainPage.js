import React, {Component} from 'react';
import DisplayResults from './DisplayReasults';
import '../styles/MainPage.css';
import FormComponent from './FormComponent'

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            results: []
        };
    this.handleChange = this.handleChange.bind(this); 
    this.submitForm = this.submitForm.bind(this);
    }
    handleChange(e){
        this.setState({input: e.target.value});
    }
    submitForm(e) {
        e.preventDefault();
        let query = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrlimit=10&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max&origin=*&gsrsearch=" + this.state.input;
        console.log('query: ', query);
        fetch(query)
            .then(response => response.json())
            .then(result => this.setState({results: result.query.pages}));
        let fullHeight = document.getElementsByClassName('main')[0];
        fullHeight.classList.remove('full-height');
    }
    render() {
        return(
        <div className="main full-height">
            <h1 className="main-title">Wikipedia Viewer</h1>
            <a href="https://en.wikipedia.org/wiki/Special:Random" target="_blank" rel="noopener noreferrer" className="random">Click here to get a random article</a>
            <FormComponent submitHandler = {this.submitForm} handleChange = {this.handleChange} inputVal = {this.state.input} />            
            <DisplayResults pages = {this.state.results} />
        </div>
        );
    }
}
export default MainPage;