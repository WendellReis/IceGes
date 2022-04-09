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
    FlatList,
    Alert,
} from 'react-native';
import { styles } from './styles';
import { Modalize } from 'react-native-modalize';
import config from '../../assets/config.json';

export function Pedido({route, navigation}){

    const { cpf, idSorveteria } = route.params;

    const [encomendas, setEncomendas] = useState([]);
    const [cod, setCod] = useState(null);
    const [quant, setQuant] = useState(null);

    function navHome(){
        navigation.navigate('Home',{cpf: cpf});
    }

    function navHistorico(){
        navigation.navigate('Historico', {cpf: cpf, idSorveteria: idSorveteria});
    }

    const encomendaRef = useRef(null);

    function openEncomenda() {
        encomendaRef.current?.open();
    }

    function closeEncomenda() {
        setCod(null);
        setQuant(null);
        encomendaRef.current?.close();
    }

    async function encerraEncomenda(id,cod,quanti){
        let reqs = await fetch(config.urlRoot+'encomenda/getEncomenda.php',{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                idEncomenda: id,
                codigo: cod,
                quantidade: quanti
            })
        });
        let ress = await reqs.json(); 
        setEncomendas(ress);
    }

    async function criarEncomenda(){
        if(cod != "" && quant > 0){
            let reqs = await fetch(config.urlRoot+'encomenda/criarEncomenda.php',{
                method: 'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    idSorveteria: idSorveteria,
                    codigo: cod, 
                    quantidade: quant
                })
            });
            let ress = await reqs.json();
            if(ress == true){
                setEncomendas(ress);
                closeEncomenda(); 
                Alert.alert("Encomenda cadastrada!");
            } else{
                Alert.alert("Código não corresponde a nenhum produto!");
            }
        } else{
            Alert.alert("Campos Inválidos!");
        }
    }

    async function getEncomenda(){
        let reqs = await fetch(config.urlRoot+'encomenda/getEncomenda.php',{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                idSorveteria: idSorveteria
            })
        });
        let ress = await reqs.json(); 
        setEncomendas(ress);
    }

    getEncomenda();

    return(
        <>
        <StatusBar translucent={false} backgroundColor={'#002180'}/>
        <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        >        
        <View style={styles.header}>
        <Text style={styles.title}>IceGes</Text>
        </View>
        </KeyboardAvoidingView>
        <ScrollView style = {styles.container}> 
        <Text style={styles.subtitle}>Pedidos:</Text>
        <FlatList 
            data={encomendas}
            renderItem={({item}) => {
                return(
                    <View style={styles.boxPedido}>
                    <View>
                        <Text style={styles.titleText}>Pedido #{item.idEncomenda}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.text}>Código:</Text>
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
                        <Text style={styles.text}>Data: </Text>
                        <Text style={styles.textData}>{item.dataInicio}</Text>
                    </View>
                    <TouchableOpacity style={styles.buttonPedido} onPress={encerraEncomenda}>
                    <Text style={styles.buttonTextm}>Encerrar</Text>
                    </TouchableOpacity>
                </View>
                )
            }}
        />
        <TouchableOpacity style={styles.staffButton}>
            <Text style={styles.buttonText} onPress={openEncomenda}>Realizar Encomenda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.staffButton}>
            <Text style={styles.buttonText} onPress={navHistorico}>Historico de Encomendas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.staffButton}>
            <Text style={styles.buttonText} onPress={navHome}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.text}></Text>
        </ScrollView>
        <Modalize
                            ref={encomendaRef}
                            snapPoint={700}
                            HeaderComponent={
                                <View style={styles.headerModal}>
                                    <Text style={styles.textoHeader}>Realizar Encomenda</Text>
                                </View>
                            }
                        >
                            <View style={styles.viewModal}>
                                <TextInput
                                    placeholder="Digite o codigo do produto.."
                                    placeholderTextColor="lightgray"
                                    keyboardType='numeric'
                                    style={styles.inputEdit}
                                    value={cod}
                                    onChangeText={(text)=>setCod(text)}
                                />
                                <TextInput
                                    placeholder="Digite a quantidade..."
                                    placeholderTextColor="lightgray"
                                    keyboardType='numeric'
                                    style={styles.inputEdit}
                                    value={quant}
                                    onChangeText={(text)=>setQuant(text)}
                                />
                                <TouchableOpacity style={styles.staffButtonm}>
                        <Text style={styles.buttonText} onPress={criarEncomenda}>Aplicar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutButtonm}>
                        <Text style={styles.buttonText} onPress={closeEncomenda}>Cancelar</Text>
                    </TouchableOpacity>
                            </View>
                        </Modalize> 
        </>
    );
}