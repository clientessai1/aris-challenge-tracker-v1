
import React, { useState, useEffect   } from 'react'
import { Alert, Button, input, Image, Pressable,TouchableOpacity, SafeAreaView, StyleSheet, Switch, Text, TextInput, View,ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {useRoute} from "@react-navigation/native";
import my_styles from './monStyle';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
//import PositiveNumberInput from './PositiveNumberInput';
import dbManager from './Db/DatabaseManager';
import { fetchDataFromDbUpToDownId } from './Db/DbManager2';
import {getMyDate, getStrDate} from './helpers/helperFunctions';
import { useFocusEffect } from '@react-navigation/native';

function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Generate a unique ID
/*const uniqueId = generateUniqueId();

console.log(uniqueId);*/
/*
function getStrDate(new_date = new Date())
{
  let my_month  = new_date.getMonth()+1;
  let day_number = new_date.getDate();
  var str_month = my_month.toString().padStart(2,'0');
  var str_daynumber = day_number.toString().padStart(2,'0');
  var str_date = new_date.getFullYear()+"-"+(str_month)+"-"+str_daynumber;  
  console.log("////////////////// STR DATE //////////////////////");
  return str_date;
}*/
const ScreenNewChallenge = ({navigation}) => {
    const [data, setData] = useState([]);
    const [challengename,setChallengeName]=  useState("");
    const [nb_times,setNbTimes]=  useState('');

    const [chosenDate, setChosenDate] = useState(getMyDate);
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
      fetchDataFromDbUpToDownId()
      .then(result => {
        setData(result);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }, []);

    // Fetch data when the screen gains focus
useFocusEffect(
  React.useCallback(() => {
    fetchDataFromDbUpToDownId();
    return () => {};
  }, [])
);

    const handleButtonPress = (item) => {
      // Handle button press action for each item
      console.log('Button pressed for:', item);
    };

    const handleChallengeChange = (text) => {    
      setChallengeName(text);
    };

    const updateData = (p_nomdefi, p_datedeb, p_nbprevu, p_uniqueid) =>{
      const newData = { 
         id: data.length + 1,
         nom_defi: p_nomdefi, 
         date_debut: p_datedeb, 
         nb_prevu:p_nbprevu,
         unique_id:p_uniqueid
        };
        // Update the state with the new data
        //setData([...data, newData]);
        //[...data].push(newData);
        //***********
        let existing_challenges = [...data];
        existing_challenges.unshift(newData);
        setData(existing_challenges);
        console.log('Data saved successfully');
    };

    const handleInputChange = (text) => {
      // Check if input is a positive number
      const inputValue = text.replace(/[^0-9]/g, ''); // Remove non-numeric characters
      
      setNbTimes(inputValue);
      console.log("++++++++"+nb_times+"+++++++++++");
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || chosenDate;
        setShowDatePicker(false);
        setChosenDate(getMyDate(currentDate));//setChosenDate(currentDate);
        console.log("******VOici le currentDate : **"+currentDate+"*********");
      };
    
      const handleShowDatePicker = () => {
        setShowDatePicker(true);
      };

      const handleCreation = () => {
        if (challengename =="" || chosenDate =="" || nb_times =="" ) {
          Alert.alert('Error', 'Please fill in all fields');
        } else {
          // Perform registration logic here, e.g., send data to server
          console.log('challenge name:', challengename);
          console.log('Chosen date:', chosenDate);
          console.log('Date for database:', getStrDate(chosenDate));
          console.log('Nb times:', nb_times);
          var current_date = new Date();
          if ( (new Date(getStrDate(chosenDate))) < (new Date(getStrDate(current_date))) ){
            Alert.alert("VOTRE DATE DE DEBUT NE DOIT PAS ETRE ANTERIEURE");//,"A LA DATE DU JOUR !!!","MERCI DE REPRENDRE");
          }else{
            var str_datedebut_fordb =  getStrDate(chosenDate);
            var unique_id = generateUniqueId();
            dbManager.openDatabase();
            dbManager.executeSql(
              'INSERT INTO challenges (nom_defi, date_debut, nb_prevu, nb_effectue, unique_id) VALUES (?, ?, ?, ?, ?)',
              [challengename, str_datedebut_fordb, nb_times, 0, unique_id]
            )
              .then(() => {updateData(challengename, str_datedebut_fordb, nb_times, unique_id)})
              .catch((error) => console.error('Error saving data:', error));
  //            .finally(() => dbManager.closeDatabase());
  
            dbManager.printTableContent()
  
            // Reset form fields
            setChallengeName('');
            setNbTimes('');
            setChosenDate(getMyDate());
          
          }

        }
      };
    
      

  return (
    <ScrollView>
    <View style={my_styles.container3}>        
        <Text style={my_styles.title_c}>Enregistre ton nouveau défi</Text>

        <TextInput 
        style={my_styles.input} 
        placeholder='TON NOUVEAU DEFI ICI' 
        value={challengename}
        onChangeText={handleChallengeChange}        
        //onChangeText={text => setChallengeName(text)} autoCorrect={false}       
        autoCapitalize='none'         
        multiline={true}
        numberOfLines={2}
        />


    <View>
      <Text style={my_styles.label}>Date to start your challenge :</Text>
      <Button title="Choose Date" onPress={handleShowDatePicker} disabled={false} />
      {showDatePicker && (
        <DateTimePicker
          value={chosenDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Text style={my_styles.selectedDate}>{`Selected Date: ${chosenDate.toDateString()}`}</Text>
    </View>


   

    <View>
      <TextInput
       style={my_styles.input} 
        keyboardType="numeric"
        value={nb_times}
        onChangeText={handleInputChange}
        placeholder="NOMBRE DE SEANCE PREVU"
      />
      <Text style={{ color: 'red' }}>
        {isNaN(nb_times) || Number(nb_times) <= 0 ? 'Please enter a positive number' : ''}
      </Text>
    </View>


        <View style={my_styles.buttonView}>
            <Pressable style={[my_styles.button, my_styles.buttonRed]} onPress={ handleCreation}>            
                <Text style={my_styles.buttonText}>AJOUTER</Text>
            </Pressable>            
        </View>
        
    </View>

    <View style={my_styles.container_2}>
      {/* Header Column */}
    <View style={my_styles.headerContainer}>
      <Text style={[my_styles.headerText, {flex:1}]}>N°</Text>
      <Text style={my_styles.headerText}>Défi</Text>
      <Text style={my_styles.headerText}>Date début</Text>
      <Text style={[my_styles.headerText, {flex:2}]}>Reste</Text>
      <Text style={[my_styles.headerText, {flex:2}]}>Actions</Text>
    </View>


      {data.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={my_styles.rowContainer}
          onPress={() => handleButtonPress(item)}>
          {/*<Text style={my_styles.itemText}>{item.id} {item.nom_defi} {item.date_debut} {item.nb_prevu}</Text>*/}
          <Text style={[my_styles.itemText, {flex:1}]}>{item.id}</Text>
          <Text style={[my_styles.itemText , my_styles.mon_defi_text2]}>{item.nom_defi}</Text>
          <Text style={my_styles.itemText}>{item.date_debut} </Text>
          <Text style={[my_styles.itemText, {flex:2}]}> {item.nb_prevu}</Text>
          <View style={my_styles.my_horizontal_alignment}>
          <Button  style={[my_styles.itemText, {flex:2}, my_styles.my_horizontal_alignment_elt]} title="E" onPress={() => handleButtonPress(item)} />
          <Text> </Text>
          <Button  style={[my_styles.itemText, {flex:2}, my_styles.my_horizontal_alignment_elt]} title="X" onPress={() => handleButtonPress(item)} />

          </View>
        </TouchableOpacity>
      ))}
    </View>



    </ScrollView>
  )
}


export default ScreenNewChallenge;