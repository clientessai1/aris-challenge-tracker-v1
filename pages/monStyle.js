import React, { useState } from 'react';
import { StyleSheet } from 'react-native'


const my_styles  = StyleSheet.create({
    container : {
      alignItems : "center",
      paddingTop: 70,
    },container3 : {
      alignItems : "center",
      paddingTop: 15,
    },
    image : {
      height : 160,
      width : 170
    },
    image2 : {
        height : 100,
        width : 100,
        marginBottom:10,
      },
    title : {
      fontSize : 30,
      fontWeight : "bold",
      textTransform : "uppercase",
      textAlign: "center",
      paddingVertical : 40,
      color : "red"
    },
    title_b : {
        fontSize : 30,
        fontWeight : "bold",
        textTransform : "uppercase",
        textAlign: "center",
        paddingVertical : 0,
        color : "red"
      },
      title_c : {
        fontSize : 25,
        fontWeight : "bold",
        //textTransform : "uppercase",
        textAlign: "center",
        paddingVertical : 10,
        padding:0,
        margin:0,
        color : "red"
      },
      title_shaddow : {
        fontSize : 35,
        fontWeight : "bold",        
        textAlign: "center",
        paddingVertical : 10,
        color : "yellow",
        textShadowColor: 'rgba(0,0,0,0.75)',
        textShadowOffset:{width:1, height:1},
        textShadowRadius: 50,
      },
      title_shaddow2 : {
        fontSize : 25,
        fontWeight : "bold",        
        textAlign: "center",
        paddingVertical : 0,
        //color : "yellow",
        textShadowColor: 'rgba(0,0,0,0.75)',
        textShadowOffset:{width:1, height:1},
        textShadowRadius: 50,
        margin:0,
      },
    inputView : {
      gap : 15,
      width : "100%",
      paddingHorizontal : 40,
      marginBottom  :5
    },
    input : {
      height : 50,
      paddingHorizontal : 20,
      borderColor : "red",
      borderWidth : 1,
      borderRadius: 7,
      marginBottom: 5
    },
    rememberView : {
      width : "100%",
      paddingHorizontal : 50,
      justifyContent: "space-between",
      alignItems : "center",
      flexDirection : "row",
      marginBottom : 8
    },
    align_cote : {        
        paddingHorizontal : 5,
        justifyContent: "space-between",
        alignItems : "center",
        flexDirection : "row",
        marginTop : 10,
        marginBottom : 0,
        borderBottomWidth: 1,
        borderBottomColor: "black",
      },
      view_center_image: {
        
        justifyContent: 'center',
        alignItems: 'center', // Centers the image horizontally
        
      },
    switch :{
      flexDirection : "row",
      gap : 1,
      justifyContent : "center",
      alignItems : "center"
      
    },
    rememberText : {
      fontSize: 13
    },
    forgetText : {
      fontSize : 11,
      color : "red"
    },
    button : {
      height : 45,
      borderColor : "gray",
      borderWidth  : 1,
      borderRadius : 5,
      alignItems : "center",
      justifyContent : "center"
    },
    button2 : {
      height : 30,
      maxWidth:50,
      minWidth:50,
      borderColor : "gray",
      borderWidth  : 1,
      borderRadius : 5,
      alignItems : "center",
      justifyContent : "center",
      padding:0,
    },
    buttonRed : {
      backgroundColor : "red"
    },buttonGold : {
      backgroundColor : "gold"
    },buttonGray : {
      backgroundColor : "gray"
    },
    buttonOrange : {
      backgroundColor : "orange"
    },
    buttonCyan : {
      backgroundColor : "cyan"
    },
    buttonIndigo : {
      backgroundColor : "indigo"
    },
    buttonGreen : {
      backgroundColor : "green"
    },
    buttonText : {
      color : "white"  ,
      fontSize: 18,
      fontWeight : "bold"
    }, 
    buttonView :{
      width :"100%",
      paddingHorizontal : 50,
      margin:5,
    },
    optionsText : {
      textAlign : "center",
      paddingVertical : 10,
      color : "gray",
      fontSize : 13,
      marginBottom : 6
    },
    mediaIcons : {
      flexDirection : "row",
      gap : 15,
      alignItems: "center",
      justifyContent : "center",
      marginBottom : 23
    },
    icons : {
      width : 40,
      height: 40,
    },
    footerText : {
      textAlign: "center",
      color : "gray",
    },
    signup : {
      color : "red",
      fontSize : 13
    },

//*********************************** */
  container_2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: 'lightblue', // Header background color
  },
  headerText: {
    flex: 3,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Align elements evenly along the row
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
    marginBottom: 5,
  },
  itemText: {
    flex: 3,
    textAlign: 'left',
  },mon_defi_text:{
    fontWeight:'bold', 
    fontSize:17
  },mon_defi_text2:{
    fontWeight:'bold', 
    fontSize:17
  },
  actionButton: {
    backgroundColor: 'lightgreen', // Button background color
    padding: 5,
    borderRadius: 5,
  },
  actionButtonText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  txt_noir : {
    color : "black"
  },  txt_vert : {
    color : "green"
  },  txt_orange : {
    color : "orange"
  },  txt_gold : {
    color : "gold"
  },  txt_red : {
    color : "red"
  },

  my_horizontal_alignment:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  my_horizontal_alignment_elt:{
    marginHorizontal: 10,
    margin:15,
  }


  });


export default my_styles;

