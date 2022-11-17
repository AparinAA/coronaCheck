const axios = require('axios');

axios.get('https://www.tolunaylar.com.tr')
.then(res => {
    const data = res.data;
    const reg = new RegExp('USD');

   return data.slice(data.search(reg),data.search(reg)+500).match(/\d+\,\d+/g).map( i => +(i.replace(',','.')));
});