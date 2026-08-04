const gameStateKey = "game-state";

// export function clearGameState() {
//   return new Promise(function (resolve, reject) {
//     try {
//       localStorage.removeItem(gameStateKey);
//       resolve();
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

export async function clearGameState() {
  localStorage.removeItem(gameStateKey);
}

// export function getGameState() {
//   return new Promise(function (resolve, reject) {
//     try {
//       const state = JSON.parse(localStorage.getItem(gameStateKey));
//       resolve(state);
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

export async function getGameState() {
  return JSON.parse(localStorage.getItem(gameStateKey));
}

// export function saveGameState(stateObj) {
//   return new Promise(function (resolve, reject) {
//     try {
//       localStorage.setItem(gameStateKey, JSON.stringify(stateObj));
//       resolve();
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

export async function saveGameState(stateObj) {
  localStorage.setItem(gameStateKey, JSON.stringify(stateObj));
}
