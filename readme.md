Ausarbeitung - PSE - Pascal J�schke

##Projekt
F�r das Modul �Praxis im Software Engineering� sollte ein Spiel namens �Space Taxi� als Ergebnis erstellt werden. Das Spiel soll unterschiedliche Levels beinhalten, indem eine Spielfigur auf ein Spielfeld von Ort A nach Ort B kommen soll, um in den n�chsten Level zu gelangen. Gegnerische Spielobjekte sollen eingebaut werden, die dieses Vorhaben verhindern. Des Weiteren sollen Hindernisse eingebaut werden, die einen Durchgang der Spielobjekte verhindern und quasi als �Wand� gelten.

##Spiel Ausf�hren: 
Aufgerufen werden kann das Spiel �ber die Seite http://spacetaxi.zz.mu/SpaceTaxiWar/. 

##Vorgehensweise: 
Als ich von der Aufgabenstellung h�rte, habe ich mir zun�chst im Internet einige Beispiele angesehen und angespielt. Die Funktionsweise war recht simpel und schien sehr leicht umsetzbar. Jedoch habe ich so fr�h damit begonnen, dass erst sp�ter bekannt wurde, dass das Spiel auch in Unity umgesetzt werden kann. Da ich bereits so weite Fortschritte in HTML5 und JavaScript gemacht und von Unity wenig Kenntnisse hatte, entschied ich mich daf�r weiter bei meiner HTML5 + JavaScript - L�sung zu bleiben. 

##Login: 
Es wurde eine Login-Form implementiert, in dem ein Username ausgew�hlt werden kann. Diese darf jedoch gewisse Sonderzeichen nicht enthalten. Daf�r wird auf einen regul�ren Ausdruck �[^a-zA-Z0-9_�������]� gepr�ft, in dem nur einige der g�ngigsten Zeichen erlaubt sind. 

##Tutorial: 
Loggt sich ein User ein, dessen Usernamen bisher unbekannt ist, wird ein Tutorial aufgerufen, in der die Basisinformationen und eine kurze Ansprache aufgef�hrt werden. 

##Spielfeld: 
Es wird ein Spielfeld ben�tigt, auf dem sich der Spieler bewegt. Dazu kam ein Canvas-Feld sehr gelegen. Ich fand gl�cklicherweise fr�h die Bibliothek �KineticJS�, was viele Funktionalit�ten bereithielt, wie das Einbinden weiterer Spielfiguren, die Bewegungen, sp�ter auch das Einbinden von Sprites. Nun habe ich mir eine M�glichkeit �berlegt, wie ich die Stages speichern kann. Dazu kam eine Datenbank in Frage oder ein Filesystem, wof�r ich mich letztendlich entschied. Darin war zun�chst ein Ordner enthalten, in dem die �default�-Stages gespeichert wurden. Diese bestimmen die Werte (H�he und Breite) des Spielfeldes, sowie all derer Figuren. Nun mussten diese nur noch ausgew�hlt werden k�nnen. Ich entschied mich daf�r ein einfaches DropDown-Feld zu verwenden. 
Gestartet werden musste das Spiel nat�rlich auch. Zu Beginn wurde ein Button am oberen Rand gesetzt, auf den man dr�cken musste. Das war allerdings unvorteilhaft, da die Figuren mit der Tastatur gesteuert werden sollten. Also wurde die �Enter�-Taste daf�r �berschrieben. Mit anderen ausgew�hlten (sp�ter �nderbaren) Tasten kann die Richtung des Spielers gesteuert werden. Da die normale Steuerung jedoch zu einfach war, wurde eine Gravitation implementiert, die den Spieler, je nach Schwierigkeitsgrad, schneller nach unten zieht. Dementsprechend werden auch mehr Punkte beim Einsammeln eines Passagiers vergeben. 
Besondere Schwierigkeiten gab es bei der �berpr�fung einer Kollision. Bei Unity war diese Funktionalit�t bereits gegeben. In JavaScript allerdings m�ssen pro Frame stets alle Figuren selbst auf eine Kollision miteinander �berpr�ft werden. Um nicht zu viele �berpr�fungen pro Frame zu vollziehen, was sich stark auf die Performance auswirkt, wurde die Framerate verringert, sodass weniger Schritte durchlaufen werden m�ssen. Es gibt folgende Spielfiguren: 
###Spieler (Player):
Den Spieler selbst. Dieser wird, bis auf die Sch�sse (Bullet) in jedem Frame auf alle weiteren Figuren gepr�ft. 
###Schuss (Bullet):
Diese Figur wird von der Position des Spielers aus abgeschossen. Diese pr�ft auf Kollisionen aller Figuren, bis auf den Spieler selbst, der nicht getroffen werden kann. Ist diese Figur au�erhalb des Spielfelds oder trifft sie eine andere Figur, wird sie entfernt. Einen Zusatz gibt es bei den Passagieren, wobei ein �Friendly Fire� deaktiviert werden kann. In dem Fall wird eine Kollision mit einem Passagier ignoriert. 
###Wand (Wall):
Eine Wand, die im Spielfeld platziert werden kann, um den Spieler zu st�ren. Eine Kollision mit einer Wand verhindert das Weiterfliegen in diese Richtung. 
###Passagier (Victim):
Es m�ssen pro Durchlauf alle Passagiere eingesammelt oder bei aktivierten Friendly Fire abgeschossen werden. Wird ein Passagier eingesammelt, erh�ht sich der Punktestand abh�ngig vom eingestellten Schwierigkeitsgrad. Wird einer abgeschossen, werden die Punkte deutlich verringert. 
###Gegner/Alien (Enemy):
Kollidiert der Spieler mit einem Gegner ist das Spiel vorbei und gilt als verloren. Trifft ein Schuss einen Gegner, so werden beide Objekte (Gegner und Schuss) entfernt und der Punktestand erh�ht sich um 5. 
###Ziel:
Kollidiert der Spieler mit dem Ziel, so wird gepr�ft, ob sich noch Passagiere auf dem Spielfeld befinden. Sind noch welche vorhanden, wird eine entsprechende Meldung ausgegeben und das Spiel als verloren beendet. Sind keine Passagiere mehr vorhanden, gilt das Spiel als gewonnen und es wird die n�chste Stage (falls vorhanden) geladen. 

