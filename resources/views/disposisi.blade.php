<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>DISPOSISI</title>
    <link rel="stylesheet" href="{{ asset('css/bootstrap-4.6.2/css/bootstrap.min.css')}}">
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
    .w-80p{
    	width:75%;
    }
    .bt-none{
    	border-top:none!important;
    }

    .w-full{
    	width:100%;
    }




	</style>
	<div class="d-flex justify-content-center flex-column">

		<img class="header" src="{{ url('/images/header-pusk.jpg') }}"/>
		<h5 class="underline text-center mb-4">LEMBAR DISPOSISI</h5>

	<table class='mx-auto table mb-0'>

		<tbody>
			<tr>
				<td>Surat dari <span style="padding-left: 18pt;">:</span><span style="padding-left: 4pt;">{{$data->dari}}</span> </td>

				<td colspan="2">Diterima Tanggal <span style="padding-left: 12pt;">:</span><span style="padding-left: 4pt;">{{\Carbon\Carbon::parse( $data->tgl_terima )->format('d-m-Y') }}</span> </td>


			</tr>
			<tr>
				<td>Tanggal Surat <span style="padding-left: 3pt;">:</span><span style="padding-left: 4pt;">{{\Carbon\Carbon::parse( $data->tgl_surat )->format('d-m-Y') }}</span>  </td>

				<td colspan="2">No Agenda <span style="padding-left: 34pt;">:</span><span style="padding-left: 4pt;">{{$data->no_agenda}}</span></td>


			</tr>
			<tr>
				<td>No Surat <span style="padding-left: 22pt;">:</span><span style="padding-left: 4pt;">{{$data->no_surat}}</span></td>

				<td colspan="2">Diteruskan Kepada <span style="padding-left: 5pt;">:</span><span style="padding-left: 4pt;"></span></td>

			</tr>
			<tr>
				<td style="vertical-align: baseline;">Perihal : {{$data->perihal}}</td>

				<td colspan="2">
						@php
						 $i=1
						@endphp
						@foreach($teruskan as $item)
							{{$i++}}. {{$item}} <br/>
						@endforeach

					<br/><br/>
				</td>

			</tr>


		</tbody>
	</table>
	<table class='mx-auto table '>
		<tr>
			<td class="w-80p bt-none">ISI Disposisi : <br/>{{$data->isi}}</td>
			<td class="bt-none text-center">
				TTD<br/>
				<img class="w-full" src="data:image/png;base64,{{$ttd}}"/>
			</td>
		</tr>
	</table >

</div>

</body>
</html>