

import React, {Component} from 'react';
import {TouchableOpacity, Text, View, TextInput, StyleSheet} from 'react-native';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/AddUserAction';
import {connect} from 'react-redux';

class AddUsers extends Component {
  constructor(props) {
    super(props);
    this.state={
        users : [],
        fn:'',
        ln:'',
        a:'',
      }
    
    this.id=0;
    this.addUserInComponent=this.addUserInComponent.bind(this);
    this.validateInputs=this.validateInputs.bind(this);
    this.buttonName='Add';
    
    
  }
  
  addUserInComponent() {
    this.id++;
    
    /* Validation of inputs */
    if(!this.validateInputs(this.state.fn,this.state.ln,this.state.a)) {
      return;
    }
    
    
    let user={
      firstName : this.state.fn,
      lastName : this.state.ln,
      age : this.state.a,
      id : this.id   
    };
    if(this.props.navigation.getParam('edit')) {
      let index=this.props.navigation.getParam('index');
      usersList=JSON.parse(JSON.stringify(this.props.usersList));
      this.props.usersList[index]=user;
      this.setState({fn: ''});
      this.setState({ln: ''});
      this.setState({a: ''});
      this.props.navigation.setParams({index : 0, edit : false});
      this.props.editUser(this.props.usersList);
      this.props.navigation.push('ShowUsersScreen');
      //this.props.navigation.pop();
    } else {
      this.setState({fn: ''});
      this.setState({ln: ''});
      this.setState({a: ''});
      this.props.addUser(user);
    }
}

  componentWillMount() {
    console.log("@@@@@@@@@@@  component will mount");
    let rowId;
    if(this.props.navigation.getParam('edit')) {
      rowId=this.props.navigation.getParam('index');
      //console.log(this.props.usersList[rowId]);
      this.setState({fn:this.props.usersList[rowId].firstName});
      this.setState({ln:this.props.usersList[rowId].lastName});
      this.setState({a:this.props.usersList[rowId].age});
      this.id=this.props.usersList[rowId].id;
      this.buttonName='Update';
   
    }
  }
  validateInputs(fn,ln,a) {
    if(fn=='' || ln=='' || a=='') {
      alert("Enter values");
      return false;
    }
    if(isNaN(a) || a<=0) {
      alert("Enter proper age");
      return false;
    }
    return true;
  }
  
  render() {
    //console.log(this.props.navigation.getParam('edit'));
    
    console.log("@@@@@ render of add users called");
      return (
    
         

        <View style={styles.container}>
          <Text style={styles.headingText}>
              {`${this.buttonName}`} Info
          </Text>
        
         

        <TextInput 
        style={styles.textInput}
        onChangeText={(text) => this.setState({fn: text})}
        placeholder="Enter first name"
        placeholderTextColor="black"
        value={this.state.fn}
        maxLength = {15}
        
        />
     
        <TextInput 
        style={styles.textInput}
        onChangeText={(text) => this.setState({ln: text})}
        placeholder="Enter last name"
        placeholderTextColor="black"
        value={this.state.ln}
        maxLength={15}
        />

        <TextInput 
        style={styles.textInput}
        onChangeText={(text) => this.setState({a: text})}
        placeholder="Enter age"
        placeholderTextColor="black"
        value={this.state.a}
        maxLength={3}
        />
      
      <View style={styles.buttonView}>  
     
     <TouchableOpacity 
        onPress = {()=> {
          
          this.addUserInComponent();
        }}
        style = {styles.addButton} >
        <Text style={styles.addButtonText}> {`${this.buttonName}`} </Text>
      </TouchableOpacity> 

      <TouchableOpacity 
        onPress = {()=> this.props.navigation.navigate('ShowUsersScreen')}
        style = {styles.addButton} >
        <Text style={styles.addButtonText}> Next </Text>
      </TouchableOpacity> 

      
      
      </View>
      
    
    </View>
    );
  }
  }


function mapDispatchToProps(dispatch) {
  
  return bindActionCreators(Actions, dispatch);
  
}

function mapStateToProps(state) {
  console.log("@@@@@ map state to props of add users");
  const red=state.AddUserReducer;
  
  // console.log("------------");
  // for(let user of red.users) console.log("Names is "+ user.firstName);
  // console.log("------------");
  return {
    usersList : red.users
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUsers);

const styles = StyleSheet.create({
    container : {
        backgroundColor : '#C8C2DF',
        flex: 1, 
        flexDirection: 'column', 
        alignItems: 'center',
    },
    textInput : {
        height: 40, 
        width: 200, 
        borderColor: 'black', 
        borderWidth: 2, 
        marginTop: 50,
        padding:10
        
    },
    addButton : {
        margin: 20,  
        height : 40, 
        width : 100,
        backgroundColor : '#190D3A',
        alignItems:'center'
    },
    addButtonText : {
        color: 'white',
        fontSize: 24,
        // paddingLeft: 10,
        paddingTop: 5

    },
    headingText : {
        marginTop: 50,
        fontSize: 50,
        fontWeight: 'bold'
    },
    buttonView : {
        flex:1,
        flexDirection: 'row',
    }
});





