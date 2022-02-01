import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import PersonIcon from '@material-ui/icons/Person';
import ScriptTag from "react-script-tag";
import SendIcon from '@material-ui/icons/Send';


export default function PrivateChatRoom(props) {


    const csrftoken = props.getCookie('X-CSRFToken');
    const rtokencode = props.getCookie('chattoken');

    const { roomname } = useParams();

    async function ChatPageManager() {
        let response = await fetch('/privatetokenvalidation', {
            credentials: 'include',
            method: 'POST',
            mode: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({
                'rname': roomname,
                'rtoken': rtokencode
            })
        })
        if (response.ok) {
            let json = await response.json();
            let message = json["message"]
            if (message != 'success'){
                console.error(message)
                window.location.replace('/chat')
            }
        }
        else {
            alert("HTTP-Error: " + response.status);
        }
    }

    ChatPageManager()

    return (
        <>
            <div className="upperpart">
                <h3 id="groupname">Group: </h3>
                <h5 id="username">User: </h5>
                <div className="managericonum">
                    <PersonIcon className="personico" />
                    <h3 id="activepersons"></h3>
                </div>
            </div>
            <div id="chat-log"></div><br />
            <div className="flexcontainer">
                <textarea id="chat-message-input" required type="text" cols="150" rows="3"></textarea><br />
                <button type="button" id="chat-message-submit"><SendIcon/></button>
            </div>
            <ScriptTag src="/public/privatechatserver.js"></ScriptTag>
        </>
    )
}