##Ziel:
Ziel des Spiels ist es, pro Durchlauf in k�rzester Zeit m�glichst viele Passagiere einzusammeln, m�glichst viele der gegnerischen Konkurrenz (Aliens) abzuschie�en und anschlie�end zur Basis zu fliegen. Je besser diese Kriterien erf�llt sind, desto mehr Punkte werden verteilt, sodass sich der pers�nliche Highscore erh�hen kann. Nat�rlich steht der Spa�faktor immer an erste Stelle ;)

##Optionen: 
Ein besonderes Augenmerk geb�hrt dem Optionsmen�, in dem diverse Anpassungen am Spielverlauf ge�ndert und pro User gespeichert werden k�nnen. Folgende �nderungen k�nnen dort gespeichert werden: 
###Sprache:
Die Anzeigesprache im Spiel. 
###T�ne:
Effekt-Sounds w�hrend des Spiels. 
###Hintergrundmusik:
W�hrend der gesamten Zeit auf dieser Seite. 
###Friendly Fire:
(De)Aktiviert das Abschie�en der Passagiere. Am Ende einer erfolgreichen Runde wird auf diesen Wert gepr�ft. Ist Dieses Feld aktiviert, wird ein Bonus mit dem Faktor 3 auf die Gesamtpunktzahl gew�hrt. 
###Schwierigkeitsgrad:
Bestimmt die Gravitationsgeschwindigkeit des Spielers nach unten. Je h�her dieser Wert, desto mehr Punkte werden beim Einsammeln der Passagiere vergeben. 
###Richtungstasten:
Hoch, Runter, Links, Rechts, Turbo: �ndert die Steuerung mit der Tastatur. 
Der Schuss und das Resetten sind mit der Leer- und Entertaste vorbelegt und sind nicht �nderbar. 
###Bilder �ndern:
Spieler-Bild, Ziel-Bild, Passagier-Bild, Alien-Bild: Hier k�nnen pro User die vordefinierten Bilder ersetzt werden. Kommt ein �Besucher� im Stage-Builder auf diese Stage, werden auch diese hier definierten Bilder angezeigt. 
###Anzahl Sprites: 
Spieler-Sprites, Ziel-Sprites, Passagier-Sprites, Alien-Sprites: Es besteht die M�glichkeit pro Bild Sprites zu hinterlegen. Bei einem Wert von 1 gibt es keine Animationen f�r dieses Bild und dieses wird auf eine maximale H�he und Breite von 50 Pixel runterskaliert. Wird nun eine Sprite-Angabe von mehr als 1 angegeben, so wird die Breite des hochgeladenen Bildes durch diese Anzahl geteilt und als Animation im Spiel angezeigt. Wichtig f�r eine korrekte Darstellung ist, dass alle Sprites in derselben H�he dargestellt werden k�nnen und alle Einzelbilder dieselbe Breite haben. 
Es ist eine Gr��e von mindestens 1 und maximal 100 an der Anzahl der Sprites definiert. 

