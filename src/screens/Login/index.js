import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
    StatusBar,
    View, 
    Text, 
    Image, 
    SafeAreaView, 
    TextInput, 
    Platform,
    KeyboardAvoidingView,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native';
import { styles } from './styles';
import config from '../../assets/config.json';
import logo from '../../assets/logo.png';

export function Login({navigation}){
    const [cpf, setCpf] = useState(null);
    const [senha, setSenha] = useState(null);
    const [mensagem, setMensagem] = useState(null);

    async function loginUser(){
        let reqs = await fetch(config.urlRoot+'Login.php',{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                cpf: cpf,
                senha: senha
            })
        });
        let ress = await reqs.json();
        console.log(ress);
        if(ress == true){
            let cpfUser = cpf;
            console.log('route :{cpf: ' + cpfUser + '}');
            setCpf('');
            setSenha('');
            navigation.navigate('Home', {cpf: cpfUser});   
        } else if(ress == false){
            console.log(cpf);
            Alert.alert('Usuário ou senha inválidos!','Verifique os campos e tente novamente.');
        } else{
            Alert.alert('Falha ao comunicar-se com o servidor!','Tente novamente mais tarde.');
        }
    }

    return(
        <>
        <StatusBar translucent={false} backgroundColor={'#002180'}/>
        <View style={styles.header}>
        <Text style={styles.title}>IceGes</Text>
        </View>
        <SafeAreaView style = {styles.container}> 
        <ScrollView style = {{flex:1, width:'100%', padding:30}}>
            <View style={{alignItems:'center'}}>
                <Image 
                    source={logo}
                    style={{width:180,height:180}}
                />
            </View>
            <View style={{alignItems:'center'}}>
            <View style = {styles.loginBox}>
                <Text style={styles.subtitle}>Login</Text>
                <Text style = {styles.text}>CPF:</Text>
                <TextInput
                style = {styles.input}
                placeholder = "CPF"
                placeholderTextColor = "#D3D3D3"
                keyboardType="numeric"
                maxLength={11}
                value={cpf}
                onChangeText={(text)=>setCpf(text)}
                />
                <View> 
                <Text style = {styles.text}>Senha:</Text>
                <TextInput
                style = {styles.input}
                placeholder="Senha"
                placeholderTextColor = "#D3D3D3"
                secureTextEntry={true}
                value={senha}
                onChangeText={(text)=>setSenha(text)}
                />
                </View>
                <TouchableOpacity 
                style = {styles.button}
                onPress={loginUser}
                >
                    <Text style = {styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <Text style={styles.dontHaveAccountText}>Não tem conta?</Text>
                <TouchableOpacity>
                    <Text style={styles.contactText}>Contate-nos</Text>
                </TouchableOpacity>
            </View>
            </View>
            </ScrollView> 
        </SafeAreaView>
        </>
    );
}