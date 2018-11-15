"use strict";

var input = document.querySelector("input[type='file']");
var preview = document.querySelector('.preview');
var button = document.querySelector('.submit');
var form = document.querySelector('form');
var showFormButton = document.querySelector('.showform');

form.style.display = "none";

input.style.opacity = 0;
input.addEventListener('change', updateFileDisplay);

showFormButton.addEventListener('click', showForm);

function showForm() {
  showFormButton.disabled = true;
  form.style.display = 'block';
  button.disabled = true;
}

function deleteFile(event, baseurl, filename) { 
    // override default action
    event.preventDefault();
 
    $.ajax({
        url: baseurl+'?filename='+filename,
        type: "DELETE",
        success: function() {
            console.log("success");
            location.reload(true);   
        }, 
        error: function() {
            console.log("error");
            alert('error');
        }
    });
}

function updateFileDisplay() {

  while(preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }

  var curFiles = input.files;
  if(curFiles.length === 0) {
    var para = document.createElement('p');
    para.textContent = 'No files currently selected for upload';
    preview.appendChild(para);
  } 
  else {
    var list = document.createElement('ol');
    preview.appendChild(list);
    for(var i = 0; i < curFiles.length; i++) {
      var listItem = document.createElement('li');
      var para = document.createElement('p');

      if(validFileType(curFiles[i])) {
        para.textContent = 'File name: ' + curFiles[i].name + ', File size: ' + returnFileSize(curFiles[i].size) + '.';
        listItem.appendChild(para);
        button.disabled = false;
      } 
      else {
        para.textContent = 'File name: ' + curFiles[i].name + ': Not a valid file type. Update your selection.';
        listItem.appendChild(para);
        button.disabled = true;
      }

      list.appendChild(listItem);
    }
  }
}

var fileTypes = [
  'application/x-chrome-extension',
  'text/xml'
]

function validFileType(file) {
  console.log(file.type);
  for(var i = 0; i < fileTypes.length; i++) {
    if(file.type === fileTypes[i]) {
      return true;
    }
  }
  return false;
}

function returnFileSize(number) {
  if(number < 1024) {
    return number + 'bytes';
  } 
  else if(number >= 1024 && number < 1048576) {
    return (number/1024).toFixed(1) + 'KB';
  } 
  else if(number >= 1048576) {
    return (number/1048576).toFixed(1) + 'MB';
  }
}
