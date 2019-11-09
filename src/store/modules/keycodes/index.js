import ansi from './ansi';
import iso_jis from './iso-jis';
import quantum from './quantum';
import settings from './kb-settings';
import media from './app-media-mouse';
import steno from './steno';
import bmp from './bmp';
const state = {
  keycodes: [...ansi, ...iso_jis, ...quantum, ...settings, ...media, ...bmp]
};

const getters = {
  keycodes: state => state.keycodes,
  lookupKeyPressCode: (state, getters) => searchTerm =>
    getters.lookupKeycode(searchTerm, true),
  lookupKeycode: state => (searchTerm, isKeys = false) => {
    var found = state.keycodes.find(({ code, keys }) => {
      return code === searchTerm || (isKeys && keys && keys === searchTerm);
    });
    return found;
  }
};

const actions = {};
const mutations = {
  enableSteno(state) {
    state.keycodes = [
      ...ansi,
      ...iso_jis,
      ...quantum,
      ...settings,
      ...media,
      ...steno
    ];
  },
  disableSteno(state) {
    state.keycodes = [
      ...ansi,
      ...iso_jis,
      ...quantum,
      ...settings,
      ...media,
      ...bmp
    ];
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
