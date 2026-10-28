' Abre English Lab sin terminal: arranca el servidor escondido si no esta en marcha y abre la app en Chrome.
Set sh = CreateObject("WScript.Shell")
url = "http://127.0.0.1:4173/"

Function Responde()
  On Error Resume Next
  Set http = CreateObject("MSXML2.XMLHTTP")
  http.Open "GET", url, False
  http.Send
  Responde = (Err.Number = 0 And http.Status = 200)
  On Error GoTo 0
End Function

If Not Responde() Then
  sh.Run "cmd /c cd /d C:\dev\english-lab && npx vite preview --host 127.0.0.1 --port 4173 --strictPort", 0, False
  For i = 1 To 40
    WScript.Sleep 500
    If Responde() Then Exit For
  Next
End If

sh.Run """C:\Program Files\Google\Chrome\Application\chrome.exe""" & " --app=" & url, 1, False
