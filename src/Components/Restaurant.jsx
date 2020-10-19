import React, { Component } from 'react';
import './Restaurant.css'

class Restaurant extends Component {
	state = {
		location: {
			latitude: 0,
			longtude: 0
		},
		isLoaded: false,

		items: [],

		forStories:{
			imgSrc:'',
			id:0,
			name:'',
			rating:0,


		}
	};

	fetchData() {
		console.log('location comes from map', this.props.locationFromMap);
		console.log('Address ', this.props.address);
		console.log('Marker Position', this.props.markerPosition);

		const proxyurl = 'https://cors-anywhere.herokuapp.com/';
		const apiUrl = `https://maps.googleapis.com/maps/api/place/search/json?start=0&count=10&location=${this.props
			.locationFromMap.lat},${this.props.locationFromMap
			.lng}&radius=15000&types=lodging&key=AIzaSyDHfcA_b9zwn_AHKV5ex8DxEganh6TAWp8`;

		fetch(proxyurl + apiUrl).then((response) => response.json()).then((data) => {
			console.log('fetching the api');
			this.setState({
				isLoaded: true,
				items: data.results
			});
		});
	}
	getPhotoUrl(item,number){
		var photoUrl='';
		if(item.hasOwnProperty('photos')){
			console.log("the data have phostos option");
			var apiUrl='';
		
		
			apiUrl= 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=' +
			this.getPhotoReference(item)  +
		   '&key=AIzaSyDHfcA_b9zwn_AHKV5ex8DxEganh6TAWp8'
		   if(!apiUrl.ok){
			   console.log("it is okay");
			   photoUrl=apiUrl;
		   }else{
			   console.log("not okay");
			   photoUrl=this.getLocalPhoto(number);
		   }
		//    return photoUrl;
		}else{
			console.log("local image url");
	 photoUrl=this.getLocalPhoto(number);
			
		}
		return photoUrl;
	}
	getPhotoReference(item){
		var photoRef='';
		if (item.photos && Array.isArray(item.photos)) {
		photoRef = item.photos[0].photo_reference;
		}
		
		
		return photoRef;
 
	}
	getLocalPhoto(number){
		var photoUrl='';
		switch(number){
			case 0:
				photoUrl=require('../Data/Assets/image/photo-1555396273-367ea4eb4db5.jpg');
				break;
			case 1:
				photoUrl=require('../Data/Assets/image/photo-1414235077428-338989a2e8c0.jpg');
				break;
			case 2:
				photoUrl=require('../Data/Assets/image/photo-1482049016688-2d3e1b311543.jpg');
				break;
			case 3:
				photoUrl=require('../Data/Assets/image/photo-1490818387583-1baba5e638af.jpg');
				break;
			case 4:
				photoUrl=require('../Data/Assets/image/photo-1498837167922-ddd27525d352.jpg');
				break;
			case 5:
				photoUrl=require('../Data/Assets/image/photo-1504674900247-0877df9cc836.jpg');
				break;
			case 6:
				photoUrl=require('../Data/Assets/image/photo-1504674900247-0877df9cc836.jpg');
				break;
			case 7:
				photoUrl=require('../Data/Assets/image/photo-1517248135467-4c7edcad34c4.jpg');
				break;
			case 8:
				photoUrl=require('../Data/Assets/image/photo-1555396273-367ea4eb4db5.jpg');
				break;
			case 9:
				photoUrl=require('../Data/Assets/image/photo-1555396273-367ea4eb4db5.jpg');
				break;
			default : photoUrl=require('../Data/Assets/image/photo-1555396273-367ea4eb4db5.jpg');
				break;




			//default-case:photoUrl:'../Data/Assets/image/photo-1555396273-367ea4eb4db5.jpg';
		}
		return photoUrl;
	}

	getRestaurantName(number){
		console.log("length of the array",this.state.items.length);
		var restName;
		if (this.state.items.length !==0 && number < this.state.items.length) {
			// get the restaurant name from the comming jeson
				restName=this.state.items[number].name;
	
			}else{
					restName="Test Restaurant";
				}
		
		
			return restName;
	}
	getRating(number){
		
			
			var rating;
			if (this.state.items.length !==0 && number < this.state.items.length) {
				// get the restaurant name from the comming jeson
					rating=this.state.items[number].rating;
		
				}else{
						rating=6;
					}
			
			
				return rating;
	}
	getImage(number){
		var photoUrl;
		if(this.state.items[number]!=null){
			photoUrl=this.getPhotoUrl(this.state.items[number],number)
		}else{
			 photoUrl=this.getLocalPhoto(number);
		}
		return photoUrl;
	}
	setStateForCall(number){
		var imgSrc=this.getImage(number);
		var rating=this.getRating(number);
		var	name=this.getRestaurantName(number);

			const stories=this.state.forStories;

			stories.imgSrc=imgSrc;
			stories.name=name;
			stories.rating=rating;
			stories.id=number;
   
			
	   
		 
		  this.setState({forStories:stories});

		
		console.log("imgSrc",imgSrc);
		console.log("rating",rating);
		console.log("name",name);

		this.props.onStoriesOpen(this.state.forStories);

	}

