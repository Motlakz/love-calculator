/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const GoogleAdComponent: React.FC = () => {
    useEffect(() => {
        try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
        console.error(e);
        }
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-1422001850914649"
            data-ad-slot="1509487470"
            data-ad-format="auto"
            data-full-width-responsive="true"
        />
    );
};

export default GoogleAdComponent;
