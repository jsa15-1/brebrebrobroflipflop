const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const prodImg = document.getElementById('prodImg');
prodImg.src = `../../main/img/prod/${id}.png`;

const prodName = document.getElementById('prodName');
fetch('../../main/item.json')
  .then(response => response.json())
  .then(data => {
    prodName.innerText = data[id];
});
