import React, {useState, useRef} from 'react';
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
    FlatList
} from 'react-native';
import { styles } from './styles';
import { Modalize } from 'react-native-modalize';
import config from '../../assets/config.json';

export function Historico({route, navigation}){

    const { cpf, idSorveteria } = route.params;
    const [encomendas, setEncomendas] = useState([]);

    function navPedido(){
        navigation.navigate('Pedido', {cpf: cpf, idSorveteria: idSorveteria});
    }

    async function getEncomenda(){
        let reqs = await fetch(config.urlRoot+'encomenda/getHistorico.php',{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                id: idSorveteria
            })
        });
        let ress = await reqs.json(); 
        setEncomendas(ress);
    }

    getEncomenda();

    return(
        <>
        <StatusBar translucent={false} backgroundColor={'#002180'}/>
        <View style={styles.header}>
        <Text style={styles.title}>IceGes</Text>
        </View>
        <SafeAreaView style = {styles.container}> 
        <Text style={styles.subtitle}>Histórico de Pedidos:</Text>
        <FlatList 
            data={encomendas}
            renderItem={({item}) => {
                return(
                    <View style={styles.boxPedido}>
                    <View>
                        <Text style={styles.titleText}>Pedido #{item.idEncomenda}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.text}>Código: </Text>
                        <Text style={styles.textData}>{item.codigo}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.text}>Produto: </Text>
                        <Text style={styles.textData}>{item.descricao}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.text}>Quantidade: </Text>
                        <Text style={styles.textData}>{item.quantidade}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.text}>Entregue em: </Text>
                        <Text style={styles.textData}>{item.dataFim}</Text>
                    </View>
                </View>
                )
            }}
        />
        <TouchableOpacity style={styles.staffButton}>
            <Text style={styles.buttonText} onPress={navPedido}>Voltar</Text>
        </TouchableOpacity>
        </SafeAreaView> 
        </>
    );
}