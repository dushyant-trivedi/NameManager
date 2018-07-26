

import React, {Component} from 'react';
import  AddUsers  from './src/components/AddUsers';
import store from './src/store/NameManagerStore';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import  ShowUsers  from './src/components/ShowUsers';


const NameManagerNavigator = StackNavigator({
  AddUsersScreen : { screen : AddUsers},
  ShowUsersScreen : { screen : ShowUsers},
  
});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NameManagerNavigator />
      </Provider>
    );
  }
}

