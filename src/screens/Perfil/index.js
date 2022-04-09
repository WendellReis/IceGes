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
    Alert
} from 'react-native';
import { styles } from './styles';
import config from '../../assets/config.json';
import editBtn from '../../assets/editBtn.png';
import { Modalize } from 'react-native-modalize';

export function Perfil({ route, navigation }){

    const { cpf } = route.params;

    const [nome, setNome] = useState(null);
    const [email, setEmail] = useState(null);
    const [telefone, setTelefone] = useState(null);
    
    const [inputNome,setInputNome] = useState(null);
    const [inputTelefone,setInputTelefone] = useState(null);
    const [inputEmail,setInputEmail] = useState(null);
    const [inputConfirmaEmail,setInputConfirmaEmail] = useState(null);
    const [senha, setSenha] = useState(null);
    const [atualSenha, setAtualSenha] = useState(null);
    const [confirmaSenha, setConfirmaSenha] = useState(null);
    
    async function getNome(){
        let reqs = await fetch(config.urlRoot+'gerente/getNome.php',{
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

    async function getEmail(){
        let reqs = await fetch(config.urlRoot+'gerente/getEmail.php',{
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
        setEmail(ress);
    }

    async function getTelefone(){
        let reqs = await fetch(config.urlRoot+'gerente/getTelefone.php',{
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
        setTelefone(ress);
    }

    getTelefone();
    getEmail();
    getNome();

    async function modificaNome(){
        let reqs = await fetch(config.urlRoot+'gerente/updateNome.php',{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                cpf: cpf,
                nome: inputNome
            })
        });
        let ress = await reqs.json();
        console.log(ress);
        if(ress == true){
            setNome(inputNome);
            closeName();
            Alert.alert("Nome Alterado!");
        }
    }

    async function modificaTelefone(){
        let reqs = await fetch(config.urlRoot+'gerente/updateTelefone.php',{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                cpf: cpf,
                telefone: inputTelefone
            })
        });
        let ress = await reqs.json();
        console.log(ress);
        if(ress == true){
            setTelefone(inputTelefone);
            closeCelular();
            Alert.alert("Número de Telefone Alterado!");
        }
    }

    async function modificaEmail(){
        if(inputEmail == inputConfirmaEmail){
            let reqs = await fetch(config.urlRoot+'gerente/updateEmail.php',{
                method: 'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    cpf: cpf,
                    email: inputEmail
                })
            });
            let ress = await reqs.json();
            console.log(ress);
            if(ress == true){
                setTelefone(inputTelefone);
                closeEmail();
                Alert.alert("E-mail Alterado!");
            }
        } else {
            Alert.alert("Os e-mails não coincidem!");
        }   
    }

    async function modificaSenha(){
        if(senha == confirmaSenha){
            let reqs = await fetch(config.urlRoot+'gerente/updateSenha.php',{
                method: 'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    cpf: cpf,
                    atual: atualSenha,
                    senha: senha
                })
            });
            let ress = await reqs.json();
            console.log(ress);
            if(ress == true){
                setTelefone(inputTelefone);
                closeSenha();
                Alert.alert("Senha Alterada!");
            }
        } else {
            Alert.alert("As senhas não coincidem!");
        }   
    }

    const nomeRef = useRef(null);

    function openName() {
        nomeRef.current?.open();
    }

    function closeName() {
        nomeRef.current?.close();
    }

    const senhaRef = useRef(null);

    function openSenha() {
        senhaRef.current?.open();
    }

    function closeSenha() {
        senhaRef.current?.close();
    }

    const emailRef = useRef(null);

    function openEmail() {
        emailRef.current?.open();
    }

    function closeEmail() {
        emailRef.current?.close();
    }

    const celularRef = useRef(null);

    function openCelular() {
        celularRef.current?.open();
    }

    function closeCelular() {
        celularRef.current?.close();
    }

    function navBack(){
        navigation.navigate('Home',{cpf:cpf});
    }

    function logout(){
        navigation.navigate('Login');
    }

    return(
        <>
        <StatusBar translucent={false} backgroundColor={'#002180'}/>
        <View style={styles.header}>
        <Text style={styles.title}>IceGes</Text>
        </View>
        <SafeAreaView style = {styles.container}> 
        <Text style={styles.subtitle}>Informações da Conta:</Text>
        <View style={styles.rowBox}> 
            <Text style = {styles.text}>CPF:</Text>
            <View style = {styles.inputCpf}>
                <Text style={styles.data}>{cpf}</Text>
            </View>
        </View>
        <View style={styles.rowBox} onPress={openName}> 
            <Text style = {styles.text}>Nome:</Text>
            <View style = {styles.input}>
                <Text style={styles.data}>{nome}</Text>
            </View>
            <TouchableOpacity style={styles.editBox} onPress={openName}>
            <Image
            source={editBtn}
            style={styles.image} 
            />
            </TouchableOpacity>
        </View>
        <View style={styles.rowBox}> 
            <Text style = {styles.text}>E-mail:</Text>
            <View style = {styles.input}>
                <Text style={styles.data}>{email}</Text>
            </View>
            <TouchableOpacity style={styles.editBox} onPress={openEmail}>
            <Image
            source={editBtn}
            style={styles.image} 
            />
            </TouchableOpacity>
        </View>
        <View style={styles.rowBox}> 
            <Text style = {styles.text}>Celular:</Text>
            <View style = {styles.input}>
                <Text style={styles.data}>{telefone}</Text>
            </View>
            <TouchableOpacity style={styles.editBox} onPress={openCelular}>
            <Image
            source={editBtn}
            style={styles.image} 
            />
            </TouchableOpacity>
        </View>
        <View style={styles.rowBox}> 
            <Text style = {styles.text}>Senha:</Text>
            <View style = {styles.input}>
                <Text style={styles.data}>********</Text>
            </View>
            <TouchableOpacity style={styles.editBox} onPress={openSenha}>
            <Image
            source={editBtn}
            style={styles.image} 
            />
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.staffButton}>
            <Text style={styles.buttonText} onPress={navBack}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.buttonText} onPress={logout}>Sair da Conta</Text>
        </TouchableOpacity>
        <Modalize
                            ref={emailRef}
                            snapPoint={700}
                            HeaderComponent={
                                <View style={styles.headerModal}>
                                    <Text style={styles.textoHeader}>Editar Email</Text>
                                </View>
                            }
                        >
                            <View style={styles.viewModal}>
                                <TextInput
                                    placeholder="Digite seu novo email..."
                                    placeholderTextColor="lightgray"
                                    style={styles.inputEdit}
                                    value={inputEmail}
                                    onChangeText={(text)=>setInputEmail(text)}
                                />
                                <TextInput
                                    placeholder="Confirme o novo email..."
                                    placeholderTextColor="lightgray"
                                    style={styles.inputEdit}
                                    value={inputConfirmaEmail}
                                    onChangeText={(text)=>setInputConfirmaEmail(text)}
                                />
                                <TouchableOpacity style={styles.staffButtonm} onPress={modificaEmail}>
                        <Text style={styles.buttonText}>Aplicar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutButtonm} onPress={closeEmail}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                            </View>
                        </Modalize>

                        <Modalize
                            ref={nomeRef}
                            snapPoint={700}
                            HeaderComponent={
                                <View style={styles.headerModal}>
                                    <Text style={styles.textoHeader}>Editar Nome</Text>
                                </View>
                            }
                        >
                            <View style={styles.viewModal}>
                                <TextInput
                                    placeholder="Digite seu novo nome..."
                                    placeholderTextColor="lightgray"
                                    style={styles.inputEdit}
                                    value={inputNome}
                                    onChangeText={(text)=>setInputNome(text)}
                                />
                            <TouchableOpacity style={styles.staffButtonm} onPress={modificaNome}>
                        <Text style={styles.buttonText}>Aplicar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutButtonm} onPress={closeName}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                            </View>
                        </Modalize>

                        <Modalize
                            ref={celularRef}
                            snapPoint={700}
                            HeaderComponent={
                                <View style={styles.headerModal}>
                                    <Text style={styles.textoHeader}>Editar Celular</Text>
                                </View>
                            }
                        >
                            <View style={styles.viewModal}>
                                <TextInput
                                    placeholder="Digite seu novo número..."
                                    placeholderTextColor="lightgray"
                                    style={styles.inputEdit}
                                    value={inputTelefone}
                                    maxLength={11}
                                    onChangeText={(text)=>setInputTelefone(text)}
                                />
                    <TouchableOpacity style={styles.staffButtonm} onPress={modificaTelefone}>
                        <Text style={styles.buttonText}>Aplicar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutButtonm} onPress={closeCelular}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                            </View>
                        </Modalize>

                        <Modalize
                            ref={senhaRef}
                            snapPoint={700}
                            HeaderComponent={
                                <View style={styles.headerModal}>
                                    <Text style={styles.textoHeader}>Editar Email</Text>
                                </View>
                            }
                        >
                            <View style={styles.viewModal}>
                                <TextInput
                                    placeholder="Digite sua senha atual..."
                                    placeholderTextColor="lightgray"
                                    style={styles.inputEdit}
                                    value={atualSenha}
                                    onChangeText={(text)=>setAtualSenha(text)}
                                />
                                <TextInput
                                    placeholder="Digite a sua nova senha..."
                                    placeholderTextColor="lightgray"
                                    style={styles.inputEdit}
                                    value={senha}
                                    onChangeText={(text)=>setSenha(text)}
                                />
                                <TextInput
                                    placeholder="Confirme sua nova senha..."
                                    placeholderTextColor="lightgray"
                                    style={styles.inputEdit}
                                    value={confirmaSenha}
                                    onChangeText={(text)=>setConfirmaSenha(text)}
                                />
                                <TouchableOpacity style={styles.staffButtonm} onPress={modificaSenha}>
                        <Text style={styles.buttonText}>Aplicar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutButtonm} onPress={closeSenha}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                            </View>
                        </Modalize>
        </SafeAreaView> 
        </>
    );
}