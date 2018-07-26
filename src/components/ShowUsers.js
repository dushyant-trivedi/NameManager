

import React, {Component} from 'react';
import { Text, View, Image, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { bindActionCreators } from 'redux';
//import * as Actions from '../actions/DeleteUserAction';
import * as Actions from '../actions/AddUserAction';
import {connect} from 'react-redux';


class ShowUsers extends Component {
  constructor(props) {
    super(props);
    this.state={
        firstName : '',
        lastName : '',
        age : '',
    }
    this.deleteUser=this.deleteUser.bind(this);
    
    }

   

  renderUsers(item,index) {
    return (
            
            <View style={styles.rowView}>
                <Text
                style={styles.firstNameText} 
                value={this.state.firstName}
                >
                {item.firstName}
                </Text>
                <Text 
                style={styles.lastNameText} 
                value={this.state.lastName}
                >
                {item.lastName}
                </Text>
                <Text 
                style={styles.ageText}
                value={this.state.age} 
                >
               
                {item.age}
                </Text>
                
                <TouchableOpacity style={styles.buttonWrapper}
                 onPress = {() => this.props.navigation.push('AddUsersScreen',{
                     index,
                     edit : true
                })}
                >
                <Image 
                key={index+"edit"}
                style={styles.editIcon}
                source={require('../../images/edit.png')}
                />
               </TouchableOpacity>
               
                <TouchableOpacity style={styles.buttonWrapper}
                 onPress = {()=>this.deleteUser(index)}
                >
                <Image 
                key={index+"delete"}
                style={styles.deleteIcon}
                source={require('../../images/delete.png')}
                />
                  </TouchableOpacity>

                
                  {console.log("users rended")}
            </View>
            

    )
  }

    deleteUser(index) {
        console.log("delete user called");
        let usersList=JSON.parse(JSON.stringify(this.props.usersList));
        usersList.splice(index,1);
        // console.log("------------");
        // for(let a of usersList) console.log("value is : "+a.firstName);
        // //console.log("length : "+usersList.length);
        // console.log("------------");
        this.props.deleteUser(usersList);

    }
    

    
  

  
  
  render() {
    console.log("@@@@@@@@@@ render of show users called");
    return (
    
         

          <View style={styles.container}>
            <Text style={styles.headingText}>
                Users List
            </Text>
           
           
            
            <View style={styles.flatListWrapper}>
            <FlatList 
                data = {this.props.usersList}
                renderItem = {({item,index}) => this.renderUsers(item,index)}
                keyExtractor={item => item.firstName}
            />
            </View>
            <TouchableOpacity
                onPress = {() => this.props.navigation.navigate('AddUsersScreen')}
                >
                    <Text style={styles.homeLinkText}>Home</Text>
                </TouchableOpacity>
        </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
    return  bindActionCreators(Actions,dispatch); 
}
  
  function mapStateToProps(state) {
    console.log("@@@@@@  mapStateToProps of show users called");
    return {
        usersList: state.AddUserReducer.users,
    }
    
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ShowUsers);





const styles = StyleSheet.create({
    container : {
        backgroundColor : '#C8C2DF',
        flex: 1, 
        //flexDirection: 'column', 
        alignItems: 'center',
    },
    
    headingText : {
        margin: 10,
        fontSize: 30,
        fontWeight: 'bold'
    },
    rowView : {
        borderWidth: 0.5,
        borderColor: 'black',
        flex: 1,
        width: '100%',
        height: 40,
        //margin: 5,
        marginBottom: 10,
        flexDirection: 'row',
        //alignItems: 'center'
        //justifyContent: 'center'
    },
    firstNameText : {
        flex: 0.4,
        textAlign: 'center',
        paddingTop: 10,
        borderWidth: 0.5
    },
    lastNameText : {
        flex: 0.4,
        textAlign: 'center',
        paddingTop: 10,
        borderWidth: 0.5
    },
    ageText : {
        flex: 0.2,
        textAlign: 'center',
        paddingTop: 10,
        borderWidth: 0.5
    },
    editIcon : {
        height: 25,
        width: 25,
        //flex: 0.1,
        margin: 8
    },
    deleteIcon : {
        height: 25,
        width: 25,
        //flex: 0.1,
        margin: 8
    },
    flatListWrapper : {
       
        borderColor: 'black',
        //flex: 1,
        flexDirection: 'row',
    },
    buttonWrapper : {
        height: 40,
        
    },
    homeLinkText : {
        textDecorationLine : 'underline',
        color : 'blue'
    }
});


