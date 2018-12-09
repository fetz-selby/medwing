import React, {Component} from 'react';
import AutoSuggest from 'react-autosuggest';
import PropTypes from 'prop-types';
import './detail-form.css';

class DetailForm extends Component {
        state = {
            suggested: ''
        }

    // When the compoennt is loaded for the first time.
    componentWillMount() {
        console.log('componentWillMount => '+JSON.stringify(this.props.location));
        if (this.props.location) this.setDefaultState(this.props.location);
    }

    // When the component is loaded again.
    componentWillReceiveProps(nextProps) {
        this.setDefaultState(nextProps.location);
    }

    // Prefill input fields with the available data by setting default state.
    setDefaultState(location) {

        // Set state using data.
        this.setState({
            id: location.id,
            title: location.title,
            address: location.address,
            lat: location.lat,
            lng: location.lng,
            suggested: location.address?location.address:''
        })
    }

    titleChangeHandler=(evt, newValue)=>{
        this.setState({
            title: newValue
        })
    }

    onSuggestedChange = (evt, { newValue }) =>{
        this.setState({
            suggested: newValue
        });
    }

    onSuggestionSelected = () =>{
        this.setState({
            lat: this.selectedSuggestion.lat,
            lng: this.selectedSuggestion.lng,
            address: this.selectedSuggestion.address
        })
    }

    onSuggestionsClearRequested = () => {
        this.props.clearSuggestions();
    };

    onSuggestionsFetchRequested = ({value}) => {
        this.props.fetchSuggestions(value);
    }

    getSuggestionValue = suggestion => {this.selectedSuggestion = {...suggestion}; return suggestion.address};

    renderSuggestion = suggestion => (
        <div>
        {suggestion.address}
        </div>
    );

    render(){
        const {suggested} = this.state;
        const {suggestions, isUpdate} = this.props;
    
        const inputProps = {
            placeholder: 'Enter Address',
            value: suggested,
            onChange: this.onSuggestedChange
        };


        return <div className='detail-form'>

            <div className='row'>
                <div className='label'>Title</div>
                <div className='clearfix'></div>
                <input type='text' className='inputs' value={this.state.title} onChange={this.titleChangeHandler} />
            </div>
            <div className='clearfix'></div>

            <div className='row'>
                <div className='label'>Address</div>
                <div className='clearfix'></div>
                <AutoSuggest 
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    highlightFirstSuggestion={true}
                    inputProps={inputProps}
                    onSuggestionSelected={this.onSuggestionSelected}
                />
            </div>
            <div className='clearfix'></div>

            <div className='row'>
                <div className='label'>Latitude</div>
                <div className='clearfix'></div>
                <input type='text' className='inputs' disabled={true} value={this.state.lat}/>
            </div>
            <div className='clearfix'></div>

            <div className='row'>
                <div className='label'>Longitude</div>
                <div className='clearfix'></div>
                <input type='text' className='inputs' disabled={true} value={this.state.lng}/>
            </div>

            <div className='row'>
                <div className={isUpdate?'delete-btn':'delete-btn light-hide'}>Delete</div>
                <button className='save-btn'>{isUpdate ? 'Update':'Save'}</button>
            </div>
        </div>
    }
}

DetailForm.propTypes = {
    suggestion: PropTypes.array,
    location: PropTypes.object,
    isUpdate: PropTypes.bool.isRequired,
    clearSuggestions: PropTypes.func,
    fetchSuggestions: PropTypes.func,
}

export default DetailForm;