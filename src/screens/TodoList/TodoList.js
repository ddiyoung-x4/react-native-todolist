import React, {useState} from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image, Modal, TextInput} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

export const TodoList = () => {

  const [data, setData] = useState([{id: 1, title: 'Task 1', active: false}]);
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [title, setTitle] = useState('');
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.TaskItem}>
        <CheckBox
          disabled={false}
          value={item.active}
          onValueChange={(newValue) => setToggleCheckBox(newValue,index)}
        />
        <Text style={[styles.Subtitle, {textDecorationLine:item.active?'line-through':'none'}]}>{item.title}</Text>
      </View>
    );
  };
  const openModal=()=>{
    setIsModalVisible(true);
  };
  const saveTitle=()=>{
    let newArr=[...data];
    newArr.push({id:newArr.length+1, title:title, active: false});
    setData(newArr);  
  };
  const setToggleCheckBox = (value, index) => {
    let newArr=[...data]

    newArr[index].active= !newArr[index].active
    setData(newArr);
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.contentContainer}>
        <Text style={styles.title}>Today's Tasks</Text>
        <FlatList data={data} renderItem={renderItem} />
        <TouchableOpacity style={styles.AddBtnWrapper} onPress={openModal}>
          <Image style={styles.addIcon} source={require('../../../assets/add.png')}></Image>
        </TouchableOpacity>
      </SafeAreaView>
      <Modal transparent={true} visible={isModalVisible}>
        <View style={styles.modalContentWrapper}>
          <TouchableOpacity style={styles.closeBtnWrapper} onPress={() => setIsModalVisible(false)}>
            <Text style={styles.close}>close</Text>

          </TouchableOpacity>
          <View style={styles.inputWrapper}>
            <TextInput 
              style={styles.textInput} 
              placeholder={'Please enter the task title'}
              onChangeText={(text)=>setTitle(text)}
            />
            <TouchableOpacity style={styles.btnWrapper} onPress={saveTitle}>
              <Text style={{textAlign: 'center'}}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles=StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  title:{
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentContainer: {
    display: 'flex',
    flex: 1,
  },
  addIcon: {
    width:50,
    height:50,
  },
  AddBtnWrapper: {
    alignItems: 'center',
  },
  modal: {
    height: '50%',
  },
  modalContentWrapper: {
    height: '50%',
    marginTop: 'auto',
    backgroundColor: 'green',
  },
  close: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  closeBtnWrapper: {
    alignItems: 'flex-end'
  },
  inputWrapper: {
    marginTop: 60,
  },
  textInput: {
    padding: 15,
    backgroundColor:'white',
    fontSize: 20,
  },
  btnWrapper: {
    backgroundColor: 'white',
    marginTop: 30,
    padding: 15,

  },
  TaskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 15,
  },
  Subtitle:{
    fontSize: 20,
    marginLeft: 15,
  },
});