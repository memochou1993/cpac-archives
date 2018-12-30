import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Cache from './helpers/Cache';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    groups: [],
    category: '',
    albums: [],
  },
  mutations: {
    setGroups(state, groups) {
      state.groups = groups;
    },
    setCategory(state, category) {
      state.category = category;
    },
    setAlbums(state, albums) {
      state.albums = albums;
    },
  },
  actions: {
    fetchGroups(context, { resource, minutes }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: resource,
        })
          .then(({ data }) => {
            context.commit('setGroups', data.data);
            Cache.set(resource, data.data, minutes);
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchAlbums(context, { resource, minutes }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: resource,
        })
          .then(({ data }) => {
            context.commit('setAlbums', data.data);
            Cache.set(resource, data.data, minutes);
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});
