import React from 'react'
import CardAnimatePresence from '../../../cards/CardAnimatePresence';
import FormButton from '../../../form/FormButton';
import IconInfoAlert from '../icons/IconInfoAlert';

const Banner = ({ bannerText, bannerButtonText }: { bannerText: string, bannerButtonText: string }) => {
  return (
    <CardAnimatePresence isActive={true}>
      <div
        className="box p-5 is-flex is-flex-wrap-wrap is-align-items-center is-justify-content-space-between has-border-primary"
        style={{ borderWidth: 1, borderStyle: 'solid', marginBottom: 10 }}
      >
        <div className="is-flex is-align-items-center mr-a">
          <IconInfoAlert className='' />
          <span className="is-size-5 has-text-primary ml-5">{bannerText}</span>
        </div>
        <div className="is-fullwidth is-hidden-widescreen my-3"></div>
        <div className="is-flex is-align-items-center ml-a">
          <FormButton variant={['is-ui-button']} className="ml-5">
            {bannerButtonText}
          </FormButton>
        </div>
      </div>
    </CardAnimatePresence>
  );
};

export default Banner;
