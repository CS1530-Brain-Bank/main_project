<!doctype html>
<html>
<head>
<meta charset="utf-8">
	<title>Contacts</title>
	<!-- <script type="application/javascript" src="styleswitcher.js"></script> -->
	<link rel="stylesheet" type="text/css" href="default.css" title="Default" />
	<!-- <link rel="alternate stylesheet" type="text/css" href="blue.css" title="Blue" /> -->
</head>

<body>
	<div id="header">
		<a href="home.html"><button class="nav">Back</button></a>
	</div>
	<div id="container">
		<h1>Contacts Page</h1>
		<div id="content">
			<p>
				<label for="sort">Sort By: </label>
				<select name="sort" id="sort" class="sort">
					<option value="newest">Newest Added First</option>
					<option value="oldest">Oldest Added First</option>
					<option value="alphabetical">Alphabetical (A-Z)</option>
					<option value="reversealpha">Alphabetical (Z-A)</option>
				</select>
				<a href="addContact.html"><button class="add">+</button></a>
			</p>
		</div>
	</div>
	<table>
		<tr>
			<th>Name</th>
			<th>Relationship</th>
		</tr>
		<?php
		$conn = mysqli_connect("localhost", "root", "977EB4CCA8559B0F7C9E920188A7084ED29248CDD12B979C58A19E7ADF57AF80", "contacts");
		if($conn-> connect_error){
			die("Connection failed:". $conn-> connect_error);
		}
		$sql = "SELECT name, relationship FROM contacts WHERE userID = 'userId1'";
		$result = $conn-> query($sql);
		if($result-> num_rows > 0){
			while($row = $result-> fetch_assoc()){
				echo "<tr><tr>". $row["name"] ."</td><td>". $row["relationship"] ."</td></tr>";
			}
			echo "</table>";
		}
		else{
			echo "0 result";
		}
		$conn-> close();
		?>
	</table>
</body>
</html>
