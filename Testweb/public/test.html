<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>HTML5拖曳多檔案上傳</title>
    <style>
    #dropDIV{
        text-align: center; 
        width: 300px;
        height: 200px;        
        margin: auto;
        border: dashed 2px gray;
         
    }
    img{
        max-height:200px; 
        max-width:300px;
    }
    </style>
    <script>
 
        function dragoverHandler(evt) {
            evt.preventDefault();
        }
        function dropHandler(evt) {//evt 為 DragEvent 物件
            evt.preventDefault();
            var files = evt.dataTransfer.files;//由DataTransfer物件的files屬性取得檔案物件
            var fd = new FormData();
            var xhr = new XMLHttpRequest();
            var up_progress = document.getElementById('up_progress');
            xhr.open('POST', 'upload.php');//上傳到upload.php
            xhr.onload = function() {
                //上傳完成
                up_progress.innerHTML = '100 %, 上傳完成';
            };
            xhr.upload.onprogress = function (evt) {
              //上傳進度
              if (evt.lengthComputable) {
                var complete = (evt.loaded / evt.total * 100 | 0);
                if(100==complete){
                    complete=99.9;
                }
                up_progress.innerHTML = complete + ' %';
              }
            }
 
         
            for (var i in files) {
                if (files[i].type == 'image/jpeg') {
                    //將圖片在頁面預覽
                    var fr = new FileReader();
                    fr.onload = openfile;
                    fr.readAsDataURL(files[i]);
                     
                    //新增上傳檔案，上傳後名稱為 ff 的陣列
                    fd.append('ff[]', files[i]);
                }
            }
            xhr.send(fd);//開始上傳
        }
        function openfile(evt) {
            var img = evt.target.result;
            var imgx = document.createElement('img');
            imgx.style.margin = "10px";
            imgx.src = img;
            document.getElementById('imgDIV').appendChild(imgx);
        }    
    </script>
</head>
<body>
    <div id="dropDIV" ondragover="dragoverHandler(event)" ondrop="dropHandler(event)">
    拖曳圖片到此處上傳
    <div id="up_progress"></div>
    </div>
    <div id="imgDIV"></div>
</body>
</html>