import { StyleSheet} from 'react-native';



export default StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f5f7fa', justifyContent: 'center' },
  container: { marginHorizontal: 24, backgroundColor: '#fff', borderRadius: 12, padding: 20, elevation: 2 },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 12, color: '#222' },
  input: {
    height: 48,
    borderRadius: 10,
    backgroundColor: '#fbfdff',
    borderWidth: 1,
    borderColor: '#e6e9ef',
    paddingHorizontal: 12,
    marginBottom: 12,
    justifyContent: 'center',
  },
  inputText: { color: '#222' },
  primaryButton: {
    height: 48,
    borderRadius: 10,
    backgroundColor: '#0f9d58',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  primaryButtonText: { color: '#fff', fontWeight: '600' },
  buttonDisabled: { opacity: 0.6 },
  row: { flexDirection: 'row', justifyContent: 'center', marginTop: 12 },
  muted: { color: '#6b7280' },
  link: { color: '#0f9d58', fontWeight: '600' },

  // modal
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'center', padding: 20 },
  modalCard: { backgroundColor: '#fff', borderRadius: 12, padding: 12, maxHeight: '80%' },
  modalTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8, textAlign: 'center' },
  pickersRow: { flexDirection: 'row', justifyContent: 'space-between' },
  pickerCol: { flex: 1, marginHorizontal: 4, maxHeight: 320 },
  pickerItem: { paddingVertical: 10, paddingHorizontal: 8, borderBottomWidth: 1, borderColor: '#eee' },
  pickerItemActive: { backgroundColor: '#eef7ef' },
  pickerText: { textAlign: 'center' },
  modalActions: { marginTop: 8, alignItems: 'center' },
  btnGhost: { paddingHorizontal: 16, paddingVertical: 8 },
  btnGhostText: { color: '#555' },
});
