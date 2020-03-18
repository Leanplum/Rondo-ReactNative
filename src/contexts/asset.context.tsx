import React, {createContext, useState, useContext} from 'react';

const AssetContext = createContext<any>(undefined);

const AssetProvider = ({children}: {children: any}) => {
  const [path, setPath] = useState('edit.png');

  return (
    <AssetContext.Provider value={{path, setPath}}>
      {children}
    </AssetContext.Provider>
  );
};

const useAssetContext = () => {
  const ctx = useContext(AssetContext);
  if (!ctx) {
    throw new Error('Asset must be consumed inside of Asset Provider');
  }
  return ctx;
};

export {useAssetContext, AssetProvider};
