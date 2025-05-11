import { ReactNode } from 'react';
import Modal from '../../modals/Modal';
import Card from '../../cards/Card';
import Slot from '../../Slot';
import CardTitle from '../../CardTitle';
import FormButton from '../../form/FormButton';
import IconClose from '../../icons/IconClose';
import FormButtonNew from '../../form/FormButtonNew';

const WarningModel = ({
  isActive,
  title,
  msg,
  submitLabel = 'Yes, delete',
  cancelLabel = 'No, cancel',
  onReject,
  onCancel,
  onAllow,
}: {
  isActive: boolean;
  title: string;
  msg: string;
  children?: ReactNode;
  submitLabel?: string;
  cancelLabel?: string;
  onCancel: () => void;
  onAllow: () => void;
  onReject: () => void;
}) => (
  <Modal isActive={isActive} onCancel={onCancel}>
    <Card>
      <Slot slot='header'>
        <CardTitle className='has-text-danger'>{title}</CardTitle>
        <span className='is-clickable' onClick={onCancel}>
          <IconClose />
        </span>
      </Slot>
      <Slot slot='body'>
        <div className='panel-block is-block'>
          <div className='columns is-mobile'>
            <div className='column is-8'>
              <p>{msg}</p>
            </div>
          </div>
        </div>
      </Slot>
      <Slot slot='footer'>
        <FormButtonNew
          type="button"
          onClick={onReject}
          className='mr-3'
        >
          {cancelLabel}
        </FormButtonNew>
        <FormButtonNew
          type="button"
          onClick={onAllow}
          variant="active"
          color='is-danger'
        >
          {submitLabel}
        </FormButtonNew>
      </Slot>
    </Card>
  </Modal>
);

export default WarningModel;
