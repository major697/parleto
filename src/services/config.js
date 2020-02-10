export const OptionsToasted = {
   className: 'info--modal',
   position: 'bottom-left',
   duration: 15000,
   action: [
      {
         text: 'Zamknij',
         onClick: (e, toastObject) => {
            toastObject.goAway(0);
         },
      },
   ],
};
