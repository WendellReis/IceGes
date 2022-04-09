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

export function Home({ route, navigation }){

    const { cpf } = route.params;

    const [id, setId] = useState(null);
    const [catalogo, setCatalogo] = useState(null);
    const [nome, setNome] = useState(null);
    const [cep, setCep] = useState(null);
    const [cidade, setCidade] = useState(null);
    const [bairro, setBairro] = useState(null);
    const [rua, setRua] = useState(null);
    const [rota, setRota] = useState(null);

    async function getId(){
        let reqs = await fetch(config.urlRoot+'sorveteria/getId.php',{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                cpf: cpf
            })
        });
        let ress = await reqs.json();
        setId(ress);
    }

    async function getCatalogo(){
        let reqs = await fetch(config.urlRoot+'sorveteria/getCatalogo.php',{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                cpf: cpf
            })
        });
        let ress = await reqs.json();
        setCatalogo(ress);
    }

    async function getNome(){
        let reqs = await fetch(config.urlRoot+'sorveteria/getNome.php',{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                cpf: cpf
            })
        });
        let ress = await reqs.json();
        setNome(ress);
    }

    async function getCep(){
        let reqs = await fetch(config.urlRoot+'sorveteria/getCep.php',{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                cpf: cpf
            })
        });
        let ress = await reqs.json();
        setCep(ress);
    }

    async function getCidade(){
        let reqs = await fetch(config.urlRoot+'sorveteria/getCidade.php',{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                cpf: cpf
            })
        });
        let ress = await reqs.json();
        setCidade(ress);
    }

    async function getBairro(){
        let reqs = await fetch(config.urlRoot+'sorveteria/getBairro.php',{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                cpf: cpf
            })
        });
        let ress = await reqs.json();
        setBairro(ress);
    }

    async function getRua(){
        let reqs = await fetch(config.urlRoot+'sorveteria/getRua.php',{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                cpf: cpf
            })
        });
        let ress = await reqs.json();
        setRua(ress);
    }

    async function getRota(){
        let reqs = await fetch(config.urlRoot+'sorveteria/getRota.php',{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                cpf: cpf
            })
        });
        let ress = await reqs.json();
        setRota(ress);
    }

    getId();
    getCatalogo();
    getNome();
    getCep();
    getCidade();
    getBairro();
    getRua();
    getRota();
    
    function navPerfil(){
        navigation.navigate('Perfil',{cpf: cpf});
    }

    function navCategoria(){
        navigation.navigate('Categoria',{cpf: cpf,idCatalogo: catalogo});
    }

    function navEncomenda(){
        navigation.navigate('Pedido',{cpf: cpf, idSorveteria: id});
    }

    return(
        <>
        <StatusBar translucent={false} backgroundColor={'#002180'}/>
        <View style={styles.header}>
        <Text style={styles.title}>IceGes</Text>
        </View>
        <SafeAreaView style = {styles.container}> 
        <Text style={styles.subtitle}>Informações da Sorveteria:</Text>
        <View style={styles.rowBox}> 
            <Text style = {styles.text}>Nome:</Text>
            <View style = {styles.input}>
                <Text style={styles.data}>{nome}</Text>
            </View>
        </View>
        <View style={styles.rowBox}> 
            <Text style = {styles.text}>CEP:</Text>
            <View style = {styles.input}>
                <Text style={styles.data}>{cep}</Text>
            </View>
        </View>
        <View style={styles.rowBox}> 
            <Text style = {styles.text}>Cidade:</Text>
            <View style = {styles.input}>
                <Text style={styles.data}>{cidade}</Text>
            </View>
        </View>
        <View style={styles.rowBox}> 
            <Text style = {styles.text}>Bairro:</Text>
            <View style = {styles.input}>
                <Text style={styles.data}>{bairro}</Text>
            </View>
        </View>
        <View style={styles.rowBox}> 
            <Text style = {styles.text}>Rua:</Text>
            <View style = {styles.input}>
                <Text style={styles.data}>{rua}</Text>
            </View>
        </View>
        <View style={styles.rowBox}> 
            <Text style = {styles.text}>Rota:</Text>
            <View style = {styles.input}>
                <Text style={styles.data}>{rota}</Text>
            </View>
        </View>
        <TouchableOpacity style={styles.staffButton}>
            <Text style={styles.buttonText} onPress={navPerfil}>Perfil de Usuário</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.staffButton}>
            <Text style={styles.buttonText} onPress={navCategoria}>Visualizar Estoque</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.staffButton}>
            <Text style={styles.buttonText} onPress={navEncomenda}>Visualizar Encomendas</Text>
        </TouchableOpacity>
        </SafeAreaView> 
        </>
    );
}