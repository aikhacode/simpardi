<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>SIPARDI - SURAT KELUAR</title>
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




	</style>
	<div class="d-flex justify-content-center flex-column">

		<img class="header" src="{{ url('/images/header-pusk.jpg') }}"/>
		<h5 class="text-center mb-2">LAPORAN REKAPITULASI SURAT KELUAR</h5>
		<h6 class="text-center mb-4">{{$periode}}</h6>

	<table class='mx-auto table '>

		<tbody>
			<tr>

				@foreach($header as $item)
				<td class="text-center font-weight-bold">{{$item[0]}}</td>
				@endforeach


			</tr>
			@foreach($data as $key)
			<tr>



					@foreach($header as $item)
						<td @class([
							'text-center' => ($item[1] == 'no') || ($item[1] == 'no_agenda') || ($item[1] == 'tgl_surat')
							])>
						{{$key[$item[1]]}}</td>
					@endforeach

			</tr>
			@endforeach

		</tbody>
	</table>

</div>

</body>
</html>