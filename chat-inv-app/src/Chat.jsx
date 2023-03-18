import React, { useEffect, useState } from 'react';

function Chat({goPage}) {
    const LEVEL_OF_PRICES = ['Budget', 'Mid-range', 'Premium', 'Luxury'];
    const [inputValue, setInputValue] = useState('');
    const [fakeTurn, setFakeTurn] = useState(0);
    const [messages, setMessages] = useState([]);
    const [newData, setNewData] = useState([]);
    
    const fChat = [
        'Hi tell me some information about your business, what is your business name?',
        "what is the type of your business?",
        "write description about your business",
        "choose the level of price",
        "write target group of your business",
        "is your business opens 24 hours",
        "is your business provide dine in service"
    ];

    const createMsg = (personal=true, msg=inputValue, loading=false) => {
        const date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        
        return(
            <div className={`message ${loading && 'loading'} ${personal ? 'message-personal new' : 'new'}`}>
                {!personal && 
                    <figure className="avatar">
                        <img src="./assets/images/logo.jpg" alt="Logo"/>
                    </figure>
                }
                {loading ? 
                    <span></span> 
                    : msg
                }
                <div className="timestamp">{hours}:{minutes}</div>
            </div>
        )
    }

    const fakeChatsTrue = [
        createMsg(false, fChat[0], true),
        createMsg(false, fChat[1], true),
        createMsg(false, fChat[2], true),
        createMsg(false, fChat[3], true),
        createMsg(false, fChat[4], true),
        createMsg(false, fChat[5], true),
        createMsg(false, fChat[6], true),
    ];

    const fakeChatsFalse = [
        createMsg(false, fChat[0], false),
        createMsg(false, fChat[1], false),
        createMsg(false, fChat[2], false),
        createMsg(false, fChat[3], false),
        createMsg(false, fChat[4], false),
        createMsg(false, fChat[5], false),
        createMsg(false, fChat[6], false),
    ];


    useEffect(() => {
        setTimeout(() => {
            setMessages([...messages, fakeChatsTrue[fakeTurn]]);
        }, 150);

        setTimeout(() => {
            setMessages([...messages, fakeChatsFalse[fakeTurn]]);
        }, 2000);
    }, [fakeTurn]);

    function handleInput(event) {
        setInputValue(event.target.value);
    }

    const insertMessage = (msg=inputValue) => {
        if (msg?.trim() === '') {
            return false;
        }
        
        setMessages([...messages, createMsg(true, msg)]);

        if(!fChat.includes(msg)){
            setNewData([...newData, msg]);
        }

        setInputValue("");
        setFakeTurn(fakeTurn + 1);
    }

    
    return (
        <>
            <div className="chat">
                <div className="chat-title">
                    <h1>The invester</h1>
                    <h2>Chat INV</h2>
                    <figure className="avatar">
                        <img src="./assets/images/logo.jpg" alt="Logo"/>
                    </figure>
                </div>
                <div className="messages">
                    <div className="messages-content mCustomScrollbar _mCS_1 mCS_no_scrollbar">
                        <div id="mCSB_1" className="mCustomScrollBox mCS-light mCSB_vertical mCSB_inside" style={{maxHeight: 'none'}} tabindex="0">
                            <div id="mCSB_1_container" className="mCSB_container mCS_y_hidden mCS_no_scrollbar_y" style={{position: 'relative', top: '0', left: '0'}} dir="ltr">
                                {messages.map((msg) => msg)}
                            </div>
                        </div>
                    </div>
                    <div className={`Choices Choices__2 ${fakeTurn!==5 && 'hidde'}`}>
                        <button onClick={() => insertMessage('Yes')}>Yes</button>
                        <button onClick={() => insertMessage('No')}>No</button>
                    </div>
                    <div className={`Choices Choices__2 ${fakeTurn!==6 && 'hidde'}`}>
                        <button onClick={() => insertMessage('Yes')}>Yes</button>
                        <button onClick={() => insertMessage('No')}>No</button>
                    </div>
                    <div className={`Choices Choices__4 ${fakeTurn!==3 && 'hidde'}`}>
                        {LEVEL_OF_PRICES.map((level) => <button onClick={() => insertMessage(level)}>{level}</button>)}
                    </div>
                    <div className={`Choices Choices__1 ${fakeTurn < 7 && 'hidde'}`}>
                        <button onClick={() => {
                            const dataFomat = {
                                name: newData[0],
                                field: newData[1],
                                description: newData[2],
                                levelOfPrices: newData[3],
                                targetGroup: newData[4],
                                is24hours: newData[5],
                                isDineIn: newData[6],
                            }
                            localStorage.removeItem("myObject");
                            
                            localStorage.setItem("myObject", JSON.stringify(dataFomat));
                            goPage(1);
                        }}>
                            Get Resulte
                        </button>
                    </div>
                </div>
                <div className={`message-box ${(fakeTurn===3 || fakeTurn===5 || fakeTurn===6 || fakeTurn>=7) && 'hidde'}`}>
                    <input type="text" className="message-input" placeholder="Type message..." value={inputValue} onInput={handleInput}></input>
                    <button type="submit" className="message-submit" onClick={() => insertMessage()}>Send</button>
                </div>

            </div>
            <div className="bg"></div>
        </>
    )
}

export default Chat;
