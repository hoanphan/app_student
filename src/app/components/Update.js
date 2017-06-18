/**
 * Created by HOANDHTB on 6/16/2017.
 */
import React, {Component} from 'react';
import {View, Text, ListView, StyleSheet, TextInput, Dimensions, Button, Alert} from 'react-native';
import  {API} from '../common/api'
import moment from'moment'
import Spinner from 'react-native-loading-spinner-overlay';
import DatePicker from 'react-native-datepicker'
import {Switch} from 'react-native-switch';
import global from '../common/global'
const {width, height} = Dimensions.get('window');

export default class Update extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Cập nhật học sinh',
    });

    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
            visible: false,
            id: "",
            date:"",
            name: "",
            email: "",
            phone: "",
            sex: false,
            errorName: false,
            errorEmail: false,
            errorPhone: false

        };
    }

    checkError() {
        var isError = false;
        if (this.state.name === "") {
            isError = true;
            this.setState({
                errorName: true
            });
        }
        else
            this.setState({
                errorName: false
            });

        if (this.state.email === "") {
            this.setState({
                errorEmail: true
            });
            isError = true;
        }
        else
            this.setState({
                errorEmail: false
            });

        if (this.state.phone === "") {
            isError = true;
            this.setState({
                errorPhone: true
            });
        }

        else
            this.setState({
                errorPhone: false
            });
        return isError;
    }
    onPressSave()
    {


        console.log(this.props);
        const check=this.checkError();
        if(check===false)
        {
            this.setState({
                visible: true
            });
            API.updateStudent(this.state.id,this.state.name,this.state.phone,this.state.sex,this.state.date,this.state.email)
                .then((response) => {
                    return response.json();
                })
                .then(
                    (res) => {
                        if(res.code!==0) {

                            this.setState({
                                visible: false
                            });
                            global.onRefresh();
                            this.props.navigation.goBack();

                        }
                        else
                        {
                            console.log(res);
                            this.setState({
                                visible: false
                            });
                            Alert.alert(
                                'Lỗi',
                                res.message,
                                [
                                    {text: 'OK'},
                                ],
                                { cancelable: false }
                            )
                        }
                    });

        }
    }

    render() {
        const {wrapper, textInput, nameInPut, dateInput, borderError} = styles;
        return ( <View style={styles.container}>
            <View style={wrapper}>
                <Text style={nameInPut}>Họ và tên:</Text>
                <TextInput
                    style={this.state.errorName ? borderError : textInput}
                    placeholder="Nhập họ và tên"
                    value={this.state.name}
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => {
                        this.setState({
                            name: text
                        })
                    }}
                    autoFocus/>
            </View>
            <View style={wrapper}>
                <Text style={nameInPut}>Số điện thoại:</Text>
                <TextInput style={this.state.errorPhone ? borderError : textInput}
                           placeholder="Nhập số điện thoại"
                           value={this.state.phone}
                           underlineColorAndroid='transparent'
                           onChangeText={(text) => {
                               this.setState({
                                   phone: text
                               })
                           }}
                />
            </View>
            <View style={wrapper}>
                <Text style={nameInPut}>Email:</Text>
                <TextInput
                    style={this.state.errorEmail ? borderError : textInput}
                    placeholder="Nhập Email"
                    value={this.state.email}
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => {
                        this.setState({
                            email: text
                        })
                    }}
                />
            </View>
            <View style={wrapper}>
                <Text style={nameInPut}>Giới tính:</Text>
                <Switch

                    value={this.state.sex}
                    onValueChange={(val) => this.setState({
                        sex: val
                    })}
                    disabled={false}
                    activeText={'Nữ'}
                    inActiveText={'Nam'}
                    backgroundActive={'green'}
                    backgroundInactive={'gray'}
                    circleActiveColor={'#30a566'}
                    circleInActiveColor={'#000000'}
                />
            </View>
            <View style={wrapper}>
                <Text style={nameInPut}>Ngày sinh:</Text>
                <DatePicker
                    style={dateInput}
                    date={this.state.date}
                    mode="date"
                    placeholder="Chọn ngày"
                    format="YYYY-MM-DD"
                    minDate="1990-01-01"
                    maxDate={this.state.date}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateInput: {
                            borderColor: '#fff'
                        }
                        // ... You can check the source to find the other keys.
                    }}
                    showIcon={false}
                    onDateChange={(date) => {
                        this.setState({date: date})
                    }}
                />
            </View>
            <View style={wrapper}>
                <Button title="Lưu"
                        color="#337ab7"
                        accessibilityLabel="Learn more about this purple button"
                        onPress={this.onPressSave.bind(this)}
                />
            </View>
            <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}}/>
        </View>)
    }

    componentDidMount() {
        const {params} = this.props.navigation.state;
        const id = params.id;
        this.setState({id});
        this.setState({
            visible:true
        })
        API.getStudent(id).then(
            res => res.json(),
        ).then(
            (res) => {
                var sex=true;
                if(res.data.sex===1)
                    sex=true;
                else
                    sex=false;
                console.log()
                this.setState({
                    date: moment(res.data.birthday).format('YYYY-MM-DD'),
                    name: res.data.name,
                    email: res.data.email,
                    phone: res.data.phone,
                    sex: sex,
                    visible:false
                })
            }
        ).catch(
            (err) => {
                console.log(err)
            }
        )


    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        paddingTop: 20,
        paddingHorizontal: 10
    },
    wrapper: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    textInput: {
        flex: 3,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 20,
        paddingLeft: 30,
        textAlign: 'center'

    },
    dateInput: {
        flex: 3,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 20,
        paddingLeft: 30,

    },
    nameInPut: {
        flex: 1
    },
    borderError: {
        flex: 3,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 20,
        paddingLeft: 30,
        textAlign: 'center',
        borderColor: '#ff3b2f',
        borderWidth: 1
    }
});