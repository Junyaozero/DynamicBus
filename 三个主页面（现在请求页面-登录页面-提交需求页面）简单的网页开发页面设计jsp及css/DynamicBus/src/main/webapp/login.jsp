<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Login</title>
<link href="Loginmystyle.css" type="text/css" rel="stylesheet" />
</head>
<body>
<% request.setCharacterEncoding("utf-8"); %>
    <div class="container">
    <h1 class="title">Welcome to DynamicBus</h1>
<%
    String error = (String)request.getAttribute("errorMsg");
    if(error != null){
        out.print("<font color='red'>" + error +"</font>");
    }
%>
<form action="server.jsp"  method="post">   
     <table border="0">  
            <tr>
                <th>&nbsp&nbsp&nbsp号码：</th>
                <td colspan="2">
                     <input type="text" name="call" class="input" placeholder="请输入手机号"/><br>
                </td>
            </tr>
            <tr>
                <th>&nbsp&nbsp&nbsp密码：</th>
                <td colspan="2">
                     <input type="password" name="pwd" class="input" placeholder="请输入密码"/><br>
                </td>
            </tr>
             <tr>
                <th>  
                </th>
                <th> 
                    <input type="submit" value="注册" class="button"/>
                </th>
                <th>
                    <input type="reset" value="登录" class="button"/>
                </th>
            </tr>
        </table>
</form>
</div>
</body>
</html>
