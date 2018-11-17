import React from 'react';
import $ from "jquery";
import fullCalendar from "fullcalendar";
import moment from 'moment';
import FullcalendarObjectMapper from './fullcalendarObjectMapper';
import debounce from 'debounce';

export default class FullCalendar extends React.Component{
	constructor(){
		super();
		this.jq = $.noConflict();
		this.fullcalendarObjectMapper = new FullcalendarObjectMapper();
		this.root = null;
		this.instance = null;
		this.date = new Date();
		this.eventString = '';
	}

	componentDidMount(){
		const objectMapperSettings = this.fullcalendarObjectMapper.getSettings(this.props);
		this.instance = this.jq(`#${this.root}`).fullCalendar(objectMapperSettings);
	}

  	componentWillReceiveProps(nextProps){
		debounce(() => {
            if (nextProps.events && this.eventSString !== JSON.stringify(nextProps.events)) {
                this.eventString = JSON.stringify(nextProps.events);
  		        this.jq(`#${this.root}`).fullCalendar('destroy');
  		        const objectMapperSettings = this.fullcalendarObjectMapper.getSettings(nextProps);
        	    this.instance = this.jq(`#${this.root}`).fullCalendar(objectMapperSettings);
            }
		}, 200)
  	}

	render(){
		this.root = this.props.id || 'ID' + this.date.getTime(); 
		return(
			<div id={this.root}></div>
		)
	}
}
