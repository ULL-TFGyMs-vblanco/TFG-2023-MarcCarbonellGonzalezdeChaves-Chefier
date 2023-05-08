import { Button, Modal } from '@nextui-org/react';
import { Dispatch, SetStateAction } from 'react';
import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoWarningOutline,
} from 'react-icons/io5';

interface CustomModalProps {
  type: 'success' | 'error' | 'warning';
  title: string;
  children: string;
  visible: boolean;
  handler: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  children,
  title,
  type,
  visible,
  handler,
  onClose,
}) => {
  return (
    <Modal
      closeButton
      preventClose
      data-testid='modal'
      open={visible}
      onClose={handler.bind(this, false)}
    >
      <Modal.Header
        color='success'
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {type === 'success' && (
          <IoCheckmarkCircleOutline color='green' size={75} />
        )}
        {type === 'error' && <IoCloseCircleOutline color='red' size={75} />}
        {type === 'warning' && <IoWarningOutline color='orange' size={75} />}
        <h1 style={{ fontSize: '1.25rem' }}>{title}</h1>
      </Modal.Header>
      <Modal.Body
        style={{
          textAlign: 'center',
        }}
      >
        <p>{children}</p>
      </Modal.Body>
      <Modal.Footer>
        {type === 'warning' ? (
          <>
            <Button
              auto
              flat
              color='error'
              onPress={onClose}
              data-testid='close-modal'
            >
              Si
            </Button>
            <Button
              auto
              flat
              color={type}
              onPress={() => handler(false)}
              data-testid='close-modal'
            >
              No
            </Button>
          </>
        ) : (
          <Button
            auto
            flat
            color={type}
            onPress={onClose}
            data-testid='close-modal'
          >
            Aceptar
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
