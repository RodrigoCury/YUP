import { useState } from 'react';
import axios from 'axios';
import useDebouncedPromise from './useDebouncedPromise';

const initialRequestInfo = {
    error: null,
    data: null,
    loading: false,
};

export default function useApi(config) {
    const [requestInfo, setRequestInfo] = useState(initialRequestInfo)
    const debouncedAxios = useDebouncedPromise(axios, config.debounceDelay)

    async function call(localConfig) {
        setRequestInfo({
            ...initialRequestInfo,
            loading: true,
        });
        let response = null;
        try {
            response = await debouncedAxios({
                baseURL: 'http://localhost:3340',
                ...config,
                ...localConfig,
            });
            setRequestInfo({
                ...initialRequestInfo,
                data: response.data,
            });
        } catch (error) {
            response = {};
            response.error = error;
            setRequestInfo({
                ...initialRequestInfo,
                error,
            });
        }

        if (config.onCompleted) {
            config.onCompleted(response);
        }
    }

    return [
        call,
        requestInfo
    ]
}
