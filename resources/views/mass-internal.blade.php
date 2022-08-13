<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

        <!-- Styles -->

        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            body {
                font-family: 'Nunito', sans-serif;
            }
        </style>
    </head>
    <body class="antialiased">


            <div class="max-w-6xl mx-auto sm:px-6 lg:px-8">

                <div class="mt-8 bg-white overflow-hidden shadow ">
                    <label>File(s) Uploaded</label>
                    <form enctype='multipart/form-data' class="flex flex-col gap-4">
                        <input id="uploads" type="file" name="uploads" multiple="multiple" class="border"/>
                         <button id="buploads" type='submit' class="bg-orange-600 text-white">Submit</button>
                    </form>
                </div>

                 <div class="mt-8 bg-white overflow-hidden shadow ">
                    <label>List to be  Uploaded (.xlsx)</label>
                    <form enctype='multipart/form-data' class="flex flex-col gap-4">
                        <input id="list" type="file" name="list"  class="border"/>
                         <button id="blist" type='submit' class="bg-orange-600 text-white">Submit</button>
                    </form>
                </div>


            </div>


        <script type="text/javascript">
            var fileList = [];
            document.querySelector('#buploads').addEventListener('click',function(e){
                e.preventDefault();
                fileInputElement = document.querySelector('#uploads')

                formData = new FormData();
                for (const file of fileInputElement.files) {

                    formData.append("files[]",file,file.name );
                }

                fetch('/api/massal/upload',{
                    method:'POST',
                    body:formData,

                })
                .then(res => res.json())
                .then((res) => {
                    res.forEach((item)=>{
                        fileList.push(item)
                    })

                    console.log(fileList);
                });
            });

            document.querySelector('#blist').addEventListener('click',function(e){
                e.preventDefault();
                fileInputElement = document.querySelector('#list');

                formData = new FormData();
                formData.append("files",fileInputElement.files[0],fileInputElement.files[0].name );
                formData.append("list",JSON.stringify(fileList));

                 fetch('/api/massal/import',{
                    method:'POST',
                    body:formData,

                })
                .then(res => res.json())
                .then((res) => {
                    console.log(res);
                });

            });
        </script>
    </body>
</html>
