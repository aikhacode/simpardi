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
        margin-left: 10%;
        text-align: center;
	}	
	.underline{
	text-decoration:underline;
	}

    .table{
        width:80%;
        
    }
    .table td {
        border:solid 1px black;
    }

    ol{
        padding-left: 12pt;
    }

    h5{
        margin:0;
    }
  
   
    
	
	</style>
	<div class="d-flex justify-content-center flex-column">
		
		<img class="header" src="{{ url('/images/header-pusk.jpg') }}"/>
		<h5 class="underline text-center mb-4">LEMBAR DISPOSISI</h5>
	
	<table class='mx-auto table '>
		
		<tbody>
			<tr>
				<td>Surat dari <span style="padding-left: 18pt;">:</span><span style="padding-left: 4pt;">{{$data->dari}}</span> </td>
				
				<td>Diterima Tanggal <span style="padding-left: 12pt;">:</span><span style="padding-left: 4pt;">{{\Carbon\Carbon::parse( $data->tgl_terima )->format('d-m-Y') }}</span> </td>
				
				
			</tr>
			<tr>
				<td>Tanggal Surat <span style="padding-left: 1pt;">:</span><span style="padding-left: 4pt;">{{\Carbon\Carbon::parse( $data->tgl_surat )->format('d-m-Y') }}</span>  </td>
				
				<td>No Agenda <span style="padding-left: 36pt;">:</span><span style="padding-left: 4pt;">{{$data->no_agenda}}</span></td>
				
				
			</tr>
			<tr>
				<td>No Surat <span style="padding-left: 22pt;">:</span><span style="padding-left: 4pt;">{{$data->no_surat}}</span></td>
				
				<td>Diteruskan Kepada <span style="padding-left: 5pt;">:</span><span style="padding-left: 4pt;"></span></td>
				
			</tr>
			<tr>
				<td style="vertical-align: baseline;">Perihal :</td>
				
				<td>
					1.<br/>2.<br/>3.<br/>
					<br/><br/>
				</td>
				
			</tr>
			
		</tbody>
	</table>
	<h5 class="underline text-center" >ISI DISPOSISI</h5>
</div>
 
</body>
</html>