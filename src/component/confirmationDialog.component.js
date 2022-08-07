import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

const UIConfirmationDialog = ({
  visible,
  onDismiss,
  onCancel = () => {},
  onOk = () => {},
  cancelText = 'Cancel',
  okText = 'Ok',
  content,
}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Content>
          <Text style={styles.contentText}>{content}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              onDismiss();
              onCancel();
            }}
          >
            {cancelText}
          </Button>
          <Button
            onPress={() => {
              onDismiss();
              onOk();
            }}
          >
            {okText}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  contentText: { fontSize: 15, lineHeight: 22 },
});

export default UIConfirmationDialog;
