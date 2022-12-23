import {useEffect, useState} from 'react';
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
            setAllConversation(prevState=>[...prevState, {'order': order, 'value': response.data.choices[0].text.replace("\n\n", ""), 'chatBy': 'bot', date: new Date()}]);

            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.response.data.error.message);

            setAllConversation(prevState=>[...prevState, {'order': order, 'value': error.response.data.error.message, 'chatBy': 'bot', date: new Date()}]);
            setShowError(true);
            console.log(error.response);
        }
    };
    // useEffect(showError);
    

    return(
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10">

        {/* {showError && <div id="menu" className="w-full h-full bg-gray-900 bg-opacity-80 top-0 fixed sticky-0 ">
            <div className="2xl:container  2xl:mx-auto py-48 px-4 md:px-28 flex justify-center items-center">
                <div className="w-96 md:w-auto dark:bg-gray-800 relative flex flex-col justify-center items-center bg-white py-16 px-4 md:px-24 xl:py-24 xl:px-36">
                    <div role="banner">
                        <svg className="w-20 md:w-24 lg:w-28" viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M107.595 62.8312C106.78 62.9508 105.947 63.0143 105.098 63.0143C97.2875 63.0143 90.6776 57.9049 88.4104 50.8481C88.0228 49.6419 87.0376 48.7131 85.7929 48.4759C72.8221 46.0065 63.0138 34.6192 63.0138 20.9296C63.0138 15.18 64.7493 9.83943 67.7182 5.39136C68.4241 4.33371 67.835 2.92496 66.5877 2.67799C63.163 1.99986 59.6236 1.64111 55.9996 1.64111C25.9779 1.64111 1.64062 25.9784 1.64062 56.0001C1.64062 86.0215 25.9779 110.359 55.9996 110.359C83.0565 110.359 105.429 90.6641 109.638 64.7894C109.829 63.6152 108.771 62.6584 107.595 62.8312Z" fill="#F5B97D" />
                        <path d="M31.4506 45.4779C35.3239 45.4779 38.4638 42.338 38.4638 38.4648C38.4638 34.5915 35.3239 31.4517 31.4506 31.4517C27.5774 31.4517 24.4375 34.5915 24.4375 38.4648C24.4375 42.338 27.5774 45.4779 31.4506 45.4779Z" fill="#CD916E" />
                        <path d="M34.9563 78.7958C37.8618 78.7958 40.2172 76.4404 40.2172 73.5349C40.2172 70.6293 37.8618 68.2739 34.9563 68.2739C32.0507 68.2739 29.6953 70.6293 29.6953 73.5349C29.6953 76.4404 32.0507 78.7958 34.9563 78.7958Z" fill="#CD916E" />
                        <path d="M78.579 15.8539L78.0759 18.8725C77.6625 21.3533 79.0629 23.7799 81.4178 24.663L85.8717 26.3332C88.8137 27.4363 92.0604 25.7316 92.8223 22.6833L94.4098 16.333C95.3992 12.3752 91.7023 8.84606 87.7946 10.0183L82.256 11.68C80.3352 12.2566 78.9089 13.8753 78.579 15.8539Z" fill="#F5B97D" />
                        <path d="M96.3305 34.9582L94.2128 36.0172C92.5518 36.8476 91.8262 38.8288 92.5577 40.5355L94.2616 44.5108C95.2932 46.9177 98.5029 47.3861 100.179 45.3744L102.92 42.0853C104.205 40.5431 103.936 38.239 102.33 37.0346L100.003 35.2894C98.9405 34.4923 97.5186 34.3641 96.3305 34.9582Z" fill="#F5B97D" />
                        <path d="M106.85 27.9433C108.787 27.9433 110.357 26.3734 110.357 24.4367C110.357 22.5001 108.787 20.9302 106.85 20.9302C104.914 20.9302 103.344 22.5001 103.344 24.4367C103.344 26.3734 104.914 27.9433 106.85 27.9433Z" fill="#F5B97D" />
                        <path d="M62.5752 103.784C32.5535 103.784 8.21625 79.4465 8.21625 49.4248C8.21625 36.088 13.0268 23.8802 20.9974 14.4224C9.16475 24.3939 1.64062 39.3155 1.64062 56.0004C1.64062 86.0219 25.9779 110.359 55.9996 110.359C72.695 110.359 87.6 102.854 97.5614 91.0317C88.1138 98.9885 75.9167 103.784 62.5752 103.784Z" fill="#E3AA75" />
                        <path d="M86.6518 22.2637C83.7105 21.1608 81.9611 18.13 82.4776 15.0312L83.0772 11.4341L82.2564 11.6804C80.3352 12.2568 78.9089 13.8758 78.579 15.8544L78.0759 18.8729C77.6625 21.3537 79.0629 23.7803 81.4177 24.6634L85.8717 26.3336C88.2338 27.2193 90.7699 26.2763 92.0811 24.2999L86.6518 22.2637Z" fill="#E3AA75" />
                        <path d="M98.0031 42.251L96.0735 37.7484C95.711 36.9027 95.6808 36.0024 95.9004 35.1729L94.2128 36.0166C92.552 36.8469 91.8262 38.8282 92.5577 40.5349L94.2615 44.5102C95.2932 46.9171 98.5029 47.3857 100.179 45.3738L100.86 44.5564C99.6551 44.3107 98.553 43.5346 98.0031 42.251Z" fill="#E3AA75" />
                        <path d="M35.1777 41.7528C31.3038 41.7528 28.1637 38.6124 28.1637 34.7388C28.1637 33.7686 28.361 32.8446 28.7171 32.0044C26.2019 33.0704 24.4375 35.5615 24.4375 38.465C24.4375 42.3386 27.5779 45.479 31.4515 45.479C34.3552 45.479 36.8463 43.7143 37.9121 41.1993C37.0716 41.5555 36.1476 41.7528 35.1777 41.7528Z" fill="#B67F5F" />
                        <path d="M37.6996 76.0562C34.7941 76.0562 32.4391 73.7009 32.4391 70.7957C32.4391 70.0537 32.5963 69.3498 32.8735 68.7095C31.0071 69.5175 29.6992 71.3723 29.6992 73.5355C29.6992 76.441 32.0545 78.796 34.9597 78.796C37.1232 78.796 38.9777 77.4881 39.7858 75.6218C39.1455 75.8989 38.4416 76.0562 37.6996 76.0562Z" fill="#B67F5F" />
                        <path d="M68.2748 85.8085C72.1481 85.8085 75.288 82.6686 75.288 78.7953C75.288 74.9221 72.1481 71.7822 68.2748 71.7822C64.4016 71.7822 61.2617 74.9221 61.2617 78.7953C61.2617 82.6686 64.4016 85.8085 68.2748 85.8085Z" fill="#CD916E" />
                        <path d="M72.0019 82.0833C68.1281 82.0833 64.9879 78.943 64.9879 75.0693C64.9879 74.0992 65.1852 73.1752 65.5413 72.335C63.0262 73.4009 61.2617 75.8921 61.2617 78.7955C61.2617 82.6692 64.4021 85.8095 68.2757 85.8095C71.1794 85.8095 73.6705 84.0449 74.7363 81.5299C73.8961 81.886 72.9721 82.0833 72.0019 82.0833Z" fill="#B67F5F" />
                        <path d="M54.1746 50.7392C56.1112 50.7392 57.6812 49.1693 57.6812 47.2326C57.6812 45.296 56.1112 43.7261 54.1746 43.7261C52.2379 43.7261 50.668 45.296 50.668 47.2326C50.668 49.1693 52.2379 50.7392 54.1746 50.7392Z" fill="#CD916E" />
                        <path d="M31.4515 29.8101C26.6792 29.8101 22.7969 33.6927 22.7969 38.4647C22.7969 43.2367 26.6795 47.1193 31.4515 47.1193C36.2238 47.1193 40.1063 43.2367 40.1063 38.4647C40.1063 33.6927 36.2235 29.8101 31.4515 29.8101ZM31.4515 43.8383C28.4885 43.8383 26.0781 41.4277 26.0781 38.4649C26.0781 35.5022 28.4887 33.0915 31.4515 33.0915C34.4143 33.0915 36.8251 35.5022 36.8251 38.4649C36.8251 41.4277 34.4143 43.8383 31.4515 43.8383Z" fill="#1F2937" />
                        <path d="M59.6211 78.7957C59.6211 83.568 63.5037 87.4503 68.2757 87.4503C73.0478 87.4503 76.9304 83.5678 76.9304 78.7957C76.9304 74.0237 73.0478 70.1411 68.2757 70.1411C63.5037 70.1411 59.6211 74.0235 59.6211 78.7957ZM68.2759 73.4221C71.2389 73.4221 73.6493 75.8328 73.6493 78.7955C73.6493 81.7583 71.2387 84.1689 68.2759 84.1689C65.3132 84.1689 62.9026 81.7583 62.9026 78.7955C62.9026 75.8328 65.313 73.4221 68.2759 73.4221Z" fill="#1F2937" />
                        <path d="M34.9597 66.6338C31.1543 66.6338 28.0586 69.7298 28.0586 73.5351C28.0586 77.3405 31.1543 80.4362 34.9597 80.4362C38.7651 80.4362 41.8611 77.3405 41.8611 73.5351C41.8611 69.7298 38.7651 66.6338 34.9597 66.6338ZM34.9597 77.155C32.9636 77.155 31.3398 75.5312 31.3398 73.5351C31.3398 71.539 32.9636 69.915 34.9597 69.915C36.9558 69.915 38.5798 71.539 38.5798 73.5351C38.5798 75.5312 36.9558 77.155 34.9597 77.155Z" fill="#1F2937" />
                        <path d="M49.0977 47.2326C49.0977 50.0711 51.407 52.3802 54.2452 52.3802C57.0835 52.3802 59.3928 50.0709 59.3928 47.2326C59.3928 44.3943 57.0835 42.085 54.2452 42.085C51.407 42.085 49.0977 44.3943 49.0977 47.2326ZM54.2452 45.3662C55.2745 45.3662 56.1116 46.2036 56.1116 47.2326C56.1116 48.2616 55.2742 49.099 54.2452 49.099C53.2163 49.099 52.3789 48.2616 52.3789 47.2326C52.3789 46.2036 53.216 45.3662 54.2452 45.3662Z" fill="#1F2937" />
                        <path d="M87.5638 73.4227C87.8103 73.4227 88.0605 73.3669 88.2961 73.2492C89.1066 72.8439 89.4352 71.8586 89.0298 71.0479L87.2763 67.5407C86.8712 66.7302 85.8857 66.4015 85.0753 66.807C84.2648 67.2122 83.9363 68.1976 84.3416 69.0081L86.0951 72.5153C86.3827 73.0904 86.962 73.4227 87.5638 73.4227Z" fill="#1F2937" />
                        <path d="M68.2751 62.9016C68.5217 62.9016 68.7719 62.8458 69.0075 62.7282L72.5145 60.9747C73.3249 60.5695 73.6535 59.5841 73.2482 58.7736C72.8428 57.9632 71.8578 57.6344 71.0471 58.0399L67.5401 59.7934C66.7297 60.1986 66.4011 61.184 66.8064 61.9945C67.0939 62.5694 67.6731 62.9016 68.2751 62.9016Z" fill="#1F2937" />
                        <path d="M19.4623 58.4872C19.7497 59.0621 20.329 59.3944 20.931 59.3944C21.1775 59.3944 21.4278 59.3386 21.6633 59.2209C22.4738 58.8158 22.8024 57.8303 22.397 57.0199L20.6435 53.5129C20.2384 52.7024 19.2529 52.3736 18.4425 52.7792C17.632 53.1843 17.3034 54.1698 17.7088 54.9802L19.4623 58.4872Z" fill="#1F2937" />
                        <path d="M46.5002 86.096L42.9933 87.8495C42.1828 88.2546 41.8542 89.2401 42.2596 90.0506C42.547 90.6255 43.1263 90.9578 43.7282 90.9578C43.9748 90.9578 44.225 90.902 44.4606 90.7843L47.9676 89.0308C48.7781 88.6257 49.1066 87.6402 48.7013 86.8297C48.2962 86.0192 47.3107 85.6906 46.5002 86.096Z" fill="#1F2937" />
                        <path d="M48.394 19.7699L46.6405 18.0162C46 17.3755 44.9611 17.3755 44.3204 18.0162C43.6797 18.6569 43.6797 19.6955 44.3204 20.3362L46.0741 22.0899C46.3944 22.4104 46.8144 22.5705 47.2342 22.5705C47.6539 22.5705 48.0739 22.4104 48.3942 22.0899C49.0347 21.4495 49.0347 20.4108 48.394 19.7699Z" fill="#1F2937" />
                        <path d="M40.8126 58.3472C40.1719 58.988 40.1719 60.0268 40.8126 60.6673L42.5661 62.4208C42.8863 62.7411 43.3063 62.9014 43.7261 62.9014C44.1459 62.9014 44.5659 62.7413 44.8862 62.4208C45.5269 61.7801 45.5269 60.7412 44.8862 60.1007L43.1326 58.3472C42.4921 57.7065 41.4533 57.7065 40.8126 58.3472Z" fill="#1F2937" />
                        <path d="M61.375 96.3311V98.0846C61.375 98.9906 62.1096 99.7252 63.0156 99.7252C63.9217 99.7252 64.6562 98.9906 64.6562 98.0846V96.3311C64.6562 95.425 63.9217 94.6904 63.0156 94.6904C62.1096 94.6904 61.375 95.425 61.375 96.3311Z" fill="#1F2937" />
                        <path d="M53.6522 32.6112L55.4057 30.8577C56.0464 30.217 56.0464 29.1782 55.4057 28.5377C54.765 27.8969 53.7261 27.8969 53.0856 28.5377L51.3321 30.2912C50.6914 30.9319 50.6914 31.9707 51.3321 32.6112C51.6524 32.9315 52.0724 33.0918 52.4921 33.0918C52.9119 33.0918 53.3319 32.9315 53.6522 32.6112Z" fill="#1F2937" />
                        <path d="M80.8453 26.1989L85.2993 27.8693C86.0815 28.1626 86.9023 28.3081 87.7213 28.3081C88.8279 28.3081 89.9313 28.0425 90.9307 27.5175C92.67 26.6042 93.941 24.9872 94.4174 23.0813L96.0049 16.7309C96.6145 14.2925 95.8931 11.8008 94.0751 10.0652C92.2568 8.3294 89.7342 7.72456 87.3266 8.44687L81.7883 10.1085C79.2869 10.8588 77.3932 13.008 76.964 15.584L76.4609 18.6026C75.9202 21.8488 77.764 25.0435 80.8453 26.1989ZM79.6977 19.1422L80.2009 16.1237C80.426 14.7725 81.4193 13.645 82.7314 13.2515L88.2697 11.5899C88.6205 11.4847 88.976 11.4333 89.3269 11.4333C90.2391 11.4333 91.1206 11.7813 91.8095 12.4388C92.763 13.3491 93.1414 14.6561 92.8218 15.9351L91.2344 22.2855C90.9806 23.3 90.3312 24.1265 89.4054 24.6125C88.4797 25.0986 87.4308 25.1642 86.4514 24.7971L81.9975 23.1268C80.3811 22.5206 79.414 20.845 79.6977 19.1422Z" fill="#1F2937" />
                        <path d="M93.4783 34.5495C91.0438 35.7666 89.9768 38.6797 91.0488 41.1815L92.7527 45.1569C93.4638 46.8159 94.9546 47.9621 96.7407 48.2229C96.9945 48.2599 97.2475 48.278 97.4985 48.278C99.0135 48.278 100.447 47.6141 101.439 46.4245L104.18 43.1354C105.092 42.0406 105.503 40.6581 105.338 39.2427C105.172 37.8274 104.454 36.5768 103.313 35.722L100.987 33.9768C99.4169 32.7992 97.3512 32.6129 95.5958 33.4907L93.4783 34.5495ZM97.0636 36.4255C97.3298 36.2922 97.6157 36.2266 97.9001 36.2266C98.2951 36.2266 98.6869 36.3535 99.0179 36.6016L101.345 38.3467C101.758 38.6567 102.019 39.1102 102.079 39.6234C102.138 40.1366 101.989 40.6379 101.659 41.0348L98.9177 44.3239C98.4924 44.8342 97.8714 45.0718 97.2143 44.9758C96.557 44.8799 96.03 44.4746 95.7684 43.8641L94.0645 39.8887C93.6758 38.9816 94.0628 37.9252 94.9454 37.484L97.0636 36.4255C97.0634 36.4255 97.0634 36.4255 97.0636 36.4255Z" fill="#1F2937" />
                        <path d="M106.851 29.5846C109.689 29.5846 111.999 27.2753 111.999 24.437C111.999 21.5987 109.689 19.2896 106.851 19.2896C104.012 19.2896 101.703 21.5989 101.703 24.4372C101.703 27.2755 104.012 29.5846 106.851 29.5846ZM106.851 22.5708C107.88 22.5708 108.717 23.4082 108.717 24.4372C108.717 25.4662 107.88 26.3036 106.851 26.3036C105.822 26.3036 104.984 25.4662 104.984 24.4372C104.984 23.408 105.822 22.5708 106.851 22.5708Z" fill="#1F2937" />
                        <path d="M107.356 61.2078C106.607 61.3176 105.848 61.3734 105.098 61.3734C98.1701 61.3734 92.0919 56.942 89.9726 50.3458C89.3932 48.5426 87.9092 47.2085 86.0999 46.864C73.6736 44.4982 64.6545 33.5911 64.6545 20.9294C64.6545 15.7008 66.1858 10.6425 69.0831 6.30158C69.7186 5.34936 69.8378 4.15411 69.402 3.10411C68.9654 2.05214 68.0324 1.29111 66.9065 1.06821C61.3249 -0.0371365 55.5978 -0.285855 49.8854 0.329488C38.4535 1.56039 27.7984 6.27555 19.0716 13.9659C18.3917 14.5649 18.3263 15.6017 18.9255 16.2814C19.5244 16.9611 20.5613 17.0267 21.2409 16.4275C29.4563 9.18799 39.4827 4.74955 50.2365 3.59214C55.6195 3.01246 61.0136 3.24652 66.2691 4.28733C66.3074 4.29499 66.3496 4.30986 66.3715 4.36236C66.392 4.41202 66.3752 4.44855 66.3538 4.48049C63.0955 9.36255 61.3733 15.0507 61.3733 20.9296C61.3733 35.1648 71.5143 47.4275 85.4861 50.0875C86.1148 50.2071 86.6369 50.6908 86.8487 51.3496C89.4054 59.3078 96.7394 64.6547 105.098 64.6547C106.007 64.6547 106.927 64.5871 107.833 64.4541C107.954 64.4361 108.016 64.5077 108.018 64.5258C106.437 74.2514 102.14 83.3307 95.5923 90.7824C94.9943 91.4631 95.0612 92.4998 95.7419 93.0979C96.0534 93.3715 96.4398 93.506 96.8243 93.506C97.28 93.506 97.733 93.3175 98.0574 92.9484C105.012 85.0332 109.577 75.3872 111.257 65.0528C111.428 64.0019 111.096 62.9629 110.347 62.2016C109.575 61.4176 108.457 61.0462 107.356 61.2078Z" fill="#1F2937" />
                        <path d="M90.7836 95.5946C81.1638 104.058 68.811 108.718 56.0004 108.718C48.616 108.718 41.4743 107.222 34.7733 104.27C28.2992 101.419 22.5428 97.354 17.6644 92.1878C12.7937 87.0299 9.07149 81.0626 6.60093 74.4515C4.03193 67.5767 2.9454 60.3229 3.3713 52.8918C4.03521 41.3081 8.6738 30.0683 16.4324 21.2424C17.0307 20.5618 16.964 19.5252 16.2835 18.9271C15.6031 18.3288 14.5663 18.3953 13.9682 19.0761C5.7279 28.4495 0.801209 40.392 0.0955215 52.7041C-0.356635 60.5929 0.797928 68.2961 3.52749 75.6002C6.15227 82.6238 10.106 88.9628 15.279 94.4405C20.4601 99.9272 26.5741 104.245 33.451 107.273C40.5713 110.409 48.158 111.999 56.0004 111.999C69.6092 111.999 82.7318 107.048 92.951 98.0579C93.6313 97.4594 93.6975 96.4228 93.099 95.7425C92.5008 95.0624 91.4639 94.9961 90.7836 95.5946Z" fill="#1F2937" />
                    </svg>
                    </div>
                    <div className="mt-12">
                        <h1 role="main" className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-center text-gray-800">Something went wrong</h1>
                    </div>
                    <div className="mt">
                        <p className="mt-6 sm:w-80 text-base dark:text-white leading-7 text-center text-gray-800">{error}</p>
                    </div>
                    <button onClick={()=>{
                        setShowError(false)
                        console.log(showError);
                    }} className="text-gray-800 dark:text-gray-400 absolute top-8 right-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800" aria-label="close">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>} */}

        <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="bg-blue-500 w-full h-14 p-2 flex justify-between space-x-2">
                <div className="flex space-x-2">
                    <img src="https://i.pinimg.com/474x/ff/0d/f4/ff0df44c4cd43c7cd964e36b4354e56b.jpg" alt="profil" className="w-full flex-shrink-0 h-10 w-10 rounded-full bg-gray-300" />
                    <span>
                        <h1 className="text-sm">Nurul Izzati</h1>
                        <span className="flex space-x-1">
                            <div className="rounded-full bg-green-500 h-4 w-4"></div> {loading ? <div className="text-xs text-white">Typing...</div> : <p className="text-xs text-white">Always online for you</p>}
                        </span>
                    </span>
                </div>
                {/* <div>
                    setting
                </div> */}
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