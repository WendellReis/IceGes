import { StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../global/theme';

export const styles = StyleSheet.create({
    text:{
        color: theme.colors.text,
        fontWeight: '900',
        fontSize: 16,
        fontWeight: 'bold',
        margin:5
    },
    header:{
      flex:0.08,
      backgroundColor: theme.colors.primary,
      justifyContent:'center',
      paddingTop:10,
    },
    title:{
      paddingBottom:10,
      fontSize:30,
      fontWeight: 'bold',
      textAlign: 'center',
      color: theme.colors.white,
      letterSpacing:2
    },
    row:{
      flexDirection: 'row',
    },
    container: {
        flex:1,
        padding:25,
        flexDirection: 'column',
    },
    image: {
        width: 40,
        height: 40,
    },
    input: {
        height: 45,
        borderRadius: 10,
        borderColor: theme.colors.gray,
        backgroundColor: theme.colors.gray,
        padding: 12,
        fontSize: 16,
        flex:1,
        marginLeft: 5,
        marginRight: 5,
        color: theme.colors.text,
      },
      button: {
        backgroundColor: theme.colors.primary,
        height: 53,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 40,
        marginHorizontal: 30,
      },
      buttonText: {
        color: theme.colors.white,
        fontWeight: '900',
        fontSize: 18,
      },
      staffButton:{
        backgroundColor: theme.colors.secundary,
        height: 53,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 18,
        marginBottom: 18,
        marginHorizontal: 30,
      },
      menu:{
        margin:40,
        justifyContent:'space-around',
        alignItems:'center',
        flexDirection:'row',
        flex:1
      },
      data:{
        fontSize: 16,
        color: theme.colors.text,
        fontWeight:'bold'
      },
      subtitle:{
        fontSize:22,
        fontWeight: 'bold',
        color:theme.colors.primary,
        marginBottom:30,
      },
      headerModal: {
        width: '100%',
        height: Dimensions.get("window").height*0.15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textData: {
        color: theme.colors.text,
        fontSize: 16,
        margin:5
    },
    titleText: {
      color: theme.colors.primary,
        fontWeight: '900',
        fontSize: 18,
        fontWeight: 'bold',
        margin:5,
        textAlign: 'center'
    },
    boxPedido: {
      borderColor: 'lightgray',
      borderWidth: 2,
      padding:10,
      borderRadius: 8,
      marginBottom: 30
    },
    buttonPedido:{
      backgroundColor: theme.colors.pink,
      height: 40,
      width:'50%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      marginTop: 18,
      marginBottom: 18,
      marginHorizontal: 83,
    },
    buttonTextm: {
      color: theme.colors.white,
      fontWeight: '900',
      fontSize: 16,
    }
})