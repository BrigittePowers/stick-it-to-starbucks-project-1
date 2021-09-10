//Find if zip code is US zip code//

function is_usZipCode(str) {
 regexp = /^[0-9]{5}(?:-[0-9]{4})?$/;
  
        if (regexp.test(str))
          {
            return true;
          }
        else
          {
            return false;
          }
}

console.log(is_usZipCode("78254"));

console.log(is_usZipCode("1234"));

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