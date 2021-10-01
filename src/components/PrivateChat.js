import React from 'react';
import { useEffect } from 'react';
import axios from "axios";
import Spinner from '../muicomp/spinner';
import {Link} from "react-router-dom";
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export default function PrivateChat() {

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }


    const csrftoken = getCookie('X-CSRFToken');


    async function handleCreateSubmit(e){
        e.preventDefault();
        document.getElementById("verifier").textContent = ''
        document.getElementById('spinnerhandler').style.display = 'flex';
        document.getElementById("verifier").style.display = 'none'
        let response = await fetch('/registerprivateroom', {
            credentials: 'include',
            method: 'POST',
            mode: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({
                'rname': document.getElementById('crroomname').value,
                'password': document.getElementById('passwordc').value
            })
        })
        if (response.ok) { 
            document.getElementById('spinnerhandler').style.display = 'none';
            document.getElementById("verifier").style.display = 'block';
            let json = await response.json();
            let message = json["message"]
            if (message != 'success') {
                document.getElementById("verifier").textContent = message;
                document.getElementById("verifier").style.color = "crimson"
                document.getElementById("verifier").style.fontWeight = 600;
            } else {
                document.getElementById("verifier").textContent = message + "Your Chat Token is: " + json["token"];
                document.getElementById("verifier").style.color = "green"
                document.getElementById("verifier").style.fontWeight = 600;
            }
          } else {
            document.getElementById('spinnerhandler').style.display = 'none';
            alert("HTTP-Error: " + response.status);
          }
    }

    async function handleJoinSubmit(e){
        e.preventDefault();
        document.getElementById("verifier").textContent = ''
        document.getElementById('spinnerhandler').style.display = 'flex';
        document.getElementById("verifier").style.display = 'none'
        const token = document.getElementById('rtokenjoin').value;
        const password = document.getElementById('passwordj').value;
        let response = await fetch('/privateroomavailable', {
            credentials: 'include',
            method: 'POST',
            mode: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({
                'rname': token,
                'password': password
            })
        })

        if (response.ok) { 
            document.getElementById('spinnerhandler').style.display = 'none';
            document.getElementById("verifier").style.display = 'block';
            let json = await response.json();
            let message = json["message"]
            if (message != 'success') {
                document.getElementById("verifier").textContent = message;
                document.getElementById("verifier").style.color = "crimson"
                document.getElementById("verifier").style.fontWeight = 600;
            } else {
                document.getElementById("verifier").textContent = message + "Your Chat Token is: " + json["token"];
                document.getElementById("verifier").style.color = "green"
                document.getElementById("verifier").style.fontWeight = 600;
                window.location.replace('/chat/private/'+token);
                // to be changed
            }
          } else {
            document.getElementById('spinnerhandler').style.display = 'none';
            alert("HTTP-Error: " + response.status);
          }

    }

    useEffect(()=>{
        axios.get('/auth/isauth')
        .then(res=>{
            if(!res['data']['message']){
                window.location.replace('/login')
            }
        })
        .catch(err=>{
            alert(err)
        })
    })

    return (
        <div className="parentchatroomcontainer">
            <div className="upperheadschatroomcreatepage">
                <h1>Welcome user to ChatAPP.com</h1>
                <p>Don't Worry We Didn't Store Any Messages.</p>
            </div>
            <div className="lowerheadschatroomcreatepage">
                <form action="" onSubmit={(e)=>{handleCreateSubmit(e)}}>
                    <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
                    <input type="text" id="crroomname" placeholder="Enter Room Token To Create"/>
                    <input type="password" id="passwordc" placeholder="Enter Room Password To Create"/>
                    <button>Create Room</button>
                </form>
                <form action="" onSubmit={(e)=>{handleJoinSubmit(e)}}>
                <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
                <input type="text" id="rtokenjoin" placeholder="Enter Room Token To Join"/>
                <input type="password" id="passwordj" placeholder="Enter Room password To Join"/>
                <button>Join Room</button>
                </form>
                <Link to="/chat">Create or Join a public chat room?</Link>
                <Spinner/>
                <span id="verifier"></span>
            </div>
        </div>
    )
}
