import React, { useEffect } from 'react';
import AdyenCheckout from '@adyen/adyen-web';
import '@adyen/adyen-web/dist/adyen.css';

const Adyen = () => {
    useEffect(() => {
        const initializeCheckout = async () => {
            const sessionData = "Ab02b4c0!BQABAgBGKWIlpETHBwYi97ZaHRBPvbuQw6YARR2a+tkcUyzsxFoDxwuVtGrcseElwkxB9BYz2aVo/Q0YzkgEFBJd/4NbATDzf2RL2uZHuyDtY5otgeV+Cf4kiFhRxT9bezeP7Vp4MYFYSZGLB/32H6BbP3zsTqd7KVn+5bucGznfX4bzSF9QhQxkWfxSvsfIT2ePYKFOk7DQYASvQvZFWJkB+XasjNeiKi+eh7XHLYpa8RrbBxnksZHXlSe48Ktc1WLKMP1D80AY4OuiLrw7uruYWALLBt6Q48KYhWw6770h7YwUZxptTfN4RTnsXgx75R9TACMf5z8fR0IesgTqt00qIEGO/eQKv9Bs6H91QU0FEr25u4Tyt9LmwFD8DR6+zvR+D4FPrvtA5vt2zgiECgJvNDOJuuspyaf02NV0Xvf2vgEe8cMENRWsQwNJSbSe1kgGGJlmnwajQmPH5jk+57Vtw1XGBwStntCXJ7t8c0/mBmrwhxd+tgzbYRuaWFyWIGbXoUVV9+glIa1pXeCZRvBkaIo3Ws+b8kSuDekN456rusq672cIqwGVQJqpVXd7Hg9LxX8LV5D3l8s9j3yKkPBV0RYZFbK1YQL5sVNkQUatUtFkLa5WR8d+kKS7jFCFohK4t3G74LfSaEXg+wRNC7sCFimbLZATgvV9dxqqGMpu8aEUugzto//dBPlyogKJCa0ASnsia2V5IjoiQUYwQUFBMTAzQ0E1MzdFQUVEODdDMjRERDUzOTA5QjgwQTc4QTkyM0UzODIzRDY4REFDQzk0QjlGRjgzMDVEQyJ92kUuC1mEKp3z61NtNnSh8VPeeh+1aBeAWNyYjpko50+j/jrtE8nRXh+Qs18O4Dj2bf+KeWvKgdSz/FAjOzWoMWCTXoLw6ockBhYRzi8+3D1a1rnZ3o++CaivncYs/Ef1/ZaFstAbn7osru+M4KRWzWQIMe3BryyVCn8V6muODXDzxnlkpE72aruprMJNTnPiGtcGu5VEZqv5QfW9OjGVg4GG4lL6rLs12yXg3VD5yIhxpT/cJd4MXmF7Zj1ZoBsLpAJi+53LffYXFHCuAO4q82oQOu6lqlTSC6+J2/sYpLTQYVAFuoYMNibqcwfequ+VIwgmAh9G7tYJSAItmaEq4PeUyIlrhDk1bGo61oNX+geum5mhM740CX04QS+Pkia2kGEEsXg9RIUuyKGWTFUW+UGJTWZ+a3FZwos1JDFIHFKyaP6aZx9Bf7hWGjSZIhZdQfsxYnsLBdOOhXH8StCJD0sB8G7+bX3ZWkGZs9jC2wX99FYd9diw3pXG7/UF2rEmtP/hbuwRub3E8eaRDCFSgw2Bhorspgsod0fbMjQ49bb9zvl6PJO/pOw/P9iNmUK6ypYLhPYw6V3r2OqIat9LXsNFROQouUFFFbWj9+9hMsjddIrBlyhBlFK/zzOwXrPltvOj+BzgtwG1Hchb49FC8mm2qW4R";
            
            const configuration = {
                clientKey: 'test_LYWLUCQIZRBAXDX3KW64ELAVXQIJBTF7', // Replace with your Adyen Client Key
                environment: 'test', // Use 'live' for the live environment
                session: {
                    id: sessionData
                },
                onPaymentCompleted: (result, component) => {
                    console.log(result, component);
                    // Handle the result of the payment
                },
                onError: (error, component) => {
                    console.error(error.name, error.message, error.stack, component);
                    // Handle any errors
                }
            };

            const checkout = await AdyenCheckout(configuration);
            checkout.create('dropin').mount('#dropin-container');
        };

        initializeCheckout();
    }, []);

    return (
        <div className="App">
            <h1>Adyen Payment</h1>
            <div id="dropin-container"></div>
        </div>
    );
};

export default Adyen;
