import { defineStore } from "pinia";

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
        isLoggedInState: !!localStorage.getItem('userInfo'), // Renaming state property to avoid conflict
    }),
    actions: {
        setUserInfo(userInfo) {
            this.userInfo = userInfo;
            this.isLoggedInState = !!userInfo; // Adjusting accordingly
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
        },
    },
    getters: {
        getUserInfo: (state) => state.userInfo,
        isLoggedIn: (state) => state.isLoggedInState, // Renaming the getter
    },
});
