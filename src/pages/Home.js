import {useState} from 'react';
import axios from 'axios';

const Home = () => {

    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState('');


    // Values for Prompt
    const [conversation, setConversation] = useState('');


    // Values for Completion
    const [allConversation, setAllConversation] = useState([]);
    const [order, setOrder] = useState(0);


    const onInputchange = (event) => {
        setConversation(event.target.value);
    }

    const handleKeyPress = (event)=>{
        if(event.key === 'Enter'){
            console.log('hello')
            onSubmit(event);
        }

    }
    const onSubmit = async (event) => {
        event.preventDefault();
        setOrder(order+1);
        setAllConversation(prevState=>[...prevState, {'order': order, 'value': conversation, 'chatBy': 'me', date: new Date()}]);
        setConversation('');

        setLoading(true);
        const options = {
            headers: {
                Authorization: `Bearer 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`,
                'Content-Type': 'application/json',
            },
        };
        const promptData = {
            model: 'text-davinci-003',
            prompt: conversation,
            top_p: Number(0.5),
            max_tokens: Number(512),
            temperature: Number(0.5),
            n: 1,
            stream: false,
            logprobs: null,
            stop: ['STOP', 'User:'],
        };

        try {
            const response = await axios.post('https://api.openai.com/v1/completions', promptData, options);

            setOrder(order+1);
            setAllConversation(prevState=>[...prevState, {'order': order, 'value': response.data.choices[0].text, 'chatBy': 'bot', date: new Date()}]);

            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.response.data.error.message);
            setShowError(true);
            console.log(error.response);
        }
    };
    

    return(
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10">
        <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
                {
                    allConversation.map((value, index)=>{
                        console.log(value.date);
                        return (
                        value.chatBy === 'me' ?
                        <div key={index} className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                            <div>
                                <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                                    <p className="text-sm">{value.value}</p>
                                </div>
                                <span className="text-xs text-gray-500 leading-none">{`${value.date.getHours()}:${value.date.getMinutes()}`}</span>
                            </div>
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                        </div> :
                        <div key={index} className="flex w-full mt-2 space-x-3 max-w-xs">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                            <div>
                                <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                                    <p className="text-sm">{value.value}</p>
                                </div>
                                <span className="text-xs text-gray-500 leading-none">{`${value.date.getHours()}:${value.date.getMinutes()}`}</span>
                            </div>
                        </div>);
                    })
                }
                {/* <div className="flex w-full mt-2 space-x-3 max-w-xs">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                    <div>
                    <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                        <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <span className="text-xs text-gray-500 leading-none">2 min ago</span>
                    </div>
                </div>
                <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                    <div>
                    <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                        <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
                    </div>
                    <span className="text-xs text-gray-500 leading-none">2 min ago</span>
                    </div>
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                </div>
                <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                    <div>
                    <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                        <p className="text-sm">Lorem ipsum dolor sit amet.</p>
                    </div>
                    <span className="text-xs text-gray-500 leading-none">2 min ago</span>
                    </div>
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                </div>
                <div className="flex w-full mt-2 space-x-3 max-w-xs">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                    <div>
                    <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                        <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                    </div>
                    <span className="text-xs text-gray-500 leading-none">2 min ago</span>
                    </div>
                </div>
                <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                    <div>
                    <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                        <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                    </div>
                    <span className="text-xs text-gray-500 leading-none">2 min ago</span>
                    </div>
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                </div>
                <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                    <div>
                    <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                        <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                    </div>
                    <span className="text-xs text-gray-500 leading-none">2 min ago</span>
                    </div>
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                </div>
                <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                    <div>
                    <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                        <p className="text-sm">Lorem ipsum dolor sit amet.</p>
                    </div>
                    <span className="text-xs text-gray-500 leading-none">2 min ago</span>
                    </div>
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                </div>
                <div className="flex w-full mt-2 space-x-3 max-w-xs">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                    <div>
                    <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                        <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                    </div>
                    <span className="text-xs text-gray-500 leading-none">2 min ago</span>
                    </div>
                </div>
                <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                    <div>
                    <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                        <p className="text-sm">Lorem ipsum dolor sit.</p>
                    </div>
                    <span className="text-xs text-gray-500 leading-none">2 min ago</span>
                    </div>
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                </div> */}
            </div>

            {
                loading ? <div>Bot is Typing</div> : <></>
            }
            
            {/* <form className="bg-gray-300 p-4" method="post"> */}
                <input className="flex items-center h-10 w-full rounded px-3 text-sm" type="text" placeholder="Type your message…" value={conversation} onChange={onInputchange} onKeyDown={handleKeyPress} />
                <button className="bg-green-500 p-2" onClick={onSubmit} >Send</button>
            {/* </form> */}
        </div>
    </div>
    );
}

export default Home;