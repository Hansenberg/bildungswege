# Installation
## Installation und Ausführen des Servers
Um die App auszuführen, installieren sie zuerst Node.js und den package manager npm. Anschließend navigieren sie in einem Kommandozeilenfenster in den Ordner der Repository und geben sie ein:
```bash
npm install
node server.js
```
## Setup der Datenbank
Damit es beim Start nicht zu Fehlermeldungen kommt, muss eine Datenbank mit dem erforderlichen Relationenschema angelegt werden. Öffnen sie dafür ihre MySQL-Konsole oder PHPMyAdmin und fügen die den SQL-Befehl aus sqlqueries/create\_database.txt ein. 
Stellen sie sicher, dass der SQL-Dienst auf localhost:3306 verfügbar ist und erstellen sie einen SQL-Account mit Benutzernamen und Password admin. (Falls ein anderer Account zur Verbindung mit der Datenbank genutzt werden soll, kann dies im Quellcode in der datei custom\_modules/sql\_connect.js geändert werden.) Ein entsprechender Account kann auch mit Hilfe des SQL-Befehls in sqlqueries/create\_database\_user.txt erstellt werden.

