function upload() {
    const inputUploadImage = document.getElementById('inputUploadImage');
    const file = inputUploadImage.files[0];
    
    const fileName = file.name;
    const imgPath = `./img/prod/${fileName}`;
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = function () {
      localStorage.setItem('imgPath', imgPath);
      const imgData = reader.result;
      localStorage.setItem('imgData', imgData);
    };
    
    const formData = new FormData();
    formData.append('image', file, fileName);
    
    fetch(imgPath, {
      method: 'POST',
      body: formData
    })
    .then(response => {
      alert('Image uploaded successfully');
    })
    .catch(error => {
      alert('Error uploading image', error);
    });
  }
  