import React, {Component} from 'react';
import Utils from '../../utils';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
  Dimensions
} from 'react-native';
import { COLOR_GREEN, COLOR_BROWN, COLOR_RED, ACTIVE_OPACITY } from '../../constants/Theme';

function getHour(time) {
  var d = time?new Date(time): new Date();
  return d.getHours()+(time?0:1);
}

class Main extends Component {
  constructor(props){
    super(props);
    var data = this.props.data;
    if(data){
      this.state = {title: data.title, hour: getHour(data.endTime)}
    }else{
      this.state = {title: '', hour: getHour()}
    }
  }
  componentDidMount(){
    this.handleUpdate();
  }
  componentDidUpdate(){
    this.handleUpdate();
  }
  handleUpdate = ()=>{
    this.props.onUpdate(this.state);
  }
  render() {
    function getPickerItems() {
      var list = [];
      for(var i=1;i<24;i++){
        list.push(<Picker.Item label={i+''} value={i} key={Utils.GUID()}/>);
      }
      list.push(<Picker.Item label={'00'} value={24} key={Utils.GUID()}/>);
      return list;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Todo</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            this.setState({title:text});
          }}
          value={this.state.title}/>
        <Text style={styles.text}>
          Hour
        </Text>
        <View style={styles.pickerWrap}>
          <Picker
            selectedValue={this.state.hour}
            onValueChange={(val) => {
              this.setState({hour: val});
            }}>
            {getPickerItems()}
          </Picker>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 40
  },
  text: {
    color: COLOR_BROWN,
    fontSize: 20,
    marginTop: 20,
    marginBottom: 5,
    textAlign: 'left'
  },
  input: {
    height: 40,
    padding: 10,
    borderColor: COLOR_BROWN,
    borderWidth: 1,
    borderRadius: 4,
    color: '#000'
  },
  pickerWrap: {
    borderColor: COLOR_BROWN,
    borderWidth: 1,
    borderRadius: 4
  }
});

export default Main;
