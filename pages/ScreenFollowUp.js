
import React, { useState, useEffect  } from 'react'
import { Alert, Button, Image, Pressable,TouchableOpacity, FlatList, SafeAreaView, StyleSheet, Switch, Text, TextInput, View,ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {useRoute} from "@react-navigation/native";
import my_styles from './monStyle';
import { fetchDataFromDatabase, updateChallenges, updateEffectueInChallenges } from './Db/DbManager2';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getMyDate, getStrDate } from './helpers/helperFunctions';
import dbManager from './Db/DatabaseManager';
import { useFocusEffect } from '@react-navigation/native';

//import dbManager from './Db/DatabaseManager';

const ScreenFollowUp = ({navigation}) => {
    const {challenge_name,setChallengeName}=  useState("");
    const [data, setData] = useState([]);

    const [chosenDate, setChosenDate] = useState(getMyDate);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [selectedItem, setSelectedItem] = useState(null); //Pour enregistrer la valeur locale de l'élément dont le bouton est appuyé


  useEffect(() => {
    //fetchDataFromDatabase();
    fetchDataFromDatabase()
    .then(result => {
      setData(result);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
    /*
    // Fetch data from the 'Expenses' table with a condition
    dbManager.openDatabase();
    dbManager.fetchDataNoCond('challenges')
      .then((result) => setData(result))
      .catch((error) => console.error('Error fetching data:', error))
      .finally(() => dbManager.closeDatabase());
      console.log("***************["+data+"]******************");*/
  }, []);

// Fetch data when the screen gains focus
useFocusEffect(
  React.useCallback(() => {
    setSelectedItem(null);
    setShowDatePicker(false);
    fetchDataFromDatabase();
    return () => {};
  }, [])
);


const handleDateChange2 = (event, selectedDate) => {
  if (event.type === 'set')
    {
      setShowDatePicker(false);
    }
}

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || chosenDate;
    //if (event.type === 'set')
    {
      setShowDatePicker(false);
    }
    
    setChosenDate(getMyDate(currentDate));//setChosenDate(currentDate);
    console.log("******VOici le currentDate : **"+currentDate+"*********");
    console.log('-------ENCORE ITEMTEMP-------:', selectedItem);
    //************************************ */
    
    if(selectedItem == null)
    {/* RIEN A FAIRE */}
    else
    {
      var date_selected = new Date(getStrDate(getMyDate(currentDate)));
      var date_debut = new Date(selectedItem.date_debut);
      /*Alert.alert("0");
      
      Alert.alert("1");
      
      Alert.alert("2");
      console.log("++++++Date selected : "+date_selected+"++++++");
      console.log("++++++Date debut : "+date_debut+"++++++");*/
       
       var date_aujourdhui =new Date(getStrDate(new Date()))
      if ( date_selected < date_debut ){
        //Alert.alert(" "+date_selected+" -- "+date_debut+" ");//,"A LA DATE DU JOUR !!!","MERCI DE REPRENDRE");
        Alert.alert("VOTRE DATE DE L'ACTIVITE DOIT ETRE ULTERIEURE AU DEBUT");//,"A LA DATE DU JOUR !!!","MERCI DE REPRENDRE");
      }/*else if ( date_selected > date_aujourdhui ){
        Alert.alert("VOTRE DATE DE L'ACTIVITE NE PEUT PAS ETRE AU DELA D'AUJOURD'HUI");//,"A LA DATE DU JOUR !!!","MERCI DE REPRENDRE");
      }*/else{
        
        if (selectedItem.nb_effectue < selectedItem.nb_prevu)
        {
        
          new_nb_effectue = selectedItem.nb_effectue + 1;
        
          my_id = selectedItem.id;
        
          var new_jour = getStrDate(getMyDate(currentDate));
        
          let all_jours = (selectedItem.jours_action == null)? new_jour: selectedItem.jours_action+ "_"+ new_jour;
          //console.log(" = = = = = "+new_nb_effectue+"  = == = = ="+my_id+" = = = = = = = = =");
                    //all_jours = "-";
        
          //updateChallenges(new_nb_effectue,all_jours, 'id = ?', [my_id]);
          console.log(" = = = = = "+new_nb_effectue+"  = ="+all_jours+"= = = ="+my_id+" = = = = = = = = =");
          //updateChallenges(new_nb_effectue,all_jours, my_id);
      
          //dbManager.openDatabase();
        dbManager.executeSql(
          `UPDATE challenges SET nb_effectue = ?, jours_action = ? WHERE id= ${my_id};`, [new_nb_effectue, all_jours]
          //[/*getStrDate(currentDate),*/new_nb_effectue, selectedItem.id]
        )
          .then(() => {    
            fetchDataFromDatabase();
          })
          .catch((error) => console.error('Error saving data:', error));
            //  .finally(() => dbManager.closeDatabase());
  
        dbManager.printTableContent()
 
        }else{
          Alert.alert("CETTE TACHE EST DEJA ACHEVEE");
        }
      
      }

    }

    //*********************************** */    
    setSelectedItem(null);
  };

  const handleShowDatePicker = () => {
    //if (selectedItem != null)
    //if (showDatePicker == false && selectedItem!=null)
    {
      setShowDatePicker(true);
      //setSelectedItem(null);
    }
        
  };

  const handleButtonPress = (item) => {

    setSelectedItem(item);
    //if (selectedItem != null)
        handleShowDatePicker();
    //setSelectedItem(null);
    // Handle button press action for each item
    //console.log('Button pressed for:', item);
    console.log('-------VOICI ITEMTEMP-------:', selectedItem);
  };

// Define a function to determine the text and style based on the condition
const getStateTextAndStyle = (item) => {
  var current_date = new Date();
  var challenge_datedebut = new Date(item.date_debut);
  //This means challenge beginning date is still ahead or is the current day.
  if (challenge_datedebut > current_date) {
    return { text: "A venir.", style: my_styles.txt_vert };
  } else   if (challenge_datedebut == current_date) {
    return { text: "Jour J.", style: my_styles.txt_orange };
  } else if (item.nb_effectue <= 0) {
    return { text: "Retard.", style: my_styles.text_rouge };
  } else if (item.nb_effectue > 0 && item.nb_effectue < item.nb_prevu) {
    return { text: "En Cours.", style: my_styles.text_gold };
  }else if (item.nb_effectue == item.nb_prevu) {
    return { text: "Achevé !", style: my_styles.txt_noir };
  }
  // Add more conditions and options as needed
  return { text: 'Normal Text', style: null }; // Default text and style
};

const getBtnStyle = (item) => {
  var current_date = new Date();
  var challenge_datedebut = new Date(item.date_debut);
  //This means challenge beginning date is still ahead or is the current day.
  if (challenge_datedebut > current_date) {
    return {style: my_styles.buttonGreen };
  } else   if (challenge_datedebut == current_date) {
    return {style: my_styles.buttonOrange };
  } else if (item.nb_effectue <= 0) {
    return {style: my_styles.buttonRed };
  } else if (item.nb_effectue > 0 && item.nb_effectue < item.nb_prevu) {
    return {style: my_styles.buttonGold };
  }else if (item.nb_effectue == item.nb_prevu) {
    return {style: my_styles.buttonGray };
  }
  // Add more conditions and options as needed
  return { text: 'Normal Text', style: null }; // Default text and style
};

  return (
    <ScrollView>
    <View style={my_styles.container_2}>        
        <Text style={my_styles.title}>SUIVI</Text>        
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
          <Text style={[my_styles.itemText, my_styles.mon_defi_text]}>{item.nom_defi}</Text>
          <Text style={my_styles.itemText}>{item.date_debut} </Text>
          <Text style={[my_styles.itemText, {flex:2}]}> {item.nb_effectue} / {item.nb_prevu}</Text>
          <View>

              <Pressable   style={[my_styles.button2, , getBtnStyle(item).style]}  onPress={() => handleButtonPress(item)}
              >                  
                  <Text id={item.unique_id}  style={[my_styles.buttonText,]} 
                  >
                    Faire</Text>
              </Pressable>
              
              

          {/* <Button id={item.unique_id} style={[my_styles.itemText, {flex:2}]} title="Faire" onPress={() => handleButtonPress(item)} /> */}
          {showDatePicker && (
        <DateTimePicker
          value={chosenDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}
          <Text style={[my_styles.actionText, getStateTextAndStyle(item).style]}>
            {getStateTextAndStyle(item).text}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>


    </ScrollView>
  )
}


export default ScreenFollowUp;