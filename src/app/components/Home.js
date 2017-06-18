/**
 * Created by HOANDHTB on 6/16/2017.
 */
import React, {Component} from 'react';
import {View, Text, ListView, StyleSheet, Dimensions, TouchableOpacity, Image,Alert} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Moment from 'moment';
import {API} from  '../common/api';
import global from '../common/global'
const {width, height} = Dimensions.get('window');

import iconEdit from '../../media/app_icon/edit.png';
import iconAdd from '../../media/app_icon/add.png';
import iconDelete from '../../media/app_icon/delete.png';
import iconScores from  '../../media/app_icon/scores.png';


export default class Home extends Component {

    static navigationOptions = ({ navigation }) => ({
            title: 'Danh sách học sinh',  headerRight: (
                <TouchableOpacity onPress={()=>{
                    navigation.navigate('Create', { navigation });
                }}  >
                    <Image source={iconAdd} style={{width:20,height:20, margin:10}} />
                </TouchableOpacity>
            ),
        });


    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
            visible: true,

        };
        global.onRefresh=this.refreshListView.bind(this);
    }
    onScores(id)
    {
        const { navigate } = this.props.navigation;
        navigate('Scores',{id})
    }
    onPressUpdate(id)
    {
        const { navigate } = this.props.navigation;
         navigate('Update',{id})
    }
    onPressDelete(id)
    {
        Alert.alert(
            'Thông báo',
            'Bạn có muốn xóa học sinh này không?',
            [
                {text: 'Cancel'},
                {text: 'OK', onPress: () => this.Delete(id)},
            ],
            { cancelable: false }
        )
    }
    Delete(id)
    {
        this.setState({
            visible: true
        });
        API.deleteStudent(id)
            .then((response) => {
                return response.json();
            })
            .then(
                (text) => {
                    if(text.code===0)
                        this.refreshListView();
                    else
                    {
                        this.setState({

                                visible: false
                            }
                        );
                        Alert.alert(
                            'Thông báo',
                            text.message,
                            [
                                {text: 'OK'},
                            ],
                            { cancelable: false }
                        );

                    }
                });
    }
    refreshListView()
    {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            visible: true
        });
        API.fetchStudent()
            .then((response) => {
                return response.json();
            })
            .then(
                (text) => {
                    this.setState({
                            dataSource: ds.cloneWithRows(text.data),
                            visible: false
                        }
                    )
                });
    }
    render() {
        const {header_title, header, row, text_row, action,iconAction} = styles;
        return (<View style={{flex: 1, backgroundColor: '#fff'}}>
            <ListView
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={
                    (student) => (
                        <View style={row}>
                            <Text style={text_row}>{student.name}</Text>
                            <Text style={text_row}>{student.phone}</Text>
                            <Text style={text_row}>{Moment(student.birthday).format('DD-MM-YYYY')}</Text>
                            <View style={action}>
                                <TouchableOpacity onPress={()=>this.onPressUpdate(student.id)} >
                                    <Image source={iconEdit} style={iconAction}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>this.onPressDelete(student.id)}>
                                    <Image source={iconDelete} style={{width: 20, height: 20}}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>this.onScores(student.id)}>
                                    <Image source={iconScores} style={{width: 20, height: 20}}/>
                                </TouchableOpacity>
                            </View>
                        </View>)
                }
                renderHeader={() => {
                    return (<View style={header}>
                        <Text style={header_title}>Họ tên</Text>
                        <Text style={header_title}>Điện thoại</Text>
                        <Text style={header_title}>Ngày sinh</Text>
                        <Text style={header_title}>Action</Text>
                    </View>)
                }}


            />
            <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}}/>
        </View>)
    }

    componentDidMount() {
      this.refreshListView();

    }

}
const styles = StyleSheet.create({
    /*
     * Removed for brevity
     */

    header_title: {
        textAlign: "center",
        fontWeight: "700",
        width: width / 4,

    },
    header: {
        height: height / 20,
        borderBottomColor: '#ddd',
        borderBottomWidth: 2,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center"
    },
    row: {
        flexDirection: "row", justifyContent: 'space-between', alignItems: "center",
        height: height / 20,
        borderBottomColor:'#5C5F61',
        borderBottomWidth:1
    },
    text_row: {
        width: width / 4,
        textAlign: "center",
    },
    action: {width: width / 4, flexDirection: "row", alignItems: 'center', justifyContent: "center"},
    iconAction: {
        width:20,
        height: 20
    }
});