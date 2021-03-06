import React, {Component} from 'react';
import AutoSuggest from 'react-autosuggest';
import PropTypes from 'prop-types';
import './detail-form.css';

class DetailForm extends Component {
        state = {
            suggested: '',
            showError: false
        }

    componentWillMount() {
        if(this.props.location) this.setDefaultState(this.props.location);
    }

    // When the component is loaded again.
    componentWillReceiveProps(nextProps) {
        this.setDefaultState(nextProps.location);
    }

    setDefaultState(location) {

        // Set state using data.
        this.hasChanged = this.props.isNewDetail ? false : true;

        this.setState({
            id: location.id,
            title: location.title,
            address: location.address,
            lat: location.lat,
            lng: location.lng,
            suggested: location.address?location.address:'',
            showError: false
        })

        this.errorMsg = 'No Message';
    }

    titleChangeHandler=(evt)=>{
        this.setState({
            title: evt.target.value
        });

        this.hasChanged = true;
    }

    onSuggestedChange = (evt, { newValue }) =>{
        this.setState({
            suggested: newValue
        });

        this.hasChanged = true;
        this.props.fetchSuggestions(newValue);
        this.updateCurrentLocationWithState(newValue);

        console.log('[onSuggestChange]')
    }

    onSuggestionSelected = () =>{
        this.updateCurrentLocationWithSuggest();
        this.showError(false);
        console.log('[onSuggestionSelected]')
    }

    updateCurrentLocationWithSuggest=()=>{
        this.props.currentLocationState({lat:this.selectedSuggestion.lat,
                                        lng:this.selectedSuggestion.lng,
                                        address: this.selectedSuggestion.address,
                                        title: this.state.title,
                                        id: this.state.id});
    }

    updateCurrentLocationWithState=(value)=>{
        this.props.currentLocationState({lat:'',
                                        lng:'',
                                        address: value,
                                        title: this.state.title,
                                        id: this.state.id});
    }

    onSuggestionsClearRequested = () => {
        this.props.clearSuggestions();
    };

    onSuggestionsFetchRequested = ({value}) => {
        //this.props.fetchSuggestions(value);
    }

    getDetails=()=>{
        return {address: this.state.suggested,
                lat: this.state.lat,
                lng: this.state.lng,
                title: (this.state.title)?this.state.title:'Unknown',
                id: this.state.id}
    }

    showError=(isShow)=>{
        if(isShow){
            this.errorMsg = 'Invalid Address';
            this.setState({
                showError: true
            })
        }else{
            this.errorMsg = 'No Message';
            this.setState({
                showError: false
            })
        }
    }

    onUpdateHandler=()=>{
        if(!(this.state.lat && this.state.lng)){
            this.showError(true);
            return;
        }

        this.showError(false);

        //Send the details specifying if new or update
        (this.state.id)?
        this.props.onUpdate(this.getDetails(), true):
        this.props.onUpdate(this.getDetails(), false);
    }

    getSuggestionValue = suggestion => {this.selectedSuggestion = {...suggestion}; return suggestion.address};

    renderSuggestion = suggestion => (
        <div>
            {suggestion.address}
        </div>
    )

    render(){
        const {suggested, showError} = this.state;
        const {suggestions, isUpdate} = this.props;
    
        const inputProps = {
            placeholder: 'Enter Address',
            value: suggested,
            onChange: this.onSuggestedChange
        };

        return <div className='detail-form'>
            <div className='row'>
                <div className={showError?'display':'display light-hide'}>{this.errorMsg}</div>
            </div>
            <div className='clearfix'></div>
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
                <input type='text' className='inputs' disabled={true} value={this.state.lat} />
            </div>
            <div className='clearfix'></div>

            <div className='row'>
                <div className='label'>Longitude</div>
                <div className='clearfix'></div>
                <input type='text' className='inputs' disabled={true} value={this.state.lng} />
            </div>

            <div className='clearfix'></div>
            <div className='row'>
                <div onClick={()=>this.props.onDelete(this.state.id, this.state.title)} className={isUpdate?'delete-btn':'delete-btn light-hide'}>Delete</div>
                {this.hasChanged?<button onClick={this.onUpdateHandler} className='save-btn'>{isUpdate ? 'Update':'Save'}</button>:''}
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
    currentLocationState: PropTypes.func.isRequired,
    onUpdate: PropTypes.func,
    isNewDetail: PropTypes.bool,
    onDelete: PropTypes.func.isRequired
}

export default DetailForm;