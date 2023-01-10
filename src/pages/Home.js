import {useEffect, useState} from 'react';
import axios from 'axios';

const Home = () => {

    const [loading, setLoading] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [valueSetting, setValueSetting] = useState({
        namebot: 'charlotte',
        authkey: '',
    });


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
            // console.log('hello')
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
                Authorization: `Bearer ${valueSetting.authkey}`,
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
            setAllConversation(prevState=>[...prevState, {'order': order, 'value': response.data.choices[0].text.replace("\n\n", ""), 'chatBy': 'bot', date: new Date()}]);

            setLoading(false);
        } catch (error) {
            setLoading(false);
            // setError(error.response.data.error.message);

            setAllConversation(prevState=>[...prevState, {'order': order, 'value': error.response.data.error.message, 'chatBy': 'bot', date: new Date()}]);

            // setShowError(true);
            console.log(error.response);
        }
    };

    // setting
    const onChangeForm = (event) => setValueSetting((prevState)=>{return {...prevState, [event.target.name]: event.target.value}});

    const onSettingSubmit = (event) =>{
        event.preventDefault();
        localStorage.setItem('setting', JSON.stringify(valueSetting));
        setShowDialog(false);
    }

    useEffect(()=>{
        const setting = JSON.parse(localStorage.getItem('setting'));
        // console.log(setting);
        
        if(setting){
            setValueSetting(setting);
        }
    }, []);
    

    return(
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10">

        {showDialog && <div id="menu" className="w-full h-full bg-gray-900 bg-opacity-80 top-0 fixed sticky-0 ">
            <div className="2xl:container  2xl:mx-auto py-40 px-4 md:px-24 flex justify-center items-center">
                <div className="w-96 md:w-auto dark:bg-gray-800 relative flex flex-col justify-center items-center bg-white py-16 px-4 md:px-24 xl:py-24 xl:px-36">
                    <div role="banner">
                        {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                        </svg> */}
                    </div>
                    <div className="mt-12">
                        <h1 role="main" className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-center text-gray-800">Setting</h1>
                    </div>
                    <div className="mt">
                    <form onSubmit={onSettingSubmit}>
                        <div class="mb-4">
                            <label class="block text-white text-sm font-bold mb-2" for="username">
                                Name Bot
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" id="namebot" name="namebot" type="text" placeholder="Name Bot" onChange={onChangeForm} value={valueSetting.namebot} />
                        </div>
                        <div class="mb-4">
                            <label class="block text-white text-sm font-bold mb-2" for="username">
                                Authorization key
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" id="authkey" name="authkey" type="text" placeholder="Authorization key" onChange={onChangeForm} value={valueSetting.authkey} />
                        </div>
                        <div class="flex items-center justify-between">
                            <button class="bg-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                    </div>
                    <button onClick={()=>{
                        setShowDialog(false);
                    }} className="text-gray-800 dark:text-gray-400 absolute top-8 right-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800" aria-label="close">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>}

        <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="bg-blue-500 w-full h-14 p-2 flex justify-between space-x-2">
                <div className="flex space-x-2">
                    <img src="https://i.pinimg.com/474x/ff/0d/f4/ff0df44c4cd43c7cd964e36b4354e56b.jpg" alt="profil" className="w-full flex-shrink-0 h-10 w-10 rounded-full bg-gray-300" />
                    <span>
                        <h1 className="text-sm">{valueSetting.namebot}</h1>
                        <span className="flex space-x-1">
                            <div className="rounded-full bg-green-500 h-4 w-4"></div> {loading ? <div className="text-xs text-white">Typing...</div> : <p className="text-xs text-white">Always online for you</p>}
                        </span>
                    </span>
                </div>

                <div className="m-auto">
                    <button onClick={()=>setShowDialog(true)}>
                        <svg fill="#FFF" height="25px" width="25px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <g>
                                <g>
                                    <path d="M499.029,184.32h-51.14c-1.638-5.461-3.428-9.059-5.363-13.319l36.024-36.195c5.329-5.33,5.332-14.056,0.005-19.389
                                        L396.586,33.31c-2.561-2.564-6.036-4.025-9.661-4.025c-3.624,0-7.098,1.431-9.66,3.995l-36.177,35.874
                                        c-4.29-1.969-7.946-3.798-13.408-5.467V12.971C327.68,5.431,322.25,0,314.709,0H198.656c-7.541,0-14.336,5.431-14.336,12.971
                                        V63.17c-4.096,1.694-8.77,3.555-13.222,5.576l-35.363-35.489c-5.33-5.325-13.883-5.323-19.214,0.003l-82.066,82.065
                                        c-5.333,5.33-5.314,13.974,0.016,19.309l35.317,35.671c-2.06,4.488-3.947,8.555-5.676,14.017H14.336
                                        C6.795,184.32,0,189.751,0,197.291v116.053c0,7.539,6.795,14.336,14.336,14.336h49.776c1.726,4.096,3.622,8.835,5.677,13.317
                                        L34.45,376.166c-2.561,2.561-4,5.95-3.999,9.574c0.001,3.624,1.442,7.053,4.005,9.613l82.153,82.039
                                        c5.33,5.325,13.967,5.315,19.296-0.011l35.186-35.486c4.452,2.019,9.131,3.876,13.227,5.572v50.198
                                        c0,7.539,6.795,14.336,14.336,14.336h116.053c7.541,0,12.971-6.797,12.971-14.336v-50.717c5.461-1.67,9.122-3.514,13.413-5.485
                                        l36.001,36.195c2.56,2.564,6.205,4.305,9.829,4.305c0.001,0,0.001,0,0.003,0c3.622,0,7.096-1.739,9.657-4.301l82.016-82.189
                                        c2.56-2.561,3.998-6.119,3.996-9.742c-0.001-3.622-1.44-7.137-4.002-9.697l-36.058-35.714c1.931-4.253,3.718-8.544,5.355-12.64
                                        h51.141c7.541,0,12.971-6.797,12.971-14.336V197.291C512,189.751,506.57,184.32,499.029,184.32z M484.693,300.373h-46.525
                                        c-5.945,0-11.207,3.506-13.01,9.172c-2.986,9.384-6.78,18.396-11.278,27.124c-2.721,5.278-1.716,11.627,2.485,15.826
                                        l33.266,33.202l-62.703,62.717l-33.067-33.12c-4.213-4.219-10.68-5.22-15.968-2.467c-8.765,4.567-18.317,8.415-27.715,11.446
                                        c-5.64,1.819-9.804,7.066-9.804,12.992v47.429h-88.747v-46.987c0-5.964-3.529-11.238-9.22-13.025
                                        c-9.572-3.008-18.773-6.857-27.684-11.446c-5.274-2.713-11.613-1.714-15.812,2.479l-32.696,32.696l-62.819-62.768l32.582-32.57
                                        c4.213-4.213,5.213-10.671,2.463-15.958c-4.65-8.936-8.552-17.987-11.603-27.57c-1.804-5.665-7.063-9.172-13.008-9.172H27.307
                                        v-88.747h46.525c5.945,0,11.207-4.187,13.01-9.854c3.053-9.591,6.959-19.157,11.612-28.097c2.75-5.282,1.757-11.825-2.453-16.039
                                        l-32.543-32.607l62.804-62.79l32.741,32.687c4.197,4.192,10.621,5.19,15.895,2.475c8.921-4.59,17.949-8.443,27.509-11.446
                                        c5.689-1.787,9.22-7.064,9.22-13.028V27.307h88.747V73.37c0,5.927,4.164,11.177,9.806,12.995
                                        c9.398,3.03,18.776,6.88,27.536,11.444c5.291,2.757,11.839,1.761,16.055-2.46l33.113-33.112l62.688,62.738l-33.227,33.239
                                        c-4.198,4.2-5.196,10.63-2.475,15.909c4.5,8.733,8.3,18.261,11.287,27.648c1.802,5.665,7.068,9.855,13.013,9.855h46.524V300.373z"
                                        />
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path d="M256,114.005c-77.92,0-141.312,63.392-141.312,141.312S178.08,396.629,256,396.629s141.312-63.392,141.312-141.312
                                        S333.92,114.005,256,114.005z M256,369.323c-62.863,0-114.005-51.143-114.005-114.005S193.137,141.312,256,141.312
                                        s114.005,51.143,114.005,114.005S318.863,369.323,256,369.323z"/>
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path d="M256,178.859c-42.159,0-76.459,34.299-76.459,76.459c0,42.16,34.3,76.459,76.459,76.459s76.459-34.299,76.459-76.459
                                        C332.459,213.157,298.159,178.859,256,178.859z M256,304.469c-27.103,0-49.152-22.049-49.152-49.152s22.049-49.152,49.152-49.152
                                        s49.152,22.049,49.152,49.152S283.103,304.469,256,304.469z"/>
                                </g>
                            </g>
                        </svg>
                    </button>
                    
                </div>
            </div>
            <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
                {
                    allConversation.map((value, index)=>{
                        console.log(value.date);
                        return (
                        value.chatBy === 'me' ?
                        <div key={index} className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                            <div>
                                <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                                    <p className="text-sm" whitespace-pre-line>{value.value}</p>
                                </div>
                                <span className="text-xs text-gray-500 leading-none">{`${value.date.getHours()}:${value.date.getMinutes()}`}</span>
                            </div>
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                        </div> :
                        <div key={index} className="flex w-full mt-2 space-x-3 max-w-xs">
                            <img src="https://i.pinimg.com/474x/ff/0d/f4/ff0df44c4cd43c7cd964e36b4354e56b.jpg" alt="profil" className="w-full flex-shrink-0 h-10 w-10 rounded-full bg-gray-300" />
                            <div>
                                <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                                    <p className="text-sm whitespace-pre-line">{value.value}</p>
                                </div>
                                <span className="text-xs text-gray-500 leading-none">{`${value.date.getHours()}:${value.date.getMinutes()}`}</span>
                            </div>
                        </div>);
                    })
                }
            </div>

            
            {/* <form className="bg-gray-300 p-4" method="post"> */}
                <input className="flex items-center h-10 w-full rounded px-3 text-sm" type="text" placeholder="Type your message…" value={conversation} onChange={onInputchange} onKeyDown={handleKeyPress} />
                <button className="flex items-center h-10 w-full rounded px-3 text-sm bg-blue-500 text-white" onClick={onSubmit} >Send</button>
            {/* </form> */}
        </div>
    </div>
    );
}

export default Home;