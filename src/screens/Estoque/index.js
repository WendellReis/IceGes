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
    Alert
} from 'react-native';
import { styles } from './styles';
import config from '../../assets/config.json';
import { Modalize } from 'react-native-modalize';

export function Estoque({route, navigation}){

    const { idCatalogo, categoria, cpf } = route.params;

    const [quant, setQuant] = useState(null);
    const [codigo, setCodigo] = useState(null);

    const [produtos, setProdutos] = useState([]);

    async function getProdutos(){
        let reqs = await fetch(config.urlRoot+'produto/getProdutos.php',{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                idCatalogo: idCatalogo,
                categoria: categoria
            })
        });
        let ress = await reqs.json(); 
        setProdutos(ress);
    }

    getProdutos();

    function navCategoria(){
        navigation.navigate('Categoria',{cpf:cpf, idCatalogo:idCatalogo});
    }

    const estoqueRef = useRef(null);

    function openEstoque() {
        estoqueRef.current?.open();
    }

    function closeEstoque() {
        estoqueRef.current?.close();
    }

    async function modificaEstoque(){
        let reqs = await fetch(config.urlRoot+'produto/updateDisponivel.php',{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                codigo: codigo,
                quantidade: quant
            })
        });
        let ress = await reqs.json();
        if(ress == true){
            Alert.alert("Quantidade alterada!");
            closeEstoque();
        }
    }


    return(
        <>
        <StatusBar translucent={false} backgroundColor={'#002180'}/>
        <View style={styles.header}>
        <Text style={styles.title}>IceGes</Text>
        </View>
        <ScrollView style = {styles.container}>
        <Text style={styles.subtitle}>Produtos ({categoria}):</Text>
        <FlatList 
            data={produtos}
            renderItem={({item}) => {
                return(
                    <View style={styles.boxPedido}>
                    <View>
                        <Text style={styles.titleText}>{item.descricao}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.text}>Código: </Text>
                        <Text style={styles.textData}>{item.codigo}</Text>
                    </View>
                    <View style={styles.rowD}>
                        <Text style={styles.text}>Estoque:</Text>
                        <Text style={styles.textData}> {item.qtdEstoque}</Text>
                        <Text style={styles.text}>Dispon.:</Text>
                        <Text style={styles.textData}> {item.qtdDisponivel}</Text>
                        <Text style={styles.text}>Vend.:</Text>
                        <Text style={styles.textData}> {item.qtdVendida}</Text>
                    </View>
                </View>
                )
            }}
        />
            
        <TouchableOpacity style={styles.staffButton}>
            <Text style={styles.buttonText} onPress={openEstoque}>Alterar Estoque</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.staffButton}>
            <Text style={styles.buttonText} onPress={navCategoria}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.text}></Text>
        </ScrollView>
        <Modalize
                            ref={estoqueRef}
                            snapPoint={700}
                            HeaderComponent={
                                <View style={styles.headerModal}>
                                    <Text style={styles.textoHeader}>Alterar Disponível</Text>
                                </View>
                            }
                        >
                            <View style={styles.viewModal}>
                                <TextInput
                                    placeholder="Digite o codigo do produto.."
                                    placeholderTextColor="lightgray"
                                    keyboardType='numeric'
                                    style={styles.inputEdit}
                                    value={codigo}
                                    onChangeText={(text)=>setCodigo(text)}
                                />
                                <TextInput
                                    placeholder="Digite o novo estoque..."
                                    placeholderTextColor="lightgray"
                                    keyboardType='numeric'
                                    style={styles.inputEdit}
                                    value={quant}
                                    onChangeText={(text)=>setQuant(text)}
                                />
                                <TouchableOpacity style={styles.staffButtonm}>
                        <Text style={styles.buttonText} onPress={modificaEstoque}>Aplicar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutButtonm}>
                        <Text style={styles.buttonText} onPress={closeEstoque}>Cancelar</Text>
                    </TouchableOpacity>
                            </View>
                        </Modalize>  
        </>
    );
}