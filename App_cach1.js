import React, {createContext, useState, useContext} from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";




const AuthContext = createContext();

function LoginScreen(){
  const {signIn} = useContext(AuthContext);

  return(
    <View style={styles.loginContainer}>
      <Text style={styles.title}>Sign In</Text>

      <Text style={styles.label}>Email ID</Text>
      <TextInput placeholder="Enter your email here!" style={styles.input}/>

      <Text style={styles.label}>Password</Text>
      <TextInput placeholder="Enter your password here!" secureTextEntry style={styles.input}/>

      <Text style={styles.link}>Forgot password?</Text>

      <TouchableOpacity style={styles.button} onPress={signIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or sign in with</Text>

      <View style={styles.socialRow}>
        <TouchableOpacity style={styles.googleBtn}>
          <Image source={{uri:"https://img.icons8.com/color/48/google-logo.png"}} style={styles.icon}/>
          <Text style={styles.googleText}>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.facebookBtn}>
          <Image source={{uri:"https://img.icons8.com/fluency/48/facebook.png"}} style={styles.icon}/>
          <Text style={styles.facebookText}>Facebook</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.signup}>
        Not yet a member? <Text style={styles.signupLink}>Sign Up</Text>
      </Text>
    </View>
  )
}

function ExplorerScreen(){
  return(
    <ScrollView style={styles.explorerContainer}>
      <Text style={styles.pageTitle}>Explorer</Text>

      <View style={styles.searchBox}>
        <TextInput placeholder="Search for meals or area" style={styles.searchInput}/>
      </View>

      <View style={styles.rowBetween}>
        <Text style={styles.sectionTitle}>Top Categories</Text>
        <Text style={styles.filter}>Filter</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.category}>
          <Image style={styles.categoryImg} source={{uri:"https://i.imgur.com/0umadnY.jpg"}}/>
          <Text>Pizza</Text>
        </View>

        <View style={styles.category}>
          <Image style={styles.categoryImg} source={{uri:"https://i.imgur.com/UPrs1EWl.jpg"}}/>
          <Text>Burgers</Text>
        </View>

        <View style={styles.category}>
          <Image style={styles.categoryImg} source={{uri:"https://i.imgur.com/sJ3CT4V.gif"}}/>
          <Text>Steak</Text>
        </View>
      </ScrollView>

      <View style={styles.rowBetween}>
        <Text style={styles.sectionTitle}>Popular Items</Text>
        <Text style={styles.viewAll}>View all</Text>
      </View>

      <View style={styles.cardRow}>
        <View style={styles.foodCardHorizontal}>
          <Image style={styles.rowImageSmall} source={{uri:"https://i.imgur.com/0umadnY.jpg"}}/>
          <View style={styles.foodInfo}>
            <Text style={styles.foodName}>Food 1</Text>
            <Text style={styles.subText}>By Viet Nam</Text>
            <Text style={styles.price}>1$</Text>
          </View>
        </View>

        <View style={styles.foodCardHorizontal}>
          <Image style={styles.rowImageSmall} source={{uri:"https://i.imgur.com/UPrs1EWl.jpg"}}/>
          <View style={styles.foodInfo}>
            <Text style={styles.foodName}>Food 2</Text>
            <Text style={styles.subText}>By Viet Nam</Text>
            <Text style={styles.price}>3$</Text>
          </View>
        </View>
      </View>

      <View style={styles.rowBetween}>
        <Text style={styles.sectionTitle}>Popular Items</Text>
        <Text style={styles.viewAll}>View all</Text>
      </View>

      <View style={styles.cardRow}>
        <View style={styles.foodCard}>
          <Image style={styles.cardImg} source={{uri:"https://i.imgur.com/0umadnY.jpg"}}/>
        </View>

        <View style={styles.foodCard}>
          <Image style={styles.cardImg} source={{uri:"https://i.imgur.com/UPrs1EWl.jpg"}}/>
        </View>
      </View>
    </ScrollView>
  )
}

