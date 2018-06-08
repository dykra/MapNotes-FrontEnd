import * as React from 'react';
import { Redirect } from 'react-router';
import { LOCAL_STORAGE_INFO } from '../../constants';
import { getLocalStorageInfo } from '../../utils/localStorage/localStorageUtils';

export class ChooseRouterPathComponent extends React.Component<{}, {}> {

    constructor(props: {}) {
        super(props);
    }

    getLastMapUsed() {
        let mapId = getLocalStorageInfo(LOCAL_STORAGE_INFO);
        if (mapId) {
            return JSON.parse(mapId);
        }
        return mapId;
    }

    render() {
        let lastMapID = this.getLastMapUsed();
        console.log(lastMapID);
        if (lastMapID) {
            return(
                <Redirect to={'/map/' + lastMapID}/>
            );
        } else {
            return(
                <Redirect to={'/home'}/>
            );
        }
    }
}