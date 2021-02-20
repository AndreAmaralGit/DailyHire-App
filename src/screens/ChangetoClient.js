import React, { Component, useContext } from 'react';

import Loader from 'react-native-modal-loader';


export default class ChangetoClient extends Component {

      constructor(props) {
            super(props);

            this.state = {
                  isLoading: false
            };

      }


      componentDidMount() {

            this.setState({ isLoading: true })
            setTimeout(() => {
                  this.setState({ isLoading: false })
                  this.props.navigation.navigate('create');
            }, 1000) // Stop the interval after 5s*/

      }

      render() {

            return (


                  <Loader loading={this.state.isLoading} color="#2292A4" />



            );
      }
}
