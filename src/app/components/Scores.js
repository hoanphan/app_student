import React, {Component} from 'react';
import {View, Text, ListView, StyleSheet, TextInput, Dimensions, Button, Alert} from 'react-native';
import  {API} from '../common/api'
import moment from'moment'
import Spinner from 'react-native-loading-spinner-overlay';
import DatePicker from 'react-native-datepicker'
import {Switch} from 'react-native-switch';
import global from '../common/global'
const {width, height} = Dimensions.get('window');
export default class Scores extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Điểm của học sinh',
    });
    constructor() {
        super()
        this.state = {
            isFetching:false,
            types: {},
            data: {},
            visible:true
        };
        API.getTypeScores().then(res => res.json()).then((res) => {
            this.setState({
                types: res.data
            })
        })
    }

    CreateHeader() {
        const {types} = this.state;
        const {titleSubject, textStyle1, textStyle2} = styles;
        var WholeNews = [];
        WholeNews.push(<View style={titleSubject}>
            <Text style={textStyle1}>Môn học</Text>
        </View>)
        for (var i = 0; i < types.length; i++) {
            if (types[i].count > 1) {
                var arr = [];
                for (var j = 0; j < types[i].count; j++) {
                    arr.push(<Text style={textStyle2}>{types[i].display}_{j + 1}</Text>)
                }
                WholeNews.push(
                    <View key={types[i].id} style={{
                        flex: types[i].count, justifyContent: "center", alignItems: "center", borderWidth: 1,
                        borderColor: '#868686'
                    }}>
                        <Text style={textStyle1}>{types[i].name}</Text>
                        <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                            {arr}
                        </View>
                    </View>)
            }
            else {
                WholeNews.push(
                    <View style={{
                        flex: 1, justifyContent: "center", alignItems: "center", borderWidth: 1,
                        borderColor: '#868686'
                    }}>
                        <Text style={textStyle1}>{types[i].name}</Text>
                    </View>)
            }
        }

        return (<View style={{flexDirection: "row"}}>{WholeNews}</View>);
    }
    CreatData(data)
    {
        const {types} = this.state;
        const {titleSubject, textStyle1, textStyle2} = styles;
        var WholeNews = [];
        for(var i=0;i<data.length;i++)
        {
            var arr = [];
            for(var j=0;j<types.length;j++)
            {

                for (var k = 0; k < types[j].count; k++) {
                    var name=types[k].id+"_"+k;
                    arr.push(<Text style={textStyle2}>{data[i][name]}</Text>)
                }
            }
            WholeNews.push(<View style={{flexDirection: "row"}}>
                <View style={titleSubject}>
                <Text style={textStyle1}>{data[i]['subject']}</Text>
                </View>{arr}
            </View>)
        }

        return WholeNews;

    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                {this.CreateHeader()}
                {this.state.isFetching===false?<Text>Loading...</Text>:this.state.data}
                <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}}/>
            </View>)
    }

    componentDidMount() {
        const {params} = this.props.navigation.state;
        const id = params.id;
        API.getScores(id).then(res => res.json()).then((res) => {
            this.setState({
                data:   this.CreatData(res.data),
                visible:false,
                isFetching:true
            })
        })
    }
}
const styles = StyleSheet.create({
        titleSubject: {
            flex: 2,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: '#868686'
        },
        textStyle1: {fontSize: 10},
        textStyle2: {
            fontSize: 10, flex: 1, borderWidth: 1,
            borderColor: '#868686',
            textAlign: "center"
        }
    }
)
