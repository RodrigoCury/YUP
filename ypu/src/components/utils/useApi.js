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

        let response

        const finalConfig = {
            baseURL: 'http://localhost:3340',
            ...config,
            ...localConfig,
        }

        const fn = localConfig.debounced ? debouncedAxios : axios

        try {
            response = await fn(finalConfig);

            setRequestInfo({
                ...initialRequestInfo,
                data: response.data,
            });
        } catch (error) {
            response = { error }

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
