let store = null;
let isInternetConnected = false;
let topLoaderRef = null;
let sessionCompleteModal = null;
let traineAlertModal = null;
function setStore(value) {
  store = value;
}

function getStore() {
  return store;
}

function getStoreState() {
  return store?.getState() ?? {};
}

function dispatchAction(action) {
  const { dispatch } = store;
  dispatch(action);
}

function setInternetConnected(connected) {
  isInternetConnected = connected;
}

function getIsInternetConnected() {
  return isInternetConnected;
}

function setTopLoaderRef(value) {
  topLoaderRef = value;
}

function getTopLoaderRef() {
  return topLoaderRef;
}

function setSessionCompleteModal(ref) {
  sessionCompleteModal = ref;
}

function getSessionCompleteModal() {
  return sessionCompleteModal;
}
function setTraineAlertModal(ref) {
  traineAlertModal = ref;
}

function getTraineAlertModal() {
  return traineAlertModal;
}

export default {
  setStore,
  getStore,
  setInternetConnected,
  getIsInternetConnected,
  getStoreState,
  dispatchAction,
  setTopLoaderRef,
  getTopLoaderRef,
  setSessionCompleteModal,
  getSessionCompleteModal,
  setTraineAlertModal,
  getTraineAlertModal,
};
