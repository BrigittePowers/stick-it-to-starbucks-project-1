var search = document.getElementsByTagName('search')[0],
  searchData = {
    searchData: 'Results',
    searchDescription: 'Result Direction'
  },
  localData;

  localStorage.setItem('searchData', JSON.stringify(searchData));

  localData = JSON.parse(localStorage.getItem('searchData'));

  console.log(localData);
  console.log(localStorage.getItem('searchData'));

