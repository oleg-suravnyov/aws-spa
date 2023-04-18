import { defineStore } from "pinia";
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    poolData: {
      UserPoolId: "<to be replaced with User Pool ID>",
      ClientId: "<to be replaced with Client ID>",
    },
    userPool: undefined,
    idToken: undefined,
    user: undefined,
    ready: false,
  }),
  actions: {
    init() {
      this.$reset();
      this._init();
    },
    async signUp(user) {
      console.log("[UserStore.signUp]", user);
      const attributeList = [];
      attributeList.push(
        new CognitoUserAttribute({
          Name: "email",
          Value: user.email,
        })
      );
      attributeList.push(
        new CognitoUserAttribute({
          Name: "phone_number",
          Value: user.phone,
        })
      );

      const userPool = this.userPool;

      const result = () =>
        new Promise(function (resolve, reject) {
          userPool.signUp(
            user.login,
            user.pass,
            attributeList,
            null,
            function (err, result) {
              if (err) {
                console.log(
                  "[UserStore.signUp]",
                  err.message || JSON.stringify(err)
                );
                reject();
              }
              resolve();
            }
          );
        });

      try {
        await result();
        return true;
      } catch (e) {
        return false;
      }
    },
    async signIn(user) {
      console.log("[UserStore.signIn]", user);
      const cognitoUser = new CognitoUser({
        Username: user.login,
        Pool: this.userPool,
      });

      const result = () =>
        new Promise(function (resolve, reject) {
          cognitoUser.authenticateUser(
            new AuthenticationDetails({
              Username: user.login,
              Password: user.pass,
            }),
            {
              onSuccess: function (result) {
                console.log("[UserStore.signIn]", result);
                resolve({
                  token: result.idToken.jwtToken,
                  user: result.idToken.payload,
                });
              },
              onFailure: function (err) {
                console.log(
                  "[UserStore.signIn]",
                  err.message || JSON.stringify(err)
                );
                reject();
              },
            }
          );
        });
      try {
        const authenticateUser = await result();
        console.log("[UserStore.signIn]", "authenticateUser", authenticateUser);
        const patch = {};
        patch.idToken = authenticateUser.token;
        patch.user = authenticateUser.user;
        this.$patch(patch);
        return true;
      } catch (e) {
        return false;
      }
    },
    getUser() {
      if (!this.user) {
        return undefined;
      }
      return { name: this.user["cognito:username"], email: this.user.email };
    },
    _init() {
      this.userPool = new CognitoUserPool(this.poolData);
      const patch = {};
      patch.ready = true;
      this.$patch(patch);
    },
  },
});