##Stage-Builder: 
Ein weiteres Highlight ist der Stage-Builder. Im Stage-Builder k�nnen eigene Stages erstellt und gespielt werden. Auch andere User k�nnen die hier erstellten Stages betreten und spielen. Ein im Stage-Builder erreichter Highscore wird zwar kenntlich gemacht, jedoch nicht gespeichert. 
Wurde bei �User-besuchen� der eigene User angew�hlt, kann diese nun ge�ndert und gespeichert werden. Um die H�he und Breite des Spielfeldes zu �ndern, wurden zwei DropDown-Men�s eingebunden. Beim �ndern eines dieser Felder vergr��ert oder verkleinert sich das Spielfeld sofort. Um eine Figur hinzuzuf�gen bzw. zu entfernen, muss auf die jeweilige Figur ein Doppelklick ausgef�hrt werden. Es folgt eine Meldung, in der nun abgefragt wird, ob diese Figur entfernt oder erstellt (dupliziert) werden soll. Es muss jedoch von jeder Figur mindestens eine vorhanden sein. Das L�schen und Hinzuf�gen weiterer Spieler oder Ziele ist nicht m�glich. 
Bewegt werden die Figuren einfach per Drag & Drop. 
Wurde die Stage nach eigenem Ermessen ge�ndert, muss diese mit einem Klick auf �Speichern� gespeichert werden. Dabei hat der User wieder zwei M�glichkeiten. Einmal die vorhandene Stage zu �berschreiben oder eine neue zu erstellen. 
Erst wenn eine neue oder ge�nderte Stage gespeichert wurde, kann diese gespielt werden. Wird eine gerade zu �ndernde Stage gewechselt, gehen alle nicht gespeicherten �nderungen daran verloren. 

##Zeit: 
In jeder Stage geht es auch um Zeit. Je schneller der Spieler am Ziel ist desto mehr Punkte werden ihm zugerechnet. Die Zeit ergibt sich aus der H�he und Breite des Spielfeldes und kann nicht separat ge�ndert werden. 

##Bekannte Bugs: 
Beim Starten des Spiels ruckelt es gelegentlich. Es ist jedoch kein Bug, sondern das Scrollen des Fensters zum Spieler, der immer im Mittelpunkt stehen muss. 
Wird das Spiel einmal �massakriert� (zig male resettet oder beim Fliegen gegen einen Spieler im richtigen Zeitpunkt resettet), wird die aktuelle Stage unkontrolliert immer wieder neu geladen. Ein neu laden des Fensters (F5) behebt dieses Problem. (Scheinbar behoben (weiter testen))
Gelegentlich k�nnen einzelne Bilder, die eine ��bergr��e� besitzen auf dem Spielfeld in Originalgr��e angezeigt werden. Sobald alle Bilder vollst�ndig geladen wurden, wird die Stage auch neu aufgebaut und die vergr��erten Bilder erhalten die normale Gr��e. 

##Verwendete Komponente:
Es wurde die jquery-Bibliothek Version 2.1.1 verwendet, sowie die KineticJS-Bibliothek. 
Zuvor wurde eine WordPress-Seite mit dem Hoster �Hostinger� erstellt und das Projekt nach Fertigstellung dort integriert. Zus�tzlich ist das gesamte Projekt �ber GitHub zug�nglich und kann von dort heruntergeladen und �ber einen lokalen Host gestartet werden. 




