import register_success from "../assets/sounds/succes_user_register.mp3";
import register_error from "../assets/sounds/error_user_register.mp3";


export const soundUserRegisterSuccess = () => {
  let snd = new Audio(register_success);
  snd.volume = 0.6;
  snd.play();
};
export const soundUserRegisterError = () => {
  let snd = new Audio(register_error);
  snd.volume = 1;
  snd.play();
};
// export const directorSound = () => {
//   let snd = new Audio(push_sound);
//   snd.volume = 1;
//   snd.play();
// };
// export const msgToAllUsers = () => {
//   let snd = new Audio(push_sound);
//   snd.volume = 1;
//   snd.play();
// };
