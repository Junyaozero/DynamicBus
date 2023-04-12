<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Login</title>
<link href="SubmitNeedmystyle.css" type="text/css" rel="stylesheet" />
</head>
<body>
<% request.setCharacterEncoding("utf-8"); %>
	<div class="container">
	<h1 class="title">乘车需求</h1>
<%
	String error = (String)request.getAttribute("errorMsg");
	if(error != null){
		out.print("<font color='red'>" + error +"</font>");
	}
%>
<form action="server.jsp"  method="post">	
	 <table border="0">  
            
            <tr>
                <th colspan="2" >&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp上车地点：</th>
                <td colspan="1">
                      <select colspan="1" name="cities" size="1">
                    	 <option value="qingxuanze" selected>请选择
                        <option value="nanyuan">南苑
                        <option value="erfan" >二饭
                        <option value="xinmao" >鑫茂
                        <option value="hongyi" >弘毅
                        <option value="tianyou" >天佑
                        <option value="yiyue" >艺悦
                        <option value="zhixing" >知行
                        <option value="qiushi" >求是
                        <option value="jinggong" >精工
                    </select></br>
                </td>
                <td>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</td>
            </tr>
            <tr>
                <th colspan="2">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp下车地点：</th>
                <td colspan="1">
                     <select colspan="1" name="cities" size="1">
                    	 <option value="qingxuanze" selected>请选择
                         <option value="nanyuan">南苑
                        <option value="erfan" >二饭
                          <option value="xinmao" >鑫茂
                        <option value="hongyi" >弘毅
                        <option value="tianyou" >天佑
                        <option value="yiyue" >艺悦
                        <option value="zhixing" >知行
                        <option value="qiushi" >求是
                        <option value="jinggong" >精工
                    </select></br>
                </td>
                <td>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</td>
            </tr>
            <tr><td></br></td></tr>
            <tr>
            <td colspan="4" align="center">
                  	<input type="submit" value="提交" class="button"/>
                </td>
            </tr>
        </table>
</form>
<tr>
                
</div>
</body>
</html>



