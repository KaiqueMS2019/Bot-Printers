import React, { createContext, useContext, useState} from 'react';

const StatusDownloadContext = createContext();

const StatusDownloadProvider =  ({children}) => {
    const [statusDownload, setStatusDownload] = useState(0);
    return <StatusDownloadContext.Provider value={{statusDownload, setStatusDownload}}>{children}</StatusDownloadContext.Provider>;
}

export const useStatusDownload = () => {
    const context = useContext(StatusDownloadContext);
    const {statusDownload, setStatusDownload} = context;
    return  {statusDownload, setStatusDownload};
}

export default StatusDownloadProvider;