function AccountScreen(){
  const {signOut} = useContext(AuthContext);

  return(
    <View style={styles.center}>
      <View style={styles.profileHeader}></View>

      <Image
        source={{uri:"https://i.pravatar.cc/150"}}
        style={styles.avatar}
      />

      <Text style={styles.name}>Hung Nguyen</Text>
      <Text style={styles.job}>Mobile developer</Text>

      <Text style={styles.desc}>
        I have above 5 years of experience in native mobile apps development,
        now I am learning React Native.
      </Text>

      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs(){
  return(
    <Tab.Navigator>
      <Tab.Screen name="Explorer" component={ExplorerScreen}/>
      <Tab.Screen name="Account" component={AccountScreen}/>
    </Tab.Navigator>
  )
}


export default function App(){
  const [userToken, setUserToken] = useState(null);

  const authContext = {
    signIn: () => setUserToken("token"),
    signOut: () => setUserToken(null)
  };

  return(
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          {userToken == null ? (
            <Stack.Screen name="Login" component={LoginScreen}/>
          ) : (
            <Stack.Screen name="Home" component={HomeTabs}/>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}


const styles = StyleSheet.create({

loginContainer:{flex:1,justifyContent:"center",padding:25,backgroundColor:"#fff"},
explorerContainer:{flex:1,padding:20,backgroundColor:"#fff"},

title:{fontSize:28,fontWeight:"bold",marginBottom:30,textAlign:"center"},
pageTitle:{fontSize:22,fontWeight:"bold",marginBottom:15},

label:{fontSize:14,marginBottom:5},
input:{borderWidth:1,borderColor:"#ddd",borderRadius:6,padding:10,marginBottom:15},

button:{backgroundColor:"#FFA500",padding:14,borderRadius:6,alignItems:"center",marginTop:10},
buttonText:{color:"#fff",fontWeight:"bold"},

link:{color:"#FFA500",textAlign:"right",marginTop:10},

searchBox:{backgroundColor:"#f2f2f2",padding:10,borderRadius:10,marginBottom:20},
searchInput:{fontSize:14},

rowBetween:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginBottom:10},
sectionTitle:{fontSize:18,fontWeight:"bold"},
filter:{color:"#FFA500"},
viewAll:{color:"#FFA500"},

category:{marginRight:15,alignItems:"center"},
categoryImg:{width:90,height:70,borderRadius:10,marginBottom:5},

cardRow:{flexDirection:"row",justifyContent:"space-between",marginBottom:20},

foodCard:{width:"48%"},
cardImg:{width:"100%",height:120,borderRadius:10},

foodCardHorizontal:{
  flexDirection:"row",
  backgroundColor:"#fff",
  borderRadius:10,
  padding:10,
  width:"48%",
  alignItems:"center"
},

rowImageSmall:{width:60,height:60,borderRadius:10,marginRight:10},

foodInfo:{flex:1},
foodName:{fontWeight:"bold"},
subText:{color:"gray",fontSize:12},
price:{marginTop:3,fontWeight:"bold"},

center:{flex:1,alignItems:"center"},
profileHeader:{width:"100%",height:150,backgroundColor:"#1a85ab"},
avatar:{width:100,height:100,borderRadius:50,marginTop:-50,borderWidth:3,borderColor:"#fff"},

name:{fontSize:22,fontWeight:"bold"},
job:{color:"gray",marginBottom:20},
desc:{color:"gray",textAlign:"center",marginHorizontal:30,marginTop:10,lineHeight:20},

orText:{textAlign:"center",marginTop:20,marginBottom:15,color:"gray"},
socialRow:{flexDirection:"row",justifyContent:"space-between",marginBottom:20},

googleBtn:{flexDirection:"row",alignItems:"center",borderWidth:1,borderColor:"#ddd",padding:12,borderRadius:8,width:"48%",justifyContent:"center"},
facebookBtn:{flexDirection:"row",alignItems:"center",backgroundColor:"#8098ca",padding:12,borderRadius:8,width:"48%",justifyContent:"center"},

icon:{width:18,height:18,marginRight:8},
googleText:{fontWeight:"500"},
facebookText:{color:"#fff",fontWeight:"500"},

signup:{textAlign:"center",color:"gray"},
signupLink:{color:"#FFA500",fontWeight:"bold"},

});