function convert_hex() {
	var input = document.getElementById("hex").value;
	var bin_arr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var bin_str;
	var i;
	
	for(i=0; i<input.length; i++)
		if(input.substring(i,i+1) != "0" && input.substring(i,i+1) != "1" && input.substring(i,i+1) != "2" && input.substring(i,i+1) != "3"
		&& input.substring(i,i+1) != "4" && input.substring(i,i+1) != "5" && input.substring(i,i+1) != "6" && input.substring(i,i+1) != "7"
		&& input.substring(i,i+1) != "8" && input.substring(i,i+1) != "9" && input.substring(i,i+1) != "A" && input.substring(i,i+1) != "B"
		&& input.substring(i,i+1) != "C" && input.substring(i,i+1) != "D" && input.substring(i,i+1) != "E" && input.substring(i,i+1) != "F"
		&& input.substring(i,i+1) != "a" && input.substring(i,i+1) != "b" && input.substring(i,i+1) != "c" && input.substring(i,i+1) != "d"
		&& input.substring(i,i+1) != "e" && input.substring(i,i+1) != "f")
			flag = 1
		
	if(flag != 1 && input.length > 16)
		flag = 2
	else if(flag != 1 && input.length < 16)
		flag = 3
	
	if(flag == 1) // input other than 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A/a, B/b, C/c, D/d, E/e, F/f
	{
		converted = "Invalid Input";
		document.getElementById("special").innerHTML = "Please enter 16 Hexadecimal digits.";
	}
	else if(flag == 2) // more than 16 hexadecimal digits
	{
		converted = "Exceeded Limit";
		document.getElementById("special").innerHTML = "More than 16 Hexadecimal digits.";
	}
	else if(flag == 3) // more than 16 hexadecimal digits
	{
		converted = "Lacking Digits";
		document.getElementById("special").innerHTML = "Less than 16 Hexadecimal digits.";
	}
	else // no input error
	{
		// turning hex to bin
		for(i=0; i<input.length; i++)
			bin_arr[i] = hex_to_bin(input.substring(i,i+1));
		// concatenates to one string
		bin_str = bin_arr[0].concat(bin_arr[1],bin_arr[2],bin_arr[3],
			bin_arr[4],bin_arr[5],bin_arr[6],bin_arr[7],bin_arr[8],
			bin_arr[9],bin_arr[10],bin_arr[11],bin_arr[12],
			bin_arr[13],bin_arr[14],bin_arr[15]);
			
		var converted;
		var sign = bin_str.substring(0,1); // gets first binary bit
		var exponent = bin_to_dec(bin_str.substring(1, 12)); // gets 11-digit binary and translates it to binary
		var mantissa = exponent - 1023
		var fraction = bin_str.substring(12,64); // gets last 52 binary bit
		var fractional = 0;
		var flag = 0;
		var i;
		
		document.getElementById("special").innerHTML = " ";
		
		if(exponent == 0 && bin_to_dec(fraction) == 0) // Zero
		{
			converted = 0.0;
			if(sign == "1")
				document.getElementById("special").innerHTML = "Special Case: (Negative) Zero";
			else if(sign == "0")
				document.getElementById("special").innerHTML = "Special Case: (Positive) Zero";
		}
		else if(exponent == 2047 && bin_to_dec(fraction) == 0) // Infinity
		{
			converted = 1.0 * Math.pow(2,2047);
			if(sign == "1")
				document.getElementById("special").innerHTML = "Special Case: (Negative) Infinity";
			else if(sign == "0")
				document.getElementById("special").innerHTML = "Special Case: (Positive) Infinity";
		}
		else if(exponent == 0 && bin_to_dec(fraction) != 0) // Denormalized
		{
			for(i=0; i<52; i++)
				if(fraction.substring(i,i+1) == "1") // gets 1 current bit from the 52 bits
					fractional += (Math.pow(2, -(i+1))) // if current bit is 1 get 2 ^ -(fractional place)
					
			mantissa = -1022
					
			if(sign == "1")
				converted = -((0 + fractional) * (Math.pow(2,mantissa)));
			else if(sign == "0")
				converted = (0 + fractional) * (Math.pow(2,mantissa));
			
			document.getElementById("special").innerHTML = "Special Case: Denormalized";
		}
		else if(exponent == 2047 && bin_to_dec(fraction) != 0) // NaN
		{
			converted = NaN;
			if(fraction.substring(0,1) == "0")
				document.getElementById("special").innerHTML = "Special Case: sNaN";
			else if(fraction.substring(0,1) == "1")
				document.getElementById("special").innerHTML = "Special Case: qNaN";
		}
		else // Normalized
		{
			for(i=0; i<52; i++)
				if(fraction.substring(i,i+1) == "1") // gets 1 current bit from the 52 bits
					fractional += (Math.pow(2, -(i+1))) // if current bit is 1 get 2 ^ -(fractional place)
			
			if(sign == "1")
				converted = -((1 + fractional) * (Math.pow(2,mantissa)));
			else if(sign == "0")
				converted = (1 + fractional) * (Math.pow(2,mantissa));
		}
	}		
	
	document.getElementById("ans").value = converted;
};

