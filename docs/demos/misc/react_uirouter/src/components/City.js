import React from 'react';

class City extends React.Component{
	constructor(props){
		super(props);
		this.state={
			data:{}
		};
	}
	componentDidMount() {
		const _this = this
		fetch('./mock/cities.json')
		    .then(function(response){    	  
		      response.json().then(function(data) {  
		  		_this.setState({data});
		      });
		    }).then(function(error){
		    	 /**/
		    });
	}

    render(){ 
		console.log(this.state);

		if(Object.getOwnPropertyNames(this.state.data).length>0){
		  	var data = this.state.data;
		  	var hotcitiesArr=[];
			let Data2=[];
			// console.log(typeof data === "object")
			for(let i in data.hotcities){
	            	// console.log(data.hotcities[i]);
	        	hotcitiesArr.push(<div key={data.hotcities[i].cityid}>{data.hotcities[i].cityname}</div>);
	        }

			return (<div className="cities"><h1>hello city</h1>{hotcitiesArr}</div>);
		}else{
			return null
		}
	}
}

export default City;
