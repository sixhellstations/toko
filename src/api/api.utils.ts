import axios, { AxiosResponse } from 'axios';
import { ErrorCallback } from './api.types';

const get = async <SuccessData>(url: string, errorCallback?: ErrorCallback): Promise<SuccessData | null> => {
    let data: SuccessData | null = null;

    await axios
        .get(url)
        .then((response: AxiosResponse<SuccessData>) => {
            data = response.data;
        })
        .catch((error) => {
            if (errorCallback) errorCallback(error);
        });

    return data;
};

export default get;