	componentDidMount() {
		console.log('componentDidMount');
		this.fetchData();
		
	}

	render=() =>{
		var { isLoaded, items } = this.state;
		console.log('data', items);

		if (!isLoaded) {
			return <div style={{ marginTop: 100 }}>Data is loading ...</div>;
		} else {
			
			

			return (

				<>
				<div style={{ marginTop: 100 }} className=" content" >

				<div  className="container">
					
								<h3 style={{fontWeight:"bold" } } className=" p-2">
									{this.getRestaurantName(0)}
								</h3>
								<img onClick={()=>this.setStateForCall(0)} style={{width:200, height:200 }} className="rest_image p-2"
									src={ 
										this.getImage(0)
									}
									alt=""
								/>
								<div className="rest_overlay">Rating:{this.getRating(0)}</div>
							</div>
							<div  className="container">
					
					<h3 style={{fontWeight:"bold"}} className="p-2">
					{this.getRestaurantName(1)}
					</h3>
					<img onClick={()=>this.setStateForCall(1)} style={{width:200, height:200 }} className="rest_image p-2"
						src={ 
							this.getImage(1)
						}
						alt=""
					/>
					<div className="rest_overlay">Rating:{this.getRating(1)}</div>
				</div>
				<div  className="container">
					
					<h3 style={{fontWeight:"bold"}} className="p-2">
					{this.getRestaurantName(2)}
					</h3>
					<img onClick={()=>this.setStateForCall(2)} style={{width:200, height:200 }} className="rest_image p-2"
						src={ 
							this.getImage(2)
						}
						alt=""
					/>
					<div className="rest_overlay">Rating:{this.getRating(2)}</div>
				</div>
				<div  className="container">
					
					<h3 style={{fontWeight:"bold"}} className="p-2">
						{this.getRestaurantName(3)}
					</h3>
					<img onClick={()=>this.setStateForCall(3)} style={{width:200, height:200 }} className="rest_image p-2"
						src={ 
							this.getImage(3)
						}
						alt=""
					/>
					<div className="rest_overlay fa fa-star text-warning">{this.getRating(3)}</div>
				</div>
				<div  className="container">
					
					<h3 style={{fontWeight:"bold"}} className="p-2">
						{this.getRestaurantName(4)}
					</h3>
					<img onClick={()=>this.setStateForCall(4)} style={{width:200, height:200 }} className="rest_image p-2"
						src={ 
							this.getImage(4)
						}
						alt=""
					/>
					<div className="rest_overlay">Rating:{this.getRating(4)}</div>
				</div>
				<div  className="container">
					
					<h3 style={{fontWeight:"bold"}} className="p-2">
						{this.getRestaurantName(5)}
					</h3>
					<img onClick={()=>this.setStateForCall(5)} style={{width:200, height:200 }} className="rest_image p-2"
						src={ 
							this.getImage(5)
						}
						alt=""
					/>
					<div className="rest_overlay">Rating:{this.getRating(5)}</div>
				</div>
				<div  className="container">
					
					<h3 style={{fontWeight:"bold"}} className="p-2">
						{this.getRestaurantName(6)}
					</h3>
					<img onClick={()=>this.setStateForCall(6)} style={{width:200, height:200 }} className="rest_image p-2"
						src={ 
							this.getImage(6)
						}
						alt=""
					/>
					<div className="rest_overlay">Rating:{this.getRating(6)}</div>
				</div>
				<div  className="container">
					
					<h3 style={{fontWeight:"bold"}} className="p-2">
						{this.getRestaurantName(7)}
					</h3>
					<img onClick={()=>this.setStateForCall(7)} style={{width:200, height:200 }} className="rest_image p-2"
						src={ 
							this.getImage(7)
						}
						alt=""
					/>
					<div className="rest_overlay">Rating:{this.getRating(7)}</div>
				</div>
				<div  className="container">
					
					<h3 style={{fontWeight:"bold"}} className="p-2">
						{this.getRestaurantName(8)}
					</h3>
					<img onClick={()=>this.setStateForCall(8)} style={{width:200, height:200 }} className="rest_image p-2"
						src={ 
							this.getImage(8)
						}
						alt=""
					/>
					<div className="rest_overlay">Rating:{this.getRating(8)}</div>
				</div>
				<div  className="container">
					
					<h3 style={{fontWeight:"bold"}} className="p-2">
						{this.getRestaurantName(9)}
					</h3>
					<img onClick={()=>this.setStateForCall(9)} style={{width:200, height:200 }} className="rest_image p-2"
						src={ 
							this.getImage(9)
						}
						alt=""
					/>
					<div className="rest_overlay">Rating:{this.getRating(9)}</div>
				</div>

							

				
						{/* {items.map((item) => (
						
							<div  className="container">
								<h3 style={{fontWeight:"bold"}} className="p-2">{item.name}</h3>
								<img style={{width:200, height:200 }} className="p-2"
									src={
										'https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=' +
										 this.getPhotoReference(item)  +
										'&key=AIzaSyDHfcA_b9zwn_AHKV5ex8DxEganh6TAWp8'
									}
									alt=""
								/>
							</div>
						))}; */}
					
				
				</div>
			
			</>
			);
		}
	}
}


export default Restaurant;
