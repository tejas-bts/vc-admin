import React, { useEffect, createRef, useState} from "react";
import { utils } from "./Utils";
import { Persona, PersonaSize } from 'office-ui-fabric-react';
import { Icon } from '@fluentui/react/lib/Icon';
import { FiTrash } from "react-icons/fi";

const RemoteParticipantCard = (props) => {

    const call = props.call;
    const remoteParticipant = props.remoteParticipant;

    const [isSpeaking, setIsSpeaking] = useState();
    const [isMuted, setIsMuted] = useState();
    const [displayName, setDisplayName] = useState();
    const [state, setState] = useState();

    useEffect(() => {
        if (remoteParticipant.isMuted) {
            setIsSpeaking(false);
        }
    }, [remoteParticipant])

    remoteParticipant.on('isMutedChanged', () => { setIsMuted(remoteParticipant.isMuted) });
    remoteParticipant.on('stateChanged', () => { setState(remoteParticipant.state) });
    remoteParticipant.on('isSpeakingChanged', () => { setIsSpeaking(remoteParticipant.isSpeaking) })
    remoteParticipant.on('displayNameChanged', () => { setDisplayName(remoteParticipant.displayName.trim()) })

    const handleRemoveParticipant = (identifier) => {
        call.removeParticipant(identifier)
            .catch((e) => console.error(e))
    }

    return (
        <li className={`participant-item`} key={utils.getIdentifierText(remoteParticipant.identifier)}>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-lg11 ms-sm10" style={{display:'flex', justifyContent:'space-evenly', alignItems:'center'}}>
                    <Persona className={isSpeaking ? `speaking-border-for-initials` : ``}
                        size={PersonaSize.size40}
                        text={ displayName ? displayName : utils.getIdentifierText(remoteParticipant.identifier) }
                        secondaryText={state}
                        styles={{ primaryText: {color: 'black'}, secondaryText: {color: 'black'} }}
                    />
                    <button href="#" onClick={e => handleRemoveParticipant(remoteParticipant.identifier)} className="participant-remove float-right ml-3"><FiTrash/></button>
                </div>
                <div className="ms-Grid-col ms-lg1 ms-sm2">
                    {
                        isMuted &&
                        <Icon className="icon-text-large" iconName="MicOff2"/>
                    }
                    {
                        !isMuted &&
                        <Icon className="icon-text-large" iconName="Microphone"/>
                    }
                </div>
            </div>
        </li>
    )
}


export default RemoteParticipantCard;
