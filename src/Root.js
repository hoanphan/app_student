/**
 * Created by HOANDHTB on 6/16/2017.
 */
import React from 'react';
import {Provider} from 'react-redux'
import Store from './common/store'
import App from './app/App';
const Root = () => {
    return (
        <Provider store={Store}>
            <App/>
        </Provider>)

}
export default Root;