import { StyleSheet } from 'react-native';
import { theme } from '../../global/theme';

export const styles = StyleSheet.create({
    text:{
        color: theme.colors.title,
        fontWeight: '900',
        fontSize: 18,
        marginTop: 10,
        marginBottom: 10,
    },
    header:{
      flex:0.07,
      backgroundColor: theme.colors.primary,
      justifyContent:'center',
      paddingTop:10
    },
    title:{
      fontSize:30,
      fontWeight: 'bold',
      marginBottom:20,
      textAlign: 'center',
      color: theme.colors.white,
      letterSpacing:2
    },
    loginBox:{
      flex: 1,
      width: '93%',
      marginTop:'10%',
      justifyContent: 'space-around'
    },
    container: {
        flex:1,
        alignItems:'center',
        backgroundColor: theme.colors.background,
        flexDirection: 'column',
    },
    image: {
      marginTop: 10,
        width: 200,
        height: 200,
    },
    input: {
        height: 76,
        borderRadius: 10,
        borderColor: theme.colors.gray,
        backgroundColor: theme.colors.gray,
        padding: 12,
        fontSize: 16,
        color: 'black'
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
        fontSize: 18
      },
      dontHaveAccountText: {
        color: theme.colors.title,
        textAlign: 'center',
        fontSize: 16,
        marginTop:30
      },
      contactText: {
        color: theme.colors.title,
        textAlign: 'center',
        marginTop:5,
        fontWeight: 'bold',
        fontSize: 16
      },
      data: {
        fontSize: 18,
      },
      subtitle:{
        fontSize:30,
        fontWeight: 'bold',
        color:theme.colors.title,
        marginBottom:30,
      }
})