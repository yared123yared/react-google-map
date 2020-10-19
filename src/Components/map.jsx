/* eslint-disable no-undef */
import React from 'react';
// eslint-disable-next-line

import '../App.css';
import Restaurant from './Restaurant';

import { InfoWindow, withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import Geocode from 'react-geocode';
// eslint-disable-next-line
import { Descriptions, Badge } from 'antd';

import AutoComplete from 'react-google-autocomplete';
Geocode.setApiKey('AIzaSyDHfcA_b9zwn_AHKV5ex8DxEganh6TAWp8');

class Map extends React.Component {
	state = {
		addressComponent: '',

		address: '',
		city: '',
		area: '',
		state: '',
		zoom: 15,
		height: 400,
		mapPosition: {
			lat: 0,
			lng: 0
		},
		markerPosition: {
			lat: 0,
			lng: 0
		}
	};

	getCity = (addressArray) => {
		console.log('this is the getCity method');
		let city = '';

		for (let index = 0; index < addressArray.length; index++) {
			if (addressArray[index].types[0] && 'administrative_area_level_2' === addressArray[index].types[0]) {
				city = addressArray[index].long_name;
				console.log('city', city);
				return city;
			}
		}
	};
	getArea = (addressArray) => {
		// get the area of new location
		console.log('this is the gerArea method');
		let area = '';
		for (let index = 0; index < addressArray.length; index++) {
			if (addressArray[index].types[0]) {
				for (let new_index = 0; new_index < addressArray.length; new_index++) {
					if ('sublocality_level_1' === addressArray[index].types[index]) {
						area = addressArray[index].long_name;
						console.log('Area', area);
						return area;
					}
				}
			}
		}
	};
	getState = (addressArray) => {
		console.log('this is the getState method');
		let state = '';
		for (let index = 0; index < addressArray.length; index++) {
			for (let new_index = 0; new_index < addressArray.length; new_index++) {
				if (addressArray[index].types[0] && 'administrative_area_level_2' === addressArray[index].types[0]) {
					state = addressArray[index].long_name;
					console.log('State', state);
					return state;
				}
			}
		}
	};
	onMarkerDragEnd = (event) => {
		let newLat = event.latLng.lat();
		let newLng = event.latLng.lng();
		Geocode.fromLatLng(newLat, newLng).then((response) => {
			console.log('response', response);
			const address = response.results[0].formatted_address,
				addressArray = response.results[0].address_components,
				city = this.getCity(addressArray),
				area = this.getArea(addressArray),
				state = this.getState(addressArray);
			this.setState({
				addressArray: addressArray ? addressArray : '',
				address: address ? address : '',
				area: area ? area : '',
				city: city ? city : '',
				state: state ? state : '',
				mapPosition: {
					lat: newLat,
					lng: newLng
				},
				markerPosition: {
					lat: newLat,
					lng: newLng
				}
			});
		});
	};
	onPlaceSelected = (place) => {
		console.log('place:', place);
		const address = place.formatted_address,
			addressArray = place.address_components,
			city = this.getCity(addressArray),
			area = this.getArea(addressArray),
			state = this.getState(addressArray);
		let newLat = place.geometry.location.lat();
		let newLng = place.geometry.location.lng();

		this.setState({
			addressArray: addressArray ? addressArray : '',
			address: address ? address : '',
			area: area ? area : '',
			city: city ? city : '',
			state: state ? state : '',
			mapPosition: {
				lat: newLat,
				lng: newLng
			},
			markerPosition: {
				lat: newLat,
				lng: newLng
			}
		});
	};
	componentDidMount() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				this.setState(
					{
						mapPosition: {
							lat: position.coords.latitude,
							lng: position.coords.longitude
						},
						markerPosition: {
							lat: position.coords.latitude,
							lng: position.coords.longitude
						}
					},
					() => {
						Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then((response) => {
							console.log('response', response.results);
							const address = response.results[0].formatted_address,
								addressArray = response.results[0].address_components,
								city = this.getCity(addressArray),
								area = this.getArea(addressArray),
								state = this.getState(addressArray);
							this.setState({
								addressArray: addressArray ? addressArray : '',
								address: address ? address : '',
								area: area ? area : '',
								city: city ? city : '',
								state: state ? state : ''
							});
						});
					}
				);
			});
		}
	}

	render() {
		//
		const MapWithAMarker = withScriptjs(
			withGoogleMap((props) => (
				<GoogleMap
					defaultZoom={8}
					defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
				>
					<Marker
						draggable={true}
						onDragEnd={this.onMarkerDragEnd}
						position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
					>
						<InfoWindow>
							<div>Hello</div>
						</InfoWindow>
					</Marker>
					<AutoComplete
						style={{ width: '100%', height: '40px', paddingLeft: 16, marginTop: 2, marginBottom: '2rem' }}
						onPlaceSelected={(place) => {
							console.log(place);
							this.onPlaceSelected(place);
						}}
					/>
					<Restaurant
						onStoriesOpen={this.props.onStoriesOpen}
						locationFromMap={this.state.mapPosition}
						address={this.state.address}
						markerPosition={this.state.markerPosition}
						addressComponent={this.state.addressComponent}
					/>
				</GoogleMap>
			))
		);
		console.log('loaction in the map', this.state.mapPosition);

		return (
			<div>
				<h1>Google Map Adress</h1>
				<Descriptions>
					<Descriptions.Item label="City">{this.state.city}</Descriptions.Item>
					<Descriptions.Item label="Area">{this.state.area}</Descriptions.Item>
					<Descriptions.Item label="State">{this.state.state}</Descriptions.Item>
					<Descriptions.Item label="Adress">{this.state.address}</Descriptions.Item>
				</Descriptions>
				<MapWithAMarker
					googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDHfcA_b9zwn_AHKV5ex8DxEganh6TAWp8&v=3.exp&libraries=geometry,drawing,places"
					loadingElement={<div style={{ height: `100%` }} />}
					containerElement={<div style={{ height: `400px` }} />}
					mapElement={<div style={{ height: `100%` }} />}
				/>
			</div>
		);
	}
}

export default Map;
