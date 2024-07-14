import React from 'react';
import { useTranslation } from 'react-i18next';

import PaymentQRCode from './PaymentsPage';

const MyComponent: React.FC = () => {
  // const { t, i18n } = useTranslation();

  // const changeLanguage = (language: string) => {
  //   i18n.changeLanguage(language);
  // };

  return (
    <div>
      {/* <div>
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('te')}>Telugu</button>
      </div>
      <h1>{t('welcome')}</h1>
      <p>{t('description')}</p> */}
    </div>
  );
}

export default MyComponent;
