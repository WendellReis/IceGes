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
    ScrollView
} from 'react-native';
import { styles } from './styles';
import config from '../../assets/config.json';
import acaiIcon from '../../assets/acaiIcon.png';
import artesanalIcon from '../../assets/artesanalIcon.png';
import paletaIcon from '../../assets/paletaIcon.png';
import sorveteIcon from '../../assets/sorveteIcon.png';

export function Categoria({route, navigation}){
    
    const { cpf, idCatalogo } = route.params;

    console.log('route = {cpf:'+cpf+', idCatalogo:'+idCatalogo);

    function navHome(){
        navigation.navigate('Home', {cpf:cpf});
    }

    function navArtesanais(){
        navigation.navigate('Estoque',{cpf: cpf,idCatalogo: idCatalogo, categoria:'Artesanal'});
    }

    function navPicoles(){
        navigation.navigate('Estoque',{cpf: cpf,idCatalogo: idCatalogo, categoria:'Picole'});
    }

    function navSorvetes(){
        navigation.navigate('Estoque',{cpf: cpf,idCatalogo: idCatalogo, categoria:'Sorvete'});
    }

    function navOutros(){
        navigation.navigate('Estoque',{cpf: cpf,idCatalogo: idCatalogo, categoria:'Outros'});
    }

    let categorias = ["Artesanais","Picolés","Sorvetes","Outros"];

    return(
        <>
        <StatusBar translucent={false} backgroundColor={'#002180'}/>
        <View style={styles.header}>
        <Text style={styles.title}>IceGes</Text>
        </View>
        <SafeAreaView style = {styles.container}> 
        <Text style={styles.subtitle}>Categorias:</Text>
        <TouchableOpacity style={styles.rowBox} onPress={navArtesanais}>
                <Image 
                source={artesanalIcon}
                style={styles.image}
                />
                <Text style={styles.text}>{categorias[0]}</Text>    
        </TouchableOpacity>
        <TouchableOpacity style={styles.rowBox} onPress={navPicoles}>
                <Image 
                source={paletaIcon}
                style={styles.image}
                />
                <Text style={styles.text}>{categorias[1]}</Text>    
        </TouchableOpacity>
        <TouchableOpacity style={styles.rowBox} onPress={navSorvetes}>
                <Image 
                source={sorveteIcon}
                style={styles.image}
                />
                <Text style={styles.text}>{categorias[2]}</Text>    
        </TouchableOpacity>
        <TouchableOpacity style={styles.rowBox} onPress={navOutros}>
                <Text style={styles.text}>{categorias[3]}</Text>    
        </TouchableOpacity>
        <TouchableOpacity style={styles.staffButton}>
            <Text style={styles.buttonText} onPress={navHome}>Voltar</Text>
        </TouchableOpacity>
        </SafeAreaView> 
        </>
    );
}