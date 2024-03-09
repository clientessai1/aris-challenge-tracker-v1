
import React, { useState } from 'react'
import { Alert, Button, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View,ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {useRoute} from "@react-navigation/native";
import my_styles from './monStyle';
import dbManager from './Db/DatabaseManager';

const logo1 = require("../assets/adaptive-icon1.png");
const nom_table_challenges = "challenges";
const nom_table_days = "days";
const sql_create_table_challenges = " CREATE TABLE IF NOT EXISTS "+nom_table_challenges+" ("+
"id INTEGER PRIMARY KEY AUTOINCREMENT, "+
"nom_defi TEXT, "+
"date_debut TEXT , "+
"nb_prevu INTEGER, "+
"nb_effectue INTEGER, "+
"unique_id TEXT "+
");"
const sql_create_table_days = " CREATE TABLE IF NOT EXISTS "+nom_table_days+" ( "+
" id INTEGER PRIMARY KEY AUTOINCREMENT, "+
" date_jour TEXT, "+
" challenge_id INTEGER not null, "+
" FOREIGN KEY (challenge_id) REFERENCES challenges(id) "+
");";


dbManager.openDatabase();

function creationTables(){
    //dbManager.createTable("challenge", columns);
    dbManager.executeSql(` CREATE TABLE IF NOT EXISTS ${nom_table_challenges} (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        nom_defi TEXT, 
        date_debut TEXT , 
        nb_prevu INTEGER, 
        nb_effectue INTEGER, 
        jours_action TEXT, 
        unique_id TEXT 
        );
        `
        )
    .then((result) => console.log('Query result:', result))
    .catch((error) => console.error('Query error:', error));
    //.finally(() => dbManager.closeDatabase());
/*
    dbManager.executeSql(
        `UPDATE challenges SET nb_effectue = 0, jours_action = ? ;`, [""]
      )*/
}

creationTables();

//dbManager.openDatabase();
const select_stmt = "select id, nom_defi, date_debut, nb_prevu, nb_effectue From challenges;";
dbManager.executeSql(select_stmt)
  .then((result) => {
    // Transaction succeeded, result contains data from the SQL statement
    console.log('Transaction succeeded:', result);
  })
  .catch((error) => {
    // Transaction failed, error contains details about the error
    console.error('Transaction failed:', error);
  });


//dbManager.closeDatabase();

function handleResetButtonPress(){
    // Handle Reset button press action
    
    dbManager.dropTable(nom_table_days);
    //dbManager.dropTable(nom_table_challenges);
    creationTables();
    Alert.alert("Réinitialisation effectuée avec succès !!!");
    console.log('Réinitialisation effectuée avec succès ');
  };


const ScreenHome = ({navigation}) => {

    
  const handleResetButtonPress2 = () => {
    // Handle button press action for each item
    console.log('Button pressed for:');
  };


  return (
    <ScrollView>
    <View style={my_styles.container_2}>
        <Text style={my_styles.title_shaddow}>challengeTRACKER</Text>        
        <Image source={logo1} style={my_styles.image} resizeMode='contain' />
        {/*<Text style={my_styles.title}>Home</Text>*/}

        {/*<View style={my_styles.buttonView}>
            <Pressable style={[my_styles.button, my_styles.buttonRed]} onPress={() => navigation.navigate('Login', { nextPage: 'LoginForm' })}>            
                <Text style={my_styles.buttonText}>TEST LOGIN</Text>
            </Pressable>            
        </View>*/}

        <View style={my_styles.buttonView}>
            <Pressable style={[my_styles.button, my_styles.buttonGreen]} onPress={() => navigation.navigate('NEW-CHALLENGE', { nextPage: 'ScreenNewChallenge' })}>            

                <Text style={my_styles.buttonText}>NOUVEAU DEFI</Text>
            </Pressable>            
        </View>
        
        <View style={my_styles.buttonView}>
            <Pressable style={[my_styles.button, my_styles.buttonOrange]} onPress={() => navigation.navigate('FOLLOW-UP', { nextPage: 'ScreenFollowUp' })}>
                <Text style={my_styles.buttonText}>SUIVI</Text>
            </Pressable>            
        </View>

        <View style={my_styles.buttonView}>
            <Pressable style={[my_styles.button, my_styles.buttonGreen]} onPress={() => navigation.navigate('REMINDER', { nextPage: 'ScreenReminder' })}>
                <Text style={my_styles.buttonText}>RAPPEL</Text>
            </Pressable>            
        </View>

        <View style={my_styles.buttonView}>
            <Pressable style={[my_styles.button, my_styles.buttonOrange]} onPress={() =>  navigation.navigate('RECAPITULATIF-HEBDOMADAIRE', { nextPage: 'ScreenRecapitulation' })}>
                <Text style={my_styles.buttonText}>RECAPITULATIF HEBDO</Text>
            </Pressable>            
        </View>

        <View style={my_styles.buttonView}>
            <Pressable style={[my_styles.button, my_styles.buttonRed]}  onPress={() => handleResetButtonPress()}>            
                <Text style={my_styles.buttonText}>REINITIALISER DB</Text>
            </Pressable>            
        </View>


    </View>
    </ScrollView>
  )
}


export default ScreenHome;