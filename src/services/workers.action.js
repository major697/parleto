export const getSection = data => {
   let section = [];
   data.forEach(worker => {
      if (section.indexOf(worker.section) < 0) {
         section.push(worker.section);
      }
   });
   return section;
};
