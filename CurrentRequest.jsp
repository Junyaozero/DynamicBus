<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Login</title>
<link href="CurrentRequestmystyle.css" type="text/css" rel="stylesheet" />
</head>
<body>
<% request.setCharacterEncoding("utf-8"); %>
    <div class="container">
    <h1 class="title">当前请求</h1>
<%
    String error = (String)request.getAttribute("errorMsg");
    if(error != null){
        out.print("<font color='red'>" + error +"</font>");
    }
%>
<form action="server.jsp"  method="post">   
     <table border="0">  
            <tr>
                <th>站点人数：</th>
                <td colspan="2">
                    求是：1人
                </td>
            </tr>
            <tr>
                <th></th>
                <td colspan="2">
                     鑫茂：2人
                </td>
            </tr>
            <tr>
                <th></th>
                <td colspan="2">
                     二饭：2人
                </td>
            </tr>
             <tr>
                <td colspan="3"> 
                	</br>
                </td>
            </tr>
            <tr>
                <th>巴士位置：</th>
                <td colspan="2">
                     南苑
                </td>
            </tr>
            <tr>
                <td colspan="3"> 
                	</br>
                </td>
            </tr>
            <tr>
                <th>推荐路线：</th>
                <td colspan="2">
                     南苑 -> 二饭 -> 鑫茂 -> 求是
                </td>
            </tr>
        </table>
</form>
</div>
</body>
</html>
