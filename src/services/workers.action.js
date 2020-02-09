export const filterText = (dataAll, dataFilter, searchText) => {
   console.log(dataAll);
   console.log(dataFilter);
   console.log(searchText);

   dataAll = dataAll.filter(worker => {
      for (let key in dataFilter) {
         if (
            String(worker[key])
               .toLowerCase()
               .indexOf(searchText.toLowerCase()) !== -1
         ) {
            return true;
         }
      }
      return false;
   });
};
