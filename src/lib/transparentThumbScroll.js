export const hiddenScroll = ()=>{
   return {
        "::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },
        "::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "::-webkit-scrollbar-thumb": {
          background: "transparent",
          borderRadius: "10px",
        },
        "::-webkit-scrollbar-thumb:hover": {
          background: "transparent",
        },
      }
}