function convert_bin() {
	var input = document.getElementById("bin").value;

	var converted;
	var sign = input.substring(0,1); // gets first binary bit
	var exponent = bin_to_dec(input.substring(1, 12)); // gets 11-digit binary and translates it to binary
	var mantissa = exponent - 1023
	var fraction = input.substring(12,64); // gets last 52 binary bit
	var fractional = 0;
	var flag = 0;
	var i;
	
	for(i=0; i<input.length; i++)
		if(input.substring(i,i+1) != "1" && input.substring(i,i+1) != "0")
			flag = 1
		
	if(flag != 1 && input.length > 64)
		flag = 2
	else if(flag != 1 && input.length < 64)
		flag = 3
	
	if(flag == 1) // input other than 0 and 1
	{
		converted = "Invalid Input";
		document.getElementById("special").innerHTML = "Please enter 64-bit binary.";
	}
	else if(flag == 2) // more than 64 bits
	{
		converted = "Exceeded Limit";
		document.getElementById("special").innerHTML = "More than 64 Binary digits.";
	}
	else if(flag == 3) // less than 6 bits
	{
		converted = "Lacking Bits";
		document.getElementById("special").innerHTML = "Less than 64 Binary digits.";
	}
	else // no input error
	{
		document.getElementById("special").innerHTML = " ";
		
		if(exponent == 0 && bin_to_dec(fraction) == 0) // Zero
		{
			converted = 0.0;
			if(sign == "1")
				document.getElementById("special").innerHTML = "Special Case: (Negative) Zero";
			else if(sign == "0")
				document.getElementById("special").innerHTML = "Special Case: (Positive) Zero";
		}
		else if(exponent == 2047 && bin_to_dec(fraction) == 0) // Infinity
		{
			converted = 1.0 * Math.pow(2,2047);
			if(sign == "1")
				document.getElementById("special").innerHTML = "Special Case: (Negative) Infinity";
			else if(sign == "0")
				document.getElementById("special").innerHTML = "Special Case: (Positive) Infinity";
		}
		else if(exponent == 0 && bin_to_dec(fraction) != 0) // Denormalized
		{
			for(i=0; i<52; i++)
				if(fraction.substring(i,i+1) == "1") // gets 1 current bit from the 52 bits
					fractional += (Math.pow(2, -(i+1))) // if current bit is 1 get 2 ^ -(fractional place)
					
			mantissa = -1022
					
			if(sign == "1")
				converted = -((0 + fractional) * (Math.pow(2,mantissa)));
			else if(sign == "0")
				converted = (0 + fractional) * (Math.pow(2,mantissa));
			
			document.getElementById("special").innerHTML = "Special Case: Denormalized";
		}
		else if(exponent == 2047 && bin_to_dec(fraction) != 0) // NaN
		{
			converted = NaN;
			if(fraction.substring(0,1) == "0")
				document.getElementById("special").innerHTML = "Special Case: sNaN";
			else if(fraction.substring(0,1) == "1")
				document.getElementById("special").innerHTML = "Special Case: qNaN";
		}
		else // Normalized
		{
			for(i=0; i<52; i++)
				if(fraction.substring(i,i+1) == "1") // gets 1 current bit from the 52 bits
					fractional += (Math.pow(2, -(i+1))) // if current bit is 1 get 2 ^ -(fractional place)
			
			if(sign == "1")
				converted = -((1 + fractional) * (Math.pow(2,mantissa)));
			else if(sign == "0")
				converted = (1 + fractional) * (Math.pow(2,mantissa));
		}
	}

	document.getElementById("ans").value = converted;
};

function bin_to_dec(bstr) { 
    return parseInt((bstr + '').replace(/[^01]/gi, ''), 2);
}

function hex_to_bin(hex){
    return (parseInt(hex, 16).toString(2)).padStart(4, '0');
}