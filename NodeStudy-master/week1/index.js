const http=  require('http');
const url = require('url');
const qs = require('querystring');

const app = http.createServer(function(request , response){
    let _url = request.url;

    let paramData;
    let tempData = '';
    if(request.method == 'GET') {
        paramData = url.parse(_url , true).query;
        console.log(paramData);
    } else if(request.method == 'POST') {
        request.on('data' , function(data){
            tempData += data.toString();
        });

        request.on('end' , function(){
            paramData = qs.parse(tempData);
        });
    }
    console.log(paramData);

    setTimeout(function(){
        console.log(paramData);
        response.writeHead(200);

        let temp = `
        <!DOCTYPE html>
<html>
<head>
    <title>CALCULATOR TEST</title>
    <style>
        table {
            border-collapse: collapse;
        }
        td {
            padding: 5px 10px;
            text-align: center;
        }
        input {
            text-align: right;
            border: none;
        }
    </style>
</head>
<body>
    <table border="1">
        <tr>
            <td colspan="3">
                <input type="text" id="display">
            </td>
        </tr>
        <tr>
            <td colspan="3">
                <input type="text" id="result">
            </td>
        </tr>
        <tr>
            <td Onclick="toBinary">Binary</td>
            <td Onclick="toOctal">Octal</td>
            <td Onclick="toHex()">Hex</td>
        </tr>
        <tr>
            <td onclick="add(7)">7</td>
            <td onclick="add(8)">8</td>
            <td onclick="add(9)">9</td>
        </tr>
        <tr>
            <td onclick="add(4)">4</td>
            <td onclick="add(5)">5</td>
            <td onclick="add(6)">6</td>
        </tr>
        <tr>
            <td onclick="add(1)">1</td>
            <td onclick="add(2)">2</td>
            <td onclick="add(3)">3</td>
        </tr>
        <tr>
            <td onclick="calculate()">=</td>
            <td onclick="add(0)">0</td>
            <td onclick="reset()">AC</td>
        </tr>
    </table>
    <script>
        function add(char) {
            var display = document.getElementById('display');
            display.value = display.value +char;
        }
        function toBinary() {
            var display = document.getElementById('display');
        }
        function toHex() {
            var display = document.getElementById('display');
            document.getElementById('result').value = convertToHex(display);
        }
        function convertToHex(str) {
            var hex = '';
                for(var i=0;i<str.length;i++) {
                    hex += ''+str.charCodeAt(i).toString(16);
                  }
              return hex;
        }
        function toOctal() {
            var display = document.getElementById('display');
            
        }        
        function calculate() {
            var display = document.getElementById('display');
            var result = eval(display.value);
            document.getElementById('result').value = result;
        }
        function reset() {
            document.getElementById('display').value = "";
            document.getElementById('result').value = "";
        }
    </script>
</body>
</html>

        `;


        response.end(temp);

    },100 );

});
app.listen(3000);