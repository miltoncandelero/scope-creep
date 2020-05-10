import React from "react";

import { Alert, Button, InputGroup } from "@blueprintjs/core";
import { NameGen } from "../namegen/NameGen";

interface PickNamePopupProps {
    open:boolean;
    givenName:string;
    onPicked: (name: string) => void;
}

interface PickedNamePopupState
{
    name:string;
}

export class PickNamePopup extends React.Component<PickNamePopupProps, PickedNamePopupState>{

    state:PickedNamePopupState = {name : null};
    send () {
        const name = this.state.name ?? this.props.givenName;
        if (name)
        {
            this.props.onPicked(name)
            this.setState({name:null})
        }
    }

    cancel()
    {
        this.props.onPicked(this.props.givenName)
        this.setState({name:null})
    }

    changeName(name:string)
    {
        console.log("setting name", name)
        this.setState({name:name})
    }

    randomName()
    {
        this.changeName(NameGen.getProjectName(5,12));
    }
    render() {
        let {givenName} = this.props;
        const currentName:string = this.state.name ?? givenName;

        return(
            <Alert
            confirmButtonText="Save"
            icon="edit"
            isOpen={this.props.open}
            onConfirm={this.send.bind(this)}
            onCancel={givenName ? this.cancel.bind(this): undefined}
            cancelButtonText={givenName ? "Cancel": undefined}
            >
            <p>
                Pick a cool name for your repo
            </p>
            <InputGroup
                    large={true}
                    placeholder=""
                    rightElement= {<Button
                        icon={"random"}
                        minimal={true}
                        onClick={this.randomName.bind(this)}
                        />
                    }
                    value={currentName}
                    onChange={(e:any)=>this.changeName(e.target.value)}
                    small={false}
                    maxLength={12}
                    intent={currentName.length === 0 ? "danger": "none"}
                />
        </Alert>
        )
    }
}