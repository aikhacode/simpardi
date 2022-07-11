<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>DISPOSISI</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
    <!-- <link href="{{ asset('css/app.css') }}" rel="stylesheet" type="text/css" /> -->
</head>
<body>
	<style type="text/css">
		table tr td,
		table tr th{
			font-size: 9pt;
		}
	.header{
		width:80%;
        margin: auto;
        text-align: center;
	}	
	.underline{
	text-decoration:underline;
	}

    .table{
        width:80%;
        border-spacing: 0px;
    }
    .table td {
        border:solid 1px black;
    }

    ol{
        padding-left: 12pt;
    }

    h4{
        margin:0;
    }
    .text-center{
        text-align: center;
    }

    .mx-auto{
        margin-left: auto;
        margin-right: auto;
    }

    .flex{
        display: flex;
    }
    .flex-column{
        flex-direction: column;
    }

    .justify-content-center{
        justify-content: center;
    }
	
	</style>
	<div class="flex justify-content-center flex-column">
		
		<img class="header" src="{{ url('/images/header-pusk.jpg') }}"/>
		<h4 class="underline text-center">LEMBAR DISPOSISI</h4>
	
	<table class='mx-auto table '>
		
		<tbody>
			<tr>
				<td>Surat dari <span style="padding-left: 16pt;">:</span><span style="padding-left: 4pt;">joo</span> </td>
				
				<td>Diterima Tanggal <span style="padding-left: 10pt;">:</span><span style="padding-left: 4pt;">joo</span> </td>
				
				
			</tr>
			<tr>
				<td>Tanggal Surat <span style="padding-left: 1pt;">:</span><span style="padding-left: 4pt;">joo</span>  </td>
				
				<td>No Agenda <span style="padding-left: 32pt;">:</span><span style="padding-left: 4pt;">joo</span></td>
				
				
			</tr>
			<tr>
				<td>No Surat <span style="padding-left: 20pt;">:</span><span style="padding-left: 4pt;">joo</span></td>
				
				<td>Diteruskan Kepada <span style="padding-left: 3pt;">:</span><span style="padding-left: 4pt;">joo</span></td>
				
			</tr>
			<tr>
				<td style="vertical-align: baseline;">Perihal :</td>
				
				<td>
					<ol>
						<li></li>
						<li></li>
						<li></li>
					</ol>
					<br/>
					<br/>
				</td>
				
			</tr>
			
		</tbody>
	</table>
	<h4 class="underline text-center" >ISI DISPOSISI</h4>
</div>
 
</body>
</html>