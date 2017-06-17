/**
 * Created by HOANDHTB on 6/16/2017.
 */
import React, {Component} from 'react';
import {View, Text, ListView, StyleSheet, Dimensions, TouchableOpacity, Image} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Moment from 'moment';
import {API} from  '../common/api';
const {width, height} = Dimensions.get('window');

import iconEdit from '../../media/app_icon/edit.png';
import iconAdd from '../../media/app_icon/add.png';
import iconDelete from '../../media/app_icon/delete.png';
export default class Home extends Component {

    static navigationOptions = {
        title: 'Danh sách học sinh',  headerRight: (
            <TouchableOpacity>
              <Image source={iconAdd} style={{width:20,height:20, margin:10}}/>
            </TouchableOpacity>
        ),

    };

    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
            visible: false
        };
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
                            <Text style={text_row}>{student.email}</Text>
                            <Text style={text_row}>{student.phone}</Text>
                            <Text style={text_row}>{Moment(student.birthday).format('L')}</Text>
                            <View style={action}>
                                <TouchableOpacity>
                                    <Image source={iconEdit} style={iconAction}/>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image source={iconDelete} style={{width: 20, height: 20}}/>
                                </TouchableOpacity>
                            </View>
                        </View>)
                }
                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
                renderHeader={() => {
                    return (<View style={header}>
                        <Text style={header_title}>Họ tên</Text>
                        <Text style={header_title}>Email</Text>
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
                    console.log(text)
                    this.setState({
                            dataSource: ds.cloneWithRows(text.data),
                            visible: false
                        }
                    )
                });

    }

}
const styles = StyleSheet.create({
    /*
     * Removed for brevity
     */
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
    header_title: {
        textAlign: "center",
        fontWeight: "700",
        width: width / 5
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
    },
    text_row: {
        width: width / 5,
        textAlign: "center",
    },
    action: {width: width / 5, flexDirection: "row", alignItems: 'center', justifyContent: "center"},
    iconAction: {
        width:20,
        height: 20
    }
});